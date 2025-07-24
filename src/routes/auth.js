import { Router } from 'express';
import { AuthController } from '../controllers/auth.js';
// import { UserController } from '../controllers';
// import authorize from '../middlewares/auth.middleware';

export const authRoute = Router();

const authController = new AuthController();

authRoute.post('/register', (req, res) => authController.register(req, res));

authRoute.post('/login', (req, res) => 
  authController.login(req, res)
);

authRoute.get('/profile', (req, res) => {
  res.send("Get user profile");
});