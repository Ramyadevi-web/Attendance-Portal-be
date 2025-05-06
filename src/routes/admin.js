import express from 'express'
import AdminController from '../controller/admin.js'
import Validate from '../middleware/Validate.js'
import AdminGuard from '../middleware/AdminGuard.js'


const router = express.Router()

router.get('/display-employee',Validate,AdminGuard,AdminController.DisplayEmployee)
router.get('/leave-request-action',Validate,AdminController.DisplayLeaveRequest)


export default router;