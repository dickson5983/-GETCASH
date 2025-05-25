const payWithPaystack = () => {
  const handler = PaystackPop.setup({
    key: 'pk_live_170d64a2ef9a487becb9e3e7e892c7f9fd3b0306', // Your live public key
    email: 'dicksonmutinda06@gmail.com',
    amount: 100, // KES 1 = 100 kobo
    currency: 'KES',
    callback: function (response) {
      // Send reference to backend for verification
      fetch('http://localhost:5000/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reference: response.reference }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === true) {
            alert('Payment successful and verified!');
          } else {
            alert('Payment verification failed.');
          }
        });
    },
    onClose: function () {
      alert('Transaction was not completed.');
    },
  });

  handler.openIframe();
};

document.getElementById('pay-btn').addEventListener('click', payWithPaystack);