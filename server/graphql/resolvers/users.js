const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { SECRET_KEY, SECRET_KEY2 } = require('../../config');
const { validateRegisterInput, validateLoginInput } = require('../../utils/validators');

function generatetoken(user) {
    return jwt.sign(

        {
            id: user.id,
            email: user.email,
            username: user.username
        }
        , SECRET_KEY,{expiresIn:'1d'});
}
/*function refreshedToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username
        }
        , SECRET_KEY2);
}*/
module.exports = {
    Mutation: {
        async login(_, { username, password }) {

            const { errors, valid } = validateLoginInput(username, password);

            if (!valid) {
                throw new UserInputError('not valid inputs', { errors });
            }

            const user = await User.findOne({ username });


            if (!user) {
                errors.general = 'user not found';
                throw new UserInputError('user not found', { errors });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                errors.general = 'password doesnt match';
                throw new UserInputError('wrogn password', { errors });
            }
            const token = generatetoken(user);

            //pridat refresh token do  returneni

           // const refreshToken = refreshedToken(user);
           
         
            return {
                ...user._doc,
                id: user._id,
                token
               
              
            }
        },
        async register(_, {
            registerInput: { username, email, password, confirmPassword
            } }
        ) {
            // validation
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
            if (!valid) {
                throw new UserInputError('not valid inputs', { errors });
            }

            // valdiate data
            const user = await User.findOne({ username });

            if (user) {
                throw new UserInputError('username not available', {
                    errors: {
                        username: 'username taken'
                    }
                });
            }

            //creating user
            password = await bcrypt.hash(password, 10);

            const newUser = User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            const token = generatetoken(res);

            //const refreshToken = refreshedToken(res);

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    },
    Query: {
        async getUser(_, { userId }) {
            try {
                const user = await User.findById(userId);
                if (user) {
                    
                    return user;
                } else {
                    throw new Error('user doesnt exist');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    }

}