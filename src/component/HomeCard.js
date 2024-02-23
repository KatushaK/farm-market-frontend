import React from 'react'

const HomeCard = ({image, name, category, price}) => {
  return (
    <div>
        <div className="product-card">
            <img src={image} alt="product" className="product-image" />
            <h3 className="product-name">{name}</h3>
            <p className="product-category">{category}</p>
            <p className="product-price"><span className="dollar">$</span><span>{price}</span></p>
        </div>
    </div>
  )
}

export default HomeCard;