import React from 'react';
import { useForm } from '../util/hooks';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_GROUPED_NOTE_MUTATION } from '../util/graphql2';
import { Form, Button } from 'semantic-ui-react';


function GroupedNoteForm({ id }) {


    const { values, onChange, onSubmit } = useForm(createGroupedNoteCallback, {
        content: '',
        groupId: id
    });

    const [createGroupedNote] = useMutation(CREATE_GROUPED_NOTE_MUTATION, {
        variables: values,
        onError(err) {
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