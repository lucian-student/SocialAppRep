import React, { useContext } from 'react';
import { AuthContext } from '../context/auth';
import { FETCH_UPDATABLE_USER_DATA } from '../util/graphql';
import { useQuery } from '@apollo/react-hooks';
import { Card } from 'semantic-ui-react';
import GroupCard from '../components/GroupCard';
import InveitCard from '../components/InveitCard';
import GroupForm from '../components/GroupForm';


function Social() {

    const { user } = useContext(AuthContext);

    let userId = '';


    if (user) {
        userId = user.id
    }

    const { loading, error, data } = useQuery(FETCH_UPDATABLE_USER_DATA, {

        variables: {
            userId: userId
        },
        onError(err) {
            console.log(err);
        }
    });

    if (!user) {
        return (
            <div>u logged off</div>
        )
    } else {


        if (loading) return <p>Loading...</p>
        if (error) return <p>Error.</p>
        let socialPage
        if (!data.getUser) {
            socialPage = <p>Loading social page...</p>
        } else {
            const {
                groups,
                groupRequests
            } = data.getUser




            socialPage = (
                <div>


                    <div>
                        <h1>welcome to socializing {user.username}</h1>
                        <GroupForm />
                        <h2 >These are groups u belong to:</h2>
                        {groups.map(group => (
                            <Card.Group key={group.id}>
                                <GroupCard group={group} />
                            </Card.Group>
                        ))
                        }
                    </div>

                    <div>
                        <h2 >These are group yours group inveits:</h2>
                        {groupRequests.map(req => (
                            <Card.Group key={req.id}>
                                <InveitCard req={req} />
                            </Card.Group>
                        ))
                        }
                    </div>
                </div>
            );

            return socialPage;
        }

    }




}




export default Social;