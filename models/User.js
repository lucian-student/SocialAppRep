const {model,Schema} = require('mongoose');

const userSchema = new Schema({
    username:String,
    password:String,
    email:String,
    createdAt:String,
    // new additions
    groups:[
        {
            groupId:String,
            groupName:String
        }
    ],
    groupRequests:[
        {
            username:String,
            groupId:String,
            groupName:String
        }
    ]

});

module.exports = model('User',userSchema);