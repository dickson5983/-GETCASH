
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://jfdotsvfxtqrwcmpramg.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmZG90c3ZmeHRxcndjbXByYW1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxMDQ1MzIsImV4cCI6MjA2MzY4MDUzMn0.TkiD437ReQ8xc7J8wCB68oOZdxqPU-ltvuFAzAF5ypY";
const supabase = createClient(supabaseUrl, supabaseKey);

const paystackPublicKey = 'pk_live_170d64a2ef9a487becb9e3e7e892c7f9fd3b0306';

document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const phone = document.getElementById('phone').value;
  const referral = document.getElementById('referral').value;
  const status = document.getElementById('status');

  status.textContent = 'Processing payment...';

  const handler = PaystackPop.setup({
    key: paystackPublicKey,
    email,
    amount: 8000, // 80 KES in kobo
    currency: 'KES',
    callback: async function (response) {
      status.textContent = 'Registering...';

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        status.textContent = 'Registration failed: ' + error.message;
        return;
      }

      await supabase
        .from('users')
        .insert([{ email, phone, referral, payment_ref: response.reference }]);

      status.textContent = 'Registration successful! You can now login.';
    },
    onClose: function () {
      status.textContent = 'Payment cancelled.';
    },
  });

  handler.openIframe();
});