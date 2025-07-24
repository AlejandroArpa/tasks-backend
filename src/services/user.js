import { UserRepository } from '../repositories/auth.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
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
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            // errorInstanceThrowService(error);
            if (error instanceof Error) {
                console.log("Error in UserService profile:", error.message);
                throw error; // or use a custom error handler
            }
        }
    }
}