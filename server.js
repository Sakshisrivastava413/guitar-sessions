const express = require("express");
const nodemailer = require("nodemailer");
const port = require("./constant");
require('dotenv').config();

const app = express();

const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

app.use(express.static(__dirname + "/public"));

app.get("/send", function (req, res) {
  const { name, message, subject, email } = req.query;
  const mailOptions = {
    to: process.env.GMAIL_USER,
    subject: "True Guitar Learning: " + subject,
    from: 'Contact Form Request' + "<" + process.env.GMAIL_USER + ">",
    html:
      `<strong>Name:</strong> ${name}
      <br />
      <strong>Email:</strong> ${email}
      <br />
      <strong>Subject:</strong> ${subject}
      <br />
      <strong>Message:</strong> ${message}
      `
  };

  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function (err, response) {
    if (err) {
      console.log(err);
      res.end("error");
    } else {
      console.log("Message sent: " + response.message);
      res.end("sent");
    }
  });
});

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Listening on port on 8080");
  }
});
