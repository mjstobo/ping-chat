import React, { useEffect, useState } from "react";
import "./SocialPanel.scss";

function SocialTile(props) {
  const [status] = useState(props.status);
  const [name] = useState(props.name);

  console.log(status);
  useEffect(() => {}, []);

  return (
    <div className="users-tile">
      <span className="user-name">{name}</span>
      <span className={`user-status ${status}`}></span>
    </div>
  );
}

export default SocialTile;
