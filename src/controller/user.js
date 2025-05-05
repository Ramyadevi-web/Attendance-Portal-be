import Auth from "../utils/auth.js"
import UserModel from '../model/user.js'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'

dotenv.config()

const signIn = async(req,res) =>{
 try {

    const {email,password} = req.body

    let user = await UserModel.findOne({email:email})

    //checking is user exist or not
    if(!user){
        res.status(400).send({
            success:false,
            message:"Invalid email id"
        })
    }else{
      
        //comparing the given password with database
        if(await Auth.hashCompare(password,user.password)){
            
            
            let token = await Auth.createToken({
                email:user.email,
                role:user.role,
                id:user._id,
                name:user.name
            })
       

           res.status(200).send({
            success:true,
            message:"User signed in successfully",
            role:user.role,
            id:user._id,
            name:user.name,
            token
           })
        }else{
            res.status(400).send({
                success:false,
                message:"Incorrect password",
                user
            })
        }
    }
 } catch (error) {
    res.status(500).send({
        success:false,
        error: error.message
    })
 }   
}

const signUp = async(req,res) =>{
    try {
        let {password,confirmPassword} = req.body

        let user = await UserModel.findOne({email:req.body.email})

        if(!password || password.length < 8){
            return res.status(400).send({
                success:false,
                message:`Password length should be atleast 8 character`
            })
        }

        if(password != confirmPassword){
            return  res.status(400).send({
                success:false,
                message:`Password and Confirm password doesn't match`
            })
        }

        if(!user){
            req.body.password = await Auth.hashPassword(req.body.password)
            delete req.body.confirmPassword;
            let createdUser = await UserModel.create(req.body)
            console.log("cre",createdUser)
            res.status(201).send({
                success:true,
                message:`Account ${req.body.email} created successfully.`,
                createdUser
            })
        }else{
            res.status(400).send({
                success:false,
                message:`User with ${req.body.email} already exist.`
            })
        }

    } catch (error) {
        console.log(error)
       res.status(500).send({
           success:false,
           error: error.message || "Internal Server Error"
       })
    }   
   }

const getUserById = async (req,res) =>{
    try {
      let user = await UserModel.findOne({_id:req.params.id},{password:0})
      if(user){
        res.status(200).send({
            success:true,
            message:"User data fetched successfully",
            user
        })
      }else{
        res.status(400).send({
            success:false,
            message:"Invalid user id"
        })
      }
    } catch (error) {
       res.status(500).send({
           success:false,
           error: error.message
       })
    }   
   }

const getAllUser = async (req,res) =>{
    try {
        let users = await UserModel.find({},{password:0})
        if(users){
          res.status(200).send({
              success:true,
              message:"User data fetched successfully",
              users
          })
        }else{
          res.status(200).send({
              success:true,
              message:"No Users"
          })
        }
    } catch (error) {
       res.status(500).send({
           success:false,
           error: error.message
       })
    }   
   }


   const forgotPassword = async (req,res) =>{
    try {
        const {email} = req.body

        if (!email) { //to handle empty field
            return res.status(400).send({
              success: false,
              message: "Invalid email id"
            });
          }

        let user = await UserModel.findOne({email:email})

        if(user){

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: process.env.EMAIL_USER,        
                  pass: process.env.EMAIL_PASS           
                }
              });

              const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRETKEY, { expiresIn: process.env.JWT_EXPIRES});

              const resetUrl = `${process.env.FRONTEND_URL}/updatepassword/${resetToken}`;
     
               const message = {
                 from: 'ramyadevim06@gmail.com',
                 to: user.email, 
                 subject: 'Password Reset Link',
                 html: `<p>Click <a href="${resetUrl}">Reset Password </a> to reset password.</p>`
               };

               transporter.sendMail(message, (err, info) => {
                if (err) {
                  console.error('Error while sending email:', err);
                  return res.status(500).send({
                    success: false,
                    message: "Failed to send email",
                    error: err.message
                  });
                }
      
                console.log('Email sent:', info.response);
                return res.status(200).send({
                  success: true,
                  message: "Reset password link sent to your email address"
                });
              });
              
           res.status(200).send({
            success:true,
            message:`Reset password link sent to your mail ${user.email}.`
           })
        }else{
            res.status(400).send({
                success:false,
                error: error.message || "Account does not exist"
            })
        }
    
    } catch (error) {
       res.status(500).send({
           success:false,
           error: error.message
       })
    }   

   }

   const updatePassword = async (req,res) =>{
    try {
       const {password} = req.body

       const {token} = req.params

        if(!password){
            return res.status(400).send({
             success:false,
            message:"Invalid Password"
        })
        }else if(!token){
            return res.status(400).send({
                success:false,
                message:"Invalid Token"
            })
       }

       if(password.length < 8){
        return res.status(400).send({
            success:false,
            message:"Password should contain atleast 8 character"
        })
       }

       const hashPassword = await Auth.hashPassword(req.body.password)

       const decoded = jwt.verify(token,process.env.JWT_SECRETKEY)
         
       const userId = decoded.id;

       await UserModel.findByIdAndUpdate(userId, {password:hashPassword}, {new:true})
       .then((user) => {
        if (user) {
            return res.status(200).send({
                success: true,
                message: "Password updated successfully",
              });
        }else{ 
            return res.status(400).send({
                success: false,
                message: "User not found",
            });
        }
   } ).catch ((error)=> {
      return res.status(400).send({
         success: false,
         message: error.message || "Invalid or expired token",
       });
   })
        
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message || "Internal Server Error",
          });
    }
   }


   export default {
    signIn,
    signUp,
    getUserById,
    getAllUser,
    forgotPassword,
    updatePassword
   }