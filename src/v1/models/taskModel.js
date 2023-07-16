/*
    title : Task Model
    author : MHRS
    date : 12/07/2023
*/

const {Schema, model} = require("mongoose")

const taskSchema = new Schema({
    userEmail : {
        type : String,
        ref : "user.email",
        required : true,
    },
    title : {
        type : String,
        maxlength : 256,
        default : "Untitled"
    },
    description : {
        type : String,
        required : true,
    },
    status : {
        type : String,
        required : true,
        enum : ["Pending", "Successfull", "Cancled"],
        default : "Pending"
    }
}, {
    timestamps : true, versionKey : false
})

const TaskModel = model("task", taskSchema)

module.exports = TaskModel