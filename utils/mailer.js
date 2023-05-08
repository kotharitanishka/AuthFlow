const nodemailer = require("nodemailer");
require("dotenv").config();
const ejs = require('ejs');
var path = require('path');

const config = {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASS
    },
};

var mailOptions = {
    "from": process.env.ADMIN_EMAIL,
    "to": process.env.ADMIN_EMAIL,
    "subject": "welcome to xyz",
    "text": "thank you ",
}

var otpdata = {
    "from": process.env.ADMIN_EMAIL,
    "to": process.env.ADMIN_EMAIL,
    "subject": "otp for forgot password",
    "text": "this is your otp  : "
}

const sendEmail = (toEmail, toName) => {
    ejs.renderFile(path.join(__dirname, '..', 'templates', 'welcome.ejs'), { toEmail, toName }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const transporter = nodemailer.createTransport(config);

            mailOptions["to"] = toEmail
            mailOptions['html'] = data

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(info.response)
                    return info.response;
                }
            });
        }
    });

};

const sendOtpMail = (toEmail, otp) => {
    const transporter = nodemailer.createTransport(config);
    otpdata["to"] = toEmail
    otpdata['text'] = otpdata["text"] + " " + otp

    transporter.sendMail(otpdata, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info.response)
            return info.response;
        }
    });
};

module.exports = { sendEmail, sendOtpMail };