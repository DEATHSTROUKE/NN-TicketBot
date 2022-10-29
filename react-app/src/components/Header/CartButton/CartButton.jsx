import React from 'react'
import {ReactComponent as Cart} from '../../../icons/cart.svg';
import store from '../../../store/store'
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";

const CartButton = () => {
    return (
        <div className="cart-btn">
            <Link to="/cart">
                <div className="cart-btn__text">Корзина</div>
                <Cart/>
                <div className="cart-btn__count">| {store.totalCount}</div>
            </Link>
        </div>
    );
}

export default observer(CartButton);
