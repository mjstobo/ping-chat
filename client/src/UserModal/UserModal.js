import React, { useContext, useState } from "react";
import { UserContext, UserProvider } from "../Context/UserContext";
import "./UserModal.scss";

function UserModal() {
  const [user, setUser] = useContext(UserContext);

  const handleChange = (event) => {
    setUser({ ...user, name: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUser({ ...user, hasUsername: true });
  };

  return (
    <div className="user-modal">
      <div className="modal-content">
        <h2>What is your name?</h2>
        <form className="modal-form">
          <input
            onChange={handleChange}
            value={user.name}
            className="modal-form username-input"
          />
          <button onClick={handleSubmit} className="username-submit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserModal;
