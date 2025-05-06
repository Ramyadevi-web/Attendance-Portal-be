import express from 'express'
import ManagerController from '../controller/manager.js'
import Validate from '../middleware/Validate.js'

const router = express.Router()

router.get('/display-staff',Validate,ManagerController.DisplayStaff)
router.get('/leave-request-action',Validate,ManagerController.DisplayLeaveRequest)
router.put('/leave-request-action/:id',Validate,ManagerController.updateAction)


export default router;