var express = require('express');
// var graphqlHTTP = require('express-graphql');
// var { buildSchema } = require('graphql');
var mongodb = require('mongodb');

const { ApolloServer} = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers')


// DATABASE
var mongoose   = require('mongoose');
var uri = 'mongodb+srv://kevin:12qwaszx@try-backend-hoxy3.azure.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(uri, { dbName: 'try-backend', 
useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false }); // connect to our database
console.log(mongoose.connection.readyState === 2 ? 'DATABASE CONNECT' : 'ERROR');



// If Message had any complex fields, we'd put them on this object.
class Message {
  constructor(id, {content, author}) {
    this.id = id;
    this.content = content;
    this.author = author;
  }
}



var server = new ApolloServer({typeDefs,resolvers})
var app = express();
server.applyMiddleware({ app, path:'/graphql' });

app.listen(process.env.PORT || 4000, () => {
  // console.log('Running a GraphQL API server at localhost:4000/graphql');
})