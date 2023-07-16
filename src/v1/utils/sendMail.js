const nodemailer = require('nodemailer')
require('dotenv').config({path : `.env.${process.env.NODE_ENV}`})

const transporter = nodemailer.createTransport({
    host : 'smtp.gmail.com',
    port : 587,
    auth : {
        user : process.env.SMTP_EMAIL,
        pass : process.env.SMTP_PASS
    }
})

const sendMail = async (mailOpt) =>{

   const data = transporter.sendMail(mailOpt, 
        (err, info)=>{
            if(err){
                console.log(err)
            }
            else{
                console.log(info)
            }
        })
        return data
}

module.exports = sendMail