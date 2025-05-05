import UserModel from "../model/user.js"

const leaveApplication = async (req,res)=>{

    let {leaveType,fromDate,toDate,reason} = req.body

    const {id} = req.params 
 

    try {
        
    const user = await UserModel.findOne({_id:id},{password:0})

    fromDate = new Date(fromDate)
    toDate = new Date(toDate)

    if(!user){
        return res.status(400).send({
            success: false,
            message: "User Not Found"
          });
    }

  

    user.leaveData.push({
       leaveType,
       fromDate,
       toDate,
       reason
    })

    await user.save()

    return res.status(200).send({
        success: true,
        message: "Attendance recorded successfully",
        user
      });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error.message
          });   
    }


}

const getLeaveDatabyStaffId = async(req,res)=>{

    let {id} = req.params

    try {
        let sickCount = 0, casualCount = 0;
        const user = await UserModel.findOne({_id:id},{password:0})

        if(!user){
            return res.status(400).send({
                success: false,
                message: "User not found.",
                error: error.message
              });
        }

        const leaveDatas = user.leaveData

        for(let leaveData of leaveDatas){
            if(leaveData.leaveType === 'Casual')
                casualCount++
            else if(leaveData.leaveType === 'Sick'){
                sickCount++
            }
        }

        return res.status(200).send({
            success: true,
            message: "Attendance status fetched successfully",
            leaveDatas,
            sickCount,
            casualCount
          });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error.message
          });
    }
}

export default {
    leaveApplication,
    getLeaveDatabyStaffId
}