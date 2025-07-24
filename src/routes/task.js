import { Router } from 'express';
import { TaskController } from '../controllers/task.js';

export const taskRoute = Router();

taskRoute.get('/', (req, res) => {
  TaskController.getAllTasks(req, res);
});

taskRoute.post('/', (req, res) => {
  TaskController.createTask(req, res);
});

taskRoute.put('/:id', (req, res) => {
  TaskController.updateTask(req, res);
});

taskRoute.delete('/:id', (req, res) => {
  TaskController.deleteTask(req, res);
});

taskRoute.patch('/:id/completed', (req, res) => {
  TaskController.markTaskAsCompleted(req, res);
});
