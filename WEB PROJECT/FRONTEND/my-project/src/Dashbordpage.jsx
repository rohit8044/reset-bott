import React, { useState, useEffect } from "react";
import "./Dashbordpage.css";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function Dashbordpage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();

  const isDashboardHome = location.pathname === "/dashbord";

  // Auto-hide sidebar when navigating
  useEffect(() => {
    if (location.pathname !== "/dashbord") {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  return (
    <div className="app">

      {/* Top Bar */}
      <div className="topbar">
        <div className="logo">
          <span className="logo-icon"></span>
          ROHIT
        </div>

        <div className="menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      {/* Layout */}
      <div className="container">

        {/* Sidebar */}
        <div className={`sidebar ${sidebarOpen ? "open" : "hidden"}`}>
          <div className="logouser"></div>
          <Link className="link" to="user">User</Link>
          <Link className="link" to="phone">Phone</Link>
        </div>

        {/* Main Content */}
        <div className="content">
          {isDashboardHome && (
            <div className="dashpage">
              <h1>Dashboard Page</h1>
            </div>
          )}

          <Outlet />
        </div>

      </div>
    </div>
  );
}




