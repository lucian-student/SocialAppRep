import React, { useContext, useState } from 'react';
import { Card, Button,Confirm } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import gql from 'graphql-tag';

import { useMutation } from '@apollo/react-hooks';
import { FETCH_NOTES_QUERY } from '../util/graphql';
//import {Button} from 'material-ui';

function NoteCard({ note: { username, createdAt, id, content } }) {
    const { user } = useContext(AuthContext);
    
    let persistentUsername='';

    if (user !== null) {
        persistentUsername = user.username;
    }
    
    const [confirmOpen,setConfirmOpen] = useState(false);
  

    const [deleteNote] = useMutation(DELETE_NOTE_MUTATION, {
        variables: {
            noteId:id
        },
        update(proxy) {
           console.log(persistentUsername);

            const data = proxy.readQuery({
                query: FETCH_NOTES_QUERY,
                variables: { username: persistentUsername }
            });
            proxy.writeQuery({
                query: FETCH_NOTES_QUERY,
                variables: { username: persistentUsername },
                data:{getNotes:data.getNotes.filter(n=>n.id!==id)}
            });

        },/*
         refetchQueries: [{
            query: FETCH_NOTES_QUERY,
             variables: {username: persistentUsername},
           }],*/
        onError(err) {
           console.log(err);
        }
    });


    return (
        <div>
            <Link to={`/${id}`}>
                <Card
                    link
                    style={{wordBreak:"break-all"}}
                    header={username}
                    meta={moment({ createdAt }).fromNow()}
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