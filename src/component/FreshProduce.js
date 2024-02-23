import React from "react";
import AllCategories from "../component/AllCategories";
import CardFeature from "../component/CardFeature";
import { useSelector } from "react-redux";
import { getSelectedCategory } from "../redux/FilterSlice";

const FreshProduce = ({ productData }) => {
  const selectedCategory = useSelector(getSelectedCategory);

  return (
    <div>
      <AllCategories />

      <div className="items-list">
        {productData
          .filter((item) => {
            if (selectedCategory === "all") return true;
            return selectedCategory === item.category;
          })
          .map((item) => (
            <CardFeature
              key={item._id}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
      </div>
    </div>
  );
};

export default FreshProduce;
