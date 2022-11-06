const ApiError = require('../error/ApiError')
const {Orders, Events} = require('../models/models')

class OrdersController {
    async getAll(req, res) {
        const data = await Orders.findAll()
        res.json(data)
    }

    async getOne(req, res) {
        const {id} = req.params
        const data = await Orders.findOne({where: {id}})
        res.json(data)
    }

    async createObj(req, res, next) {
        try {
            const {user_id, count, is_paid, event_id} = req.body
            const event = await Orders.create({user_id, count, is_paid, event_id})
            res.json(event)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async updateObj(req, res, next) {
        try {
            const {id, user_id, count, is_paid, event_id, is_closed} = req.body
            await Orders.update({user_id, count, is_paid, event_id, is_closed}, {where: {id}})
            res.json({success: "ok"})
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async deleteObj(req, res, next) {
        try {
            const {id} = req.params
            await Orders.destroy({where: {id}})
            res.json({success: "ok"})
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new OrdersController()