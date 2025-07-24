import { CategoryController } from '../controllers/category.js';
import { Router }             from 'express';


export const categoryRoute = Router();

const categoryController = new CategoryController();

categoryRoute.get('/', async (req, res) => {
  try {
    const categories = await categoryController.getAllCategories(req, res);
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Error fetching categories" });
  }
});

categoryRoute.post('/', async (req, res) => {
  try {
    const newCategory = await categoryController.createCategory(req, res);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Error creating category" });
  }
});

categoryRoute.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await categoryController.updateCategory(req, res);
    res.json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Error updating category" });
  }
});

categoryRoute.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await categoryController.deleteCategory(req, res);
    res.json(deletedCategory);
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Error deleting category" });
  }
});