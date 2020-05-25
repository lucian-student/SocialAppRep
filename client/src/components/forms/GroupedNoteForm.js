import React,{useState} from 'react';
import { useForm } from '../../util/hooks';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_GROUPED_NOTE_MUTATION } from '../../util/graphql2';
import { Form, Button } from 'semantic-ui-react';


function GroupedNoteForm({ id }) {

    const [errors, setErrors] = useState({});

    const { values, onChange, onSubmit } = useForm(createGroupedNoteCallback, {
        content: '',
        groupId: id,
        noteName:''
    });

    const [createGroupedNote] = useMutation(CREATE_GROUPED_NOTE_MUTATION, {
        variables: values,
        onError(err) {
           setErrors(err.graphQLErrors[0].extensions.exception.errors);
           console.log(err);
        }

    });

    function createGroupedNoteCallback() {
        createGroupedNote();
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
                    />
                    <Button type="submit">
                        Submit
                    </Button>
                </Form.Field>
            </Form>
        </div>

    )
}
export default GroupedNoteForm;