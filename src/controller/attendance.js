import UserModel from '../model/user.js'
import mongoose from "mongoose";

const getAttendanceByDate = async(req,res)=>{
    
    const {date} = req.params;
  
    const start  = new Date(date);
    const end = new Date(date);
  
    end.setDate(end.getDate() + 1)
    
    try {
      const users = await UserModel.find({})
      

      for(let user of users){
       
          user.attendance?.forEach((entry, index) => {
            if (typeof entry.date === 'string') {
              user.attendance[index].date = new Date(entry.date);
            }
          })
        
      }
     

      const response = await UserModel.find({
        attendance: {
          $elemMatch: {date:{
          $gte: start,
          $lt: end,
        }}
      },
      })
  
      const filteredData = response.map((user) => {
       
        const matchedAttendance = user.attendance.find((att) => {
          const attDate = new Date(att.date);
          return attDate >= start && attDate < end;
        });
       console.log('filteruser',user)
        return {
          fullName: `${user.firstName} ${user.lastName}`,
          status: matchedAttendance?.status,
          date: matchedAttendance?.date,
          id: user._id
        };
      });
   

      if(filteredData.length){
        res.status(200).send({
          success: true,
          message: "Attendance fetched by date successfully",
          filteredData
        });
      }else{
        res.status(200).send({
          success: true,
          message: `No attendance recorded for ${date}`,
          filteredData
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({
        success: false,
        message: "Internal Server Error",
        error:error.message
      });
    }
  }

  const recordAttendance = async (req, res) => {
    const { id, status, date } = req.body;
  
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
          success: false,
          message: "Invalid user ID",
        });
      }
  
      if (!date || isNaN(new Date(date))) {
        return res.status(400).send({
          success: false,
          message: "Invalid or missing date",
        });
      }
  
      const validStatuses = ["Present", "Absent","Late"];
      if (!status || !validStatuses.includes(status)) {
        return res.status(400).send({
          success: false,
          message: "Status is invalid. Must be 'Present' or 'Absent' or 'Late'.",
        });
      }
  
      const updatedUser = await UserModel.findById(id);
      if (!updatedUser) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }
  
      updatedUser.attendance = updatedUser.attendance.filter(
        (entry) => entry && entry.date && entry.status
      );
      updatedUser.attendance.push({
        date: new Date(date),
        status,
      });
  
      await updatedUser.save();
  
      return res.status(200).send({
        success: true,
        message: "Attendance recorded successfully",
        updatedUser
      });
  
    } catch (error) {
      console.error("Attendance error:", error.message);
      return res.status(500).send({
        success: false,
        message: "Internal Server Error",
        error: error.message
      });
    }
  };
  
  const getAttendanceByStaffId = async(req,res) =>{
       const {id} = req.params

       try {

        const user = await UserModel.findOne({_id:req.params.id},{password:0})

        if(user){

          const attendance = user.attendance

          return res.status(200).send({
            success: true,
            message: "Attendance data fetched by staff id",
            attendance
          });

        }else{
          return res.status(400).send({
            success: false,
            message: "User not found"
          });
        }
        
       } catch (error) {
        return res.status(500).send({
          success: false,
          message: error.message || "Internal Server Error"
        });
       }
  }

  const manageAttendance = async(req,res)=>{

    const  {id,fullName,status,date} = req.body


      const userName  = fullName.split(" ")
  
    try {

      
      const firstName = userName[0]
      const lastName = userName[1]
     
      const data = {
        firstName: firstName,
        lastName: lastName,
        status: status,
        date:new Date(date)
        }

      const user = await UserModel.findByIdAndUpdate(id,data,{new:true})
  
      return res.status(200).send({
        success: true,
        message: "Data updated successfully",
        user
      });
  
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message || "Internal Server Error"
      });
    }
  


  }

export default {
    getAttendanceByDate,
    recordAttendance,
    getAttendanceByStaffId,
    manageAttendance
}