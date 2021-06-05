import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import { EmailError } from 'src/errors/email/email.error';
import { EnvKey } from 'src/shared/enums/env-keys.enum';
import { SendEmailOptionsDto } from './dtos/send-email-options.dto';

@Injectable()
export class EmailService {
  private readonly _emailTransporter: Transporter;

  constructor(private readonly configService: ConfigService) {
    const emailService = this.configService.get(EnvKey.EMAIL_SERVICE);
    const emailServiceUser = this.configService.get(EnvKey.EMAIL_USER);
    const emailServicePass = this.configService.get(EnvKey.EMAIL_API_KEY);

    this._emailTransporter = nodemailer.createTransport({
      service: emailService,
      auth: {
        user: emailServiceUser,
        pass: emailServicePass,
      },
    });
  }

  public async sendEmail(sendEmailOptionsDto: SendEmailOptionsDto) {
    try {
      const { emailTo, subject, emailBody } = sendEmailOptionsDto;

      const emailServiceFrom = this.configService.get(EnvKey.EMAIL_FROM);

      await this._emailTransporter.sendMail({
        from: emailServiceFrom,
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
