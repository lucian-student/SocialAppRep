import React, { useContext, useState, Component } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Button } from 'semantic-ui-react';

import NoteCard from '../components/cards/NoteCard';
import { AuthContext } from '../context/auth';
import NoteForm from '../components/forms/NoteForm';
import { FETCH_NOTES_QUERY } from '../util/graphql';
import NoteCard2 from '../components/cards/noteCard2';



function Home(props) {

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

  const [view, setView] = useState(false);
  function handleNoteView() {
    if (view) {
      setView(false);
    } else {
      setView(true);
    }
  }




  if (data) {
    notes = { data: data.getNotes }
  }
  console.log(notes);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ margin: "auto", width: '80%' }}>
        <Grid columns={1}>
          <Grid.Row >
            <h1>your personal notes</h1>
            {view ? (
              <Button onClick={handleNoteView}>
                Set view to documents
              </Button>
            ) : (
                <Button onClick={handleNoteView}>
                  Set view to messenger
                </Button>
              )
            }
          </Grid.Row>
          {!loading && (
            <Grid.Row>
              <NoteForm />
            </Grid.Row>
          )}

          {loading ? (
            <h1>loading notes..</h1>

          ) : (

              (notes.data && view ?
                notes.data.map(note => (

                  <Grid.Column key={note.id} style={{ marginBottom: 20 }}>
                    <NoteCard note={note} />
                  </Grid.Column>

                )) : (
                  (notes.data && !view ?
                    notes.data.map(note => (

                      <Grid.Column key={note.id} style={{ marginBottom: 20 }}>
                        <NoteCard2 note={note} />
                      </Grid.Column>

                    )) : (
                      <div />
                    ))
                ))

            )}
        </Grid>
      </div>
    </div>
  )
}


export default Home;


