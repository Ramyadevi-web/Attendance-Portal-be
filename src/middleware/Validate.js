import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()

const validate = async(req,res,next)=>{
    try {
        
        let token = req?.headers?.authorization?.split(" ")[1]

        if(token){
            let payload =  jwt.verify(token,process.env.JWT_SECRETKEY)
            console.log(payload)
            next()
        }else{
            res.status(402).send({
                success:false,
                message:"Token Expired"
            })
        }
    } catch (error) {
        res.status(500).send({
            success:false,
            error: error.message
        })
    }
}

export default validate