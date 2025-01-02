import axios from 'axios';

const API_URL = 'http://localhost:8000/stripe/';

/*
Collect Payment: Gather payment details from the user
Create Payment Intent: Send user and transaction details to PayME server to start payment processing
Confirm Payment: Display the result of the transaction (payment reciept)
*/

const collectPayment = async (paymentDetails) => {
  try {
    // Simulate collecting payment details
    return paymentDetails; // In real cases, validate and return sanitized details
  } catch (error) {
    console.error("Error collecting payment details:", error);
  }
};

const createPayment = async() => {
  try {
    // Call your backend to create a Checkout Session using Axios
    const response = await axios.post(`${API_URL}/create-checkout-session`);

    const { id } = response.data; // Get the session ID

    // Redirect to Stripe's prebuilt checkout page
    const stripe = await window.Stripe('your_publishable_key_here');
    const { error } = await stripe.redirectToCheckout({ sessionId: id });

    if(error) {
      console.error('Error redirecting to checkout:', error);
    }
  } catch(error) {
    console.error('Error creating checkout session:', error);
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

export { createPayment, collectPayment, confirmPayment };