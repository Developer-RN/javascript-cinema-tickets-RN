const ErrorHandler = (err, req, res, next) => {
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Request Error.';
    res.status(errStatus).json({
        status: errStatus,
        message: errMsg,
    })
}

export default ErrorHandler