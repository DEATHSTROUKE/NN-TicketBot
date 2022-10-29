import React from 'react'
import {ReactComponent as Delete} from '../../../../../icons/delete.svg'
import noImage from "../../../../../icons/no-image.jpg";

const ItemTop = (props) => {
    return (
        <div className="cart-item__top">
            {
                props.item.img !== 'None' ? <img
                        src={props.item.img}
                        alt="" className="cart-item__img" />
                    :
                    <img
                        src={noImage}
                        alt="" className=" cart-item__img"/>
            }
            <div className="cart-item__title"><h3>{props.item.title}</h3></div>
            <div className="cart-item__date">{props.item.date}</div>
            <button className="cart-item__delete" onClick={() => props.onDelete(props.item.id)}>
                <Delete />
            </button>
        </div>
    );
}

export default ItemTop;
