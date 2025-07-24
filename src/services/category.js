import { CategoryRepository } from "../repositories/category.js";
import { TaskRepository }     from "../repositories/task.js";
import { config }             from "dotenv";

config();

export class CategoryService {
  constructor() {
    this.categoryRepository = new CategoryRepository();
    this.taskRepository = new TaskRepository(); // Assuming you have a TaskRepository for task operations
  }

  async createCategory(categoryData) {
    try {
      categoryData.name = categoryData.name.trim();
      categoryData.name = categoryData.name.toLowerCase();
      const category = await this.categoryRepository.createCategory(categoryData);
      return category;
    } catch (error) {
      console.error("Error creating category:", error);
      throw new Error("Error creating category");
    }
  }

  async getAllCategories() {
    try {
      const categories = await this.categoryRepository.getAllCategories();
      return categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw new Error("Error fetching categories");
    }
  }

  async getCategoryById(categoryId) {
    try {
      const category = await this.categoryRepository.getCategoryById(categoryId);
      return category;
    } catch (error) {
      console.error("Error fetching category:", error);
      throw new Error("Error fetching category");
    }
  }

  async updateCategory(categoryId, categoryData) {
    try {
      categoryData.name = categoryData.name.trim();
      categoryData.name = categoryData.name.toLowerCase();
      const updatedCategory = await this.categoryRepository.updateCategory(categoryId, categoryData);
      return updatedCategory;
    } catch (error) {
      console.error("Error updating category:", error);
      throw new Error("Error updating category");
    }
  }

  async deleteCategory(categoryId) {
    try {
      await this.taskRepository.deleteTasksByCategoryId(categoryId);
      const deletedCategory = await this.categoryRepository.deleteCategory(categoryId);
      return deletedCategory;
    } catch (error) {
      console.error("Error deleting category:", error);
      throw new Error("Error deleting category");
    }
  }
}

      