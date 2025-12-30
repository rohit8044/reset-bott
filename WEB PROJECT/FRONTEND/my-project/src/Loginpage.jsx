import './Loginpage.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Loginpage(){
    const [phone, setPhone] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const submit=(e)=>{
        e.preventDefault();
        navigate("/dashbord")
    }
    const handlePhoneChange = (e) => {
        setPhone(e.target.value.replace(/[^0-9]/g, ""));
    };

    return(
        <>
        <div className="container">
            <div className='logindiv'>
                <h3 className='freefire'>FREE FIRE</h3>
                <form onSubmit={submit} > 
                <label>Phone Nubmer</label>
                <div className='inputbox'>
                    <span className="logo">📞</span>
                    <input type="text" placeholder="Phone Number" required maxLength={10} value={phone} onChange={handlePhoneChange} inputMode="numeric" pattern="[0-9]*" />
                </div>
                <label>Password</label>
                 <div  className='inputbox'>
                    <span className="logo">🔒</span>
                   <input type={showPassword ? "text" : "password"} placeholder="Password" required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className='showbtn'> {showPassword ? <FiEyeOff /> : <FiEye />}</button>
                </div>
                <button className='loginbtn'>Log in</button>
                </form>
                 <a href="register" className='create'>Creact Account</a>
                <a href="#" className='forget'>Forget Password</a>
                <p className='Garena'>© Garena  Free Fire Style</p>
            </div>
        </div>
        </>
    )
}