import React from 'react'
import {observer} from "mobx-react-lite";
import {ReactComponent as Minus} from "../../../../../icons/minus.svg";
import {ReactComponent as Plus} from "../../../../../icons/plus.svg";

const ItemBottom = (props) => {
    return (
        <div className="cart-item__bottom">
            <div className="cart-item__price"><h3>{props.item.count * props.item.price}₽</h3></div>
            <div className="cart-item__set_count">
                <button className="cart-item__minus count-btn"
                        onClick={() => props.onChangeCount(props.item.id, '-')}>
                    <Minus />
                </button>
                <div className="cart-item__count">{props.item.count}</div>
                <button className="cart-item__plus count-btn"
                        onClick={() => props.onChangeCount(props.item.id, '+')}>
                    <Plus />
                </button>
            </div>
        </div>
    );
}

export default observer(ItemBottom);
