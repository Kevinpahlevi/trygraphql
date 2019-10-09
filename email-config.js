var config = require('config')

var mail = {
  host: 'smtp.googlemail.com', // Gmail Host
  port: 465, // Port
  secure: true, // this is true as port is 465
  auth: {
    user: config.get('USER_MAIL'), // generated ethereal user
    pass: config.get('PASS_MAIL') // generated ethereal password
  }
}

var text = {
  from: 'roy.parawali@gmail.com', // sender address
  to: 'kevinplevi@gmail.com', // list of receivers
  subject: 'Subject of your email', // Subject line
  text: 'FROM API!' // plain text body
}

var template = {
  from: 'roy.parawali@gmail.com', // sender address
  to: ['kevinplevi@gmail.com', 'frznkvn@gmail.com'], // list of receivers
  subject: 'Subject of your email', // Subject line
  text: 'FROM API! with template', // plain text body
  // eslint-disable-next-line no-path-concat
  templateDir: __dirname + '/views-ejs/email2.html',
  templateValue: { name: 'KEVIN' }
}

var templateError = {
  from: 'roy.parawali@gmail.com', // sender address
  to: 'kevin@mail.com', // list of receivers
  subject: 'Subject of your email', // Subject line
  text: 'FROM API!', // plain text body
  // eslint-disable-next-line no-path-concat
  templateDir: __dirname + '/views-ejs/email2.html',
  templateValue: { name: 'KEVIN' }
}

module.exports = { mail, text, template, templateError }
