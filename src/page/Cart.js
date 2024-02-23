import React from 'react'
import { useSelector } from 'react-redux'
import CartItem from '../component/CartItem';
import empty from '../assets/empty.jpg'
import { toast } from 'react-hot-toast';
import {loadStripe} from '@stripe/stripe-js';
import { useNavigate } from 'react-router';

const Cart = () => {
    const productCartItem = useSelector((state) => state.product.cartItem);
  
    const totalPrice = productCartItem.reduce((acc, current) => acc + parseFloat(current.total), 0);
    const roundedTotalPrice = totalPrice.toFixed(2);
  
    const totalQuantity = productCartItem.reduce((acc, current) => acc + parseInt(current.quantity), 0);

    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    

    const handlePayment = async () => {
      if (user.email) {
        const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
        const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/checkout-payment`, {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(productCartItem)
        })

        if (res.statusCode === 500) return;

        const data = await res.json()
        toast("Redirecting to Payment Gateway...")
        stripePromise.redirectToCheckout({sessionId: data})
      }
      else {
        toast("You have not logged in yet!")
        setTimeout(() => {
            navigate("/login")
        }, 1000)
      }
    }


  
    return (
      <>
        <div>
          <h2 className="cart-header">Your Cart Items</h2>
          <div className="carts-container">
            {productCartItem.length === 0 ? (
                <div className="empty">
                    <p className="empty-cart-message">Your cart is empty</p>
                    <img src={empty} className="empty-cart"alt="empty cart"/>
                </div>
            ) : (
              <>
                <div className="shopping-cart">
                  {productCartItem.map((element) => (
                    <CartItem
                      key={element._id}
                      id={element._id}
                      name={element.name}
                      image={element.image}
                      price={element.price}
                      quantity={element.quantity}
                      total={element.total}
                    />
                  ))}
                </div>
  
            
                <div className="main-container">
                  <div className="cart-summary-container">
                    <h2 className="cart-summary">Summary</h2>
                    <div className="total-summary">
                      <p className="total-title">Total Qty:</p>
                      <p className="total-value">{totalQuantity}</p>
                    </div>
                    <div className="total-summary">
                      <p className="total-title">Total Price:</p>
                      <p className="total-value">
                        <span className="dollar">$</span>
                        <span>{roundedTotalPrice}</span>
                      </p>
                    </div>
                    <button className="payment-button" onClick={handlePayment}>Payment </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </>
    );
  };
  
  export default Cart;