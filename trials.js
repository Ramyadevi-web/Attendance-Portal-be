import mongoose from 'mongoose'
// import counterModel from './counter.js';

const validateEmail = (email)=>{
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
}

const userSchema = new mongoose.Schema({
     firstName:{
        type:String,
        required:[true,'First Name is required'],

      },
      lastName:{
        type:String,
        required:[true,'Last Name is required'],

      },
    //   empId:{
    //     type:String,
    //     require:true,
    //     unique:true
    //   },
     mobile:{
        type:Number,
        required:[true,'Mobile number is required']
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        validate:{
            validator: (value)=>validateEmail(value)
        }
    },
    password: {
        type:String,
        required:[true,'Password is required.'],
        minlength:[8,'Too short.']
    },
    confirmPassword: {
        type:String
    },
    joinedDate:{
        type:Date,
        default:new Date()
    },
    department:{
        type:String,
        default:"Development"
    },
    role:{
        type:String,
        // enum:['admin','manager','staff'],
        required:[true,'Role is required'],
        default:'staff'
    },
      attendance:[{
        date: {
            type: Date
          },  
        status: {
            type: String,
            enum: ['Present', 'Absent','Late']
          },
      }]
})

// userSchema.pre('save',async function (next) {
//     const user = this;

//     if(user.isNew && !user.empId){
//         try {
//             const counter =  await counterModel.findOneAndUpdate(
//                 {id : 'empId'},
//                 {$inc : {seq : 1}},
//                 {new : true, upsert:true}
//             )

//             const paddedSeq = String(counter.seq).padStart(3,'0')

//             user.empId = `Emp${paddedSeq}`
//         } catch (error) {
//             next(error)
//         }
//     }else{
//         next()
//     }
// })

const userModel = mongoose.model('user',userSchema)

export default userModel