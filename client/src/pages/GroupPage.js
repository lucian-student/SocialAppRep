import React, { useState } from 'react';
import RequestForm from '../components/RequestForm';
import { GET_GROUP_QUERY } from '../util/graphql';
import { useQuery, useSubscription, useLazyQuery } from '@apollo/react-hooks';
import { FETCH_GROUPED_NOTES_QUERY, GROUPED_NOTE_SUBSCRIPTION } from '../util/graphql2';
import GroupedNoteForm from '../components/GroupedNoteForm';
import { Grid, Dropdown, Menu,Icon,Button,Popup } from 'semantic-ui-react';
import NoteCard from '../components/NoteCard';




function GroupPage(props) {
    const groupId = props.match.params.groupId;

    const { data, loading, error } = useQuery(GET_GROUP_QUERY, {
        variables: {
            groupId
        }
    });

    const fetchNotes = useQuery(FETCH_GROUPED_NOTES_QUERY, {
        variables: {
            groupId: groupId
        }
    });
    // use fetchNotes.subscribeToMore

    let notified = '0';

    let notes = '';
    let newData = '';

    if (fetchNotes.data) {
        newData = fetchNotes.data;
        console.log(newData);
        notes = { newData: newData.getGroupedNotes }
    }
    //subscription place

    const noteSub = useSubscription(GROUPED_NOTE_SUBSCRIPTION, {
        variables: {
            groupId
        }
    });


   





    //sub

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error.</p>
    if (!data.getGroup) {
        return <p>Loading group...</p>
    } else {
        const {
            id,
            users
        } = data.getGroup;

        const groupParams = data.getGroup;

        const options = users.map(usr => (
            { key: usr.id, text: usr.username, value: usr.username }
        ));

        return (
            <div>
                <div style={{ display: 'inline' }}>
                    <h1 style={{ display: 'inline' }}>welcome to group {groupId}</h1>
                </div>
                <Menu compact>
                    <Dropdown text='group members' options={options} simple item />
                </Menu>
                <RequestForm groupParams={groupParams} />
                <GroupedNoteForm id={id} />
                <Grid columns={3}>
                    <Grid.Row >
                        <h1>group notes</h1>
                    </Grid.Row>
                    {fetchNotes.loading ? (
                        <h1>loading notes..</h1>
                    ) : (
                            notes.newData &&
                            notes.newData.map(note => (

                                <Grid.Column key={note.id} style={{ marginBottom: 20 }}>
                                    <NoteCard note={note} />
                                </Grid.Column>

                            ))
                        )}
                </Grid>
            </div>

        )
    }
}

export default GroupPage;