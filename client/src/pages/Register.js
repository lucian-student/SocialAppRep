import React, { useState, useContext } from 'react';
import { Form, Button } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { useForm } from '../util/hooks';
import { AuthContext } from '../context/auth';

function Register(props) {

    const context = useContext(AuthContext);

    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(registerUserCallback, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, { data: { register: userData } }) {
            context.login(userData);
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function registerUserCallback() {
        addUser();
    }

    return (
        <div style={{ display: "flex" }}>
            <div style={{ margin: "auto", width:'60%' }}>
                <h1>Register fik</h1>
                <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                    <h1>register</h1>
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
                        label="Email"
                        placeholder="Email.."
                        name="email"
                        type="email"
                        error={errors.email}
                        value={values.email}
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
                    <Form.Input
                        label="ConfirmPassword"
                        placeholder="ConfirmPassword.."
                        name="confirmPassword"
                        type="password"
                        error={errors.password}
                        value={values.confirmPassword}
                        onChange={onChange}
                    />
                    <Button type="submit" primary onClick={onSubmit}>
                        Register
                    </Button>
                </Form>
            </div>
        </div>
    )
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!,
    $email: String!,
    $password: String!,
    $confirmPassword: String!,
  ) {
    register(
      registerInput: {
        username: $username,
        email: $email,
        password: $password,
        confirmPassword: $confirmPassword,
      }
    ) {
        id
      email
      username
      createdAt
      token
    }
  }
`;



export default Register;
