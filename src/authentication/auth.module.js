const user = require("../../model/user");
const jwt = require('jsonwebtoken')
exports.registerUser = async(name, email, password, mobile) => {
    try {
        if(mobile.length != 10) {
            return ({
                success: false,
                statusCode: 400,
                data: null,
                message: 'invalid mobile number'
            })
        }
        const isUserExist = await user.find({ $or: [ { email: email }, { mobile: mobile } ] } )
        if(isUserExist.length > 0) { 
            return ({
                success: false,
                statusCode: 400,
                data: null,
                message: 'user already exist'
            })
        }
        const newUser = new user({name: name, email: email, password: password, mobile: mobile})
        const res = await newUser.save()
        return({
            success: true,
            statusCode: 200,
            data: null,
            message: "Register successfully"
        })
    } catch (err) {
        console.log(err)
        const statusCode = err.code ? err.code : 400
        const message = err.message ? err.message : 'something went wrong'
        return({
            succes: false,
            statusCode: statusCode,
            data: null,
            message: message
        })
    }
}

exports.loginUser = async(email, mobile, loginType, password) => {
    try {
        if(loginType == 'email'){
            const isEmailExist = await user.find({email: email})
            if(!isEmailExist.length) { 
                return ({
                    success: false,
                    statusCode: 400,
                    data: null,
                    message: 'user not found'
                })
            }
            const isUserExist = await user.find({email: email, password: password})
            if(!isUserExist.length) {
                return ({
                    success: false,
                    statusCode: 400,
                    data: null,
                    message: 'incorrect password'
                })
            }
        } else {
            const isMobileExist = await user.find({mobile: mobile})
            if(!isMobileExist.length) { 
                return ({
                    success: false,
                    statusCode: 400,
                    data: null,
                    message: 'user not found'
                })
            }
            const isUserExist = await user.find({mobile: mobile, password: password})
            if(!isUserExist.length) {
                return ({
                    success: false,
                    statusCode: 400,
                    data: null,
                    message: 'incorrect password'
                })
            }
        }
        const token = jwt.sign({email: email}, process.env.JWT_SECRET, {expiresIn: 2*60*60}) //2 hours jwt expiration time
        return({
            success: true,
            statusCode: 200,
            data: {token: token, authenticated: true},
            message: "Login successfully"
        })
    } catch (err) {
        console.log(err)
        const statusCode = err.code ? err.code : 400
        const message = err.message ? err.message : 'something went wrong'
        return({
            succes: false,
            statusCode: statusCode,
            data: null,
            message: message
        })
    }
}