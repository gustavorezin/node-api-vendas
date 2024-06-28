import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import { Joi, Segments, celebrate } from 'celebrate';

export const productsRouter = Router();
const productController = new ProductController();

productsRouter.get('/', productController.index);

productsRouter.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  productController.show
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
  productController.create
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
  productController.update
);

productsRouter.delete(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  productController.delete
);
