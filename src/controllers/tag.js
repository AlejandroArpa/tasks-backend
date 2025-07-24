import { TagService } from "../services/tag.js";
import { z, ZodError } from "zod";

const tagSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be at most 100 characters"),
});

export class TagController {
  constructor() {
    this.tagService = new TagService();
  }

  async createTag(req, res) {
    try {
      const parsed = tagSchema.parse(req.body);
      const tag = await this.tagService.createTag(parsed.name);
      return res.status(201).json(tag);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: "Validation failed",
          details: error.issues.map((e) => ({
            field: e.path[0],
            message: e.message,
          })),
        });
      } else if (error instanceof Error && error.message === "Tag already exists") {
        return res.status(409).json({ message: "Tag already exists" });
      }

      console.error("Error creating tag:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getAllTags(req, res) {
    try {
      const tags = await this.tagService.getAllTags();
      return res.status(200).json(tags);
    } catch (error) {
      console.error("Error fetching tags:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
