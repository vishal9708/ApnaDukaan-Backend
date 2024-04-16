const jwt = require('jsonwebtoken')

exports.checkToken = async(req, res, next) => {
    try {
        const token = req.headers.Authorization || req.headers.authorization
        console.log('in middleware ', token)
        jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch (err) {
        const message = err.message ? err.message : 'token invalid'
        const statusCode = err.code ? err.code : 401
        res.status(statusCode).send({message: message})
    }
}