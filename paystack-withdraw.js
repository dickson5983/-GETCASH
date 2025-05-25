// Initialize Paystack withdrawal
function withdrawWithPaystack(amountKES, userEmail, userPhone) {
  if (!amountKES || !userEmail || !userPhone) {
    alert("Missing user details for withdrawal.");
    return;
  }

  let handler = PaystackPop.setup({
    key: 'pk_live_170d64a2ef9a487becb9e3e7e892c7f9fd3b0306', // Replace with your real Paystack public key
    email: userEmail,
    amount: amountKES * 100, // Convert to kobo
    currency: "KES",
    ref: "WD_" + Math.floor(Math.random() * 1000000000 + 1),
    metadata: {
      custom_fields: [
        {
          display_name: "Phone Number",
          variable_name: "phone_number",
          value: userPhone
        }
      ]
    },
    callback: function(response) {
      alert('Withdrawal request sent. Reference: ' + response.reference);
      console.log("Withdrawal Success:", response);
      // Optionally save withdrawal record to Firestore here
    },
    onClose: function() {
      alert('Withdrawal window closed.');
    }
  });

  handler.openIframe();
}