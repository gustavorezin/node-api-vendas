import { Request, Response } from 'express';
import { SendForgotPasswordEmailService } from '../services/SendForgotPasswordEmailService';

export class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const sendForgotPasswordEmail = new SendForgotPasswordEmailService();
    await sendForgotPasswordEmail.execute({ email });
    // 204 = No content
    return response.status(204).json();
  }
}
