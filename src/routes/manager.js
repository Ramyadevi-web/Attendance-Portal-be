import express from 'express'
import ManagerController from '../controller/manager.js'

const router = express.Router()

router.get('/display-staff',ManagerController.DisplayStaff)
router.get('/leave-request-action',ManagerController.ActionToLeaveRequest)
router.put('/leave-request-action/:id',ManagerController.updateAction)


export default router;