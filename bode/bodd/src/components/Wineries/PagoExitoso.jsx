import React, { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PagoExitoso = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get('session_id');
  const hasConfirmed = useRef(false);

  useEffect(() => {
    const confirmarPago = async () => {
      try {
        // Verificar si ya se ejecutó o si no hay sessionId
        if (!sessionId || hasConfirmed.current) return;
        hasConfirmed.current = true;

        // 1. Obtener detalles de la sesión de Stripe
        const sessionResponse = await fetch(`http://localhost:8080/api/checkout/session-info?session_id=${sessionId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!sessionResponse.ok) {
          throw new Error('Error al verificar el pago en Stripe');
        }

        const session = await sessionResponse.json();
        
        // 2. Confirmar el pago en nuestro backend
        const confirmResponse = await fetch("http://localhost:8080/api/pagos/confirmar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            bodegaId: session.metadata?.bodega_id || session.bodega_id,
            clienteId: session.metadata?.cliente_id || session.cliente_id,
            sessionId: sessionId,
            monto: session.amount_total / 100,
            paymentStatus: session.payment_status
          })
        });

        if (!confirmResponse.ok) {
          const errorData = await confirmResponse.json();
          throw new Error(errorData.message || 'Error al confirmar el pago');
        }

        const result = await confirmResponse.json();
        alert(`¡Pago exitoso! Bodega ${result.bodegaId} rentada correctamente.`);
        navigate('/renta/mis-rentas');
      } catch (error) {
        console.error('Error:', error);
        alert('Error al confirmar el pago: ' + error.message);
        navigate('/');
      }
    };

    confirmarPago();
  }, [sessionId, navigate]);

  return <div className="p-8 text-center">Verificando tu pago...</div>;
};

export default PagoExitoso;