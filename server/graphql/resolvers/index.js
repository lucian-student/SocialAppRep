const noteResolvers = require('./notes');
const userResolvers = require('./users');
const groupResolvers = require('./groups');
const groupRequestResolvers = require('./groupRequest');
const userGroupResolvers = require('./userGroup');

module.exports={
    Query:{
        ...noteResolvers.Query,
        ...groupResolvers.Query,
        ...userResolvers.Query

    },
    Mutation:{
        ...userResolvers.Mutation,
        ...noteResolvers.Mutation,
        ...groupRequestResolvers.Mutation,
        ...userGroupResolvers.Mutation,
        ...groupResolvers.Mutation

    },
    Subscription:{
        ...noteResolvers.Subscription
    }
}