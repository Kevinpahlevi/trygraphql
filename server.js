/* eslint-disable no-unused-vars */
var express = require('express')
// var graphqlHTTP = require('express-graphql');
// var { buildSchema } = require('graphql');
var mongodb = require('mongodb')
var router = express.Router()
var Mail = require('./Email')
var Notification = require('./Notification')
var config = require('config')
var serviceAccount = require('./keyService.json')
var notifConfig = require('./notif-config')
var emailConfig = require('./email-config')

const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

// DATABASE
var mongoose = require('mongoose')
var uri = 'mongodb+srv://kevin:12qwaszx@try-backend-hoxy3.azure.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(uri, {
  dbName: 'try-backend',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}) // connect to our database
console.log(mongoose.connection.readyState === 2 ? 'DATABASE CONNECT' : 'ERROR')

// FIREBASE

// MAIL
// var Mail = require('./Email')
// Mail()

// If Message had any complex fields, we'd put them on this object.
class Message {
  constructor (id, { content, author }) {
    this.id = id
    this.content = content
    this.author = author
  }
}

var server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
})
var app = express()
server.applyMiddleware({ app, path: '/graphql' })

// INIT
router.get('/', function enter (req, res) {
  res.json('hooray! welcome to our api!')
})

// SEND-MAIL
router.get('/mail', async function enter (req, res) {
  Mail.Config(emailConfig.mail)
  const data = await Mail.Send(emailConfig.text)
  res.json(data)
})

// SEND-MAIL WITH TEMPLATE
router.get('/mail-ejs', async function enter (req, res) {
  Mail.Config(emailConfig.mail)
  const data = await Mail.SendWithTemplate(emailConfig.template)
  res.json(data)
})

// CONFIG-NOTIF
// Notification.Config(serviceAccount, notifConfig.database)

// SEND-NOTIF
router.get('/notif', async function enter (req, res) {
  const response = await Notification.Send(notifConfig.target, notifConfig.payload, notifConfig.options)
  console.log(response)
  res.json(response)
})

// SEND-NOTIF-BATCH
router.get('/notifBatch', async function enter (req, res) {
  console.log(notifConfig.targetBatch)
  const response = await Notification.Send(notifConfig.targetBatch, notifConfig.payload, notifConfig.options)
  console.log(response)
  res.json(response)
})

// SUBCRIBE
router.get('/subs', async function enter (req, res) {
  var topic = 'test-topic'
  const response = await Notification.subscribed(notifConfig.targetBatch, topic)
  res.json({ catergory: `subsribe to topic ${topic}`, response })
})

// UNSUBCRIBE
router.get('/unsubs', async function enter (req, res) {
  const response = await Notification.unsubscribed(notifConfig.target, 'test-topic')
  res.json({ catergory: 'unsubs', response })
})

// SEND-TO-TOPIC
router.get('/topic', async function enter (req, res) {
  const response = await Notification.sendWithTopic(notifConfig.message)
  res.json(response)
})

app.use('/', router)
app.listen(process.env.PORT || 4000, () => {
  // console.log(config.get('USER_MAIL'))
  // console.log('Running a GraphQL API server at localhost:4000/graphql');
})

module.exports = { app, mongoose }
