import React, { useContext,useState } from 'react';
import gql from 'graphql-tag';
import { Form, Button } from 'semantic-ui-react';
import { useForm } from '../../util/hooks';
import { useMutation } from '@apollo/react-hooks';
import { FETCH_NOTES_QUERY } from '../../util/graphql';
import { AuthContext } from '../../context/auth';


function NoteForm() {

    let persistentUsername = '';

    const [errors, setErrors] = useState({});


    const { user } = useContext(AuthContext);

    if (user !== null) {
        persistentUsername = user.username;
    }

    const { values, onChange, onSubmit } = useForm(createNoteCallback, {
        content: '',
        noteName:''
    });

    const [createNote] = useMutation(CREATE_NOTE_MUTATION, {
        variables: values,
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
                values.noteName='';
           
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
                <Form.Input
                        placeholder="fikus notes"
                        name="noteName"
                        onChange={onChange}
                        value={values.noteName}
                        error={errors.noteName}
                        
                    />
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
    $content:String!,
    $noteName:String!
){
    createNote(
        content:$content,
        noteName:$noteName
    ){
        id
        username
        content
        createdAt
        noteName
    }
}
`;

export default NoteForm;