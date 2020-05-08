import React, { useContext,useState } from 'react';
import gql from 'graphql-tag';
import { Form, Button,Transition } from 'semantic-ui-react';
import { useForm } from '../util/hooks';
import { useMutation } from '@apollo/react-hooks';
import { FETCH_NOTES_QUERY } from '../util/graphql';
import { AuthContext } from '../context/auth';


function NoteForm() {

    let persistentUsername = '';

    const [errors, setErrors] = useState({});


    const { user } = useContext(AuthContext);

    if (user !== null) {
        persistentUsername = user.username;
    }

    const { values, onChange, onSubmit } = useForm(createNoteCallback, {
        content: ''
    });

    const [createNote] = useMutation(CREATE_NOTE_MUTATION, {
        variables: values,
        /* refetchQueries: [{
            query: FETCH_NOTES_QUERY,
             variables: {username: persistentUsername},
           }],*/
        update(proxy, result) {
                const data = proxy.readQuery({
                    query: FETCH_NOTES_QUERY,
                    variables: { username: persistentUsername }
                });
                proxy.writeQuery({
                    query: FETCH_NOTES_QUERY,
                    variables: { username: persistentUsername },
                    data: { getNotes: [result.data.createNote, ...data.getNotes] }
                });
                values.content='';
           
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        }

    });

    function createNoteCallback() {
        createNote();
    }

    return (
        <div>
            <Form onSubmit={onSubmit}>
                <h2>create new note:</h2>
                <Form.Field>
                    <Form.TextArea
                        placeholder="fikus notes"
                        name="content"
                        onChange={onChange}
                        value={values.content}
                        error={errors.content}
                        
                    />
                    <Button type="submit">
                        Submit
                        </Button>
                </Form.Field>
            </Form>
        </div>
    )

}

const CREATE_NOTE_MUTATION = gql`
mutation createNote(
    $content:String!
){
    createNote(
        content:$content
    ){
        id
        username
        content
        createdAt
    }
}
`;

export default NoteForm;