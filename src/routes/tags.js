import { Router } from 'express';
// import { UserController } from '../controllers';
// import authorize from '../middlewares/auth.middleware';

export const tagRoute = Router();

tagRoute.get('/', (req, res) => {
  res.send("Get all tags by user");
});

tagRoute.post('/', (req, res) => {
  res.send("Create new tag");
});