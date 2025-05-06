import UserModel from '../model/user.js'

const DisplayEmployee = async(req,res)=>{
    try {
        const users = await UserModel.find({attendance:{$ne:[]}})
        // console.log(users)

        if(!users){
            return res.status(200).send({
                success:true,
                message:"No User Found"
              })
        }

        const employeeData = users.map((user)=>{
            console.log('user',user)
            const presentCount = user.attendance.filter((entry)=>entry.status === 'Present').length
            const absentCount = user.attendance.filter((entry)=>entry.status === 'Absent').length

            return{
                userId:user._id,
                presentCount:presentCount,
                absentCount:absentCount,
                userName:`${user.firstName}  ${user.lastName}`
            }
           })

           return res.status(200).send({
            success:true,
            message:"Employee datas fetched successfully",
            employeeData
          })
        } catch (error) {
        res.status(500).send({
            success:false,
            message:error.message
          })
    }
}

export default {
    DisplayEmployee
}