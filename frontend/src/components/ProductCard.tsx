import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Prix : {product.price}</p>
      <button>Acheter</button>
    </div>
  );
};

export default ProductCard;