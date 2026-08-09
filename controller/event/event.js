import EventModel from "../../schema/event.js";


export const createEvent = async (req, res) => {
    console.log('event')
    try {
        const { title, description, location, date, time, category, eventType, imageUrl, isPaid } = req.body
        const capacity =    Number(req.body.capacity)
        const amount = Number(req.body.amount)

        if (!title || !description || !location || !date || !time || !capacity || !category || !isPaid) {
            return res.status(400).json({ message: "All mandatory fields are required" })
        }

        const creatorId = req.user.id;
        if (!creatorId) {
            return res.status(401).json({ message: "Unauthorized. Missing authentication state." })
        }
        await EventModel.create({
            title,
            description,
            location,
            date,
            time,
            capacity,
            category,
            eventType,
            imageUrl,
            isPaid: isPaid == 'yes' ? true : false,
            amount,
            createdBy: creatorId
        })

        return res.status(201).json({
            success: true,
            message: "Event created successfully",
        })

    } catch (err) {
        console.error(err)
    }
}

export const updateEvent = async (req, res) => {
    try {
        const { id } = req.params

        const event = await EventModel.findById(id)
        if (!event) {
            return res.status(404).json({ message: "Event not found" })
        }


        const updatedEvent = await EventModel.findByIdAndUpdate(
            id,
            { $set: req.body }
        )

        return res.status(200).json({
            success: true,
            message: "Event updated successfully",
        })

    } catch (err) {
        console.error(err)
    }
}

export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params

        const event = await EventModel.findById(id)
        if (!event) {
            return res.status(404).json({ message: "Event not found" })
        }

        await EventModel.findByIdAndDelete(id)

        return res.status(200).json({
            success: true,
            message: "Event deleted successfully",
        })
    } catch (err) {
        console.log(err)
    }
}