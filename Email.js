var nodemailer = require('nodemailer')
var hbs = require('nodemailer-express-handlebars')
var path = require('path')
var ejs = require('ejs')
var transporter

// var fs = require('fs');
// var template = fs.readFileSync('./emailTemplate/index.html',{encoding:'utf-8'});

// CONFIG-NODEMAILER
function Config (params) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  try {
    // create reusable transporter object using the default SMTP transport
    transporter = nodemailer.createTransport(params)
  } catch (error) {
    console.log(error)
  }
}

function handlebars (transporter) {
  console.log('send email HANDLEBARS!')
  // USING HANDLEBARS
  const options = {
    viewEngine: {
      extName: '.hbs',
      partialsDir: path.resolve(__dirname, 'views'),
      defaultLayout: false // <-----   added this
    },
    viewPath: path.resolve(__dirname, 'views'),
    extName: '.hbs'
  }
  transporter.use('compile', hbs(options))
  const mailOptions = {
    from: 'roy.parawali@gmail.com', // sender address
    to: 'kevinplevi@gmail.com', // list of receivers
    subject: 'Subject of your email', // Subject line
    text: 'FROM API!', // plain text body
    template: 'email2'
  }

  transporter.sendMail(mailOptions, function (err, info) {
    console.log('send email process!')
    if (err) { console.log(err) } else { console.log(info) }
  })
}

// SEND-MAIL-WITH-TEMPLATE
function SendWithTemplate (params) {
  const { data } = ejs.renderFile(params.templateDir, params.templateValue)
  var mainOptions = {
    from: params.from, // sender address
    to: params.to, // list of receivers
    subject: params.subject, // Subject line
    text: params.text, // plain text body
    html: data
  }

  const response = transporter.sendMail(mainOptions)
  return response
}

// SEND-MAIL-WITH-TEMPLATE
async function Send (mainOptions) {
  // console.log("html data ======================>", mainOptions.html);
  const data = await transporter.sendMail(mainOptions)
  return data
}

module.exports = { Config, Send, SendWithTemplate }
