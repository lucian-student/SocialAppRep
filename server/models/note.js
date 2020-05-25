const {model,Schema} = require('mongoose');


const noteSchema = new Schema({
    username:String,
    content:String,
    createdAt:String,
    // new additions
    grouped:Boolean,
    groupId:String,
    // newest addition
    noteName:String
   
});

module.exports = model('Note',noteSchema);