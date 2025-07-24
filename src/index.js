import swaggerUi            from 'swagger-ui-express';
import {router}             from './routes/router.js';
import rateLimit 			from 'express-rate-limit';
import {sequelize}        	from './config/db.js';
import express              from 'express';
import { config }           from 'dotenv';
import { createRequire }    from 'module';

config();

const { PORT } = process.env;
const app = express();


const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 100,
  message: "Too many requests, please try again later.",
});

// Middlewares
app.use(limiter);
app.use(express.json());
app.use("/api", router);

//Swagger setup
const require = createRequire(import.meta.url);
const swaggerDocument = require('./swagger/swagger.json');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const launchServer = async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync();
		
		app.listen(PORT, () => {
			console.log("Server running on port " + PORT);
		});
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
}

launchServer();