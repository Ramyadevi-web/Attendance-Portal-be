import express from 'express'
import UserRoutes from './user.js'
import AttendanceRoutes from './attendance.js'
import ManagerRoutes from './manager.js'
import LeaveRoutes from './leave.js'

const router = express.Router()

router.use('/user',UserRoutes)
router.use('/attendance',AttendanceRoutes)
router.use('/manager',ManagerRoutes)
router.use('/leave',LeaveRoutes)

export default router;