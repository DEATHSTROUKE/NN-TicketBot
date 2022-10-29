import React from 'react'
import CartPay from "./CartPay/CartPay";
import CartItem from "./CartItem/CartItem";
import {observer} from "mobx-react-lite";
import store from "../../../store/store";
import {ReactComponent as CartImg} from '../../../icons/cart.svg';

const Cart = () => {
    const onDelete = (id) => {
        store.deleteCartItem(id)
    }

    const onChangeCount = (id, action) => {
        store.changeCountItems(id, action)
    }

    return (
        <div className="cart">
            <div className="cart__value">
                {
                    store.totalCount === 0 ?
                        <div className="empty_cart">
                            <CartImg/>
                            <h2>Корзина пуста</h2>
                        </div>

                        : <h2>{store.total}</h2>

                }

            </div>
            <div className="cart__goods">
                {
                    store.cartItems.map((item) => {
                        return <CartItem key={item.id} item={item}
                                         onDelete={onDelete} onChangeCount={onChangeCount}/>
                    })
                }
            </div>
            {store.totalCount !== 0 && <CartPay/>}
        </div>
    );
}

export default observer(Cart);
