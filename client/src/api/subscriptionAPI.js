import axios from 'axios';

const API_URL = 'http://localhost:8000/api/subscriptions';

// get all plan details from backend



// const accessToken = localStorage.getItem('accessToken'); 
// const role = 'user'; 

// const response = await axios.get(`${API_URL}/allSubscriptions`, {
//   headers: {
//     Authorization: `Bearer ${accessToken}`, 
//     Role: role, 
//   },
// });

// return response.data;

const getALLSubcriptions = async () => {
  try {
    const response = await axios.get(`${API_URL}/allSubscriptions`);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    throw error;
  }
};

export { getALLSubcriptions }