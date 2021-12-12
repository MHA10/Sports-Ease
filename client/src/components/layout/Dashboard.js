import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="dark-overlay">
      <div className="landing-inner">
        <div className="buttons">
          <Link to="/add-venue" className="btn btn-primary">
            Add a Venue
          </Link>
          <Link to="/booking-venues" className="btn btn-primary">
            Book the Venue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
