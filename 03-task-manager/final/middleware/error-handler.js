const { CustomAPIError } = require('../errors/custom-handler')

const errorHandlerMiddleware = (err, req, res, next) => {
    if(err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({msg: err.msg})
    }
}

module.exports = errorHandlerMiddleware