import { Request, Response } from 'express';
import Logger from '../../lib/logger';
import { Ok } from '../../helpers/http.helper';
import { sendEmail } from '../../services/node-mailer';
import { IEmailSendReq } from './email.interface';
import { delay, parseEmailsToSend } from './email.utils';

const logger = Logger.getLogger('email-controller');

export default class EmailsController {
  public async send(req: Request, res: Response): Promise<any> {
    const body = (Array.isArray(req.body) ? req.body : [req.body]) as IEmailSendReq[];

    const parsedEmails = parseEmailsToSend(body);

    for (const email of parsedEmails) {
      delay(email.time);
      const [err] = await sendEmail(email);
      if (err) {
        logger.log('error', `An error ocurred:: ${JSON.stringify(err, null, 2)}`);
      }
    }

    return Ok(res, { message: 'Emails will be send!' });
  }
}
