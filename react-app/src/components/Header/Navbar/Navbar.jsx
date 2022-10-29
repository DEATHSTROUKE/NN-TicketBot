import React from 'react'
import store from "../../../store/store";
import {observer} from "mobx-react-lite";

const Navbar = () => {
    const scrollToCategory = (id) => {
        const link = document.getElementById("category" + id)
        link.scrollIntoView({behavior: "smooth"})
    }

    return (
        <div className="top__menu">
            {store.listCategory.map((item) => {
                return (<div className="menu__item" key={item.id}>
                    <button onClick={() => scrollToCategory(item.id)}>{item.title}</button>
                </div>);
            })}
        </div>
    );
}

export default observer(Navbar);
