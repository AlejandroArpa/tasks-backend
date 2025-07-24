import { Router } from 'express';
import { TaskController } from '../controllers/task.js';

export const taskRoute = Router();

const taskController = new TaskController();

taskRoute.get('/', (req, res) => {
  taskController.getAllTasks(req, res);
});

taskRoute.post('/', (req, res) => {
  taskController.createTask(req, res);
});

taskRoute.put('/:id', (req, res) => {
  taskController.updateTask(req, res);
});

taskRoute.delete('/:id', (req, res) => {
  taskController.deleteTask(req, res);
});

taskRoute.patch('/:id/completed', (req, res) => {
  taskController.markTaskAsCompleted(req, res);
});
