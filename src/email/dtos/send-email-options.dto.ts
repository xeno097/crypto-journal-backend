import { ISendEmailOptionsDto } from '../interfaces/send-email-options.interface';

export class SendEmailOptionsDto implements ISendEmailOptionsDto {
  emailTo: string;
  emailBody: string;
  subject: string;
}
