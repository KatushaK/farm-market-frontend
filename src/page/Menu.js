import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { addItemToCart, setDataProduct } from '../redux/productSlice';
import FreshProduce from '../component/FreshProduce';
import FancyLoader from '../component/FancyLoader';

const Menu = () => {
  const [productDisplay, setProductDisplay] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { filterby } = useParams();
  const productData = useSelector((state) => state.product.productList);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://farm-market-backend.onrender.com/product`);
        const resData = await res.json();
        dispatch(setDataProduct(resData));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);


  
  useEffect(() => {
    if (productData && filterby) {
      const filteredProduct = productData.find((element) => element._id === filterby);
      setProductDisplay(filteredProduct);
    }
  }, [productData, filterby]);

  
  const handleAddToCart = () => {
    dispatch(addItemToCart(productDisplay))
  }

  const handleBuy = () => {
    dispatch(addItemToCart(productDisplay))
    navigate('/cart')
  }



  return (
    <div className="product-section">
      {loading ? (
        <FancyLoader/>
      ) : (
        <div>

          <div className="product-details">
            <div className="product-image-details">
              {productDisplay && <img src={productDisplay.image} alt="product" className="product-img"/>}
            </div>

            <div className="product-overview-details">
              <h3 className="product-overview-name">{productDisplay.name}</h3>
              <p className="product-overview-category">{productDisplay.category}</p>
              <p className="product-overview-description">{productDisplay.description}</p>
              <p className="product-overview-price"><span className="dollar">$</span><span>{productDisplay.price}</span></p>
              <div className="product-buttons">
                  <button className="product-button" onClick={handleBuy}>Buy</button>
                  <button className="product-button" onClick={handleAddToCart}>Add to Cart</button>
              </div>
            </div>
          </div>

          <div className="related-items">
            <h2 className="fresh-fruits">Related Items</h2>
            <FreshProduce productData={productData} />
          </div>

        </div>
      )}
    </div>
  );
  }

export default Menu;



