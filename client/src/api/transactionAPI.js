import axios from 'axios';

const API_URL = 'http://localhost:8000/stripe';

const createPayment = async (paymentData) => {
  try {
    const response = await axios.post(`${API_URL}/create-checkout-session`, { paymentData: `${paymentData}` });

    console.log(response)

    const { url } = response.data;

    window.location.href = url;
  } catch (error) {
    console.error('Error creating checkout session:', error);
  }
}

const manageBilling = async (sessionId) => {
  try {
    const response = await axios.post(`${API_URL}/create-portal-session`, { session_id: `${sessionId}` });

    console.log(response)
    
    const { url } = response.data;

    window.location.href = url;
  } catch (error) {
    console.error('Error creating billing portal session:', error);
  }
}

const confirmPayment = async (paymentIntentId) => {
  try {
    // Confirm the payment intent status via backend
    const response = await axios.post(`${API_URL}/confirm-payment`, { paymentIntentId });
    if (response.data.status === 'succeeded') {
      console.log("Payment confirmed:", response.data);
      // Handle success, e.g., display receipt
    } else {
      console.error("Payment not successful:", response.data);
    }
  } catch (error) {
    console.error("Error confirming payment:", error);
  }
};

export { createPayment, confirmPayment, manageBilling };