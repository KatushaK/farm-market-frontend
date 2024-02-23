import React, { useState } from 'react';
import { IoCloudUploadOutline } from "react-icons/io5";
import ImagetoBase64 from '../utility/ImagetoBase64';
import { toast } from 'react-hot-toast';

const Newproduct = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: ""
  })

  const handleOnChange = (e) => {
    const {name, value} = e.target
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  const handleUploadImage = async (e) => {
    const imageData = await ImagetoBase64(e.target.files[0])
    setData((data) => {
      return{
        ...data,
        image: imageData
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const {name, image, category, price} = data
    if(name && image && category && price) {
      const fetchData = await fetch(`https://farm-market-backend.onrender.com/uploadProduct`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
  
      const fetchRes = await fetchData.json()
      toast(fetchRes.message)

      setData({
        name: "",
        category: "",
        image: "",
        price: "",
        description: ""
      })
    }
    else {
      toast("Enter required fields")
    }
  }



  return (
    <div className="newProduct">
      <div className="newProductModal">
        <form className="newProductForm" onSubmit={handleSubmit}>

          <label htmlFor="name" className="newProductLabel">Name</label>
          <input type="text" name="name" value={data.name} className="newProductField" onChange={handleOnChange}/>

          <label htmlFor="category" className="newProductLabel">Category</label>
          <select className="newProductField" id="category" name="category" value={data.category} onChange={handleOnChange}>
            <option value={"other"}>Select category</option>
            <option value={"fruits"}>Fruits</option>
            <option value={"vegetables"}>Vegetables</option>
            <option value={"berries"}>Berries</option>
          </select>

          <label htmlFor="image" className="newProductLabel">Image
            <div className="newProductUpload">
              {
                data.image ? 
                <img src={data.image} alt="" className="img-upload"/> : 
                <span className="newProductImage">
                  <IoCloudUploadOutline />
                </span>
              }
              <input type="file" accept="image/*" id="image" className="uploadImage" onChange={handleUploadImage}/>
            </div>
          </label>

          <label htmlFor="price" className="newProductLabel">Price, $</label>
          <input type="text" name="price" value={data.price} className="newProductField" onChange={handleOnChange}/>

          <label htmlFor="description" className="newProductLabel">Description</label>
          <textarea name="description" id="description" value={data.description} rows="5" className="newProductTextarea" onChange={handleOnChange}></textarea>

          <button className="btn-save">Save</button>

        </form>
      </div>
    </div>
  )
}

export default Newproduct;
