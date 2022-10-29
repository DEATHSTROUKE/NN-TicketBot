import React from 'react'
import noImage from '../../../../icons/no-image.jpg'

const CategoryItem = (props) => {

    return (
        <div className="category__item">
            {
                props.item.img !== 'None' ? <img
                        src={props.item.img}
                        alt="" className="category-item__img"/>
                    :
                    <img
                        src={noImage}
                        alt="" className=" category-item__img"/>
            }

            <div className="category-item__title"><h3>{props.item.title}</h3></div>
            <div className="category-item__description">
                {props.item.description}
            </div>
            <div className="category-item__row">
                <div className="category-item__date">{props.item.date}</div>
                {window.innerWidth >= 635 ? <div className="category-item__price">{[props.item.price]}₽</div> : ''}
                <button className="category-item__btn" type=" button"
                        onClick={() => {
                            props.onAdd(props.item.id)
                        }}>
                    {window.innerWidth >= 635 ? "Добавить" : `${props.item.price}₽`}
                </button>
            </div>
        </div>
    );
}

export default CategoryItem;
