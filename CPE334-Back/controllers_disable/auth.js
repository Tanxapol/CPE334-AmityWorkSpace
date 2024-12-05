const prisma = require('../config/prisma')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// fix: Register by using invite code
exports.register = async (req, res) => {
    try {
        // Request 
        const { firstname, lastname, phone_number, email, password } = req.body;

        // Validate
        if (!email) {
            return res.status(400).json({ message: 'Email is required' })
        }
        if (!password) {
            return res.status(400).json({ message: 'Password is required' })
        }

        // Check if an email already exist
        const actor = await prisma.actor.findFirst({
            where: {
                email: email
            }
        })
        if (actor) {
            return res.status(400).json({ message: 'Email already exist' })
        } 

        // Hash password
        const hashPassword = await bcrypt.hash(password, 10)

        // Register
        const register = await prisma.actor.create({
            data: {
                role_id: 2, // user role_id
                firstname: firstname,
                lastname: lastname,
                phone_number: phone_number,
                email: email,
                password: hashPassword
            }
        })

        res.send(register)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error' })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check email
        const actor = await prisma.actor.findFirst({
            where: {
                email: email
            }
        })
        if (!actor) {
            return res.status(400).json({ message: 'Actor not found' })
        }

        // Check password
        const isMatch = await bcrypt.compare(password, actor.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' })
        }

        // Create payload
        const payload = {
            id: actor.id,
            role_id: actor.role_id,
            email: actor.email
        }

        // Generate token
        jwt.sign(payload, process.env.SECRET, { expiresIn: '1d' }, (err, token) => {
            if (err) {
                return res.status(500).json({ message: 'Server error' })
            }
            res.json({ payload, token })
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error' })
    }
}

exports.currentActor = async (req, res) => {
    try {
        // Find 
        const actor = await prisma.actor.findFirst({
            where: { 
                email: req.actor.email 
            },
            select: {
                id: true,
                role: true,
                firstname: true,
                lastname: true,
                phone_number: true,
                email: true
            }
        })

        res.json({ actor })
    } catch (err) {
        //err
        console.log(err)
        res.status(500).json({ message: 'Server error' })
    }
}