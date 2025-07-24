import { Users } from "../config/db.js";

export class UserRepository {

  async getUserById(userId) {
    console.log("userId", userId);

    const user = await Users.findOne({ where: { id: userId } });
    if (user) {
      return user;
    } else {
      throw new Error("User not found");
    }
  }

}
