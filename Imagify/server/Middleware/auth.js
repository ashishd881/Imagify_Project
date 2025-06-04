import jwt from 'jsonwebtoken'



const userAuth = async (req , res, next)=>{
    const {token} = req.headers;

    if(!token){
        return res.json({ success:false, message:'Not Authorized Login Again'})
    }

    try{
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        console.log(tokenDecode)    
        console.log(tokenDecode.id)
        if(tokenDecode.id)
        {
            console.log("ans2");
            // req.body.userId = tokenDecode.id;
            // console.log(req.body)
            const user = await user.findById(tokenDecode._id)
            req.user = user;
        }
        else{
            console.log("ans3");
            return res.json({success:false,message:'Not Authorized. Login Again'})
        }
        next();

    }
    catch(error){
        console.log(req.body)
        console.log("ans4");
        res.json({success:false, message: error.message})
    }
}

export default userAuth;