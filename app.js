import express from 'express';
import { PORT } from './config/env.js';

import subscriptionRouter from './routes/subscription.routes.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';

import { connectDB } from './database/mongoDB.js';

import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';
import workflowROUTER from './routes/workflow.route.js';


const app = express();

// //Skip Arcjet for /api/v1/subscriptions/upcoming-renewals
// app.use((req, res, next) => {
//     if (req.path === '/api/v1/subscriptions/upcoming-renewals') {
//         return next();
//     }
//     arcjetMiddleware(req, res, next);
// });

// Arcjet Middleware - protect all routes
app.use(arcjetMiddleware);

//express middlewares

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

// creating route end point

// api/v1/auth/sign-in
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/workflows', workflowROUTER);



// Error middleware

app.use(errorMiddleware);


app.get("/", (req, res) => {
    res.send('Welcome to the subscription Tracker API')
})

app.listen(PORT, async () => {
    
    console.log("Server started at http://localhost:" + PORT);

    await connectDB();
})


export default app;