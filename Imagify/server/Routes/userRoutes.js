import express from 'express'
import {registerUser, loginUser, userCredits, paymentRazorpay, verifyRazorpay} from '../controllers/userController.js'
import userAuth from '../Middleware/auth.js'


const userRouter = express.Router()

userRouter.post('/register', registerUser) //http://localhost:4000/api/user/registerUser

userRouter.post('/login', loginUser)    //http://localhost:4000/api/user/login
userRouter.get('/credits',userAuth,userCredits)  //http://localhost:4000/api/user/credits   
//useAuth is for middleware
userRouter.post('/pay-razor',userAuth,paymentRazorpay)  //http://localhost:4000/api/user/pay-razor   
userRouter.post('/verify-razor',userAuth,verifyRazorpay)      ////http://localhost:4000/api/user/verify-razor   

export  default userRouter

