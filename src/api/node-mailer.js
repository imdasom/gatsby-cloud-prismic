import nodemailer from 'nodemailer';

export default function handler(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const jobName = req.body.jobName;
  const file = req.files[0];
  console.log(file);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'imdasom222@gmail.com',
      pass: 'ektha!234',
    },
  });
  const mailOptions = {
    from: 'imdasom222@gmail.com',
    to: email,
    subject: '[와이어드 컴퍼니] 지원서',
    html: `<h1>${jobName}</h1><div>이름 | ${name}</div><div>이메일 | ${email}</div><div>이력서 | ${file.originalname}</div>`,
    attachments: [
      {
        filename: file.originalname,
        content: file.buffer,
      },
    ],
  };
  const start = new Date().getTime();
  console.log(
    `[mailer] sending... ${file.originalname} / file size: ${file.size} / encoding: ${file.encoding}`
  );
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('[mailer] fail', error);
      transporter.close();
      return;
    }
    const end = new Date().getTime();
    console.log(`[mailer] success ${info.response}`);
    console.log(`[mailer] mail sended in ${end - start}`);
    console.log(
      `[mailer] attachments ${mailOptions.attachments
        .map((_attachment) => _attachment.filename)
        .join('\n')}`
    );
    transporter.close();
  });
  return res.json('ok');
}
