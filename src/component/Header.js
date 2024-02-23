import React, { useState } from 'react';
import logo from '../assets/logo.jpg';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import Home from '../page/Home';
import { FaRegUser } from "react-icons/fa";
import { GrCart } from "react-icons/gr";
import Menu from '../page/Menu';
import About from '../page/About';
import Contact from '../page/Contact';
import Login from '../page/Login';
import Newproduct from '../page/Newproduct';
import Signup from '../page/Signup';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRedux } from '../redux/userSlice';
import { toast } from 'react-hot-toast';
import Cart from '../page/Cart';
import Success from '../page/Success';
import Cancel from '../page/Cancel';



const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const userData = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const handleShowMenu = () => {
        setShowMenu(!showMenu)
    }

    const handleLogout = () => {
        dispatch(logoutRedux())
        toast("You have been logged out successfully")
    }

    const cartItemNumber = useSelector((state) => state.product.cartItem)



    return (
        <header>
            <Router>
          {/* desktop */}
                <nav className="nav-desktop">
                    <Link to="/" className="logo"> 
                        <img src={logo} className="logo-img" alt="logo" /> 
                    </Link>
                    <div className="responsive-desktop">
                        <Link to="/" className="link"> Home </Link>
                        <Link to="about" className="link"> About </Link>
                        <Link to="contact" className="link"> Contact </Link>
                    </div>
                    <div className="cart-container">
                        <div className="cart-icon">
                            <Link to={"cart"} style={{ color: 'black' }}> <GrCart /> </Link> 
                        </div>
                        <div className="cart-count">{cartItemNumber.length}</div>
                    </div>

                    <div onClick={handleShowMenu}>
                    <div className="user-icon">
                        {userData._id ? 
                        <p className="initials">
                            {userData.firstName.charAt(0)}{userData.lastName.charAt(0)}
                        </p>
                        : <FaRegUser /> }
                    </div>

                    {
                        showMenu && (
                        <div className="user-options">
                            {/* mobile */}
                            <nav className="responsive-mobile">
                                <Link to="/" className="user-option"> Home </Link>
                                <Link to="about" className="user-option"> About </Link>
                                <Link to="contact" className="user-option"> Contact </Link>
                            </nav>

                            {
                                userData.email === "store_admin@gmail.com" && <Link to="newproduct" className="user-option">New product</Link>
                            }
                            
                            {
                                userData._id ? <p className="logout" onClick={handleLogout}>Logout</p> : <Link to="login" className="user-option">Login</Link>
                            }
                            </div>
                    )}
                </div>
                
            </nav>



            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="menu/:filterby" element={<Menu/>}/>
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="newproduct" element={<Newproduct />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="cart" element={<Cart />} />
                <Route path="success" element={<Success/>} />
                <Route path="cancel" element={<Cancel/>} />
            </Routes>
        </Router>

    </header>
  )
}


export default Header