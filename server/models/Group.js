const {model,Schema} = require('mongoose');

const groupSchema = new Schema({
    name:String,
    username:String,
    createdAt:String,
    users:[
        {
            username:String
        }
    ]
});

module.exports = model('Group',groupSchema);