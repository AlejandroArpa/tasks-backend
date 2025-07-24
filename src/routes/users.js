import { Router } from 'express';
// import { UserController } from '../controllers';
// import authorize from '../middlewares/auth.middleware';

export const userRoute = Router();

userRoute.get('/', (req, res) => {
  res.send("Get all users");
});

userRoute.put('/:id', (req, res) => {
  res.send("Update user");
});

userRoute.delete('/:id', (req, res) => {
  res.send("Delete user");
});