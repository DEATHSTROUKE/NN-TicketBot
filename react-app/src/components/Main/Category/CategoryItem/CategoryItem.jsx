import React from 'react'
import noImage from '../../../../icons/no-image.jpg'
import {observer} from "mobx-react-lite";
import cn from 'classnames'

const CategoryItem = ({item, onAdd, onCollapse}) => {
    return (
        <div className="category__item">
            {
                item.img !== 'None' ? <img
                        src={item.img}
                        alt="" className="category-item__img"/>
                    :
                    <img
                        src={noImage}
                        alt="" className=" category-item__img"/>
            }

            <div className="category-item__title"><h3>{item.title}</h3></div>
            <div className="category-item__description">
                <button onClick={() => onCollapse(item.id)}
                        className="description-btn">{item.is_desc_show ? 'Свернуть' : 'Развернуть'}</button>
                <div className={cn('description-text', {'hide' : !item.is_desc_show})}>
                    {item.description}
                </div>
            </div>
            <div className="category-item__row">
                <div className="category-item__date">{item.date}</div>
                {window.innerWidth >= 635 ? <div className="category-item__price">{[item.price]}₽</div> : ''}
                <button className="category-item__btn" type=" button"
                        onClick={() => {
                            onAdd(item.id)
                        }}>
                    {window.innerWidth >= 635 ? "Добавить" : `${item.price}₽`}
                </button>
            </div>
        </div>
    );
}

export default observer(CategoryItem);
