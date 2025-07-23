import swaggerUi            from 'swagger-ui-express';
// import sequelize        from './config/db';
import {router}             from './routes/router.js';
import express              from 'express';
import { config }           from 'dotenv';
import { createRequire }    from 'module';

config();

const { PORT } = process.env;
const app = express();
const require = createRequire(import.meta.url);


const swaggerDocument = require('./swagger/swagger.json');

app.use(express.json());
app.use("/api", router);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const launchServer = async () => {
	try {
		// await sequelize.authenticate();
		// await sequelize.sync();
		
		app.listen(PORT, () => {
			console.log("Server running on port " + PORT);
		});
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
}

launchServer();