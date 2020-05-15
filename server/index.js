const {ApolloServer,PubSub} = require('apollo-server');
const mongoose = require('mongoose');

// may cause error
const resolvers = require('./graphql/resolvers/index');
const {MONGODB} = require('./config.js');
const typeDefs = require('./graphql/TypeDefs')

const pubsub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req}) =>({req, pubsub}) 
});



mongoose
.connect(MONGODB,{useNewUrlParser:true,useUnifiedTopology: true})
.then(()=>{
    console.log('DB connection established');
     return server.listen({port:5000});
}).then((res)=>{
    console.log(`Server running at ${res.url}`);
});
