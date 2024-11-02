const {PrismaClient} = require("@prisma/client")
const bcrypt = require("bcrypt")
const prisma = new PrismaClient()

async function createUser({username,password,lastname,firstname},res)
{
    try{
        // Getting the data of user from databases
    const userfound = await prisma.User.findUnique({
        where:{username}
    })
    // Checking if the user Exist in database
    if(userfound)
    {
        res.status(409).json({message:"Account Already Exist"})
    }
    else
    {
        const hashedPassword = await bcrypt.hash(password,10)
        const newuser = await prisma.User.create({
            data:{
                username,
                password:hashedPassword,
                firstname,
                lastname 
            }})
            res.status(200).json({message:"Account Created"})
    }
    }
    catch(err)
    {
        res.status(404).json({message:"something went wrong"+err})
    }
    finally
    {   
        prisma.$disconnect()
    }   
}

module.exports = createUser