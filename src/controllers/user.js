import { UserService } from "../services/user.js";

export class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async getUserProfile(req, res) {
    try {
      const userId = req.userId; // El ID del usuario se obtiene del middleware authenticate
      const user = await this.userService.getUserById(userId);
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error && error.message.includes("User not found")) {
        return res.status(404).json({ message: "User not found" });
      }
      console.error("Error al obtener el perfil del usuario:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
