import React from 'react';
import RequestForm from '../components/RequestForm';
import { GET_GROUP_QUERY } from '../util/graphql';
import { useQuery } from '@apollo/react-hooks';
import { CREATE_GROUPED_NOTE_MUTATION, FETCH_GROUPED_NOTES_QUERY } from '../util/graphql2';
import GroupedNoteForm from '../components/GroupedNoteForm';
import { Grid } from 'semantic-ui-react';
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

    let notes = '';
    let newData = '';

    if (fetchNotes.data) {
        newData = fetchNotes.data;
        console.log(newData);
        notes = { newData: newData.getGroupedNotes }
    }




    let GroupPage;
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error.</p>
    if (!data.getGroup) {
        return <p>Loading group...</p>
    } else {
        const {
            id,
            name,
            username,
            createdAt,
            users

        } = data.getGroup;

        const groupParams = data.getGroup;


        return (
            <div>
                <h1>welcome to group {groupId}</h1>
                <RequestForm groupParams={groupParams} />
                <GroupedNoteForm />
                <Grid columns={3}>
                    <Grid.Row >
                        <h1>your notes</h1>
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