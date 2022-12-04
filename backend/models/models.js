const sequelize = require('./index')
const {DataTypes} = require('sequelize')

const Events = sequelize.define('events', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    category: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT},
    img: {type: DataTypes.STRING},
    place: {type: DataTypes.STRING},
    price: {type: DataTypes.INTEGER, allowNull: false},
    date: {type: DataTypes.DATE, allowNull: false}
})

const Orders = sequelize.define('orders', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    user_id: {type: DataTypes.STRING, allowNull: false},
    count: {type: DataTypes.INTEGER, allowNull: false},
    is_paid: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    is_closed: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
})

Events.hasMany(Orders, {foreignKey: 'event_id'})
Orders.belongsTo(Events, {foreignKey: 'event_id'})


module.exports = {
    Orders,
    Events
}

