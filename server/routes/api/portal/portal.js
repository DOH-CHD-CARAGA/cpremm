const express = require('express');

const router = express.Router();
const Users = require('../../../models/User');
const Devices = require('../../../models/Device');
const PortalJobOrderRequest = require('../../../models/PortalJobOrderRequest');
const checkAuth = require('../../middleware/checkAuth');
const LiveJobOrderRequest = require('../../../models/JobOrderRequest');

router.get('/get/devices/:userID', async(req,res)=>{
    try {
        const userID = req.params.userID
        const devices = await Devices.find({ $or: [ { userPAR: userID }, { userCO: userID } ], status: 1 })
        .lean();
        res.status(200).json(devices)
    } catch (err) {
        console.log(err.message)
        res.status(201).json([])
    }
});

router.post('/get/devices/:useSerial', async(req,res)=>{
    try {
        const useSerial = req.params.useSerial === "true"
        const propertyCode = req.body.propertyCode
        const serial = req.body.serial
        const query = useSerial? { "serial": new RegExp(".*"+ serial +".*"), status: 1 } : { "propertyCode": new RegExp(".*"+ propertyCode +".*"),  status: 1 } 
        const devices = await Devices.find(query)
        .limit(10)
        .sort({ "dateAcquired": "asc" })
        .lean();
        res.status(200).json(devices)
    } catch (err) {
        console.log(err.message)
        res.status(201).json([])
    }
});

router.post('/get/users', async(req,res)=>{
    try {
        const name = req.body.name
        const users = await Users.find({ "username": new RegExp(".*"+ name.split(',')[0].toLowerCase().replace(" ","") +".*") })
        .select("name office designation username")
        .populate("office")
        .limit(10)
        .lean();
        res.status(200).json(users)
    } catch (err) {
        console.log(err.message)
        res.status(201).json([])
    }
});

router.get('/get/temp/jobRequest/:status', async(req,res)=>{
    try {
        const status = req.params.status
        const request = await PortalJobOrderRequest.find({ status: status })
        .populate("device")
        .sort({createdAt: -1})
        .lean();
        res.status(200).json(request)
        
    } catch (err) {
        console.log(err.message)
        res.status(201).json([])
    }
});

router.post('/create/temp/jobRequest', checkAuth, async(req,res)=>{
    try {
        const data = new PortalJobOrderRequest(req.body)
        const saveData = await data.save()
        res.status(200).json({ isCreated:data===saveData, data: data===saveData? saveData : null, msg: "" })
    } catch (err) {
        console.log(err.message)
        res.status(201).json({ isCreated: false, data: null, msg: err.message.includes("Already taken!")? "The device has already been requested for a repair!": "" })
    }
});

router.post('/update/temp/jobRequest/:_id/:status', checkAuth, async(req,res)=>{
    try {
        const _id = req.params._id
        const status = req.params.status
        const upd = await PortalJobOrderRequest.updateOne({ _id: _id }, { status: status })
        if(upd){
            res.status(200).json({ msg: "updated"})
        }
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ msg: err.message})
    }
});

router.post('/add/liveData/jobRequest', checkAuth, async(req,res)=>{
    try {
        const data = new LiveJobOrderRequest(req.body)
        const saveData = await data.save()
        res.status(200).json({ isCreated:data===saveData, data: data===saveData? saveData : null, msg: "" })
    } catch (err) {
        console.log(err.message)
        res.status(201).json({ isCreated: false, data: null, msg: err.message.includes("Already taken!")? "The device has already been requested for a repair!": "" })
    }
});

router.post('/checkAuth', checkAuth, async(req,res)=>{
    try {
        res.status(200).json(req.userInfo)
    } catch (err) {
        console.log(err.message)
        res.status(401)
    }
});


router.get('/dashboard/chart', async(req,res)=>{
    try {
        const devices = await Devices.find({})
        .lean()
        var names = []
        var inUse = []
        var waste = []
        for(let i=0; i< devices.length; i++){
            let res_type = devices[i].type.toUpperCase()
            /**
            if(res_type===""){
                res_type = "UNLABELED"
            }
            */
            if(!names.includes(res_type) && res_type !== "") {
                names.push(res_type)
                inUse.push(devices.filter(({ type, status })=> type.toUpperCase() === res_type.replace("UNLABELED", "") && status === 1).length)
                waste.push(devices.filter(({ type, status })=> type.toUpperCase() === res_type.replace("UNLABELED", "") && status === 0).length)
            }
        }
        res.status(200).json({
            labels: names,
            inUse: inUse,
            waste: waste,
            totalInUse: devices.filter(({ status })=> status === 1).length,
            totalWaste: devices.filter(({ status })=> status === 0).length
        })
    } catch (err) {
        console.log(err.message)
        res.status(201).json([])
    }
});

router.get('/dashboard/wasted', async(req,res)=>{
    try {
        const devices = await Devices.find({ status: 0})
        .select("")
        .sort({ dateAcquired: -1 })
        .lean()
        for(let i=0; i< devices.length; i++){
            const data = devices[i]
        }
        res.status(200).json(devices)
    } catch (err) {
        console.log(err.message)
        res.status(201).json([])
    }
});

module.exports = router;