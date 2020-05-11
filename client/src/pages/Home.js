import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid } from 'semantic-ui-react';

import NoteCard from '../components/NoteCard';
import { AuthContext } from '../context/auth';
import NoteForm from '../components/NoteForm';
import { FETCH_NOTES_QUERY } from '../util/graphql';




function Home() {

  let notes = '';

  let persistentUsername = '';

  const { user } = useContext(AuthContext);

  if (user !== null) {
    persistentUsername = user.username;
  }

  const { loading, data } = useQuery(FETCH_NOTES_QUERY, {
    variables: {
      username: persistentUsername
    }
  });



  if (data) {
    notes = { data: data.getNotes }
  }
  console.log(notes);

  return (

    <Grid columns={3}>
      <Grid.Row >
        <h1>your personal notes</h1>
      </Grid.Row>
      {user && (
        <Grid.Column>
          <NoteForm />
        </Grid.Column>
      )}
      {loading ? (
        <h1>loading notes..</h1>
      ) : (
          notes.data &&
          notes.data.map(note => (
  
              <Grid.Column key={note.id} style={{ marginBottom: 20 }}>
                <NoteCard note={note} />
              </Grid.Column>

          ))
        )}
    </Grid>

  )
}


export default Home;


