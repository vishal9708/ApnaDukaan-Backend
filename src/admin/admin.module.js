const customer = require("../../model/customer");

exports.addCustomer = async(name, email, mobile, address, due_amount, due_date) => {
    try { 
        const isUserExist = await customer.find({ $or: [ { email: email }, { mobile: mobile } ] } )
        if(isUserExist.length > 0) {
            return ({
                success: false,
                statusCode: 400,
                data: null,
                message: 'Customer already exist'
            })
        }
        const newCustomer = new customer({name: name, email: email, mobile: mobile, address: address, due_amount: due_amount, due_date:due_date})
        newCustomer.save();
        return ({
            success: true,
            statusCode: 200,
            data: null,
            message: 'Customer added successfully'
        })
    } catch (err) {
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