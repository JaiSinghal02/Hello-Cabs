const express = require("express")
const router = express.Router()
const Rider = require("../../models/rider")
// const {connect,disconnect} = require("../../models/functions/connect")

router.post("/",async (req,res)=>{
    try{
        const userName = req.body.userName
        const rider = new Rider({
            name: userName
        })
        await rider.save()
        res.json(rider)

    }
    catch(err){
        console.log(err)
    }


})

module.exports = router