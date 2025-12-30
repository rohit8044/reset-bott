import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import User from './User';
import Loginpage from './Loginpage';
import Registerpage from './Registerpage';
import Dashboard from './Dashbordpage';
import Phone from './Phone';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
       <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
        
        <Route path="/dashbord" element={<Dashboard />}>
        <Route path="user" element={<User />} />
        <Route path="phone" element={<Phone />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);


