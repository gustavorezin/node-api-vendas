import { Router } from 'express';
import { UsersController } from '../controllers/UsersController';
import { Joi, Segments, celebrate } from 'celebrate';

export const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', usersController.index);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(3).required()
    }
  }),
  usersController.create
);
