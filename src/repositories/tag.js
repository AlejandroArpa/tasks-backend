import { Tags } from "../config/db.js";

export class TagRepository {
  async createTag(name) {
    try {
      const tag = await Tags.create({ name });
      return tag;
    } catch (error) {
      console.error("Error creating tag:", error);
      throw new Error("Error creating tag");
    }
  }

  async getTagByName(name) {
    try {
      return await Tags.findOne({ where: { name } });
    } catch (error) {
      console.error("Error fetching tag by name:", error);
      throw new Error("Error fetching tag");
    }
  }

  async getAllTags() {
    try {
      return await Tags.findAll();
    } catch (error) {
      console.error("Error fetching tags:", error);
      throw new Error("Error fetching tags");
    }
  }
}
