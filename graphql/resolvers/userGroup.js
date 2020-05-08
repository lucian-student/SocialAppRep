const User = require('../../models/User');
const Group = require('../../models/Group')

const { UserInputError } = require('apollo-server');
const checkAuth = require('../../utils/check-auth');

module.exports = {
    Mutation: {
        joinGroup: async (_, { groupName, groupId }, context) => {
            const { id } = checkAuth(context);

            const group = await Group.findById(groupId);

            if (group) {


                const user = await User.findById(id);




                // joining  group part1


                try {
                    if (user.groups.some(grp => grp.groupId === groupId)) {
                        throw new UserInputError('duplicate');
                    } else {
                        user.groups.unshift({
                            groupId: groupId,
                            groupName: groupName
                        });
                        await user.save();

                        // joining group part 1
                        group.users.unshift({
                            username: user.username
                        });

                        await group.save();


                        return user;
                    }

                } catch (err) {
                    throw new Error(err);
                }
            } else {
                throw new UserInputError('group doesnt exist');
            }

        },
        //userGroupId je id groupy u usera v poli a groupId je id groupy
        //groupId je nepouzitelny protoze nemam groupy funkcní, uz funguje
        leaveGroup: async (_, { userGroupId, groupId }, context) => {
            const { id } = checkAuth(context);

            const group = await Group.findById(groupId);

            if (group) {

                const user = await User.findById(id);

                //leave part 1
                const groupIndex = group.users.findIndex(usr => usr.id === id);

                group.users.splice(groupIndex, 1);

                if(group.users.length>0){
                    await group.save();
                }else{
                    //add query for deleting all posts
                    await group.delete();
                }
                //leave part 2
                try {

                    const requestIndex = user.groups.findIndex(grp => grp.id === userGroupId);

                    user.groups.splice(requestIndex, 1);
                    await user.save();
                    return user;

                } catch (err) {
                    throw new Error(err);
                }
            } else {
                throw new UserInputError('group deasnt exist');
            }

        }

    }

};