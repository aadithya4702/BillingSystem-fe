import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Analytics from "./Analytics";
import Order from "./Order";

// Dummy components for different pages
const Home = () => <div>Home Page Content</div>;

const Offers = () => <div>Offers Page Content</div>;
const Messages = () => <div>Messages Page Content</div>;
const Notifications = () => <div>Notifications Page Content</div>;
const Settings = () => <div>Settings Page Content</div>;

const Dashboard = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-grow ">
          <Routes>
            <Route path="/home" element={<Order />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/logout" element={<div>Logging out...</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Dashboard;
