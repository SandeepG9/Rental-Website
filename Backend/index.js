const express = require("express")
const jwt = require("jsonwebtoken");
const createUser = require("./Queries/createUser");
require('dotenv').config();
require('./databaseConnection')

const app = express()
app.use(express.json())

app.post("/signup",(req,res)=>{
    createUser(req.body,res)
})
app.listen(process.env.portNumber,()=>{
    console.log("on port 3000")
})