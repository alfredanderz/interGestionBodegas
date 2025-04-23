import { loadStripe } from '@stripe/stripe-js';
import React from 'react';

const stripePromise = loadStripe('pk_test_51RG9t24QPCaUtYYlijtN5174n0hWQ8Kz0pUno1l5S0jF6asikVXn4a5mR8D2svcdX8PyMm0rH9fwe8Pph2XOewVE00pFsDtM2p');

const CheckoutButton = ({ bodegaId }) => {
  const handleCheckout = async () => {
    try { 
      const stripe = await stripePromise;
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
const userId = user ? user.id : null;
      
      // 1. Crear sesión de Checkout en el backend
      const response = await fetch('http://localhost:8080/api/checkout/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          bodegaId: Number(bodegaId),
          clienteId: Number(userId)
        })
      });

      if (!response.ok) {
        const text = await response.text(); // leer como texto plano
        let errorMessage = 'Error al crear sesión de pago';
        try {
          const errorData = JSON.parse(text); // intenta convertirlo a JSON
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = text; // si no es JSON, usa el texto plano
        }
        throw new Error(errorMessage);
      }

      const { sessionId } = await response.json();
      
      // 2. Redirigir a Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId
      });

      if (result.error) {
        throw result.error;
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error al procesar el pago: ' + error.message);
    }
  };

  return (
    <button 
      onClick={handleCheckout}
      className="w-full custom-bg  text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
    >
      Rentar con Stripe
    </button>
  );
};

export default CheckoutButton;