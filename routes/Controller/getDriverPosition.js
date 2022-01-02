const express = require("express")
const router = express.Router()
const Driver = require("../../models/driver");
// const {connect,disconnect} = require("../../models/functions/connect")

// Response: {“x_coordinate”:3, “y_coordinate”:5}

router.get("/",async(req,res)=>{
    try{
        const id= req.query.id //driver id
        let driver = await Driver.findById(id)
        if(!driver) return res.send("Wrong ID")
        res.send(driver.position)
    }
    catch(err){
        console.log(err)
    }
})



module.exports = router