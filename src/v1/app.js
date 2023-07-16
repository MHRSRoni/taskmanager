/*
    title : task manager 
    author : MHRS
    date : 12/07/2023
*/

//dependencies
const express = require("express")
const errorController = require("./controllers/errorController")
const CustomError = require("./utils/customError")
const userRouter = require("./routers/userRouter")
const mongoose = require("mongoose")
const cors = require('cors')
require("dotenv").config({path : `.env.${process.env.NODE_ENV}`})

const app = express()
app.use(express.json())

app.use(cors())
app.use("/", userRouter)
app.use("*", (req, res) => res.json("requested url doesn't exist"))

app.use(errorController)

app.start = () =>{
    app.listen(process.env.PORT,    //server
     ()=>{
        console.log(`running on port ${process.env.PORT}`)  
        mongoose.connect(process.env.DATABASE_URI,{family : 4}) //database
        .then(()=>{
            console.log(`database connected`)
        })
        .catch(()=>{
            console.log('database connection failed')
        })
     })
    }

module.exports = app