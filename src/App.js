import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { CartProvider } from './CartContext';
import NavBar from './components/NavBar';
import About from './components/About';
import Contact from './components/Contact';
import LandingPage from './components/LandingPage';
import DishCard from './components/DishCard';
import CartPage from './components/CartPage';
import "./App.css";

const STRAPI_URL = process.env.REACT_APP_STRAPI_URL;

// Stripe setup
const stripePromise = loadStripe("pk_test_51IUyyvA9gwdOZYvzBKJk6zWxwsNMeHzSnxSjSyHWeQqY5shd8fiu7AiKCQ3X5jMYFeeH7nM3hT2nGBhgol07mAUI002HrGz98l");

// Stripe CheckoutForm component
const CheckoutForm = () => {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Create a Checkout Session as soon as the page loads
    fetch(`${STRAPI_URL}/create-checkout-session`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  return (
    <div id="checkout">
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{clientSecret}}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  )
};

// Stripe Return component
const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    fetch(`${STRAPI_URL}/session-status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      });
  }, []);

  if (status === 'open') {
    return <Navigate to="/checkout" />;
  }

  if (status === 'complete') {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to {customerEmail}.
          If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    )
  }

  return null;
};

function App() {
  const [dishes, setDishes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch(`${STRAPI_URL}/api/dishes?populate=*`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const transformedDishes = data.data.map(dish => {
          let imageUrl = dish.attributes.Image?.data?.attributes?.url || '/default-image.jpg';
          if (!imageUrl.startsWith('http')) {
            imageUrl = `${STRAPI_URL}${imageUrl}`;
          }

          return {
            id: dish.id,
            name: dish.attributes.Name,
            description: dish.attributes.Description,
            price: dish.attributes.Price,
            image: imageUrl,
          };
        });
        setDishes(transformedDishes);
      } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
        setError(error.message);
      }
    };

    fetchDishes();
  }, []);

  return (
    <CartProvider>
      <Router>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/menu" element={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {error && <div>Error: {error}</div>}
                {dishes.map((dish) => (
                  <DishCard key={dish.id} dish={dish} />
                ))}
              </div>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutForm />} />
            <Route path="/return" element={<Return />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
