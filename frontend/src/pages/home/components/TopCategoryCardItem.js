import React from "react";
import { Link } from "react-router-dom";

function CardItem(props) {
  return (
    <>
      <li className="cards__item__type2">
        <Link className="cards__item__link__type2" to={props.path}>
          {/* <figure className='cards__item__pic-wrap__type2' data-category={props.label}> */}
          <figure className="cards__item__pic-wrap__type2">
            <img
              className="cards__item__img__type2"
              alt="Travel Image"
              src={props.src}
            />
          </figure>
          <div className="cards__item__info__type2">
            <h5 className="text-white text-2xl font-bold">{props.text}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}

export default CardItem;
