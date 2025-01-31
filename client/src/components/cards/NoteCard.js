import React, { useContext } from 'react';
import { Card, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { FETCH_NOTES_QUERY } from '../../util/graphql';

function NoteCard({ note: { username, id, content, grouped,noteName } }) {
    const { user } = useContext(AuthContext);

    let persistentUsername = '';

    if (user !== null) {
        persistentUsername = user.username;
    }

    

    const [deleteNote] = useMutation(DELETE_NOTE_MUTATION, {
        variables: {
            noteId: id
        },
        update(proxy) {
            console.log(persistentUsername);

            if (!grouped) {
                const data = proxy.readQuery({
                    query: FETCH_NOTES_QUERY,
                    variables: { username: persistentUsername }
                });
                proxy.writeQuery({
                    query: FETCH_NOTES_QUERY,
                    variables: { username: persistentUsername },
                    data: { getNotes: data.getNotes.filter(n => n.id !== id) }
                });
            } 

        },
        onError(err) {
            console.log(err);
        }
    });


    return (
        <div className='noteCard'>
            <Link to={`/${id}`}>
                <Card
                    link
                    style={{ wordBreak: "break-all" }}
                    header={username}
                    meta={noteName}
                    description={content}
                    fluid
                >
                </Card>
            </Link>
            {user && user.username === username ? (
                <div>

                    <Button onClick={deleteNote}
                    >
                        Delete
                    </Button>


                </div>
            ) : (
                    <div />
                )}

        </div>
    )
}

const DELETE_NOTE_MUTATION = gql`
mutation deleteNote(
    $noteId:ID!
){
    deleteNote(
        noteId:$noteId
    )
}


`;

export default NoteCard