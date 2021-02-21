const express = require("express")
const app = express()
const mongoose= require("mongoose")
const dotenv  = require("dotenv")
// import routes
const autRoute = require("./routes/auth")
const postRoute =  require("./routes/posts")
dotenv.config()


// Connect to mongoDB
const urlMongo =  process.env.DB_CONNECT
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}
mongoose.connect(urlMongo, options).then(r => {
    console.log("Connected to mondhgo")
})
// Middleware parse the request body
app.use(express.json())

// Route middlewares
// all routes have this prefix "/api/user"
app.use("/api/user", autRoute)
app.use("/api/post", postRoute)
app.listen(3000, () => console.log("Server Running"))
