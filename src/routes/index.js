import express from 'express'
import UserRoutes from './user.js'
import AttendanceRoutes from './attendance.js'
import ManagerRoutes from './manager.js'
import LeaveRoutes from './leave.js'
import AdminRoutes from './admin.js'

const router = express.Router()

router.use('/user',UserRoutes)
router.use('/attendance',AttendanceRoutes)
router.use('/manager',ManagerRoutes)
router.use('/leave',LeaveRoutes)
router.use('/admin',AdminRoutes)

export default router;