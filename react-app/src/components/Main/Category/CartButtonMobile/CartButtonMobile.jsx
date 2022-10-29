import React from 'react'
import store from '../../../../store/store'
import {observer} from 'mobx-react-lite';
import {ReactComponent as Cart} from '../../../../icons/cart.svg'
import {Link} from "react-router-dom";

const CartButtonMobile = () => {
    return (
        <div className="cart_mobile">
            <Link to="/cart">
                <div className="cart_mobile__count">{store.totalCount}</div>
                <Cart />
            </Link>
        </div>
    );
}

export default observer(CartButtonMobile);
