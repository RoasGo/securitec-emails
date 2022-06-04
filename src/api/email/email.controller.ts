import { Request, Response } from 'express';
import { Ok } from '../../helpers/http.helper';
import { sendEmail } from '../../services/node-mailer';
import { IEmailSendReq } from './email.interface';
import { parseEmailsToSend } from './email.utils';

export default class EmailsController {
  public async send(req: Request, res: Response): Promise<any> {
    const body = (Array.isArray(req.body) ? req.body : [req.body]) as IEmailSendReq[];

    const parsedEmails = parseEmailsToSend(body);

    for (const email of parsedEmails) {
      console.log(email);
      // setTimeout(() => sendEmail(email), email.time);
    }

    return Ok(res, { message: 'Emails will be send!' });
  }
}
