import UserModel from '../model/user.js'

const DisplayStaff = async(req,res)=>{


    try {
        const users = await UserModel.find({})

        if(users.length>0){
            res.status(200).send({
                success:true,
                msessage:"Data fetched successfully",
                users
              })
        }else{
            res.status(200).send({
                success:true,
                msessage:"No User Found"
              })
        }
    } catch (error) {
        res.status(500).send({
            success:false,
            message:error.message
          })
    }
}

const ActionToLeaveRequest = async(req,res)=>{

    try {
        const users = await UserModel.find({})

        const filteredData =  users.filter(
          user =>  (user.role === 'Staff') && (user.leaveData.length > 0)
        )
    
        res.status(200).send({
            success:true,
            message:'Leave Data fetched successfuly',
            filteredData
        })
       
    } catch (error) {
        res.status(500).send({
            success:true,
            message:error.message || 'Internal server error'
            
        })
    }
   

}

const updateAction = async (req,res)=>{
    const id = req.params.id
    const {leaveIndex , userIndex , status} = req.body

    try {
        const updatedField = `leaveData.${leaveIndex}.status`
        console.log("upd",{updatedField : status})
        const user = await UserModel.findByIdAndUpdate(id,{$set:{[updatedField] : status}},
                                                          {new:true}
                                                             )
    
        res.status(200).send({
            success:true,
            message:"Status updated successfully",
            user
        })
    } catch (error) {
        res.status(500).send({
            success:true,
            message:error.message || 'Internal server error'
            
        })
    }
}

export default {
    DisplayStaff,
    ActionToLeaveRequest,
    updateAction
}
   