const express= require("express")
const router = express.Router()
const mongoose = require("mongoose")
// mongoose.connect('mongodb+srv://JaiSinghal:Mongodbsinghal@02@cluster0.nqilo.mongodb.net/MongoDataBase?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology: true })
//  .then(()=> console.log('Connected to mongodb server...'))
//  .catch(err=> console.error('Error connecting:',err.message));
//const User = require("./Controller/User/index")
//const Driver = require("./Controller/Driver/index")
const getAllDrivers = require("./Controller/getAllDrivers")
const getDriver = require("./Controller/getDriver")
const getDriverRides = require("./Controller/getDriverRides")
const getDriverPosition = require("./Controller/getDriverPosition")
const updatePosition = require("./Controller/updatePosition")

//router.use('/user',User)
router.use('/driver/getAllDrivers',getAllDrivers)
router.use('/driver/getDriverPosition?:id',getDriverPosition)
router.use('/driver/getDriver?:id',getDriver)
router.use('/driver/getMyRides?:id',getDriverRides)
router.use('/driver/updatePosition',updatePosition)



const signup = require("./Controller/signup")
const getRider = require("./Controller/getRider")
const getRiderRides = require("./Controller/getRiderRides")
const rideDetails = require("./Controller/rideDetails")
const getNearByCabs = require("./Controller/getNearByCabs")
const bookCab = require("./Controller/bookCab")
const startRide = require("./Controller/startRide")
const endRide = require("./Controller/endRide")
const rateRide = require("./Controller/rateRide")


router.use('/rider/signup',signup)
router.use('/rider/getRider?:id',getRider)
router.use('/rider/getMyRides?:id',getRiderRides)
router.use('/rider/showDetailsForRide',rideDetails)
router.use('/rider/getNearByCabs',getNearByCabs)
router.use('/rider/bookCab?:automatch',bookCab)
router.use('/driver/startRide',startRide)
router.use('/driver/endRide',endRide)
router.use('/rider/rateRide',rateRide)


//To add driver
const addDriver = require("./Controller/addDriver")
router.use('/driver/addDriver',addDriver)

module.exports = router