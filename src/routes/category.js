import { Router } from 'express';
// import { UserController } from '../controllers';
// import authorize from '../middlewares/auth.middleware';

export const categoryRoute = Router();

categoryRoute.get('/', (req, res) => {
  res.send("Get all categories by user");
});

categoryRoute.post('/', (req, res) => {
  res.send("Create new category");
});

categoryRoute.put('/:id', (req, res) => {
  res.send("Update category by user");
});

categoryRoute.delete('/:id', (req, res) => {
  res.send("Delete category");
});