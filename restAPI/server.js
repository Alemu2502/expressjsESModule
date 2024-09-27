import expressHealthcheck from "express-healthcheck";
import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import { router } from "./api/route/taskRoute.js";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
dotenv.config();

const PORT = process.env.PORT || 3000;
const MONG_url = process.env.MONG_url || 'mongodb://localhost:27017/alxTasks';

const connectDB = async()=> {
    try {
        await mongoose.connect(MONG_url);
        console.log(`mongodb successfully connected on ${PORT}`);
    } catch (error) {
        console.log('mongodb not connected');
    }
}

connectDB();

app.use('/api', router);
app.use('/health', expressHealthcheck({
healthy: ()=>{
try {
    const dbState = mongoose.connection.readyState;
    if(dbState === 1) {
        return {message: 'mongodb and express are healthy'};
    } else {
        return {message: 'mongodb and express are healthy'};
    }
} catch (error) {
    console.error(error);
}
   }
}));

app.listen(PORT, ()=>{
    console.log('server connected successfully');
});

app.use((req, res)=>{
res.status(404).send({
error: {
    errors: [{
        domain: 'global',
        reason: 'not found',
        message: 'not found',
        description: `the requested url is not found ${req.originalUrl}`,
    }],
    code: 404,
    message: 'not found',
},
});
});