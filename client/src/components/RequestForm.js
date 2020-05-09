import React,{useState,useContext} from 'react';
import { Form, Button } from 'semantic-ui-react';
import {useForm} from '../util/hooks';
import {useMutation} from '@apollo/react-hooks';
import {CREATE_GROUP_REQUEST_MUTATION} from '../util/graphql';

function RequestForm({groupParams:{id,name}}) {


    const [errors, setErrors] = useState({});

    

    const { values, onChange, onSubmit } = useForm(createRequestCallback, {
        username:'',
        groupName:name,
        groupId:id
    });

    const [createRequest] = useMutation(CREATE_GROUP_REQUEST_MUTATION, {
        variables: values,
        onError(err) {
          console.log(err);
          setErrors(err.graphQLErrors[0].extensions.exception.errors);
          console.log(errors.username);
        }
    });

    function createRequestCallback() {
        createRequest();
        values.username = '';
    }


    return (
        <div>
            <div>request form</div>
            <Form onSubmit={onSubmit}>
                <h2>inveit someone to this group:</h2>
                <Form.Field>
                    <Form.Input
                        placeholder="fikus request"
                        name="username"
                        onChange={onChange}
                        error ={errors.username}
                        value={values.username}
                       
                    />
                    <Button type="submit">
                        Submit
                    </Button>
                </Form.Field>
            </Form>

        </div>
    )
}

export default RequestForm;