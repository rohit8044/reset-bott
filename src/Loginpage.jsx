import './css/style.css'
import { useNavigate } from 'react-router-dom'
export default function Loginpage(){
   const navigate = useNavigate();
    const submit=(e)=>{
        e.preventDefault();
        navigate("/dashbord")
    }
    return(
        <>
        <div className="container">
            <div className='logindiv'>
                <form onSubmit={submit} > 
                <label>Phone Nubmer</label>
                <div className='inputbox'>
                    <span className="logo">📞</span>
                    <input type='text' placeholder='Phone Nubmer'></input>
                </div>
                <label>Password</label>
                 <div  className='inputbox'>
                    <span className="logo">🔒</span>
                    <input type='text' placeholder='Password'></input>
                </div>
                <button className='loginbtn'>Login</button>
                <a href="register" className='create'>Creact Account</a>
                <a href="#" className='forget'>Forget Password</a>
                </form>
            </div>
        </div>
        </>
    )

}
