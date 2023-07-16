const jwt = require("jsonwebtoken")
const CustomError = require("./customError")
require("dotenv").config({path : `.env.${process.env.NODE_ENV}`})

/**
 * Create access_token for user
 * @param {object} User - User Object 
 * @param {object} User._id - User _id 
 * @param {string} User.name - User name 
 * @param {string} User.email - User email 
 * @returns {string}  token 
 */

const generateToken = async (User) =>{
    try {
        const {_id, name, email} = User
        const data = {_id, name, email}
        const token = await jwt.sign(data, process.env.JWT_SECRET, { expiresIn : "7d"})
        return token
    } catch (error) {
        throw new CustomError({type : "Token Creation"})
    }
}

module.exports = generateToken