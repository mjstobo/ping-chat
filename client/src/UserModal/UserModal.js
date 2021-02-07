import React, { useContext } from "react";
import SocketContext from "../Context/SocketContext";
import { UserContext } from "../Context/UserContext";
import "./UserModal.scss";

function UserModal() {
  const [user, setUser] = useContext(UserContext);
  const socket = useContext(SocketContext);

  const handleChange = (event) => {
    setUser({ ...user, name: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let newUser = { ...user, hasUsername: true, id: socket.id };
    updateUserOnServer(newUser);
    setUser(newUser);
  };

  const updateUserOnServer = (user) => {
    socket.emit("USER_UPDATE", user);
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
