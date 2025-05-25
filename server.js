const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

const PAYSTACK_SECRET_KEY = 'sk_live_xxxxxxxxxxxxx'; // replace with your real secret key

app.post('/verify-payment', async (req, res) => {
  const reference = req.body.reference;

  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (data.status && data.data.status === 'success') {
      // Payment was successful
      res.json({ status: true, message: 'Payment verified successfully' });
    } else {
      res.json({ status: false, message: 'Payment verification failed' });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: 'Server error', error });
  }
});