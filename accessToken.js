const axios = require('axios');

const consumerKey = 'PNJmMhWxIyTeR18XjJm2MzQ4F87Ig2bLAaQKvD3cVLFRxdGJ';
const consumerSecret = 'prMOrfBdX9m89Qmw0R9aNrzBKQ01phEPWaumAXiAiT1uqZdkEHXAgjCGthLDLaNB';

const accessToken = async () => {
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

  try {
    const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Failed to get access token:', error.response ? error.response.data : error.message);
    throw error;
  }
};

module.exports = { accessToken };