import express  from  'express'
import { addCategoriesVildtion } from '../vildtion/category.vildtion.js'
import { vilditor } from '../middleware/validitor.js'
import { adminAuth } from '../middleware/auth/adminAuth.js'
import { addCategories, getAllCategories } from '../controller/category.controller.js'

const router = express.Router()
router.get('/category'  ,  getAllCategories)
router.post('/category'  ,adminAuth, vilditor(addCategoriesVildtion) , addCategories)


export default router