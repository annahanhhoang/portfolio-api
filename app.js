const express = require('express')
const cors = require('cors')
const nodemon = require('nodemon')
const nodeMailer = require('nodemailer')
const asyncHandler = require('express-async-handler')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const config = require('./config/config.js')
app.get('/', async (req, res) => {
    res.json("server up")
})

app.post('/send-email', asyncHandler(async (req, res) => {
    const transporter = nodeMailer.createTransport(config.transporter)

    const mailOptions = {
        from: '"' + req.body.name + '" <' + req.body.email + '>',
        to: config.to,
        subject: config.subject,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            res.status(500).send({ error: 'Something failed! ' + error})
        }
        res.json('Message sent successfully');
    });
}))

app.get('/api/verify-captcha', asyncHandler(async (req, res) => {
    request({
        uri: config.captchaURI,
        qs: {
            'secret': config.captchaSecret,
            'response': req.query.response
        }
    }).pipe(res)
}))


app.get('/quit', function (req, res) {
    res.send('closing..');
    nodemon.emit('quit')
})

app.get('/restart', function (req, res) {
    res.send('restarting...');
    nodemon.emit('restart')
})

app.listen(process.env.PORT || 3000)
