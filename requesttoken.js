const axios = require('axios');

const consumerKey = 'NGnqIOOiipNSC2WacArO8RWv9ETGL6T7rrNQVy6C2fq6htzo';
const consumerSecret ='mxAnHO0dCXWswLJl35MPc8XegHXjiEEu7ynbBpZjUsRphEKbQDEQaAfw2AChpKNN'; // Replace with your actual secret

const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

const getToken = async () => {
  try {
    const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
      headers: {
        Authorization: `Basic ${auth}`
      }
    });

    console.log('Access Token:', response.data.access_token);
  } catch (error) {
    if (error.response) {
  console.error('Error getting token:', error.response.status, error.response.data);
} else {
  console.error('Network or other error:', error.message);
}
  }
};

getToken();