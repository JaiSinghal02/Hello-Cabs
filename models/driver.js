const mongoose = require("mongoose")

const Driver = mongoose.model('Driver',new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trime: true
    },
    rating:{
        type: Number,
        default: 5
    },
    status:{
        type: String,
        default: "Free"
    },
    total_rides:{
        type:Number,
        default: 0
    },
    position:{
        x_coordinate:{
            type: Number
        },
        y_coordinate:{
            type:Number
        }
    }
}))

module.exports = Driver