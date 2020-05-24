import React, { useContext, useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Form } from 'semantic-ui-react';
import { Paper, Button } from '@material-ui/core';
import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';




function NotePage(props) {

    // init
    const { user } = useContext(AuthContext);
    const [editiable, setEditable] = useState(false);

    const noteId = props.match.params.noteId;
    console.log(noteId);

    const { loading, error, data } = useQuery(FETCH_NOTE_QUERY, {
        variables: {
            noteId
        }
    });

    //note form

    const [errors, setErrors] = useState({});

    const { values, onChange, onSubmit } = useForm(editNoteCallback, {
        content: ''
    });

    const [editNote] = useMutation(EDIT_NOTE_MUTATION, {

        variables: {
            content: values.content,
            noteId: noteId
        },
        refetchQueries: [{
            query: FETCH_NOTE_QUERY,
            variables: {
                noteId: noteId
            },
        }],
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        }

    });

    function editNoteCallback() {

        editNote();
        setEditable(false);
    }




    // end of  note form
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error.</p>
    if (!user) {
        return <div>u logged off</div>
    }

    let notePage
    if (!data.getNote) {
        notePage = <p>Loading Note...</p>
    } else {
        const {
            content,
            username,
        } = data.getNote

        values.content = content;
        notePage = (

            <div>
                {editiable
                    ?
                    <div style={{ display: "flex" }}>
                        <div style={{ margin: "auto", width: '60%'}}>
                            <h1>Note is  being edited</h1>
                            <Paper elevation={3}>
                                <h1 >{username}</h1>
                                <div>
                                    <Form
                                        onSubmit={onSubmit}
                                    >
                                        <h2>create new note:</h2>
                                        <Form.Field>
                                            <Form.TextArea
                                                placeholder="fikus notes"
                                                name="content"
                                                defaultValue={content}
                                                onChange={onChange}
                                                //value={values.content}
                                                error={errors.content}
                                                style={{ minHeight: 400 }}
                                            />
                                            <Button type="submit">
                                                Submit
                                            </Button>
                                        </Form.Field>
                                    </Form>
                                </div>

                            </Paper>
                        </div>
                    </div>
                    :
                    <div style={{ display: "flex" }}>
                        <div style={{ margin: "auto", width: 400 }}>
                            <h1>Note is not being edited</h1>
                            <Paper elevation={3}>
                                <h1 >{username}</h1>

                                <div style={{ minHeight: 400 }}>
                                    <p style={{ wordBreak: "break-all" }}>{content}</p>
                                </div>
                                <br />
                                {user.username === username ? (
                                    <Button onClick={() => setEditable(true)}>
                                        Edite note
                                    </Button>
                                ) : (
                                        <div></div>
                                    )}

                            </Paper>
                        </div>
                    </div>
                }
            </div>

        );
    }

    return notePage;
}

const FETCH_NOTE_QUERY = gql`
query getNote(
    $noteId:ID!
){
    getNote(
        noteId:$noteId
    ){
        id
        username
        createdAt
        content
    }
}
`;

const EDIT_NOTE_MUTATION = gql`
    mutation editNote(
        $noteId:ID!
        $content:String!
    ){
        editNote(
            noteId:$noteId,
            content:$content
        ){
            id
            username
            createdAt
            content
        }
    }
`;

export default NotePage;