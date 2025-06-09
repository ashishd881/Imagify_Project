import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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

export {loginUser, registerUser, userCredits}