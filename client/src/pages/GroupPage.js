import React from 'react';
import RequestForm from '../components/RequestForm';
import { GET_GROUP_QUERY } from '../util/graphql';
import { useQuery } from '@apollo/react-hooks';

function GroupPage(props) {
    const groupId = props.match.params.groupId;

    const { data, loading, error } = useQuery(GET_GROUP_QUERY, {
        variables: {
            groupId
        }
    });

    let GroupPage;
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error.</p>
    if (!data.getGroup) {
        return <p>Loading group...</p>
    } else {
        const {
            id,
            name,
            username,
            createdAt,
            users

        } = data.getGroup;

        const groupParams = data.getGroup;


        return (
            <div>
                <h1>welcome to group {groupId}</h1>
                <RequestForm groupParams={groupParams} />
            </div>

        )
    }
}

export default GroupPage;