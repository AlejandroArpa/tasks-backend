import { Categories } from "../config/db.js";

export class CategoryRepository {

    async getAllCategories() {
        try {
            const categories = await Categories.findAll();
            return categories;
        } catch (error) {
            console.error("Error fetching categories:", error);
            throw new Error("Error fetching categories");
        }
    }

    async createCategory(categoryData) {
        try {
            categoryData.name = categoryData.name.toLowerCase();
            const category = await Categories.create(categoryData);
            return category;
        } catch (error) {
      console.error("Error creating category:", error);
      throw new Error("Error creating category");
    }
  }

  async getCategoryById(categoryId) {
    try {
      const category = await Categories.findOne({ where: { id: categoryId } });
      if (category) {
        return category;
      } else {
        throw new Error("Category not found");
      }
    } catch (error) {
      console.error("Error fetching category:", error);
      throw new Error("Error fetching category");
    }
  }

  async updateCategory(categoryId, categoryData) {
    try {
      const [updated] = await Categories.update(categoryData, {
        where: { id: categoryId },
      });
      if (updated) {
        return this.getCategoryById(categoryId);
      }
      throw new Error("Category not found");
    } catch (error) {
      console.error("Error updating category:", error);
      throw new Error("Error updating category");
    }
  }

  async getCategoryIdByName(categoryName) {
    try {
      if (!categoryName || typeof categoryName !== 'string') {
        throw new Error("Invalid category name");
      }
      const categoryNameToSearch = categoryName.toLowerCase();
      const category = await Categories.findOne({ where: { name: categoryNameToSearch } });
      if (category) {
        return category.id;
      }
      return null; // Category not found
    } catch (error) {
      console.error("Error fetching category by name:", error);
      throw new Error("Error fetching category by name");
    }
  }

    async deleteCategory(categoryId) {
        try {
        const deleted = await Categories.destroy({ where: { id: categoryId } });
        if (deleted) {
          return { message: "Category deleted successfully" };
        }
        throw new Error("Category not found");
      } catch (error) {
        console.error("Error deleting category:", error);
        throw new Error("Error deleting category");
      }
    }
}