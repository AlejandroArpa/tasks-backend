import { Users } from "../config/db.js";

export class AuthRepository {
  // Create
  async createUser(user) {
    console.log("user", user);

    if (!user.email || !user.password) {
      throw new Error("Email and password are required");
    }
    const existingUser = await Users.findOne({ where: { email: user.email } });

    console.log("existingUser", existingUser);
    
    if (existingUser) {
      throw new Error("User already exists");
    }

    return await Users.create(user);
  }

  // Read
  async getUserByEmail(email) {
    const user = await Users.findOne({ where: { email } });
    if (user) {
      return user;
    } else {
      throw new Error("User not found");
    }
  }
}
