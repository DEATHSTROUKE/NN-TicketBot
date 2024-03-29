import React, {useEffect} from 'react'
import {observer} from "mobx-react-lite";
import store from "../../../../store/store";

let tg = window.Telegram.WebApp;

const CartPay = () => {
    useEffect(() => {
        tg.MainButton.text = "КУПИТЬ";
        tg.MainButton.show();
        tg.MainButton.onClick(() => {
            tg.MainButton.setParams({color: "#58cc58"})
            let cartItems = []
            store.cartItems.forEach(item => {
                cartItems.push({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    date: item.date,
                    count: item.count
                })
            })
            let data = {
                cartItems: cartItems,
                totalCount: store.totalCount,
                totalPrice: store.totalPrice,
            }
            tg.sendData(JSON.stringify(data));
        })
        return () => {
            tg.MainButton.hide();
        }
    }, [])

    return (
        <div className="cart__pay">
            <div className="pay__price">
                <div className="pay__title"><h3>Сумма заказа</h3></div>
                <div><h3>{store.totalPrice} ₽</h3></div>
            </div>
        </div>
    );
}

export default observer(CartPay);
