import express from 'express'
import UserController from '../controller/user.js'
import Validate from '../middleware/Validate.js'
import AdminGuard from '../middleware/AdminGuard.js'

const router = express.Router()

router.get('/',Validate,AdminGuard,UserController.getAllUser)
router.get('/:id',Validate,UserController.getUserById)
router.post('/signIn',UserController.signIn)
router.post('/signUp',UserController.signUp)
router.post('/forgotPassword',UserController.forgotPassword)
router.post('/updatePassword/:token',UserController.updatePassword)

export default router;