import axios from "axios"
import userModel from "../models/userModel.js"
import FormData from "form-data"

export const generateImage = async(req,res)=>{
    try {
        
        const {prompt} = req.body    //we will get the prompt from body and for userId we will  use the middleware
        const userId = req.user
        // console.log(prompt);
        // console.log(userId)
        const user = await userModel.findById(userId)
        
        if(!user || !prompt){
            return res.json({success :false,message: "Missing Details"})
        }
        if(user.creditBalance === 0 || user.creditBalance < 0 ){
            return res.json({success:false, message:'No Credit Balance', creditBalance: user.creditBalance})
        }
        // console.log("error1")
        //creting the multipart form data
        const formData = new FormData()
        formData.append('prompt',prompt)

        const {data}  = await axios.post('https://clipdrop-api.co/text-to-image/v1',formData,{      //in data w ewill get the response as array buffer
            headers: {
                'x-api-key': process.env.CLIPDROP_API,
            },
            responseType:'arraybuffer'
        })
        // console.log("error2")
        const base64Image = Buffer.from(data,'binary').toString('base64')
        const resultImage = `data:image/png;base64,${base64Image}`
        // console.log(base64Image)
        // console.log(resultImage)
        await userModel.findByIdAndUpdate(user._id,{creditBalance:user.creditBalance - 1})
        res.json({success:true, message:"Image Generated",creditBalance: user.creditBalance-1, resultImage})

    } catch (error) {
        console.log(error.message)
        // console.log("yaha se error aa rahi hai")
        res.json({success:false, message:error.message})
    }
}

