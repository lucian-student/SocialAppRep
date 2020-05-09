import React, { useContext, useState } from 'react';
import { Card, Icon } from 'semantic-ui-react';
import {
    FETCH_UPDATABLE_USER_DATA,
    JOIN_GROUP_MUTATION,
    DELETE_REQUEST_MUTATION
} from '../util/graphql';


function InveitCard({ req: { groupId, groupName, id, username } }) {

    const cardHeader = "you were inveited by " + username + " to group called " + groupName;

    return (
        <Card
            fluid
            color='green'
            className="card"
        >


            <div style={{ display: 'inline' }}>
                <Card.Header style={{ display: 'inline' }}><h3 style={{ display: 'inline' }}>{cardHeader}</h3></Card.Header>
                <Icon link name='add' className="hoverIcon" size='huge'></Icon>
                <Icon link name='delete' className="hoverIcon" size='huge'></Icon>
            </div>

        </Card>

    )
}

export default InveitCard;