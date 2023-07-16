const { signup, login, checkProfile, deleteProfile, verifyEmail } = require("../controllers/userController")
const { auth } = require("../middlewares/auth")

const userRouter = require("express").Router()

userRouter.post("/signup", signup)
userRouter.get("/verify/:token", verifyEmail)
userRouter.post("/login", login)
userRouter.get("/profile", auth, checkProfile)
userRouter.delete("/profile", auth, deleteProfile)




module.exports = userRouter