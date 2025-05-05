import express from 'express'
import AttendanceController from '../controller/attendance.js'

const router = express.Router()

router.post('/record-attendance',AttendanceController.recordAttendance)
router.get('/attendance-by-date/:date',AttendanceController.getAttendanceByDate)
router.get('/attendance-by-staffid/:id',AttendanceController.getAttendanceByStaffId)
router.put('/manage-attendance',AttendanceController.manageAttendance)

export default router;