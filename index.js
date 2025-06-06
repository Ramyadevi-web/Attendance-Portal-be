import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import AppRoutes from './src/routes/index.js'
import  connection  from './src/model/index.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(AppRoutes)

app.listen(process.env.PORT, ()=> console.log("Server listening....",process.env.PORT))
connection()