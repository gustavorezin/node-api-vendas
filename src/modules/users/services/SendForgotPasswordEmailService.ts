import { AppError } from '@shared/errors/AppError';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { UsersTokensRepository } from '../typeorm/repositories/UsersTokensRepository';
import { EtherealMail } from '@config/mail/EtherealMail';

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

    //console.log(token);
    await EtherealMail.sendMail({
      to: { name: user.name, email: user.email },
      subject: '[API VENDAS] Recuperação de Senha',
      templateData: {
        template: `Olá, {{name}}! Solicitação de redefinição de senha recebida: {{token}}`,
        variables: {
          name: user.name,
          token
        }
      }
    });
  }
}
