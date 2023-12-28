import React from 'react';
import { useNavigate } from 'react-router-dom'; // 'useHistory' is replaced by 'useNavigate'

const LandingPage = () => {
  let navigate = useNavigate(); // 'useHistory' is replaced by 'useNavigate'

  const navigateToMenu = () => {
    navigate('/menu'); // 'push' is replaced by the function call itself
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('path_to_your_background_image')" }}>
      <img src="/yblogo.png" alt="Yucca Blossom Logo" className="w-1/2 md:w-1/3 lg:w-1/4" />
      <p className="text-lg text-center mb-2">72 Beauty Way, Park City, UT</p> {/* Address text */}
      <p className="text-lg text-center mb-8">(435) 555-7890</p> {/* Phone number text */}
      <button onClick={navigateToMenu} className="bg-neutral-700 hover:bg-neutral-400 text-white font-bold py-1 px-3">
        Order Now
      </button>
    </div>
  );
};

export default LandingPage;
