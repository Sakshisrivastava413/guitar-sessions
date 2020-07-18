const express = require("express");
const nodemailer = require("nodemailer");
const config = require("./config");
const port = require("./constant");

const app = express();

const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.GMAIL_USER,
    pass: config.GMAIL_PASS,
  },
});

app.use(express.static(__dirname + "/public"));

app.get("/send", function (req, res) {
  const { name, message, subject, email } = req.query;
  const mailOptions = {
    to: config.GMAIL_USER,
    subject: "True Guitar Learning: " + subject,
    from: 'Contact Form Request' + "<" + config.GMAIL_USER + ">",
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
