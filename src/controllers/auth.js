import { AuthService } from "../services/auth.js";
import { z, ZodError } from "zod";
// import { errorHandler } from "../utilities";

const userSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be at most 100 characters"),
});

export class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  // Create
  async register(req, res) {
    try {
      const parsed = userSchema.parse(req.body);
      await this.authService.register(parsed);

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      // Si es ZodError
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: "Validation failed",
          details: error.issues.map((e) => ({
            field: e.path[0],
            message: e.message,
          })),
        });
      }

      // Si es un error conocido
      if (error instanceof Error && error.message.includes("User already exists")) {
        return res.status(409).json({ error: error.message });
      }

      // Error inesperado
      console.error("Unexpected error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async login(req, res) {
  	try {
  		const token = await this.authService.login(req.body.email, req.body.password);
  		res.status(200).json(token);
  	} catch (error) {
  		if(error instanceof Error){
  			// errorHandler(error, req, res);
            if(error.message.includes("User not found")) {
                return res.status(404).json({ error: "User not found" });
            }
            return res.status(400).json({ error: error.message });
        }
  	}
  }
}
