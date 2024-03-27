import { BASE_URL } from "~/constants/static";
import { env } from "~/env.mjs";
import MailerClient from "~/server/mailerClient";

const generateEmailFromPrefix = (prefix: string) => {
  return `${prefix} | 医疗预约系统 <${env.STMP_USER}>`;
};

export async function sendVerificationEmail(
  email: string,
  token: string,
) {
  const verificationUrl = `${BASE_URL}/activate/${token}`;
  await MailerClient.sendMail({
    from: generateEmailFromPrefix("邮箱验证"),
    to: email,
    subject: "验证您的电子邮件",
    html: `请单击以下链接以验证您的电子邮件： <a href="${verificationUrl}">${verificationUrl}</a>`,
  });
}

export async function sendPasswordResetEmail(
  email: string,
  phone: string,
  token: string,
) {
  const resetPasswordUrl = `${BASE_URL}/auth/reset-password/${encodeURIComponent(
    token,
  )}?phone=${encodeURIComponent(
    phone,
  )}&email=${encodeURIComponent(email)}`;
  await MailerClient.sendMail({
    from: generateEmailFromPrefix("密码重置"),
    to: email,
    subject: "密码重置请求",
    html: `我们收到了一个请求，以重置您的应用程序密码。 
    请单击以下链接以重置您的密码： <a href="${resetPasswordUrl}">重置密码</a>。 
    如果不是您本人进行的操作，请忽略此电子邮件。`,
  });
}

export async function sendNewPasswordEmail(
  email: string,
  newPassword: string,
) {
  await MailerClient.sendMail({
    from: generateEmailFromPrefix("新密码"),
    to: email,
    subject: "您的新密码",
    html: `您的密码已重置。 
    这是您的新密码： <strong>${newPassword}</strong>。 
    登录后建议您立刻更改此密码。`,
  });
}
