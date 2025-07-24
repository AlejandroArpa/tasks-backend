import { Router } from 'express';
import { UserController } from '../controllers/user.js';


export const userRoute = Router();

const userController = new UserController();

userRoute.get('/', (req, res) => {
  userController.getUserProfile(req, res);
});

// userRoute.put('/:id', (req, res) => {
//   res.send("Update user");
// });

// userRoute.delete('/:id', (req, res) => {
//   res.send("Delete user");
// });