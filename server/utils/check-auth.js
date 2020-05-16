const jwt = require('jsonwebtoken');
const {AuthentactionError} = require('apollo-server');
const {SECRET_KEY} = require('../config');

module.exports = (context) =>{
    const authHeader = context.req.headers.authorization;
    if(authHeader){
        const accesToken = authHeader.split('Bearer ')[1];
        if(accesToken){
            try{
                const user = jwt.verify(accesToken,SECRET_KEY);
                console.log(accesToken);
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