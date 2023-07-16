/**
 * Authorization middleware with JWT
 */

const jwt = require("jsonwebtoken")
const CustomError = require("../utils/customError")
const dot = require("dotenv").config({path : `.env.${process.env.NODE_ENV}`})

exports.auth = async (req, res, next) =>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        try {
            const data = jwt.verify(token, process.env.JWT_SECRET)
            req.user = data
            next()
        } catch (error) {
            console.log(error)
            throw new CustomError({type : "Token" ,status : 400, data : "authorization failed"})
        }
    } catch (error) {
        next(error)
    }
}