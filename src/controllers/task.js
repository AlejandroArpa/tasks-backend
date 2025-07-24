import { TaskService } from "../services/task.js";
import { z, ZodError } from "zod";

const taskSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title must be at most 255 characters"),
  description: z.string().max(1000, "Description must be at most 1000 characters").optional(),
  status: z.enum(['pending', 'in_progress', 'completed', 'expired', 'canceled'], "Invalid status"),
  priority: z.enum(['low', 'medium', 'high'], "Invalid priority"),
    expirationDate: z.string().refine(date => !isNaN(Date.parse(date)), "Invalid date format"),
    categoryName: z.string().min(1, "Category name is required").max(100, "Category name must be at most 100 characters"),
});


export class TaskController {
  constructor() {
    this.taskService = new TaskService();
  }

  async createTask(req, res) {
    try {
      const userId = req.userId; // El ID del usuario se obtiene del middleware authenticate
      const parsed = taskSchema.parse(req.body);
      const task = await this.taskService.createTask(parsed, userId);
      res.status(201).json(task);
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
      console.error("Error al crear la tarea:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getAllTasks(req, res) {
    try {
      const userId = req.userId;
       const {
      completada,
      categoria,
      prioridad,
      fecha_inicio,
      fecha_fin,
      busqueda,
      etiquetas,
      ordenar,
      direccion,
    } = req.query;

    const filters = {
      completada,
      categoria,
      prioridad,
      fecha_inicio,
      fecha_fin,
      busqueda,
      etiquetas,
      ordenar,
      direccion,
    };

      const tasks = await this.taskService.getAllTasks(userId, filters);
      res.status(200).json(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateTask(req, res) {
    try {
      const taskId = req.params.id;
      const userId = req.userId;
      const parsed = taskSchema.parse(req.body);
      const task = await this.taskService.updateTask(taskId, parsed, userId);
      res.status(200).json(task);
    } catch (error) {
      console.error("Error updating task:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteTask(req, res) {
    try {
      const taskId = req.params.id;
      const userId = req.userId;
      const task = await this.taskService.getTaskById(taskId);
      if (task.userId !== userId) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      await this.taskService.taskRepository.deleteTask(taskId);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting task:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async markTaskAsCompleted(req, res) {
    try {
      const taskId = req.params.id;
      const userId = req.userId;
      const task = await this.taskService.getTaskById(taskId);
      if (task.userId !== userId) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      const updatedTask = await this.taskService.updateTask(taskId, { status: 'completed' }, userId);
      res.status(200).json(updatedTask);
    } catch (error) {
      console.error("Error marking task as completed:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
