import axios from 'axios';

const API_URL = 'http://localhost:8000/stripe/'; 

// send plan detials along with user info to backend

try {
    // Call your backend to create a Checkout Session using Axios
    const response = await axios.post(`${API_URL}/create-checkout-session`);

    const { id } = response.data; // Get the session ID

    // Redirect to Stripe's prebuilt checkout page
    const stripe = await window.Stripe('your_publishable_key_here');
    const { error } = await stripe.redirectToCheckout({ sessionId: id });

    if (error) {
      console.error('Error redirecting to checkout:', error);
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
  }