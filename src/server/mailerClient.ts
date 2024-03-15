import nodemailer from "nodemailer";
import { env } from "~/env.mjs";

const mailerConfig = {
  service: env.STMP_SERVICE,
  host: Number(env.STMP_HOST),
  port: env.STMP_PORT, // SMTP port
  auth: {
    user: env.STMP_USER, // your email
    pass: env.STMP_PASS, // your smtp code
  },
  secureConnection: true, // use SSL
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
};

const mailerClient = (mailerConfig: Record<string, any>) =>
  nodemailer.createTransport(mailerConfig);

declare global {
  var _MailerClient: ReturnType<typeof mailerClient>;
}

let MailerClient: ReturnType<typeof mailerClient>;

if (process.env.NODE_ENV === "production") {
  MailerClient = mailerClient(mailerConfig);
} else {
  if (!global._MailerClient) {
    global._MailerClient = mailerClient(mailerConfig);
  }
  MailerClient = global._MailerClient;
}

export default MailerClient;
