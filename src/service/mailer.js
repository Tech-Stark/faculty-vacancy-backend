
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
       ciphers:'SSLv3'
    },
    auth: {
        user: 'techstark123@outlook.com',
        pass: 'password@techStark'
    }
});

function sendMail(params){
    transporter.sendMail({
        from: "techstark123@outlook.com",
        to: params.to,
        // cc: newMail.cc,
        // bcc: newMail.bcc,
        subject: params.subject,
        text: params.text,
        // auth: {
        //     user: user.email,
        //     accessToken: user.accessToken,
        // },
    });
}
module.exports = {
    sendMail
}