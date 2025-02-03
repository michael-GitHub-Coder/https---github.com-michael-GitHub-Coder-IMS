import jwt, { decode } from "jsonwebtoken";

export const verifyToken = (req,res,next) =>{

    const  token = req.cookies.token;
    if(!token){
        return res.status(401).json({success:false,message:"Unauthorised - no token provided."})
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRETE);

        if(!decoded){
            return res.status(401).json({success:false,message:"Unauthorised - Invalid token."})
        }

        req.userId = decoded.userId;
        next();

    } catch (error) {
         return res.status(500).json({success:false,message:"Server error."})
    }
}