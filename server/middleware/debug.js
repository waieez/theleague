module.exports = debug

function debug(req, res, next) {
    console.log("debug: req.body: ", req.body)
    next()
}