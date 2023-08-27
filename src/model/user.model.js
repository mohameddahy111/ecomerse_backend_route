import express  from 'express'
import { userSignup } from '../controller/userController.js'
import { vilditor } from '../middleware/validitor.js'
import { userSignupVildtion } from '../vildtion/user.vildtion.js'
const router = express.Router()
router.post('/users' ,vilditor(userSignupVildtion), userSignup)

export default router