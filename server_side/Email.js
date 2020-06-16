const nodemailer = require("nodemailer");

const sendEmail = async (req, res, dir) => {
  date = req.body.date.split('T')[0].split('-')
  let finalDate = `${date[2]}/${date[1]}/${date[0]}`;

  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "117.254.254.5",
      port: 25,
      secure: false,
      tls: { secureProtocol: "TLSv1_method", rejectUnauthorized: false }

    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"NAME OF SENDER" <SENDER@EMAIL.co.il>', // sender address
      to: `RECIVER@EMAIL.co.il`, // list of receivers
      subject: "הצהרת בריאות", // Subject line,
      html: `<body dir="rtl"><b>${req.body.name}</b> מילא טופס הצהרת בריאות ונמצא לא כשיר </body>`,
      attachments: [{
        filename: `${req.body.name} - ${finalDate.replace(/\//g, '-')}.pdf`,
        path: dir,
        contentType: 'application/pdf'
      }]
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    return res.status(200).json({ result: true });
    
  }
  catch (err) {
    console.log(err);
    return res.status(500).send({ result: false });
  }

}
exports.sendEmail = sendEmail;
