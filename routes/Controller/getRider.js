const express = require("express")
const router = express.Router()
const Rider = require("../../models/rider")
// const {connect,disconnect} = require("../../models/functions/connect")

router.get("/",async(req,res)=>{
    try{
        const id = req.query.id
        const rider = await Rider.findById(id).select({__v:0,rides:0})
        if(rider.currentlyInRide)
        {
            return res.json(rider);
        }
        delete rider["rideId"];
        res.json(rider);
    }
    catch(err){
        console.log(err)
    }

})

module.exports = router