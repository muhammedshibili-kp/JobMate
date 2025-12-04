import express from 'express'
import { getUserData, loginUser, registerUser } from '../controllers/AuthController.js'
import { protect } from '../middleware/AuthMiddleware.js'

const authRouter = express.Router()


authRouter.post('/register',registerUser)
authRouter.post('/login',loginUser)
authRouter.post('/me',protect,getUserData)


export default authRouter