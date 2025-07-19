import mongoose from "mongoose"


const transactionSchema = new mongoose.Schema({
    userId:{type:String, required:true},
    plan:{type:String, required:true},
    amount:{type:Number,required:true},
    credits :{type:Number,required:true},
    payment:{type:Boolean, default:false},
    date:{type:Number,default:Date.now },
})

const transactionModel = mongoose.models.transaction || mongoose.model("transaction",transactionSchema)    //first it will search for th emodel named transactionSchema if it is nor found it will create one

export default transactionModel;  //with this user model we will create different apis ans using that user can create and account and user can logout