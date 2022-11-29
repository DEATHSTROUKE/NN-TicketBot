const ApiError = require('../error/ApiError')
const {Events, Orders} = require('../models/models')
const sequelize = require("sequelize");
const {Op} = require("sequelize");
const DATE = [sequelize.fn('to_char', sequelize.col('date'), 'dd.mm.YYYY'), 'date']
const {dateToDBFormat} = require('../functions/dateFunctions')


class ApiController {
    async getAllCategory(req, res) {
        res.json({data: [{id: 1, name: "Мероприятия"}]})
    }

    async getAllInfo(req, res) {
        const date_now = new Date()
        const data = await Events.findAll({
            attributes: ['id', 'title', 'description', 'category', 'img', 'place', 'price', DATE, ['date', 'date_time']],
            where: {date: {[Op.gte]: date_now}},
            order: [['date_time', 'ASC']]
        })
        res.json({tasks: data})
    }

    async getTicketsByUserId(req, res, next, is_paid) {
        try {
            const {user_id} = req.query
            let user_ticket_groups = []
            const orders = await Orders.findAll({
                raw: true,
                where: {
                    user_id,
                    is_paid: is_paid,
                    is_closed: false
                }
            })
            for (let order of orders) {
                let event = await Events.findOne({
                    raw: true,
                    attributes: [['id', 'event_id'], 'title', 'price', DATE],
                    where: {
                        id: order.event_id
                    }
                })
                if (dateToDBFormat(event.date) >= new Date()) {
                    event.count = order.count
                    event.order_id = order.id
                    user_ticket_groups.push(event)
                }
            }
            res.json({user_ticket_groups})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async addNewOrderByUserId(req, res, next) {
        try {
            const {user_id, ticket_groups} = req.body
            let orders = []
            let order
            for (let item of ticket_groups) {
                order = await Orders.create({user_id, event_id: item.event_id, count: item.count})
                orders.push(order)
            }
            res.json(orders)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async setOrderAsPaidByUserId(req, res, next) {
        try {
            const {user_id} = req.body
            await Orders.update({is_paid: true}, {where: {user_id}})
            res.json({success: "ok"})
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async setOrderAsClosedByUserId(req, res, next) {
        try {
            const {user_id} = req.body
            await Orders.update({is_closed: true}, {where: {user_id}})
            res.json({success: "ok"})
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

}


module.exports = new ApiController()