import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_GROUP_MUTATION, FETCH_UPDATABLE_USER_DATA } from '../util/graphql';
import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks'; 
import {Form,Button} from 'semantic-ui-react';


function GroupForm() {
    const { user: { id } } = useContext(AuthContext);

    const [errors, setErrors] = useState({});

    const { values, onChange, onSubmit } = useForm(createGroupCallback, {
        groupName: ''
    });

    const [createGroup] = useMutation(CREATE_GROUP_MUTATION, {
        variables: values,
        refetchQueries: [{
            query: FETCH_UPDATABLE_USER_DATA,
            variables: { userId: id },
        }],

        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        }

    });

    function createGroupCallback() {
        createGroup();
        values.groupName = '';
    }

    return (
        <div>
            <div>Form for creating group</div>
            <Form onSubmit={onSubmit}>
                <h2>create new group:</h2>
                <Form.Field>
                    <Form.TextArea
                        placeholder="fikus groups"
                        name="groupName"
                        onChange={onChange}
                        value={values.groupName}
                        error={errors.groupName}

                    />
                    <Button type="submit">
                        Submit
                    </Button>
                </Form.Field>
            </Form>
        </div>


    )

}

export default GroupForm;