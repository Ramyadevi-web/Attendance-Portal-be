import express from 'express'
import AdminController from '../controller/admin.js'

const router = express.Router()

router.get('/display-employee',AdminController.DisplayEmployee)


export default router;