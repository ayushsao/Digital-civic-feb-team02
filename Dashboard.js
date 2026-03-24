import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {

  const role = localStorage.getItem("role");

  return (
    <div style={{ padding: "20px" }}>

      <h2>Poll System Dashboard</h2>

      {/* All users can view polls */}

      <Link to="/polls">
        <button>View Polls</button>
      </Link>

      <br /><br />

      {/* Only officials can create polls */}

      {role === "official" && (
        <Link to="/create-poll">
          <button>Create Poll</button>
        </Link>
      )}

      {/* Citizens cannot create polls */}

      {role === "citizen" && (
        <p>You can vote on polls but cannot create polls.</p>
      )}

    </div>
  );
};

export default Dashboard;
