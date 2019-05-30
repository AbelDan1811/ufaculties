exports.sendSuccess = (req, res) => result => {
    const response = {
        success: true,
        data: result
    }

    return res.send(response)
}

exports.sendError = (req, res) => error => {

    const message = typeof error === 'string' ? error : error.message || ''
    const code = error.code || false

    const result = {
        success: false,
        message
    }

    if (code) {
        result.code = code
    }

    res.send(result)
}

