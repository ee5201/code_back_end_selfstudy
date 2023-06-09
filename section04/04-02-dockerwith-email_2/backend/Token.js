import nodemailer from "nodemailer";
import "dotenv/config";

export async function SendEmail(myTemplete, email) {
  const EMAIL_PASS = process.env.EMAIL_PASS;
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_SENDER = process.env.EMAIL_SENDER;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const res = await transporter.sendMail({
    from: EMAIL_SENDER,
    to: email,
    subject: `[DIATORY] 가입을 축하합니다. !!!`,
    html: myTemplete,
  });
  console.log(res);
  // console.log(myuser.email + "이메일로 가입환영템플릿" + myTemplete);
}
