import React, { useState, useEffect } from "react";
import "./SocialPanel.scss";

function SocialPanel(props) {
  useEffect(() => {}, []);

  return (
    <div className="social-bar-container">
      <h2>Online Users</h2>
      <div className="online-users-tile">Steve</div>
    </div>
  );
}

export default SocialPanel;
