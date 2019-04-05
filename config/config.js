module.exports = {
    //email config
    transporter: {
        host: 'smtp.gmail.com',
        port: 25,
        secure: false,
        auth: {
            user: 'asianna0815@gmail.com',
            pass: 'Vip_1143'
        },
        tls: {
            rejectUnauthorized: false
        }
    },
    from: 'asianna0815@gmail.com', // sender address
    to: 'anna.hanh.hoang@gmail.com',
    subject: 'portfolio contact form message',

    //captcha config
    captchaURI: '',
    captchaSecret: '',
}