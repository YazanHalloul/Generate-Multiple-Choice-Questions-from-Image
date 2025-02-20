import React from "react";
import { useNavigate } from "react-router-dom";
import './unlogged.css';

function UnLogged() {
  const navigate = useNavigate();

  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>Oops!</h1>
          <h2>You need to be logged in to view this content</h2>
        </div>
        <button
          onClick={() => {
            navigate("/auth");
          }}
        >
          Go TO Login
        </button>
      </div>
    </div>
  );
};

export default UnLogged;
