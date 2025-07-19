import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'  
import razorpay from 'razorpay'
import transactionModel from "../models/transactionModel.js";
import Razorpay from "razorpay";

const registerUser = async(req,res)=>{
    try{
        let {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.json({success:false, message:'Missing Details'})
        }
        

        const salt = await bcrypt.genSalt(10)  //10 adds moderate encryption
        const hashedPassword = await bcrypt.hash(password,salt)
        
        const userData = {
            name, 
            email,
            password:hashedPassword 
        }
        // console.log(userData)
        // console.log(name)
        // console.log(email)
        // console.log(password)
        const Validateuser = await userModel.findOne({email})
        let newUser;
        let user;
        let token;
        if(!Validateuser){
            newUser = new userModel(userData)
            user = await newUser.save()  //new user gets saved indata base and we get all its values in user
            token = jwt.sign({id: user._id},process.env.JWT_SECRET)
            res.json({success:true,token,user:{name:user.name}})
        }
        else{
            return res.json({success:false,message:"user Already has an Account"})
        }
        
    }
    catch(error){
            console.log(error)
            res.json({success:false,message: error.message})
        }
}

const loginUser = async(req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false,message:'User doesnt exit'})
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch){
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
            res.json({success:true,token,user:{name:user.name}})

        }else{
            return res.json({success:false,message:'Invalid credentials'})
        }

    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }}

const userCredits = async(req,res)=>{
    try {
        const userId  = req.user    //we will not send the request from body instead we will add a middleware that will add the user id in the body
        // const {userId} = req.body
        // console.log(userId)
        const user = await userModel.findById(userId)     //user using the userId above
        // console.log("print hoga hat hao",user)
        res.json({success:true, credits:user.creditBalance, user:{name:user.name}})
    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
} 

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})

const paymentRazorpay = async(req,res)=>{
    try {
        const {planId} =  req.body
        const userId = req.user._id
        const userData = await userModel.findById(userId)   //req.user and user data are same
        // console.log("User ID only:", userId);
        // console.log("Full User Data:", userData);
        if(!userId || !planId){
            return res.json({success:false,message:'Missing Details'})
        }

        let credits,plan,amount,date

        switch(planId){
            case 'Basic':
                plan = 'Basic'
                credits = 10
                amount  = 10
                break
            
            case 'Advanced':
                plan = 'Advanced'
                credits = 500
                amount  = 50
                break

            case 'Business':
                plan = 'Business'
                credits = 5000
                amount  = 250
                break
            default:
                return res.json({succes:false, message:'plan not found'})
        }

        date = Date.now();
        //now we will create a object to store all the transaction data 

        const transactionData = {
            userId,plan,amount,credits,date
        }

        const newTransaction = await transactionModel.create(transactionData)  //transactionData ia stored in data base
        // console.log("new TRan")
        // console.log(newTransaction)
        const options = {
            amount: amount*100,  //if we have 155 $ the razorpay considres it as $1.55 so multuiply by 100 razorpay takes paise not rupees
            currency: process.env.CURRENCY,
            receipt: newTransaction._id     //this reciept is used to verify the razorpay payments and it verified by the mongdb Id
        }
        // Razorpay
        await razorpayInstance.orders.create(options,(error,order)=>{
            if(error){
                // console.log("good5")
                // console.log(error);
                return res.json({success:false,message:error})
            }
            res.json({success:true, order})
        })

    } catch (error) {
        // console.log(error)
        res.json({success:false,message:error.message})
    }
}
const verifyRazorpay = async (req,res)=>{
    console.log("jk")
    try {
        const {razorpay_order_id} = req.body;
        console.log(razorpay_order_id)
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        console.log("not runninf")
        console.log(orderInfo)
        if(orderInfo.status === 'paid'){
            const transactionData = await transactionModel.findById(orderInfo.receipt)
            console.log(transactionData)
            if(transactionData.payment){
                return res.json({success:false,message:'payment failed'})
            }
            console.log("good1")
            const userData = await userModel.findById(transactionData.userId)
            console.log("good2")
            console.log(userData)
            const creditBalance = userData.creditBalance + transactionData.credits
            await userModel.findByIdAndUpdate(userData._id,{creditBalance})
            console.log(transactionData)
            const updated = await transactionModel.findByIdAndUpdate(transactionData._id,{payment:true},{ new: true } )  // Mongoose follows MongoDB defaults: the update query updates the database, but returns the original document unless you explicitly request the new one.
//Without { new: true }, your database is still updated, but the result you log is stale.  so new true  is used to send the new data 
            console.log(updated)
            res.json({success:true, message:"Credits Added"})
        }
        else{
            res.json({success:false,message:"payment Failed"})
        }
    } catch (error) {
        console.log("yaha")
        console.log(error)
        res.json({success:false,message: error.message})
        
    }
}

export {loginUser, registerUser, userCredits, paymentRazorpay,verifyRazorpay}