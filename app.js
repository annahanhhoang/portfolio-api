const express = require('express')
const cors = require('cors')
const nodemon = require('nodemon')
const nodeMailer = require('nodemailer')
const asyncHandler = require('express-async-handler')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const config = require('./config/emailConfig.js')
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

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send({ error: 'Something failed! ' + error})
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.json('Message sent successfully');
    });
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
