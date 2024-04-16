const express = require('express')
const { checkToken } = require('../../middleware/checkToken')
const {addCustomer} = require('./admin.module')
const router = express.Router()

router.get('/', checkToken, async(req, res) => {
    res.status(200).send("admin routes working")
})

//add new customer
router.post('/addNewCustomer', async(req, res) => {
    try {
        console.log('add customer api called', req.body)
        const name = req.body.name
        const email = req.body.email
        const mobile = req.body.mobile
        const address = req.body.address
        const due_amount = req.body.due_amount
        const due_date = req.body.due_date
        
        const {success, statusCode, message, data} = await addCustomer(name, email, mobile, address, due_amount, due_date)
        res.status(statusCode).send({success: success, message: message, data: data})
    } catch(err) {
        const message = err.message ? err.message : "Something went wrong"
        const statusCode = err.code ? err.code : 400
        res.status(statusCode).send({success: false, message: message, data: null})
    }
})

//add entry of already existing customer
router.post('/addCustomerEntry', async(req, res) => {
    try {
        console.log('addCustomerEntry api called', req.body)
        const name = req.body.name
        const email = req.body.email
        const mobile = req.body.mobile
        const address = req.body.address
        const due_amount = req.body.due_amount
        const due_date = req.body.due_date
        
        const {success, statusCode, message, data} = await addCustomer(name, email, mobile, address, due_amount, due_date)
        res.status(statusCode).send({success: success, message: message, data: data})
    } catch(err) {
        const message = err.message ? err.message : "Something went wrong"
        const statusCode = err.code ? err.code : 400
        res.status(statusCode).send({success: false, message: message, data: null})
    }
})

module.exports = router;