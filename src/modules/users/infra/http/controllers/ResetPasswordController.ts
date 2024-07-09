import { ResetPasswordService } from '@modules/users/services/ResetPasswordService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;
    const resetPassword = container.resolve(ResetPasswordService);
    await resetPassword.execute({ token, password });
    // 204 = No content
    return response.status(204).json();
  }
}
