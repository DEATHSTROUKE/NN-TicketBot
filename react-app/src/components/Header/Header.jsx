import React from 'react'
import './Header.css';
import Navbar from "./Navbar/Navbar";
import CartButton from "./CartButton/CartButton";
import {ReactComponent as Back} from '../../icons/back.svg'
import {Link} from "react-router-dom";

const Header = (props) => {
    return (
        <header className="header">
            <div className="container">
                <nav className="nav">
                    {(props.page === "main")
                        ? <>
                            <Navbar/>
                            <CartButton/>
                        </>
                        : <>
                            <div className="top__menu-back">
                                <div className="menu__item-back">
                                    <Link to="/">
                                        <Back />
                                        <div className="menu__item-back_back">Назад к меню</div>
                                    </Link></div>
                            </div>
                        </>
                    }
                </nav>
            </div>
        </header>
    );
}

export default Header;
