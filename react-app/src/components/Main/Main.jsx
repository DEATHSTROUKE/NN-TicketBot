import React from 'react'
import Category from "./Category/Category";
import CartButtonMobile from "./Category/CartButtonMobile/CartButtonMobile";
import Cart from "./Cart/Cart";
import store from "../../store/store";
import {observer} from "mobx-react-lite";

const Main = (props) => {
    return (
        <main className={props.page === "main" ? "main" : "main main-cart"}>
            <div className="container">
                {props.page === "main" ?
                    <div className="categories">
                        {
                            store.listCategory.map((item) => {
                                return <Category title={item.title} id={item.id} key={item.id}/>
                            })
                        }
                    </div>
                    :
                    <Cart/>
                }
            </div>
            {props.page === "main" && <CartButtonMobile/>}
        </main>
    );
}

export default observer(Main);
