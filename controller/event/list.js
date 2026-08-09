import EventModel from "../../schema/event.js"
import RegEvent from "../../schema/registrations .js"

export const eventList = async (req, res) => {
    try {
        let filter = {}
        const search = req.query.search
        let pageNo = parseInt(req.query.pageNo)
        let limit = parseInt(req.query.limit)
        const userid = req.user.id

        if (search) {
            pageNo = 0
            limit = 0
            filter = { title: { $regex: search, $options: "i" } }
        }

        const totalPgCount = await EventModel.countDocuments()

        const list = await EventModel.find(filter).skip(pageNo * limit).limit(limit).sort({ date: 1 })
            .lean()


        const registeredEvents = await RegEvent.find({ user: userid }).select("event").lean()

        const registeredIds = new Set(
            registeredEvents.map((item) => item.event.toString())
        )

        const updatedList = list.map((event) => ({
            ...event,
            isJoined: registeredIds.has(event._id.toString()),
        }))

        return res.status(200).json({
            success: true,
            message: "Fetched successfully",
            list: updatedList,
            totalPgCount
        })
    } catch (err) {
        console.log(err)
    }
}

export const exploreList = async (req, res) => {
    try {
        const {pageNo,limit,search} = req.query

        const list = await EventModel.find().skip(pageNo*limit)
        .limit(limit).sort({date:1}).lean()
        const totalPgCount = await EventModel.countDocuments()


        return res.status(200).json({
            success: true,
            list,
            totalPgCount
        })
    } catch (e) {
        console.log(e)
    }
}