const prisma = require('../config/prisma')

exports.create = async (req, res) => {
    try {
        // Request actor_id, room_id, date_time
        const { email, room_id, start_time, end_time } = req.body;

        // Validate booking time
        const newStart = new Date(start_time).getTime()
        const newEnd = new Date(end_time).getTime()
        const bookings = await prisma.booking.findMany()

        if (newStart > newEnd) {
            return res.status(400).json({ message: 'The start time cannot be later than the end time. Please select a valid time range.' })
        } else if (newStart === newEnd) {
            return res.status(400).json({ message: 'The start time and end time cannot be the same. Please choose a longer time range.' })
        }
        for (let booking of bookings) {
            const oldStart = new Date(booking.start_time).getTime()
            const oldEnd = new Date(booking.end_time).getTime()
            if ((oldStart <= newStart && newStart < oldEnd) || (oldStart < newEnd && newEnd <= oldEnd)) {
                return res.status(400).json({ message: 'The requested time is not available. Kindly try again.' })
            }
        }

        // Create booking
        const booking = await prisma.booking.create({
            data: {
                email: email,
                room_id: Number(room_id),
                start_time: new Date(start_time),
                end_time: new Date(end_time)
            }
        })
        res.send(booking)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.list = async (req, res) => {
    try {
        // Get all bookings
        const bookings = await prisma.booking.findMany()
        res.send(bookings)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.read = async (req, res) => {
    try {
        // Request id
        const { id } = req.params;

        // Read booking
        const booking = await prisma.booking.findFirst({
            where: {
                id: Number(id)
            }
        })
        res.send(booking)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.listByActor = async (req, res) => {
    try {
        // Request email
        const { email } = req.body;

        // Get bookings by email
        const bookings = await prisma.booking.findMany({
            where: {
                email: email
            }
        })
        res.send(bookings)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.listBookingByActor = async (req, res) => {
    try {
        // Request email
        const { email } = req.body;

        // Get bookings by email
        const bookings = await prisma.booking.findMany({
            where: {
                email: email,
                end_time: {
                    gte: new Date()
                }
            },
            orderBy: {
                start_time: 'asc'
            }
        })

        // Change the format
        for (let i = 0; i < bookings.length; i++) {
            const dateTimeStart = new Date(bookings[i].start_time)
            const dateTimeEnd = new Date(bookings[i].end_time)

            dateTimeStart.setHours(dateTimeStart.getHours() + 7);
            dateTimeEnd.setHours(dateTimeEnd.getHours() + 7);

            const date = dateTimeStart.toISOString().split('T')[0];
            const timeStart = dateTimeStart.toISOString().split('T')[1].substring(0, 5);
            const timeEnd = dateTimeEnd.toISOString().split('T')[1].substring(0, 5);
            
            bookings[i] = {
                id: bookings[i].id,
                number: i + 1,
                room_id: bookings[i].room_id,
                name: "",
                date: date,
                timestart: timeStart,
                timeend: timeEnd
            }
        }
        res.send(bookings)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.listHistoryByActor = async (req, res) => {
    try {
        // Request email
        const { email } = req.body;

        // Get bookings by email
        const bookings = await prisma.booking.findMany({
            where: {
                email: email,
                end_time: {
                    lt: new Date()
                }
            },
            orderBy: {
                start_time: 'asc'
            }
        })

        // Change the format
        for (let i = 0; i < bookings.length; i++) {
            const dateTimeStart = new Date(bookings[i].start_time)
            const dateTimeEnd = new Date(bookings[i].end_time)

            dateTimeStart.setHours(dateTimeStart.getHours() + 7);
            dateTimeEnd.setHours(dateTimeEnd.getHours() + 7);

            const date = dateTimeStart.toISOString().split('T')[0];
            const timeStart = dateTimeStart.toISOString().split('T')[1].substring(0, 5);
            const timeEnd = dateTimeEnd.toISOString().split('T')[1].substring(0, 5);
            
            bookings[i] = {
                id: bookings[i].id,
                number: i + 1,
                room_id: bookings[i].room_id,
                name: "",
                date: date,
                timestart: timeStart,
                timeend: timeEnd
            }
        }
        res.send(bookings)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.listByRoom = async (req, res) => {
    try {
        // Request room_id
        const { room_id } = req.params;

        // Get bookings by room_id
        const bookings = await prisma.booking.findMany({
            where: {
                room_id: Number(room_id)
            }
        })
        res.send(bookings)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.listReviewByRoom = async (req, res) => {
    try {
        // Request room_id
        const { room_id } = req.params;

        // Get bookings by room_id
        const bookings = await prisma.booking.findMany({
            where: {
                room_id: Number(room_id),
                star: {
                    not: null
                }
            }
        })
        res.send(bookings)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.update = async (req, res) => {
    try {
        // Request id, actor_id?, room_id?, date_time?, star?, review?
        const { id } = req.params;
        const { actor_id, room_id, start_time, end_time, star, review } = req.body;

        // Preparing data
        const data = {}
        if (actor_id !== undefined) data.actor_id = Number(actor_id);
        if (room_id !== undefined) data.room_id = Number(room_id);
        if (start_time !== undefined) data.start_time = new Date(start_time);
        if (end_time !== undefined) data.end_time = new Date(end_time);
        if (star !== undefined) data.star = star;
        if (review !== undefined) data.review = review;

        // Update booking
        const booking = await prisma.booking.update({
            where: {
                id: Number(id)
            },
            data: data
        })
        res.send(booking)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.remove = async (req, res) => {
    try {
        // Request id
        const { id } = req.params;

        // Delete booking
        const booking = await prisma.booking.delete({
            where: {
                id: Number(id)
            }
        })
        res.send(booking)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}