import nodemailer from 'nodemailer';
import aws from 'aws-sdk';
import {
  HandlebarsMailTemplate,
  IParseMailTemplate
} from './HandlebarsMailTemplate';
import { mailConfig } from './mail';

interface IMailContact {
  name: string;
  email: string;
}

interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export class SESMail {
  static async sendMail({ to, from, subject, templateData }: ISendMail) {
    const mailTemplate = new HandlebarsMailTemplate();
    const transporter = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01'
      })
    });

    const { email, name } = mailConfig.defaults.from;

    await transporter.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await mailTemplate.parse(templateData)
    });
  }
}
