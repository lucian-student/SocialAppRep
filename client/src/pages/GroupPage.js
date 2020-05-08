import React from 'react';

function GroupPage(props){
    const groupId = props.match.params.groupId;
    return(
        <h1>welcome to group {groupId}</h1>
    )
}

export default GroupPage;