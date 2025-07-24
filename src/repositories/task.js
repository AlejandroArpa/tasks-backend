import { Tasks } from "../config/db.js";

export class TaskRepository {
  async createTask(taskData) {
    try {
      const task = await Tasks.create({ ...taskData, status: "pending" });
      return task;
    } catch (error) {
      console.error("Error creating task:", error);
      throw new Error("Error creating task");
    }
  }

  async getTaskById(taskId) {
    console.log("taskId", taskId);

    const task = await Tasks.findOne({ where: { id: taskId } });
    if (task) {
      return task;
    } else {
      throw new Error("Task not found");
    }
  }

  async getAllTasks(userId, filters = {}) {
    try {
      const {
        completada,
        categoria,
        prioridad,
        fecha_vencimiento_inicio,
        fecha_vencimiento_fin,
        busqueda,
        etiquetas,
        ordenar = "createdAt",
        direccion = "desc",
      } = filters;

      const where = {
        userId,
      };

      if (completada !== undefined) {
        where.status =
          completada === "true" ? "completed" : { [Op.ne]: "completed" };
      }

      if (categoria) {
        where.categoryId = categoria;
      }

      if (prioridad) {
        where.priority = prioridad;
      }

      if (fecha_vencimiento_inicio && fecha_vencimiento_fin) {
        where.expirationDate = {
          [Op.between]: [fecha_vencimiento_inicio, fecha_vencimiento_fin],
        };
      }

      if (busqueda) {
        where[Op.or] = [
          { title: { [Op.iLike]: `%${busqueda}%` } },
          { description: { [Op.iLike]: `%${busqueda}%` } },
        ];
      }

      const include = [];

      if (etiquetas) {
        include.push({
          model: Tag,
          as: "tags",
          where: {
            name: {
              [Op.in]: etiquetas.split(","),
            },
          },
        });
      }

      const order = [[ordenar, direccion.toUpperCase()]];

      return await Tasks.findAll({
        where,
        include,
        order,
      });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw new Error("Error fetching tasks");
    }
  }

  async updateTask(taskId, taskData) {
    try {
      const [updatedRows, [updatedTask]] = await Tasks.update(taskData, {
        where: { id: taskId },
        returning: true,
      });
      if (updatedRows === 0) {
        throw new Error("Task not found or no changes made");
      }
      return updatedTask;
    } catch (error) {
      console.error("Error updating task:", error);
      throw new Error("Error updating task");
    }
  }

  async deleteTask(taskId) {
    try {
      const deletedRows = await Tasks.destroy({ where: { id: taskId } });
      if (deletedRows === 0) {
        throw new Error("Task not found");
      }
      return deletedRows;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw new Error("Error deleting task");
    }
  }
}
