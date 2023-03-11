import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import cors from 'cors';
dotenv.config()

import indexRouter from './routes/index'
import authRouter from './routes/Auth'
import postRouter from './routes/Post'
import categoryRouter from './routes/Category'
import { apiError } from './utils/apiError';
import { globalErrHandler } from './utils/globalErrorHandler';


require("./config/database");

const app = express()

app.use(express.json())
app.use(logger('dev'))
app.use(cookieParser())
app.use(cors())

app.use('/api/', indexRouter)
app.use('/api/auth', authRouter)
app.use('/api/post', postRouter)
app.use('/api/categories', categoryRouter)



// 404 error
app.all("*", (req, res, next) => {
    // create error
    const err = new apiError(`Can't find this route ${req.originalUrl}`, 400);
    // send it to Global errors handling middlware
    next(err);
  });
  
  // Global Error Handlers Middleware
  app.use(globalErrHandler);

const port = 4000;

app.listen(port, ()=> {
    console.log(`Server is listening on port ${port}`)
})

export default app