const express = require('express')
const router = express.Router()
const { create, list, read, listByActor, listBookingByActor, listHistoryByActor, listByRoom, listReviewByRoom, update, remove } = require('../controllers/booking')

// Req: email, room_id, date_time | Create booking | Res: New booking (JSON)
router.post('/create', create)

// Req: | List all booking | Res: All booking (Arr of JSON)
router.get('/list', list)

// Req: | Read booking by id | Res: Booking (JSON)
router.get('/read/:id', read)

// Req: | List all bookings by email | Res: Bookings (Arr of JSON) 
router.get('/listByActor/:email', listByActor)

// Req: | List bookings that time hasn't arrived yet, by email | Res: Bookings (Arr of JSON) 
router.get('/listBookingByActor/:email', listBookingByActor)

// Req: | List bookings that time has passed, by email | Res: Bookings (Arr of JSON) 
router.get('/listHistoryByActor/:email', listHistoryByActor)

// Req: | List bookings by room_id | Res: Bookings (Arr of JSON) 
router.get('/listByRoom/:room_id', listByRoom)

// Req: | List Review by room_id | Res: Star & Review (Arr of JSON)
router.get('/listReviewByRoom/:room_id', listReviewByRoom)

// Req: actor_id?, room_id?, date_time?, star?, review? | Update booking | Res: Updated booking (JSON)
router.patch('/update/:id', update)

// Req: | Delete booking | Res: Deleted booking
router.delete('/remove/:id', remove)

module.exports = router;