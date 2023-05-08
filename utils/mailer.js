const nodemailer = require("nodemailer");
require("dotenv").config();

const config = {
    service : "gmail",
    host : "smtp.gmail.com",
    port : 587,
    secure : false,
    auth : {
        user : process.env.ADMIN_EMAIL,
        pass : process.env.ADMIN_PASS
    },
};

var emailData = {
    "from" : process.env.ADMIN_EMAIL,
    "to" : process.env.ADMIN_EMAIL,
    "subject" : "welcome to xyz",
    "text" : "thank you "
}

var otpData = {
    "from" : process.env.ADMIN_EMAIL,
    "to" : process.env.ADMIN_EMAIL,
    "subject" : "otp for forgot password",
    "text" : "this is your otp  : "
}

const sendEmail = (toEmail, toName) => {
    const transporter = nodemailer.createTransport(config);
    emailData["to"] = toEmail
    emailData['text'] = emailData['text'] + toName + " for signing up with us"

    transporter.sendMail(emailData, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info.response)
            return info.response;
        }
    });
};

const sendOtpMail = (toEmail, otp) => {
    const transporter = nodemailer.createTransport(config);
    otpData["to"] = toEmail
    otpData['text'] = otpData["text"] + " "  + otp 

    transporter.sendMail(otpData, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info.response)
            return info.response;
        }
    });
};

module.exports = {sendEmail , sendOtpMail};