require("./config/mongoose")();
const http = require("node:http")
const express = require("express")
const catagoryRoute = require("./routes/catagory.route")
const userRoute = require("./routes/user.route")

const app = express()

app.use(require("morgan")("dev"))
app.use(express.json())

app.use("/catagory", catagoryRoute);
app.use("/user", userRoute)

const server = http.createServer(app)
const port = 3000
server.listen(port, ()=>{
    console.log(`Server is on port : ${port}`)
});

module.exports = app;