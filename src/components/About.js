import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 text-center"> {/* Added text-center here */}
      <div className="flex flex-col items-center">
        <img src="/yblogo.png" alt="Yucca Blossom Logo" className="w-1/2 md:w-1/3 lg:w-1/4 my-8" />
        <h1 className="text-3xl font-semibold leading-tight my-2">About Us</h1>
      </div>
      <p className="mt-4">
        Welcome to The Yucca Blossom, where the heart of Navajo tradition meets the spirit of modern southwestern cuisine. Nestled in the vibrant mountain town of Park City, Utah, we are a family-owned restaurant that takes pride in offering a unique dining experience that honors our rich cultural heritage.
      </p>
      <p className="mt-4">
        Our journey began with a simple vision: to create a space where the warmth of Navajo hospitality could be shared with everyone. We believe in the power of food to bring people together, and our menu is a testament to the diversity and richness of Native American culinary traditions.
      </p>
      <p className="mt-4">
        At The Yucca Blossom, every dish tells a story. Our recipes are thoughtfully crafted and infused with contemporary twists that speak to the evolving tastes of our guests. We source our ingredients from local growers and suppliers who share our commitment to sustainability and community.
      </p>
      <p className="mt-4">
        We invite locals and travelers alike to join us for a meal that is more than just food—it's an experience. Whether you're seeking a casual breakfast, a business lunch, or an intimate dinner, our doors are open. Come in to share a meal, celebrate our culture, and create memories that will last a lifetime.
      </p>
      <p className="mt-4">
        We look forward to welcoming you to our table and sharing the joy of Navajo cuisine with you. Ahéhee' (Thank You).
      </p>
      <br>
      </br>
    </div>
  );
};

export default About;
