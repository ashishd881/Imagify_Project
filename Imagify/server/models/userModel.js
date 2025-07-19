import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true,unique:true},
    password:{type:String,required:true},
    creditBalance :{type:Number,default:5},
})

const userModel = mongoose.models.user || mongoose.model("user",userSchema)

export default userModel;  //with this user model we will create different apis ans using that user can create and account and user can logout