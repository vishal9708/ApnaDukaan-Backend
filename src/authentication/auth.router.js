const express = require('express')
const {registerUser, loginUser} = require('./auth.module')
const router = express.Router()

router.post('/register', async(req, res) => {
    try{
        console.log('register api called', req.body)
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const mobile = req.body.mobile
        const {success, statusCode, message, data} = await registerUser(name, email, password, mobile)
        res.status(statusCode).send({success: success, message: message, data: data})
    } catch (err) {
        const message = err.message ? err.message : "Something went wrong"
        const statusCode = err.code ? err.code : 400
        res.status(statusCode).send({success: false, message: message, data: null})
    }
})

router.post('/login', async(req, res) => {
    try {
        console.log('login api called', req.body)
        const {email, password, mobile} = req.body.data
        const loginType = email ? 'email': 'mobile';
        const {success, statusCode, message, data} = await loginUser(email, mobile, loginType, password)
        res.status(statusCode).send({success: success, message: message, data: data})
    } catch(err) {
        const message = err.message ? err.message : "Something went wrong"
        const statusCode = err.code ? err.code : 400
        res.status(statusCode).send({success: false, message: message, data: null})
    }
})


module.exports = router;