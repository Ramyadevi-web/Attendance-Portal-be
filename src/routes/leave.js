import express from 'express'
import LeaveController from '../controller/leave.js'
import Validate from '../middleware/Validate.js'


const router = express.Router()

router.post('/apply-leave/:id',Validate,LeaveController.leaveApplication)
router.get('/leave-status/:id',Validate,LeaveController.getLeaveDatabyStaffId)

export default router;