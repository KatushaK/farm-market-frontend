## Overview

This full-stack web application allows users to explore and order a variety of fresh fruits, vegetables, and berries from our farm. The application features a user-friendly interface with essential functionalities such as shopping cart management, product details, user authentication, and more.

## Features

- **Browse Products:** Explore a wide range of fresh produce, categorized by fruits, vegetables, and berries.

- **Shopping Cart:** Easily add products to your cart, view the total quantity and price, and proceed to payment. Stripe is used to proceed Payments with success or failure.

- **Product Details:** Click on a product to view detailed information on a separate page.

- **User Authentication:** Sign up and log in to manage your account and track your orders.

- **Admin Functionality:** Admin users can add new products, including image uploads. 
Admin credentials: store_admin@gmail.com / 12345

- **Stripe Payment Integration:** Secure payment processing using Stripe. Test payment transactions can be made using Stripe's test credit cards.

## Stripe Test Payment Information
To test the payment system, use the following **Stripe test card numbers**:

**Successful Payment:**  
  Card Number: `4242 4242 4242 4242`  
  Expiry: Any future date  
  CVC: Any 3 digits
  
**Failed Payment (Insufficient Funds):**  
  Card Number: `4000 0000 0000 9995`  
  Expiry: Any future date  
  CVC: Any 3 digits

For additional test cards, please refer to Stripe's [official documentation](https://stripe.com/docs/testing).


## Technologies Used

- **Frontend:** React, Redux for state management.
- **Backend:** Node.js, Express, MongoDB for data storage.
- **User Authentication:** JWT (JSON Web Tokens).
- **Notifications:** React Hot Toast.
- **Payment Processing:** Stripe API.


## Links
Link to Netlify:  https://farm-market.netlify.app


## Installation

1. Clone the repository.

```bash
git clone https://github.com/KatushaK/farm-market-frontend.git
cd farm-market-frontend


