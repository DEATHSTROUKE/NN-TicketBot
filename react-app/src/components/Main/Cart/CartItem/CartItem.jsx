import React from 'react'
import ItemTop from "./ItemTop/ItemTop";
import ItemBottom from "./ItemBottom/ItemBottom";
import {observer} from "mobx-react-lite";

const CartItem = (props) => {
    return (
        <div className="goods__item">
            <ItemTop item={props.item} onDelete={props.onDelete}/>
            <ItemBottom item={props.item} onChangeCount={props.onChangeCount}/>
        </div>
    );
}

export default observer(CartItem);
