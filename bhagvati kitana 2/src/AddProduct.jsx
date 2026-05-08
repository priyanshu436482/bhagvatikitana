import React, { useState } from "react";

function AddProduct({ addProduct }) {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleAdd = () => {

    const newProduct = {
      id: Date.now(),
      name,
      price,
      image
    };

    addProduct(newProduct);

    setName("");
    setPrice("");
    setImage("");
  };

  return (
    <div style={{padding:"20px"}}>

      <input
        placeholder="Product name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

      <input
        placeholder="Price"
        value={price}
        onChange={(e)=>setPrice(e.target.value)}
      />

      <input
        placeholder="Image URL"
        value={image}
        onChange={(e)=>setImage(e.target.value)}
      />

      <button onClick={handleAdd}>
        Add Product
      </button>

    </div>
  );
}

export default AddProduct;
