import React, { useState } from 'react';
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import {Link, useNavigate} from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Signup = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }


    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((data) => ({
            ...data,
            [name]: value,
        }));
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const {firstName, lastName, email, password, confirmPassword} = data
        if(firstName && lastName && email && password && confirmPassword) {
            if(password === confirmPassword) {
                const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/signup`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(data)
                })

                const dataRes = await fetchData.json()
                toast(dataRes.message)
                if(dataRes.alert) {
                    navigate("/login")
                }
            }
            else {
                toast("Password and Confirm password do not match")
            }
        }
        else {
            toast("Please fill out required fields")
        }
    }



  return (
    <div className="signup"> 
        <div className="signup-modal">
            <h1 className="signup-text">Sign up</h1>
            
            <form className="signup-form" onSubmit={handleSubmit}>
                <label htmlFor="firstName" className="signup-labels">First Name</label>
                <input type="text" 
                    id="firstName" 
                    name="firstName" 
                    className="signup-fields" 
                    value={data.firstName}
                    onChange={handleOnChange} />

                <label htmlFor="lastName" className="signup-labels">Last Name</label>
                <input type="text" 
                    id="lastName" 
                    name="lastName" 
                    className="signup-fields" 
                    value={data.lastName}
                    onChange={handleOnChange} />

                <label htmlFor="email" className="signup-labels">Email</label>
                <input type="email" 
                    id="email" 
                    name="email" 
                    className="signup-fields" 
                    value={data.email}
                    onChange={handleOnChange} />

                <label htmlFor="password" className="signup-labels">Password</label>
                <div className="password-field">
                    <input type={showPassword ? "text" : "password"} 
                        id="password" 
                        name="password" 
                        className="password-output" 
                        value={data.password}
                        onChange={handleOnChange} />
                    <span className="showIcon" onClick={handleShowPassword} title={showPassword ? 'Hide Password' : 'Show Password'}> 
                        {showPassword ? <BiHide /> : <BiShow />} 
                    </span>
                </div>

                <label htmlFor="confirmPassword" className="signup-labels">Confirm password</label>
                <div className="password-field">
                    <input type={showConfirmPassword ? "text" : "password"} 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        className="password-output" 
                        value={data.confirmPassword}
                        onChange={handleOnChange} />
                    <span className="showIcon" onClick={handleShowConfirmPassword} title={showConfirmPassword ? 'Hide Password' : 'Show Password'}> 
                        {showConfirmPassword ? <BiHide /> : <BiShow />} 
                    </span>
                </div>

                <button className="btn-signup">Sign up</button>
            </form>

            <p className="link-to-login">Already have an account? <Link to="/login" className="login-text">Login</Link> </p>
        </div>
    </div>
  )
}

export default Signup;