import { CategoryService } from "../services/category.js";
import { z, ZodError } from "zod";

const categorySchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name must be at most 255 characters"),
  description: z.string().max(1000, "Description must be at most 1000 characters").optional(),

});


export class CategoryController {
  constructor() {
    this.categoryService = new CategoryService();
  }

  async createCategory(req, res) {
    try {
      const userId = req.userId; // El ID del usuario se obtiene del middleware authenticate
      const parsed = categorySchema.parse(req.body);
      const category = await this.categoryService.createCategory(parsed, userId);
      res.status(201).json(category);
    } catch (error) {

        if (error instanceof ZodError) {
        return res.status(400).json({
          error: "Validation failed",
          details: error.issues.map((e) => ({
            field: e.path[0],
            message: e.message,
          })),
        });
      }

      else if (error instanceof Error && error.message.includes("Category not found")) {
        return res.status(404).json({ message: "Category not found" });
      }
      console.error("Error al crear la categoría:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getAllCategories(req, res) {
    try {
      const userId = req.userId;

      const categories = await this.categoryService.getAllCategories(userId);
      res.status(200).json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getCategoryById(req, res) {
    try {
      const categoryId = req.params.id;
      const category = await this.categoryService.getCategoryById(categoryId);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json(category);
    } catch (error) {
      console.error("Error fetching category:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

    async updateCategory(req, res) {
        try {
        const categoryId = req.params.id;
        const userId = req.userId;
        const parsed = categorySchema.parse(req.body);
        const updatedCategory = await this.categoryService.updateCategory(categoryId, parsed, userId);
        res.status(200).json(updatedCategory);
        } catch (error) {
        console.error("Error updating category:", error);
        return res.status(500).json({ message: "Internal server error" });
        }
    }

    async deleteCategory(req, res) {
        try {
        const categoryId = req.params.id;
        const userId = req.userId;
        const deletedCategory = await this.categoryService.deleteCategory(categoryId, userId);
        res.status(200).json(deletedCategory);
        } catch (error) {
        console.error("Error deleting category:", error);
        return res.status(500).json({ message: "Internal server error" });
        }
    }
}
