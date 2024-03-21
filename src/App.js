import './App.css';
import Header from './component/Header';
import { Toaster } from 'react-hot-toast';
import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import Home from './page/Home';
import Menu from './page/Menu';
import About from './page/About';
import Contact from './page/Contact';
import Login from './page/Login';
import Newproduct from './page/Newproduct';
import Signup from './page/Signup';
import Cart from './page/Cart';
import Success from './page/Success';
import Cancel from './page/Cancel';



function App() {

  return (
    <Router>
      <Toaster />         
      <Header />

      <Routes>    
        <Route path="/" element={<Home />} />
        <Route path="menu/:filterby" element={<Menu />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="newproduct" element={<Newproduct />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="cart" element={<Cart />} />
        <Route path="success" element={<Success />} />
        <Route path="cancel" element={<Cancel />} />
      </Routes>
    </Router>

  );
}

export default App;
