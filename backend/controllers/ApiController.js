const ApiError = require('../error/ApiError')
const {Events, Orders} = require('../models/models')
const sequelize = require("sequelize");
const DATE = [sequelize.fn('to_char', sequelize.col('date'), 'dd.mm.YYYY'), 'date']


class ApiController {
    static dateToDBFormat(date) {
        try {
            let parts = date.split('.');
            return new Date(parts[2], parts[1] - 1, parts[0]);
        } catch (e) {
            return 'bad date'
        }
    }

    async getAllCategory(req, res) {
        res.json({data: [{id: 1, name: "Мероприятия"}]})
    }

    async getAllInfo(req, res) {
        const data = await Events.findAll({attributes: ['id', 'title', 'description', 'category', 'img', 'place', 'price', DATE]})
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
                if (ApiController.dateToDBFormat(event.date) >= new Date()) {
                    event.count = order.count
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