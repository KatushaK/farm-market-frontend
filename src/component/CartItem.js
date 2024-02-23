import React from 'react';
import { GoTrash } from "react-icons/go";
import { useDispatch } from 'react-redux';
import { decreaseQuantity, deleteCartItem, increaseQuantity } from '../redux/productSlice';


const CartItem = ({id, image, name, price, quantity, total}) => {

    const dispatch = useDispatch()


  return (
    <div className="cart-section">
        <div className="cart-image-container">
            <img src={image} alt="cart-item" className="cart-details-image" />
        </div>
        <div className="cart-data">
            <div className="name-container">
                <h3 className="cart-details-name">{name}</h3>
                <div className="removeIcon" onClick={() => dispatch(deleteCartItem(id))}><GoTrash /></div>
            </div>
            <p className="cart-details-price"><span className="dollar">$</span><span>{price}</span></p>
            <div className="btn-total-container">
                <div className="btn-container">
                    <button className="btn-minus" onClick={() => dispatch(decreaseQuantity(id))}>-</button>
                    <p className="quantity">{quantity}</p>
                    <button className="btn-plus" onClick={() => dispatch(increaseQuantity(id))}>+</button>
                </div>
                <div className="total-section">
                    <p className="total-text">Total:</p>
                    <p className="total-price">${total}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartItem



