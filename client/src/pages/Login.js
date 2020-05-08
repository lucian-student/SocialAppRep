import React,{useState,useContext} from 'react';
import { Form, Button } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { useForm } from '../util/hooks';
import {AuthContext} from '../context/auth';

function Login(props) {
    let persistentUsername = '';


    const context = useContext(AuthContext);

    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: '',
        password: ''

    });

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_,{data:{login:userData}}) {
            console.log(userData);
            persistentUsername = values.username;
            context.login(userData);
            console.log(persistentUsername);
            props.history.push('/home');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function loginUserCallback() {
        loginUser();
    }


    return (
        <div>
            <h1>Login fik</h1>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Login</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username.."
                    name="username"
                    type="text"
                    error={errors.username}
                    value={values.username}
                    onChange={onChange}
                />

                <Form.Input
                    label="Password"
                    placeholder="Password.."
                    name="password"
                    type="password"
                    error={errors.password}
                    value={values.password}
                    onChange={onChange}
                />
                <Button type="submit" primary onClick={onSubmit}>
                    Login
                </Button>
            </Form>

        </div>
    )
}

const LOGIN_USER = gql`
mutation login(
    $username:String!,
    $password:String!
){
    login(username:$username , password:$password){
        
        id
      email
      username
      createdAt
      token
        
    }
}
`;
export default Login;