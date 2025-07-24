import { Router } from 'express';
import { TagController } from '../controllers/tag';


export const tagRoute = Router();
const tagController = new TagController();

tagRoute.get('/', (req, res) => {
  tagController.getAllTags(req, res);
});

tagRoute.post('/', (req, res) => {
  tagController.createTag(req, res);
});