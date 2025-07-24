import { th } from "zod/locales";
import { CategoryRepository } from "../repositories/category.js";
import { TaskRepository }     from "../repositories/task.js";
import { config }             from "dotenv";

config();

export class TaskService {
  constructor() {
    this.taskRepository = new TaskRepository();
    this.categoryRepository = new CategoryRepository();
  }

  async createTask(taskData, userId) {
    try {
      const categoryId = await this.categoryRepository.getCategoryIdByName(
        taskData.categoryName
      );
      if (!categoryId) {
        throw new Error("Category not found");
      }

      const task = await this.taskRepository.createTask({
        ...taskData,
        categoryId,
        userId,
      });
      return task;
    } catch (error) {
      throw error;
    }
  }

  async getAllTasks(userId, filters = {}) {
    try {
      const tasks = await this.taskRepository.getAllTasks(userId, filters);
      const now = new Date();
      const expiredTasks = tasks.filter(
        (task) => new Date(task.expirationDate) < now
      );
      for (const task of expiredTasks) {
        await this.taskRepository.updateTask(task.id, { status: "expired" });
      }
      tasks.forEach((task) => {
        if (new Date(task.expirationDate) < now) {
          task.status = "expired";
        }
      });
      return tasks;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw new Error("Error fetching tasks");
    }
  }

  async getTaskById(taskId) {
    try {
      const task = await this.taskRepository.getTaskById(taskId);
      return task;
    } catch (error) {
      console.error("Error fetching task:", error);
      throw new Error("Error fetching task");
    }
  }

  async updateTask(taskId, taskData, userId) {
    try {
      const task = await this.taskRepository.getTaskById(taskId);
      if (!task) {
        throw new Error("Task not found");
      }
      if (task.user_id !== userId) {
        throw new Error("Unauthorized");
      }
      const updatedTask = await this.taskRepository.updateTask(
        taskId,
        taskData
      );
      return updatedTask;
    } catch (error) {
      console.error("Error updating task:", error);
      throw new Error("Error updating task");
    }
  }

  async deleteTask(taskId, userId) {
    try {
      const task = await this.taskRepository.getTaskById(taskId);
      if (!task) {
        throw new Error("Task not found");
      }
      if (task.userId !== userId) {
        throw new Error("Unauthorized");
      }
      await this.taskRepository.deleteTask(taskId);
    } catch (error) {
      console.error("Error deleting task:", error);
      throw new Error("Error deleting task");
    }
  }

  async markTaskAsCompleted(taskId, userId) {
    try {
      const task = await this.taskRepository.getTaskById(taskId);
      if (!task) {
        throw new Error("Task not found");
      }
      if (task.user_id !== userId) {
        throw new Error("Unauthorized");
      }
      
      const updatedTask = await this.taskRepository.updateTask(taskId, {
        status: "completed",
      });
      return updatedTask;
    } catch (error) {
      console.error("Error marking task as completed:", error);
      throw new Error("Error marking task as completed");
    }
  }
}
