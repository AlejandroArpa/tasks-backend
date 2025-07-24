import {authenticate}       from '../middlewares/auth.js';
import { categoryRoute }    from './category.js';
import { userRoute }        from './users.js';
import { authRoute }        from './auth.js';
import { taskRoute }        from './task.js';
import { tagRoute }         from './tags.js';
import { Router }           from 'express';

export const router = Router();

router.use('/auth', authRoute);
router.use('/tasks', authenticate, taskRoute);
router.use('/categories', authenticate, categoryRoute);
router.use('/tags', authenticate, tagRoute);
router.use('/users', authenticate, userRoute);
