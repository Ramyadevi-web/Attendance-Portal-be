import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const hashPassword = async(password)=>{
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)
    console.log(password,hash)
    return hash
}

const hashCompare = async(password,hash)=>{
    console.log("hastpass",password,hash)
    console.log(await 
        bcrypt.compare(password,hash))
   return await 
   bcrypt.compare(password,hash)
}

const createToken = async(payload)=>{
    return jwt.sign(payload,process.env.JWT_SECRETKEY,{
        expiresIn:process.env.JWT_EXPIRES
    })
}

const decodeToken = async(token)=>{
    return jwt.decode(token)
}

export default {
    hashPassword,
    hashCompare,
    createToken,
    decodeToken
}