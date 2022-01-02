const express = require("express")
const router = express.Router()
const Driver = require("../../models/driver");
// const {connect,disconnect} = require("../../models/functions/connect")

router.post("/",async(req,res)=>{
    try{
        const id = req.body.id
        const x_cord = req.body.position.x_coordinate
        const y_cord = req.body.position.y_coordinate
        let driver = await Driver.findByIdAndUpdate(id,{
            $set:{
                position:{
                    x_coordinate: x_cord,
                    y_coordinate:y_cord
                }
            }
        },{new:true})
        if(!driver) return res.send("Wrong ID")
        res.send(driver)
    }
    catch(err){
        console.log(err)
    }
    
})

module.exports = router