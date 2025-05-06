import express from 'express'
import AttendanceController from '../controller/attendance.js'
import Validate from '../middleware/Validate.js'


const router = express.Router()

router.post('/record-attendance',Validate,AttendanceController.recordAttendance)
router.get('/attendance-by-date/:date',Validate,AttendanceController.getAttendanceByDate)
router.get('/attendance-by-staffid/:id',Validate,AttendanceController.getAttendanceByStaffId)
router.put('/manage-attendance',Validate,AttendanceController.manageAttendance)

export default router;