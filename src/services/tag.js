import { TagRepository } from "../repositories/tag.js";

export class TagService {
  constructor() {
    this.tagRepository = new TagRepository();
  }

  async createTag(name) {
    const existingTag = await this.tagRepository.getTagByName(name);
    if (existingTag) {
      throw new Error("Tag already exists");
    }
    return await this.tagRepository.createTag(name);
  }

  async getAllTags() {
    return await this.tagRepository.getAllTags();
  }
}
