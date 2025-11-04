const axios = require('axios');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MDM2ZTI2ZWEzNzVlMjM5YmRkMWI5YSIsImVtYWlsIjoiYXBwdTEyM0BnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTc2MTgzODc4NSwiZXhwIjoxNzYxODQyMzg1fQ.5GwyldNDuzCMTr_rbjDL25Wz5-c9rUOMebA4tvv8NHs';
const url = 'http://localhost:5000/api/cart/apply-coupon';
const data = { couponCode: 'SAVE10' };

axios.post(url, data, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
})
.then(response => {
  console.log('Response:', JSON.stringify(response.data, null, 2));
})
.catch(error => {
  console.error('Error:', error.response ? error.response.data : error.message);
});
