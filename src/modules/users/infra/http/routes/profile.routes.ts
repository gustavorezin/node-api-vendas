import { Joi, Segments, celebrate } from 'celebrate';
import { Router } from 'express';
import { ProfileController } from '../controllers/ProfileController';
import { isAuthenticated } from '@shared/infra/http/middlewares/isAuthenticated';

export const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(isAuthenticated);

profileRouter.get('/', profileController.show);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().optional(),
      passwordConfirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', {
          is: Joi.exist(),
          then: Joi.required()
        }),
      oldPassword: Joi.string()
    }
  }),
  profileController.update
);
