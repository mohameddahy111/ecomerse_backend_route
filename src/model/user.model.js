import express  from 'express'
import { allUsers, userSignup  ,login , updateUserProfile , deleteUser} from '../controller/userController.js'
import { vilditor } from '../middleware/validitor.js'
import { userSignupVildtion,userLoginVildtion, userupdateVildtion } from '../vildtion/user.vildtion.js'
import { adminAuth } from '../middleware/auth/adminAuth.js'
import { auth } from '../middleware/auth/auth.js'
const router = express.Router()
router.post('/users' ,vilditor(userSignupVildtion), userSignup)
router.get('/users' ,adminAuth, allUsers)
router.delete('/users/:id' ,adminAuth, deleteUser)
router.post ('/users/sign_in',vilditor(userLoginVildtion)  , login)
router.put('/users/update_profile',auth , vilditor(userupdateVildtion),updateUserProfile)

export default router