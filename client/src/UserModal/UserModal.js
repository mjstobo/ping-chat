import React from "react";
import "./UserModal.scss";

function UserModal(props) {
  const handleChange = (event) => {
    props.setUsername(event.target.value);
    console.log(props.username);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.setUsername(props.username);
    props.setHasUsername(true);
  };

  return (
    <div className="user-modal">
      <div className="modal-content">
        <h2>What is your name?</h2>
        <form className="modal-form">
          <input
            onChange={handleChange}
            value={props.username}
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
