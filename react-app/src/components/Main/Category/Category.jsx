import React from 'react'
import CategoryItem from "./CategoryItem/CategoryItem";
import {observer} from "mobx-react-lite";
import store from "../../../store/store";

const Category = (props) => {
    const addItemToCart = (id) => {
        store.addCartItem(id)
    }

    return (
        <div className="category" id={"category" + props.id}>
            <div className="category__title">
                <h2>{props.title}</h2>
            </div>
            <div
                className={store.listProducts.filter((item) => item.category === props.title).length < 4 ? "category__row" : "category__row many-items"}>
                {
                    store.listProducts.map((item) => {
                        if (item.category === props.title) {
                            return <CategoryItem item={item} key={item.id} onAdd={addItemToCart}/>
                        }
                    })
                }
            </div>
        </div>
    );
}

export default observer(Category);
