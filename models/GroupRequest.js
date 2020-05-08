const {model,Schema} = require('mongoose');

const groupRequestSchema = new Schema({
    
  
            username:String,
            groupId:String,
            groupName:String
        
    

});

module.exports = model('GroupRequest',groupRequestSchema);