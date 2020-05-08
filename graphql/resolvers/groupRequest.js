const User = require('../../models/User');
const checkAuth = require('../../utils/check-auth');
const { UserInputError } = require('apollo-server');
//const GroupRequest = require('../../models/GroupRequest');

module.exports = {
    Mutation: {
        createRequest: async (_, { username, groupId, groupName }, context) => {
            const user = checkAuth(context);

            const targetUser = await User.findOne({ username });

            if (targetUser) {


                 if(targetUser.groupRequests.some(req => req.groupId ===groupId)){
                    throw new UserInputError('duplicate');
                } else{
                     targetUser.groupRequests.unshift({
                     username:user.username,
                     groupId,
                     groupName
                 });
                 await targetUser.save();
                 return targetUser;
                }
                    
                

            } else {
                throw new UserInputError('user doesnt exist');
            }

        },
        deleteRequest: async(_,{requestId},context)=>{
            const {id} = checkAuth(context);
            const user = await User.findById(id);
            try{
            const requestIndex = user.groupRequests.findIndex(req =>req.id===requestId);

            user.groupRequests.splice(requestIndex,1);
            await user.save();
            return user;
            }catch(err){
                throw new Error(err);
            }
            
        }
    }

};