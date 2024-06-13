const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcryptjs = require("bcryptjs")
const { blogmodel } = require("./Models/Blog.js")


const app = express()
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb+srv://eby99:qwerty123@cluster0.snm8zbn.mongodb.net/blogDB?retryWrites=true&w=majority&appName=Cluster0")

const generateHashPasswd = async (passwd) => {
    const salt = await bcryptjs.genSalt(10)
    return bcryptjs.hash(passwd, salt)
}

app.post("/signup", async (req, res) => {
    let input = req.body
    let hashPasswd = await generateHashPasswd(input.passwd)
    console.log(hashPasswd)
    input.passwd=hashPasswd
    let blog = new blogmodel(input)
    blog.save()
    res.json({ "status": "success" })

})



app.listen(8086, () => {
    console.log("Server ON !")
})