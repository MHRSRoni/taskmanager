/*
    title : Error Controller
    author : MHRS
    date : 13/07/2023
*/

const errorController =(err, req, res, next) =>{
    if(err.res){
        res.status(err?.status || 500).json({Error : err?.description || "Internal Server Error"})
    }
    if(err.log){
        err.printLog()
    }
}


module.exports = errorController