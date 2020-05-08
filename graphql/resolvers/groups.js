const Group = require('../../models/Group');
const User = require('../../models/User');
const checkAuth = require('../../utils/check-auth');
const { UserInputError } = require('apollo-server');

module.exports = {
    Query: {
        getGroup : async (_,{groupId})=>{
            try {
                const group  = await Group.findById(groupId);
                if (group) {
                    return group;
                } else {
                    throw new Error('group doesnt exist');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        createGroup: async (_, { groupName }, context) => {
            const { username, id } = checkAuth(context);



            const newGroup = new Group({
                name: groupName,
                username: username,
                createdAt: new Date().toISOString(),
                users: [{
                    username: username
                }]
            });
            const group = await newGroup.save();

            const newId = group.id;

            const user = await User.findById(id);

            user.groups.unshift({
                groupId: newId,
                groupName: groupName
            });

            await user.save();

            /* context.pubsub.publish('NEW_NOTE',{
                 newNote: note
             });*/

            return group;

        },
        deleteGroup: async (_, { groupId }) => {

            const group = await Group.findById(groupId);
            if (group) {
                try {

                    // deleting membership from all users
                    group.users.forEach(async (user) => {
                        const nextUser = await User.findOne({username:user.username});
                        
                        const requestIndex = nextUser.groups.findIndex(grp => grp.id === group.id);

                        nextUser.groups.splice(requestIndex, 1);
                        await nextUser.save();


                    });

                    //add query for deleting posts
                    await group.delete();

                    return 'group was deleted';


                } catch (err) {
                    throw new Error(err);
                }
            } else {
                throw new UserInputError('group doesnt exist');
            }


        }
    }

};