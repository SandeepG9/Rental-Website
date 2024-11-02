const {PrismaClient}  = require("@prisma/client")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
async function authenticateUser({username,password},res){

    const prisma = new PrismaClient()

    try{
        const result = await prisma.user.findUnique({
            where:{
                username
            }
        })

        const hashPassword = result.password
        const match = await bcrypt.compare(password,hashPassword)
        if(match)
        {
            const token = jwt.sign(username+password,process.env.my_secret_passoword)
            res.status(200).json({token:token})
        }
        else
        {
            res.status(409).json({message:"Username or password is wrong"})
        }
    }
    catch(err)
    {
        res.status(409).json({message:"Something went wrong"+err})
    }
    finally
    {
        prisma.$disconnect()
    }
}

module.exports = authenticateUser