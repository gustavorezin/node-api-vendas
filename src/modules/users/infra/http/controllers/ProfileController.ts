import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import { ShowProfileService } from '@modules/users/services/ShowProfileService';
import { UpdateProfileService } from '@modules/users/services/UpdateProfileService';
import { container } from 'tsyringe';

export class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfile = container.resolve(ShowProfileService);
    const userId = request.user.id;
    const user = await showProfile.execute({ userId });
    return response.json(instanceToInstance(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateProfile = container.resolve(UpdateProfileService);
    const userId = request.user.id;
    const { name, email, password, oldPassword } = request.body;
    const user = await updateProfile.execute({
      userId,
      name,
      email,
      password,
      oldPassword
    });
    return response.json(instanceToInstance(user));
  }
}
