import {makeAutoObservable} from "mobx";

class Store {
    listProducts = []
    listCategory = []

    cartItems = []
    totalCount = 0
    totalPrice = 0

    constructor() {
        makeAutoObservable(this)
    }

    setListProducts(list) {
        this.listProducts = []
        for (let i of list) {
            this.listProducts.push({
                id: i.id,
                title: i.title,
                img: i.img,
                description: i.description,
                price: parseInt(i.price),
                category: i.category,
                date: i.date,
                place: i.place,
                is_desc_show: false
            })
        }
    }

    setListCategory(list) {
        this.listCategory = []
        for (let i of list) {
            this.listCategory.push({
                id: i.id,
                title: i.name,
            })
        }
    }

    toggleCollapseItem(id) {
        this.listProducts.forEach((item) => {
            if (item.id === id) {
                item.is_desc_show = !item.is_desc_show
            }
        })
    }

    addCartItem(id) {
        let isInCart = true
        this.cartItems.forEach((item) => {
            if (item.id === id) {
                item.count++
                isInCart = false
            }
        })
        let obj = {}
        this.listProducts.forEach((item) => {
            if (item.id === id) {
                obj = {...item}
            }
        })
        if (isInCart) {
            this.cartItems.push({
                id: obj.id,
                title: obj.title,
                img: obj.img,
                description: obj.description,
                price: obj.price,
                date: obj.date,
                place: obj.place,
                count: 1
            })
        }
        this.totalCount++
        this.totalPrice += obj.price
    }

    changeCountItems(id, action) {
        this.cartItems.forEach((item) => {
            if (item.id === id) {
                if (action === "+") {
                    item.count++
                    this.totalCount++
                    this.totalPrice += item.price
                } else {
                    item.count--
                    this.totalCount--
                    this.totalPrice -= item.price
                }
            }
        })
        this.cartItems = this.cartItems.filter((item) => item.count > 0)
    }

    deleteCartItem(id) {
        let obj = {};
        this.cartItems = this.cartItems.filter((item) => {
            if (item.id === id) {
                obj = {...item}
            }
            return item.id !== id
        })

        this.totalCount -= obj.count
        this.totalPrice -= obj.price * obj.count
    }

    get total() {
        let x
        if ((this.totalCount % 10 >= 5 && this.totalCount % 10 <= 9) ||
            this.totalCount % 10 === 0 ||
            (this.totalCount % 100 >= 11 && this.totalCount % 100 <= 19)) {
            x = "товаров"
        } else if (this.totalCount % 10 >= 2 && this.totalCount % 10 <= 4) {
            x = "товара"
        } else {
            x = "товар"
        }
        return this.totalCount + " " + x + " на " + this.totalPrice + " ₽"
    }
}

export default new Store()