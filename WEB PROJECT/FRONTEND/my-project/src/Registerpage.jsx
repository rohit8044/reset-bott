import './Registerpage.css'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react';
export default function Registerpage(){
  const nav = useNavigate()
  const [Error,setError]=useState()
  const [value,setvalue]=useState({
    User:"",
    Phone:"",
    Email:"",
    Password:"",
    Confirm:""
  });
  const changevalue = (e) => {
  const { name, value } = e.target;

  // Phone field ke liye sirf numbers
  if (name === "Phone") {
    setvalue((prev) => ({...prev, Phone: value.replace(/[^0-9]/g, "")}));
  } else {
    setvalue((prev) => ({ ...prev, [name]: value }));
  }
};
  const handleSubmit=(e)=>{
    e.preventDefault();
   if (value.Password !== value.Confirm) {
      setError("Passwords do not match!");
      return;
   }else{
    nav('/')
   }

  }
  return (
    <>
      <div className="regcontainer">
        <div className="regbox">
          <h3 className='regster'>REGISTER</h3>
        <form onSubmit={handleSubmit }> 

          <label>Enter Full Name</label>
          <div className="inputbox">
            <span className="icon">👤</span>
            <input type="text" placeholder="Enter Full Name" required name='User' onChange={changevalue}/>
          </div>

          <label>Phone Number</label>
          <div className="inputbox">
            <span className="icon">📞</span>
        <input type="text" placeholder="Phone Number" maxLength="10" required name="Phone" value={value.Phone} onChange={changevalue} inputMode="numeric" pattern="[0-9]*" />
          </div>

          <label>Password</label>
          <div className="inputbox">
            <span className="icon">🔒</span>
            <input type="password" placeholder="Password" required name='Password' onChange={changevalue}/>
          </div>

          <label>Confirm Password</label>
          <div className="inputbox">
            <span className="icon">🔒</span>
            <input type="password" placeholder="Confirm Password"  required name='Confirm' onChange={changevalue}/>
          </div>
          <p className='errormessa'>{Error}</p>
          <button className='registerbtn' type='submit'>Register</button>
          </form>
        </div>
      </div>
    </>
  );
}
