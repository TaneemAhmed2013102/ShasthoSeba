const nodemailer = require('nodemailer');

const sendEmail = async (toAddress, link) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'shasthoseba.app@gmail.com',
            pass: 'nenbzcjdyolymdfs'//'MahbubRifat'
        }
    });

    const mailOptions = {
        from: "ShasthoSeba",
        to: toAddress,
        subject: "Verify Your Email at ShasthoSeba",
        text: `http://localhost:3000/verifyemail/${link}`,
    }

    let info = await transporter.sendMail(mailOptions);
    console.log(info);
}

exports.sendEmail = sendEmail;