import mongoose from "mongoose"
import RegEvent from "../../schema/registrations .js"


export const userEvents = async (req, res) => {
    try {
        const userid = req.user.id

        const eventsDetails = await RegEvent.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(userid) } },
            { $group: { _id: "$event", events: { $addToSet: "$event" }, seatNos: { $push: "$seatNos" }, headCount: { $sum: "$headCount" } } },
            { $lookup: { from: "events", localField: "events", foreignField: "_id", as: "eventDetails" } },
            {
                $project: {
                    _id: 1,
                    seatNos: 1,
                    headCount:1,
                    "eventDetails.title": 1,
                    "eventDetails.location": 1,
                    "eventDetails.date": 1,
                    "eventDetails.time": 1,
                }
            }
        ])
        return res.status(200).json({
            success: true,
            details: eventsDetails
        })
    } catch (e) {
        console.log(e)
    }
}