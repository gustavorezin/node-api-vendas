import { EtherealMail } from '@config/mail/EtherealMail';
import { mailConfig } from '@config/mail/mail';
import { SESMail } from '@config/mail/SESMail';
import { AppError } from '@shared/errors/AppError';
import path from 'path';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUsersTokensRepository } from '../domain/repositories/IUsersTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
export class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository
  ) {}

  public async execute({ email }: IRequest) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const { token } = await this.usersTokensRepository.generate(user.id);

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
