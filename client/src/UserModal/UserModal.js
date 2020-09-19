import React, { useState, useContext } from 'react';
import SocketContext from '../Context/SocketContext';
import './UserModal.scss';


function UserModal(props) {

    const handleChange = (event) => {
        props.setUsername(event.target.value)
        console.log(props.username)
      }
    
      const handleSubmit = (event) => {
        event.preventDefault();
        props.setUsername(props.username);
        props.setHasUsername(true);
      }

  return (
    <div className="user-modal">
        <div className="modal-content">
            <form className="modal-form">
                <input onChange={handleChange} value={props.username} className="modal-form username-input" />
                <button onClick={handleSubmit} className="chat-message-submit">SEND</button>
            </form>
        </div>
    </div>
  );
}

export default UserModal;