import express from 'express'
import {registerUser, loginUser, userCredits} from '../controllers/userController.js'
import userAuth from '../Middleware/auth.js'


const userRouter = express.Router()

userRouter.post('/register', registerUser) //http://localhost:4000/api/user/registerUser

userRouter.post('/login', loginUser)    //http://localhost:4000/api/user/login
userRouter.get('/credits',userAuth,userCredits)  //http://localhost:4000/api/user/credits   
//useAuth is for middleware

export  default userRouter

