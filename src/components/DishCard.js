import React, { useState, useEffect } from 'react';
import { useCart } from '../CartContext'; // Make sure this path is correct based on your project structure

const DishCard = ({ dish }) => {
  const { addToCart } = useCart();
  const [showPopup, setShowPopup] = useState(false);

  // Assuming dish.image is the full URL to the image
  const imageUrl = dish.image ? dish.image : '/default-image.jpg'; // Replace '/default-image.jpg' with a placeholder image path if dish.image is null

  const handleAddToCartClick = () => {
    addToCart(dish);
    setShowPopup(true);
  };

  useEffect(() => {
    let timer;
    if (showPopup) {
      timer = setTimeout(() => {
        setShowPopup(false);
      }, 3000); // Hide popup after 3 seconds
    }
    return () => clearTimeout(timer); // Cleanup the timer
  }, [showPopup]);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-2 relative">
      {showPopup && (
        <div className="absolute top-0 right-0 bg-white text-black p-2">
          Item added to cart
        </div>
      )}
      <img 
        className="w-full h-60 object-cover" // Tailwind classes to set width and height
        src={imageUrl} 
        alt={dish.name} 
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{dish.name}</div>
        <p className="text-gray-700 text-base">
          {dish.description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2 flex justify-end items-center">
        <span className="inline-block bg-neutral-200 rounded-full px-2 py-2 text-sm font-semibold text-neutral-700 mr-3 mb-2">${dish.price}</span>
        <button 
          onClick={handleAddToCartClick} 
          className="bg-neutral-700 hover:bg-neutral-400 text-white font-bold py-1 px-3"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default DishCard;
