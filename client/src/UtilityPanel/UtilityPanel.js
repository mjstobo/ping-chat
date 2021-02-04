import React, { useEffect } from "react";
import "./UtilityPanel.scss";

function UtilityPanel(props) {
  useEffect(() => {}, []);

  return (
    <div className="utility-bar-container">
      <h2>Friends</h2>
      <div className="utility-tile">Hey!</div>
    </div>
  );
}

export default UtilityPanel;
