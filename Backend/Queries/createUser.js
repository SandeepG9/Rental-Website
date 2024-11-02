const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient()

async function createUser({username,password,lastname,firstname},res)
{
    try{
    const userfound = await prisma.User.findUnique({
        where:{username}
    })

    if(userfound)
    {
            res.status(401).json({message:"Account Already Exist"})
    }
    else
    {
        const newuser = await prisma.User.create({
            data:{
                username,
                password,
                firstname,
                lastname 
            }})
            res.status(200).json({message:"Account Created"})
    }
    }
    catch(err)
    {
        res.status(404).json("something went wrong")
    }
    finally
    {   
        prisma.$disconnect()
    }   
}

module.exports = createUser