import express from "express"
import { logout, signIn, signUp } from "../controller/login/login.js"
import { adminAccess, verifyToken } from "../middleware/auth.js"
import { createEvent, deleteEvent, updateEvent } from "../controller/event/event.js"
import { eventList, exploreList } from "../controller/event/list.js"
import { regAttendee, viewAttendees } from "../controller/event/registerevent.js"
import { userEvents } from "../controller/user/user.js"
import { adminApproval, verifyEmail } from "../controller/login/email.js"
import { createOrder, verifyPayment } from "../controller/payment/payment.js"

const route = express.Router()

route.post('/signup', signUp)
route.post('/signin', signIn)
route.post('/logout', logout)

route.get('/explore-events',exploreList)

route.get('/email/verify/:email', verifyEmail)
route.get('/admin/approve/:email', adminApproval)

//admin
route.post('/add-event', verifyToken,adminAccess, createEvent)
route.put('/update-event/:id', verifyToken,adminAccess, updateEvent)
route.delete('/delete-event/:id', verifyToken, adminAccess,deleteEvent)
//admin and users
route.get('/show-event', verifyToken, eventList)

// route.post('/open-reservation', verifyToken, regAttendee)
route.post('/reserve-seat', verifyToken, regAttendee)
route.get('/get-attendee', verifyToken, viewAttendees)
route.get('/get-user-events', verifyToken, userEvents)

// route.post('/payment/create-order', verifyToken, createOrder)
// route.post('/payment/create-order', createOrder)
route.post('/payment/verify', verifyToken,verifyPayment)


export default route