import { Router } from 'express';
import { UsersController } from '../controllers/UsersController';
import { Joi, Segments, celebrate } from 'celebrate';
import { isAuthenticated } from '@shared/infra/http/middlewares/isAuthenticated';
import { UserAvatarController } from '../controllers/UserAvatarController';
import multer from 'multer';
import { uploadConfig } from '@config/upload';

export const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig.multer);

usersRouter.get('/', isAuthenticated, usersController.index);

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

usersRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  userAvatarController.update
);
