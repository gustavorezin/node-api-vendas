import { AppError } from '@shared/errors/AppError';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { UsersTokensRepository } from '../typeorm/repositories/UsersTokensRepository';
import { EtherealMail } from '@config/mail/EtherealMail';
import path from 'path';
import { mailConfig } from '@config/mail/mail';
import { SESMail } from '@config/mail/SESMail';

interface IRequest {
  email: string;
}

export class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest) {
    const user = await UsersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const { token } = await UsersTokensRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgotPassword.hbs'
    );

    const mail = {
      to: { name: user.name, email: user.email },
      subject: '[API VENDAS] Recuperação de Senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`
        }
      }
    };

    if (mailConfig.driver === 'ses') {
      await SESMail.sendMail(mail);
      return;
    }

    await EtherealMail.sendMail(mail);
  }
}
