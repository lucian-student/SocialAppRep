import React, { useContext } from 'react';
import { Card, Button,Icon } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import gql from 'graphql-tag';

import { useMutation } from '@apollo/react-hooks';
import { FETCH_NOTES_QUERY } from '../../util/graphql';

//import {Button} from 'material-ui';

function NoteCard2({ note: { username, createdAt, id, content, grouped, groupId,noteName } }) {
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

            <Card
                fluid
                color='green'
                className="card"
            >
                <div style={{ display: 'inline' }}>
                    <Link to={`/${id}`}>
                        <Card.Header style={{ display: 'inline' }}><h3 style={{ display: 'inline' }}>{username}:{noteName}</h3></Card.Header>
                    </Link>
                    {user && user.username === username && (
                        <Icon link name='delete' className="hoverIcon" size='huge' onClick={deleteNote}></Icon>
                    )}
                </div>

            </Card>

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

export default NoteCard2