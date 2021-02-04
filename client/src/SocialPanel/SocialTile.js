import React, { useEffect, useState } from "react";
import "./SocialPanel.scss";

function SocialTile(props) {
  const [status, setStatus] = useState(props.status);
  const [name, setName] = useState(props.name);

  console.log(status);
  useEffect(() => {}, []);

  return (
    <div className="users-tile">
      <span className="user-name">{props.name}</span>
      <span className={`user-status ${status}`}></span>
    </div>
  );
}

export default SocialTile;
