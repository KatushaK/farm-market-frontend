import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDataProduct } from '../redux/productSlice';
import HomeCard from '../component/HomeCard';
import CardFeature from '../component/CardFeature';
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

import FreshProduce from '../component/FreshProduce';
import FancyLoader from '../component/FancyLoader';



function Home() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const productData = useSelector((state) => state.product.productList);
  const containerRef = useRef(null);
  const freshProduceRef = useRef(null); 
  const [scrollPosition, setScrollPosition] = useState(0);
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/product`);
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

  const homeProductCartList = productData.slice(9, 12);
  const homeProductCartListFruits = productData.filter((element) => element.category === 'fruits');

  
  const handlePrev = () => {
    const container = containerRef.current;
    const newPosition = scrollPosition - container.offsetWidth;
    container.scrollTo({
      left: newPosition,
      behavior: 'smooth',
    });
    setScrollPosition(newPosition);
  };


  const handleNext = () => {
    const container = containerRef.current;
    const newPosition = scrollPosition + container.offsetWidth;
    container.scrollTo({
      left: newPosition,
      behavior: 'smooth',
    });
    setScrollPosition(newPosition);
  };


  const handleExploreNow = () => {
    freshProduceRef.current.scrollIntoView({ behavior: 'smooth' });
  };



  return (
    <div>
      {loading ? (
        <div><FancyLoader/></div>
      ) : (
        <>
          <div className="home-position">
            <div className="left-panel">
              <h2 className="delivery">We deliver organic fruits & vegetables <span className="delivery-span">fresh</span> from our fields to <span className="delivery-span">your home!</span></h2>
              <p className="home-description">Welcome to our bountiful farm-to-door experience, where freshness meets convenience! From succulent berries to crisp greens, every delivery is a testament to our commitment to quality, sustainability, and a healthier lifestyle. Explore the goodness of our harvest!</p>          
              <button className="btn-order" onClick={handleExploreNow}>Explore now</button>
            </div>

            <div className="right-panel">
              {homeProductCartList.map((element) => (
                <HomeCard
                  key={element._id}
                  image={element.image}
                  name={element.name}
                  price={element.price}
                  category={element.category}
                />
              ))}
            </div>
          </div>


          <div className="slides-section">
            <div className="slides-nav">
              <h2 className="fresh-fruits">Most Popular Fruits</h2>
              <div className="prev-next">
                <button className="prev" onClick={handlePrev}><GrPrevious /></button>
                <button className="next" onClick={handleNext}><GrNext /></button>
              </div>
            </div>

            <div className="slides"  ref={containerRef}>
              {homeProductCartListFruits.map((element) => (
                <CardFeature
                  key={element._id}
                  id={element._id}
                  name={element.name}
                  category={element.category}
                  price={element.price}
                  image={element.image}
                />
              ))}
            </div>
          </div>


          <div ref={freshProduceRef}>
            <h2 className="fresh-fruits">Fresh Produce</h2>
            <FreshProduce productData={productData} />
          </div>
        </>
      )}
    </div>
    );
  }

export default Home;



