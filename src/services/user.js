import { UserRepository } from "../repositories/user.js";
import { config } from "dotenv";

config();

export class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUserById(userId) {
    try {
      const user = await this.userRepository.getUserById(userId);

      if (!user) {
        throw new Error("User not found");
      }

      const plainUser = user.toJSON ? user.toJSON() : { ...user };
      delete plainUser.password;

      return plainUser;
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error in UserService profile:", error.message);
        throw error; // or use a custom error handler
      }
    }
  }
}
