import express from 'express'
import cors from 'cors'
import ConnectDb from './src/config/db.js';
import dotenv from 'dotenv'


dotenv.config()

const app = express();
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Autherization"]

}))
ConnectDb()

const PORT = process.env.port ||5000
app.listen(PORT, () =>
    console.log(`server running at ${PORT}`)
)