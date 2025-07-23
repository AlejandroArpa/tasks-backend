import { Router } from 'express';
import { userRoute } from './users.routes.js';
// import { productRoute } from './products.route';
// import { productCartRoute } from './productCart.route';
// import { orderRoute } from './order.route';
// import { authRoute } from './auth.route';

export const router = Router();

router.use('/users', userRoute);
// router.use('/products', productRoute);
// router.use('/productsCarts', productCartRoute);
// router.use('/orders', orderRoute);
// router.use('/auth', authRoute);