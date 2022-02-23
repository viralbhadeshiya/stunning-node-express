import nodemailer from 'nodemailer';

export async function sendMail(userEmail, logger) {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Viral Bhadeshiya 👻" <viralbhadeshiya@test.com>', // sender address
        to: userEmail, // list of receivers
        subject: 'Welcome to Kevit Technologies', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>', // html body
    });

    logger.trace(`Create User => Send Mail => Mail sent succesFully => ${info.messageId}`);
    logger.trace(`You can see mail here => ${nodemailer.getTestMessageUrl(info)}`);
}
