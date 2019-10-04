var nodemailer = require('nodemailer')
var hbs = require('nodemailer-express-handlebars')
var path = require('path');
var ejs = require('ejs')
var config = require('config')

// var fs = require('fs');
// var template = fs.readFileSync('./emailTemplate/index.html',{encoding:'utf-8'});

async function mail(params) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    try{
    let testAccount = await nodemailer.createTestAccount();
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.googlemail.com', // Gmail Host
        port: 465, // Port
        secure: true, // this is true as port is 465
        auth: {
            user: config.get('USER_MAIL'), // generated ethereal user
            pass: config.get('PASS_MAIL') // generated ethereal password
        }
    });

    // handlebars(transporter)
    ejsSend(transporter)

    // console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    } catch (error) {
        console.log(error)
    }
}

function handlebars(transporter) {
    console.log('send email HANDLEBARS!')
    //USING HANDLEBARS
    const options = {
        viewEngine: {
          extName: ".hbs",
          partialsDir: path.resolve(__dirname, "views"),
          defaultLayout: false        // <-----   added this
        },
        viewPath: path.resolve(__dirname, "views"),
        extName: ".hbs"
      };
    transporter.use('compile', hbs(options))
    const mailOptions = {
        from: 'roy.parawali@gmail.com', // sender address
        to: 'kevinplevi@gmail.com', // list of receivers
        subject: 'Subject of your email', // Subject line
        text: 'FROM API!',// plain text body
        template: 'email2'
      };

    transporter.sendMail(mailOptions, function (err, info) {
        console.log('send email process!')
        if(err)
          console.log(err)
        else
          console.log(info);
     });
}

function ejsSend(transporter) {
    console.log('send email EJS!')
    ejs.renderFile(__dirname + "/views-ejs/email1.ejs", { name: 'KEVIN' }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            var mainOptions = {
                from: 'roy.parawali@gmail.com', // sender address
                to: 'kevinplevi@gmail.com', // list of receivers
                subject: 'Subject of your email', // Subject line
                text: 'FROM API!',// plain text body
                html: data
            };
            // console.log("html data ======================>", mainOptions.html);
            transporter.sendMail(mainOptions, function (err, info) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Message sent: ' + info.response);
                }
            });
        }
        
        });
}

module.exports = mail