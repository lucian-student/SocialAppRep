import React, { useContext } from 'react';
import { Card, Icon } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {useMutation} from '@apollo/react-hooks';
import {LEAVE_GROUP_MUTATION,FETCH_UPDATABLE_USER_DATA} from '../../util/graphql';
import {AuthContext} from '../../context/auth'

function GroupCard({ group: { groupId, groupName, id } }) {

    const {user} = useContext(AuthContext);
    // if u r last group should be cancled
    // if ur group is delted than make sure posts are delted aswell
    const [leaveGroup] = useMutation(LEAVE_GROUP_MUTATION, {
        variables: {
            userGroupId:id,
            groupId:groupId
        },
        
         refetchQueries: [{
            query: FETCH_UPDATABLE_USER_DATA,
             variables: {userId:user.id},
           }],
        onError(err) {
           console.log(err);
        }
    });


    return (
        <Card
            fluid
            color='green'
            //="hello"
            className="card"
        >
            <div style={{ display: 'inline' }}>
                <Card.Header style={{ display: 'inline' }}>
                    <Link to={`/groups/${groupId}`}>
                        <h3 style={{ display: 'inline',color:'black' }} >
                            {groupName}
                        </h3>
                    </Link>
                </Card.Header>
                <Icon 
                link name='delete' 
                className="hoverIcon" 
                size='huge'
                onClick={leaveGroup}
                ></Icon>
            </div>

        </Card>
    )
}

export default GroupCard;