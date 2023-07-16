/**
*   title : User Controller
*   date : 13/07/2023
*   @author  MHRS
*   @module UserController
*/


const { default: slugify } = require("slugify")
const PendingModel = require("../models/pendingModel")
const UserModel = require("../models/userModel")
const CustomError = require("../utils/customError")
const generateToken = require("../utils/generateToken")
const { createHash, verifyHash } = require("../utils/hash")
const sendMail = require("../utils/sendMail")



/**
 * Signup Controller for User
 * @async
 */

exports.signup = async (req, res, next) => {
        try {
            const {name, email, password} = req.body  //get data
            if(!name || !email || !password){   //check data
                console.log(name,email,password)
                throw new CustomError({status : 400, data : "fill all the field"})   
            }else{
                const existUser = await UserModel.findOne({email})  //check if user exist
                if(existUser){
                    throw new CustomError({type : "User Input", status : 400, data : "user already exist"})
                }

                const hashPassword = await createHash(password)   //hash password
                const userData = {name,email,password : hashPassword}   //create userData
                
                const token = await generateToken(userData)  //create verification link  
                const hashedToken = await createHash(token)
                const link = await slugify(hashedToken, {remove : /[$*_+~.()'"!:\/@]|(dollar)/g, lower : true}) 


                const pendingUser = await PendingModel.findOne({email}) //check if user is pending
                if(!pendingUser){
                    const user = await new PendingModel({...userData, verificationToken : link})    //save pending
                    .save()
                    .then(()=>{
                        return res.json({msg : "check your email for verification",link})
                    })
                    .catch((error)=>{ 
                        console.log(error)
                        throw new CustomError({type : "Database"})
                    })
                }
                else{
                    await PendingModel.findOneAndUpdate({email},{verificationToken : link}) //update verification link
                        sendMail({
                        to : email,
                        from : "TaskManager",
                        subject : "tests",
                        text : `https://taskmanager-py5i.onrender.com/verify/${link}`,
                        type : "html"
                       })
                    return res.json({msg : "check your email for verification",link})
                }
            }
        } catch (error) {   //if there was any error
            next(error)
        }
    }

/**
 * Email Verification Controller for User
 * @async
 */
exports.verifyEmail = async (req, res, next) =>{
    try {
        const {token} = req.params
        const user = await PendingModel.findOneAndDelete({verificationToken : token})
        if(!user){
            throw new CustomError({type : "Verification", data : "invalid or expired token"})
        }
        else{
            const {name, email, password} = user
            await UserModel({name, email, password}).save()
            return res.json({msg : "verification successfull"})
        }
    } catch (error) {
        next(error)
    }
}

/**
 * Login Controller for User
 * @async
 */

exports.login = async (req, res, next) =>{
    try {
        try {
            const {email, password} = req.body  //get data
            if(!email || !password){
                throw new CustomError({type : "User Input", status : 400, data : "fill all the field"})
            }
            else{
                const user = await UserModel.findOne({email})   // get user
                if(!user){  //check user 
                    const pending = await PendingModel.findOne({email})
                    if(pending){
                        return res.json({msg : "check your email for verification"})
                    }
                    throw new CustomError({type : "Database", status : 400, data : "no user found, try signup"})
                }
                else{
                    const verified = await verifyHash(password, user?.password) // check password
                    if(!verified){   
                        throw new CustomError({type : "User Input", status : 400, data : "email and password doesn't match"})
                    }
                    else{
                       const token = await generateToken(user)
                       return res.json({msg : "Successfully loged in", data :{access_token : token}})
                    }
                }
            }
        } catch (error) {
            if(error instanceof CustomError){next(error)}
            else{throw new CustomError()}
        }
    } catch (error) {
        error.source = "login"
        next(error)
    }
}

/**
 * Check Profile - Controller
 * @async
 */
exports.checkProfile = async (req, res, next) =>{
    try {
        const {_id} = req.user
        if(!_id){
            throw new CustomError({type : "Authorization"})
        }
        const user = await UserModel.findById(_id, {name : 1, email : 1})
        if(!user){
            throw new CustomError({type : "Database", status : 500, data : "check user id"})
        }
        else{
            res.json({data : {user}})
        }
    } catch (error) {
        error.source = "checkProfile"
        next(error)
    }
}

/**
 * Update Profile - Controller
 * @async
 */
exports.updateProfile = async (req, res, next) =>{
    try {
        const {_id} =req.user
        if(!_id){
            throw new CustomError({type : "Authorization"})
        }
        const userData = req.body.userData
        const user = await UserModel.findByIdAndUpdate(_id,user)
        if(!user){
            throw new CustomError({type : "Database"})
        }
    } catch (error) {
        error.source = {file : __dirname + __filename, function : "updateProfile"}
        
    }
}


/**
 * Delete Profile - Controller
 * @async
 */
exports.deleteProfile = async (req, res, next) =>{
    try {
        const {_id} = req.user
        if(!_id){
            throw new CustomError({type : "Authorization"})
        }
        const user = await UserModel.findByIdAndDelete(_id)
        if(!user){
            throw new CustomError({type : "Database"})
        }
    } catch (error) {
        error.source = "deleteProfile"
        next(error)
    }
}