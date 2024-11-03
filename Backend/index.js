const express = require("express")
const jwt = require("jsonwebtoken");
const createUser = require("./Queries/createUser");
const authenticateUser = require("./Queries/AuthenticateUser");
const cors = require("cors")
require('dotenv').config();
require('./databaseConnection')


const app = express()
app.use(cors())
app.use(express.json())

app.post("/signup",(req,res)=>{
    createUser(req.body,res)
})

app.post("/signin",(req,res)=>{
    authenticateUser(req.body,res)
})

app.listen(process.env.portNumber,()=>{
    console.log("on port 3000")
})