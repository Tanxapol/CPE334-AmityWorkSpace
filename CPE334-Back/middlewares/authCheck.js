const jwt = require('jsonwebtoken')
const prisma = require('../config/prisma')

exports.authCheck = async (req, res, next) => {
    try {
        // Request token
        const headerToken = req.headers.authorization
        if (!headerToken) {
            return res.status(401).json({ message: "No Token, Authorization" })
        }

        // Decode token 
        const token = headerToken.split(" ")[1]
        const decode = jwt.verify(token, process.env.SECRET)
        req.actor = decode

        next()
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Token Invalid' })
    }
}

exports.adminCheck = async (req, res, next) => {
    try {
        // Request email
        const { email } = req.actor

        // Check role
        const adminActor = await prisma.actor.findFirst({
            where: { email: email }
        })
        if (!adminActor || adminActor.role !== 'admin') {
            return res.status(403).json({ message: 'Access Denied: Admin Only' })
        }

        next()
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Error Admin access denied' })
    }
}