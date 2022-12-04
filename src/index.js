import express, { Router } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';
import compression from 'compression';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
dotenv.config();
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

import appRoutes from './routes/index.route.js';
import { prisma } from './helpers/singleExport.helper.js';
// ds

const PORT = process.env.PORT || 3100;

const corsOptions = {
	origin: (origin, callback) => {
		if (true) {
			callback(null, true);
		}
	},
	optionSuccessStatus: 200,
	credentials: true, // Access-Control-Allow-Credentials: true
	withCredentials: true,
};


const app = express();

const ui = Router();

// app.use(function (req, res, next) {
// 	req.headers.origin = req.headers.origin || req.headers.host;
// 	next();
// });
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

// app.use(cors(corsOptions));
app.use(cors({
	origin: '*'
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression({
	filter: (req, res) => {
		if (req.headers['x-no-compression']) {
			return false;
		}
		return compression.filter(req, res);
	},
}));
app.use(cookieParser());

ui.get('/', async (req, res) => {
	res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.use('/', ui)

app.use('/api/', appRoutes);


app.use((req, res, next) => {
	next(createError.NotImplemented());
});


app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.send({
		status: err.status || 500,
		message: err.message || 'Internal Server Error | Invalid Request',
	});
});

(async () => {
	const isDB = await prisma.$connect();
	console.log('Databse connection established', { isDB });
});

app.listen(PORT, (err) => {
	if (err) {
		console.log(`error listening on port ${PORT}`);
	} else {
		console.log(`Server started on port ${PORT}, with PID: ${process.pid}`);
		console.log('Endpoints: \n', listEndpoints(app));
	}
});