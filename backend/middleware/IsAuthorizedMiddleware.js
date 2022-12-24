module.exports = async function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const secret_key = req.headers.authorization
        if (secret_key === process.env.SECRET_KEY) {
            next()
        } else {
            res.status(403).json({message: "Forbidden"})
        }
    } catch (e) {
        res.status(403).json({message: "Forbidden"})
    }
}