/*
    title : User Model
    author : MHRS
    date : 12/07/2023
*/

//dependencies
const {Schema, model} = require("mongoose")

const userSchema = new Schema({
    name : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 30,
    },
    email : {
        type : String,
        required : true,
        minlength : 8,
        maxlength : 40,
        unique : true,
    },
    // contact_no : {
    //     type : String,
    //     required : true,
    //     minlength : 11,
    //     maxlength : 11,
    // },
    password : {
        type : String,
        required : true,
        minlength : 8,
        maxlength : 256,
    }
},{ timestamps : true, versionKey : false})

const UserModel = model("user", userSchema)


module.exports = UserModel
