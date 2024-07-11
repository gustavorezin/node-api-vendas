import { Router } from 'express';
import { ProductsController } from '../controllers/ProductsController';
import { Joi, Segments, celebrate } from 'celebrate';
import { isAuthenticated } from '@shared/infra/http/middlewares/isAuthenticated';

export const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.use(isAuthenticated);

productsRouter.get('/', productsController.index);

productsRouter.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  productsController.show
);

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required()
    }
  }),
  productsController.create
);

productsRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required()
    }
  }),
  productsController.update
);

productsRouter.delete(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  productsController.delete
);
