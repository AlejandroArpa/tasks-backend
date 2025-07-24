import { Router } from 'express';
// import { UserController } from '../controllers';
// import authorize from '../middlewares/auth.middleware';

export const taskRoute = Router();

taskRoute.get('/', (req, res) => {
  res.send("Get all tasks");
});

taskRoute.post('/', (req, res) => {
  res.send("Create task");
});

taskRoute.put('/:id', (req, res) => {
  res.send("Update task");
});

taskRoute.delete('/:id', (req, res) => {
  res.send("Delete task");
});

taskRoute.patch('/:id', (req, res) => {
  res.send("Partially update task");
});