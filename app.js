import express from 'express';
import { PORT } from './config/env.js';

import subscriptionRouter from './routes/subscription.routes.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';

import { connectDB } from './database/mongoDB.js';


const app = express();
// creating route end point

// api/v1/auth/sign-in
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);




app.get("/", (req, res) => {
    res.send('Welcome to the subscription Tracker API')
})

app.listen(PORT, async () => {
    
    console.log("Server started at http://localhost:" + PORT);

    await connectDB();
})


export default app;