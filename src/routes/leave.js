import express from 'express'
import LeaveController from '../controller/leave.js'

const router = express.Router()

router.post('/apply-leave/:id',LeaveController.leaveApplication)
router.get('/leave-status/:id',LeaveController.getLeaveDatabyStaffId)

export default router;