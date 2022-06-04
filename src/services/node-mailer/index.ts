import Config from '../../utils/config';
import { createTransport } from 'nodemailer';
import { IEmailSendReq } from '../../api/email/email.interface';
import { to } from '../../helpers/fetch.helper';

const config = Config.get();

export const sendEmail = (params: IEmailSendReq) => {
  const { email, message } = params;
  const { host, name, pass, port, replyToMail, replyToName, user, cc } = config.service.mail;

  const transporter = createTransport({
    host,
    port,
    auth: {
      pass,
      user,
    },
  });

  return to(
    transporter.sendMail({
      attachments: [],
      bcc: [],
      cc,
      from: `"${name}" <${user}>`,
      replyTo: `"${replyToName}" <${replyToMail}>`,
      subject: 'Securitec Test',
      html: `<p>${message}<p>`,
      to: email,
    })
  );
};
