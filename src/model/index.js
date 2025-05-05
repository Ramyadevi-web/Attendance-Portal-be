import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const connection =()=>{
    mongoose.connect(`${process.env.MONGO_URL}`)
    .then(()=>{console.log("Database connection successful")
    })
    .catch((error)=>{console.log(error)})
}

export default connection
