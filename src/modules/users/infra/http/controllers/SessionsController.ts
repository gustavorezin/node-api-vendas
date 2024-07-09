import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import { CreateSessionService } from '@modules/users/services/CreateSessionService';
import { container } from 'tsyringe';

export class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = container.resolve(CreateSessionService);
    const session = await createSession.execute({ email, password });

    return response.json(instanceToInstance(session));
  }
}
