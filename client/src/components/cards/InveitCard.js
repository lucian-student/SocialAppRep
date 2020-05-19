import React, { useContext } from 'react';
import { Card, Icon } from 'semantic-ui-react';
import {
    FETCH_UPDATABLE_USER_DATA,
    JOIN_GROUP_MUTATION,
    DELETE_REQUEST_MUTATION
} from '../../util/graphql';
import {useMutation} from '@apollo/react-hooks';
import {AuthContext} from '../../context/auth';


function InveitCard({ req: { groupId, groupName,id, username } }) {

    const {user} = useContext(AuthContext);


    const [joinGroup] = useMutation(JOIN_GROUP_MUTATION, {
        variables: {
            groupName:groupName,
            groupId:groupId,
            requestId:id
        },
        
         refetchQueries: [{
            query: FETCH_UPDATABLE_USER_DATA,
             variables: {userId:user.id},
           }],
        onError(err) {
           console.log(err);
        }
    });


    const [deleteRequest] = useMutation(DELETE_REQUEST_MUTATION, {
        variables: {
            requestId:id
        },
        
         refetchQueries: [{
            query: FETCH_UPDATABLE_USER_DATA,
             variables: {userId:user.id},
           }],
        onError(err) {
           console.log(err);
        }
    });

    const cardHeader = "you were inveited by " + username + " to group called " + groupName;

    return (
        <Card
            fluid
            color='green'
            className="card"
        >


            <div style={{ display: 'inline' }}>
                <Card.Header style={{ display: 'inline' }}><h3 style={{ display: 'inline' }}>{cardHeader}</h3></Card.Header>

                <Icon link name='add' className="hoverIcon" size='huge' onClick={joinGroup}></Icon>

                <Icon link name='delete' className="hoverIcon" size='huge' onClick={deleteRequest}></Icon>
            </div>

        </Card>

    )
}

export default InveitCard;