import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRouter from './Router/userRouter.js';
import 'dotenv/config'

const app = express();
const port = process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.use('/', userRouter);

// connect momgoDB campass Backend API
mongoose.connect(process.env.Connect)
.then(() => {
    console.log("Database connection established");
})
.catch((err) => {
    console.error("Database connection error:", err);
});

app.listen(port, () => {
    console.log(`server is working on ${port}`);
});