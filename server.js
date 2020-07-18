var express = require("express");
var nodemailer = require("nodemailer");
var config = require("./config.js");

var app = express();

var smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.GMAIL_USER,
    pass: config.GMAIL_PASS,
  },
});

app.use(express.static(__dirname + "/public"));

app.get("/send", function (req, res) {
  const { name, message, subject, email } = req.query;
  var mailOptions = {
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

app.listen(8080, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Listening on port on 8080");
  }
});
