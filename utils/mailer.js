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

var data = {
    "from" : process.env.ADMIN_EMAIL,
    "to" : process.env.ADMIN_EMAIL,
    "subject" : "welcome to xyz",
    "text" : "thank you "
}

const sendEmail = (toEmail, toName) => {
    const transporter = nodemailer.createTransport(config);
    data["to"] = toEmail
    data['text'] = data['text'] + toName + " for signing up with us"

    transporter.sendMail(data, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info.response)
            return info.response;
        }
    });
};

module.exports = sendEmail;