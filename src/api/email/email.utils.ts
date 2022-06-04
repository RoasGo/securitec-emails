import { IEmailSendReq } from './email.interface';

export const parseEmailsToSend = (body: IEmailSendReq[]): IEmailSendReq[] =>
  Object.values(
    body.reduce((acc, cur): IEmailSendReq => {
      acc[cur.id] = acc[cur.id]
        ? { id: cur.id, email: cur.email, time: cur.time, message: `${acc[cur.id].message} ${cur.message}` }
        : cur;

      return acc;
    }, {} as IEmailSendReq)
  );

const toMiliSeconds = (time: number) => time * 60 * 1000;

export const delay = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({}), toMiliSeconds(time));
  });
};
