var express = require('express');
// var graphqlHTTP = require('express-graphql');
// var { buildSchema } = require('graphql');
var mongodb = require('mongodb');
var router = express.Router();
var Mail = require('./Email')
var Notification = require('./Notification')
var config = require('config')

const { ApolloServer} = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers')


// DATABASE
var mongoose   = require('mongoose');
var uri = 'mongodb+srv://kevin:12qwaszx@try-backend-hoxy3.azure.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(uri, { dbName: 'try-backend', 
useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false }); // connect to our database
console.log(mongoose.connection.readyState === 2 ? 'DATABASE CONNECT' : 'ERROR');

//FIREBASE


//MAIL
// var Mail = require('./Email')
// Mail()

// If Message had any complex fields, we'd put them on this object.
class Message {
  constructor(id, {content, author}) {
    this.id = id;
    this.content = content;
    this.author = author;
  }
}

var server = new ApolloServer({typeDefs,resolvers,introspection: true,
  playground: true,})
var app = express();
server.applyMiddleware({ app, path:'/graphql' });

router.get('/', function enter(req, res){
  res.json('hooray! welcome to our api!');
});
router.get('/mail', function enter(req, res){
  Mail()
  res.json('hooray! sending email');
});
router.get('/notif', function enter(req, res){
  Notification()  
  res.json('hooray! sending notif');
});


app.use('/', router)
app.listen(process.env.PORT || 4000, () => {
  // console.log(config.get('USER_MAIL'))
  // console.log('Running a GraphQL API server at localhost:4000/graphql');
})

module.exports = {app,mongoose}