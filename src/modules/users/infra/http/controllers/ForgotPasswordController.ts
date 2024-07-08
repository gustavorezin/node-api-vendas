import { SendForgotPasswordEmailService } from '@modules/users/services/SendForgotPasswordEmailService';
import { Request, Response } from 'express';

export class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const sendForgotPasswordEmail = new SendForgotPasswordEmailService();
    await sendForgotPasswordEmail.execute({ email });
    // 204 = No content
    return response.status(204).json();
  }
}
