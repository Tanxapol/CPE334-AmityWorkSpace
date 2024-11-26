const prisma = require('../config/prisma')

exports.create = async (req, res) => {
    try {
        // Request role name
        const { name } = req.body;

        // Create role
        const role = await prisma.role.create({
            data: {
                name: name
            }
        })

        res.send(role)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error' })
    }
}

exports.list = async (req, res) => {
    try {
        // Get all role 
        const roles = await prisma.role.findMany()
        
        res.send(roles)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message : 'Server error' })
    }
}

exports.read = async (req, res) => {
    try {
        // Request id
        const { id } = req.params;
        
        // Read role
        const role = await prisma.role.findFirst({
            where: {
                id: Number(id)
            }
        })

        res.send(role)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error' })
    }
}

exports.remove = async (req, res) => {
    try {
        // Request id
        const { id } = req.params; 
        
        // Delete role
        const role = await prisma.role.delete({
            where: {
                id: Number(id)
            }
        })

        res.send(role)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error' })
    }
}