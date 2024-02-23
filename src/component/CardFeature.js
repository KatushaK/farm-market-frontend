import React from 'react';
import {Link} from 'react-router-dom';
import { addItemToCart } from '../redux/productSlice';
import { useDispatch } from 'react-redux';

const CardFeature = ({image, name, price, id}) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItemToCart({
      _id: id,
      name: name,
      price: price,
      image: image
    }))
  }


  return (
      <div className="cards">
        <Link to={`/menu/${id}`} style={{ textDecoration: 'none' }} onClick={() => window.scrollTo({top:0, behavior: "smooth"})}>
          <div>
            <div className="card">
                <img src={image} alt="product" className="item-image" />
            </div>
            <h3 className="item-name">{name}</h3>
            <p className="item-price"><span className="dollar">$</span><span>{price}</span></p>
          </div>
        </Link>
          <button className="btn-add" onClick={handleAddToCart}>Add to Cart</button>
      </div>
  )
}

export default CardFeature;




