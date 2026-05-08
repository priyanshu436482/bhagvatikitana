import React, { useState } from "react";
import AddProduct from "./AddProduct";

function Home() {

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "arial power gel",
      price: 899,
      image: "https://example.com/ariel.jpg",
    },
  ]);

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  return (
    <div>

      <AddProduct onAdd={addProduct} />

      <h2>Product List</h2>

      <div className="product-grid">
        {products.map((item) => (
          <div key={item.id} className="product-card">

            <img src={item.image} width="150" />

            <h3>{item.name}</h3>

            <p>₹{item.price}</p>

          </div>
        ))}
      </div>

    </div>
  );
}

export default Home;
