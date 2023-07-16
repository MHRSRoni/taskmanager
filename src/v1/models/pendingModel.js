const {Schema, model} = require("mongoose")

const pendingSchema = new Schema({
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
    //     req : true,
    //     minlength : 11,
    //     maxlength : 11,
    // },
    password : {
        type : String,
        required : true,
        minlength : 8,
        maxlength : 256,
    },
    verificationToken : {
        type : String,
        required : true
    }
},{ timestamps : true, versionKey : false})

const PendingModel = model("pending", pendingSchema)

module.exports = PendingModel