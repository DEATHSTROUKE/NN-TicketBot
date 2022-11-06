const ApiError = require('../error/ApiError')
const {Orders, Events} = require('../models/models')
const sequelize = require("sequelize");
const DATE = [sequelize.fn('to_char', sequelize.col('date'), 'dd.mm.YYYY'), 'date']

class EventsController {
    static dateToDBFormat(date) {
        try {
            let parts = date.split('.');
            return new Date(parts[2], parts[1] - 1, parts[0]);
        } catch (e) {
            return 'bad date'
        }
    }

    async getAll(req, res) {
        const data = await Events.findAll({attributes: ['id', 'title', 'description', 'category', 'img', 'place', 'price', DATE]})
        res.json(data)
    }

    async getOne(req, res) {
        const {id} = req.params
        const data = await Events.findOne({attributes: ['id', 'title', 'description', 'category', 'img', 'place', 'price', DATE], where: {id}})
        res.json(data)
    }

    async createObj(req, res, next) {
        try {
            let {title, description, img, place, price, date} = req.body
            let category = 'Мероприятия'
            date = EventsController.dateToDBFormat(date)
            const event = await Events.create({title, description, img, place, price, date, category})
            res.json(event)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async updateObj(req, res, next) {
        try {
            let {id, title, description, img, place, price, date} = req.body
            if (date) {
                date = EventsController.dateToDBFormat(date)
            }
            await Events.update({title, description, img, place, price, date}, {where: {id}})
            res.json({success: "ok"})
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async deleteObj(req, res, next) {
        try {
            const {id} = req.params
            const orders = await Orders.findAll({where: {event_id: id}})
            if (orders.length > 0) {
                next(ApiError.badRequest('Event contains orders'))
            } else {
                await Events.destroy({where: {id}})
                res.json({success: "ok"})
            }
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new EventsController()