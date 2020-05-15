const jwt = require('jsonwebtoken');
const {AuthentactionError} = require('apollo-server');
const {SECRET_KEY} = require('../config');

module.exports = (context) =>{
    const authHeader = context.req.headers.authorization;
    if(authHeader){
        const token = authHeader.split('Bearer ')[1];
        if(token){
            try{
                const user = jwt.verify(token,SECRET_KEY);
                return user;
            }catch(err){
                throw new AuthentactionError(err);
            }
        }else{
            throw new Error('token must equal \'Bearer [token]');
        }
    }else{
        throw new Error('u must be logged in');
    }
};