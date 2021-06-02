import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import { EmailError } from 'src/errors/email.error';

@Injectable()
export class EmailService {
  private readonly _emailTransporter: Transporter;

  constructor() {
    this._emailTransporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_API_KEY,
      },
    });
  }

  public async sendEmail(sendEmailOptions: {
    emailTo: string;
    emailBody: string;
    subject: string;
  }) {
    try {
      const { emailTo, subject, emailBody } = sendEmailOptions;

      await this._emailTransporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: emailTo,
        subject: subject,
        html: emailBody,
      });
    } catch (error) {
      console.log(error);
      throw new EmailError();
    }
  }
}
