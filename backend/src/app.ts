import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import cors from 'cors';
dotenv.config()

import indexRouter from './routes/index'
import authRouter from './routes/Auth'


require("./config/database");

const app = express()

app.use(express.json())
app.use(logger('dev'))
app.use(cookieParser())
app.use(cors())

app.use('/', indexRouter)
app.use('/auth', authRouter)


const port = 4000;

app.listen(port, ()=> {
    console.log(`Server is listening on port ${port}`)
})

export default app