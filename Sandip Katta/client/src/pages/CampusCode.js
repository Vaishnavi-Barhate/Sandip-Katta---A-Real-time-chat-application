import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CampusCode = () => {
  const [campusCode, setCampusCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCampusCodeSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/verify-campus-code",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ campusCode }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        navigate("/Chat");
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error("Error verifying campus code:", err);
      setError("Error connecting to the server.");
    }
  };

  const wrapperStyle = {
    background: "linear-gradient(135deg, #00F0FF, #8B00FF, #FF00A6, #00FF85)",
    backgroundSize: "400% 400%",
    animation: "gradientBG 12s ease infinite",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Comic Neue', cursive",
  };

  const cardStyle = {
    background: "rgba(0, 0, 0, 0.7)",
    borderRadius: "20px",
    padding: "2.5rem",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 0 30px #FF00FF",
    color: "#00FFD1",
    textAlign: "center",
  };

  const inputStyle = {
    width: "380px",
    padding: "0.85rem 1rem",
    marginBottom: "1.2rem",
    fontSize: "1rem",
    borderRadius: "10px",
    outline: "none",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "#00FFD1",
  };

  const buttonStyle = {
    width: "100%",
    padding: "0.85rem 1rem",
    fontSize: "1rem",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#FF00FF",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
    letterSpacing: "1px",
    boxShadow: "0 0 15px #FF00FF",
    transition: "0.3s ease all",
  };

  const buttonHoverStyle = {
    backgroundColor: "#00FFD1",
    color: "#000",
    boxShadow: "0 0 20px #00FFD1",
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <style>
        {`
          @keyframes gradientBG {
            0% {background-position: 0% 50%;}
            50% {background-position: 100% 50%;}
            100% {background-position: 0% 50%;}
          }
        `}
      </style>
      <div style={wrapperStyle}>
        <div style={cardStyle}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "0.6rem", color: "#FF00FF" }}>
             Sandip Katta 
          </h2>
          <p style={{ marginBottom: "1.5rem", fontSize: "1rem", color: "#00FFD1" }}>
            Drop the magic campus code to vibe in the chat ❤️
          </p>
          <input
            type="text"
            style={inputStyle}
            value={campusCode}
            onChange={(e) => setCampusCode(e.target.value)}
            placeholder="Enter Campus Code"
          />
          <button
            style={isHovered ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleCampusCodeSubmit}
          >
             Let Me In
          </button>
          {error && (
            <div style={{ color: "#ffb3b3", marginTop: "1rem", fontSize: "0.9rem" }}>
              {error}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CampusCode;
