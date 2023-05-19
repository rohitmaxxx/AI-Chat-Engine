import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import routesV1 from './routes/routesV1';


dotenv.config();
export const app = express();

const corsOpts = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200,
    preflightContinue: false,
};

// Parse the request
app.use(express.urlencoded({ extended: true }));
// Rake care of json data
app.use(express.json());
app.use(cors(corsOpts));

/** Routes */
app.use('/api', routesV1);


app.listen(process.env.SERVER_PORT, () => {
    console.log("Server listening on port: ", process.env.SERVER_PORT);
})




