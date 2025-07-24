import { AuthRepository } from '../repositories/auth.js';
// import { Users } from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from "dotenv";
// import { errorInstanceThrowService } from '../utilities';

config();

export class AuthService {
	constructor() {
        this.authRepository = new AuthRepository();
		// this.permissionsRepository = new PermissionsRepository();
     }

	async register(user) {
		try {
			const hashedPassword = await bcrypt.hash(user.password, 10);
			return await this.authRepository.createUser({...user, password: hashedPassword});
		} catch (error) {
            if (error instanceof Error) {
                // Handle specific error cases if needed
                console.log("Error in AuthService register:", error.message);
                
                throw error; // or use a custom error handler
            }
			//errorInstanceThrowService(error);
		}
	}

	async login(email, password) {
		try {
			const user = await this.authRepository.getUserByEmail(email);
			if (!user) {
				throw new Error('User not found');
			}
			const valid = await bcrypt.compare(password, user.password);
			if (!valid) {
				throw new Error('Invalid password');
			}
			const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
			return token;
		} catch (error) {
			// errorInstanceThrowService(error);
            if (error instanceof Error) {
                console.log("Error in AuthService login:", error.message);
                throw error; // or use a custom error handler
            }
		}
	}
}