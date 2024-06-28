import { Router } from 'express';
import { SessionsController } from '../controllers/SessionsController';
import { Joi, Segments, celebrate } from 'celebrate';

export const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().min(3).required()
    }
  }),
  sessionsController.create
);
