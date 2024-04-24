// ChatbotModal.js

import React, { useState } from 'react';
import Modal from 'react-modal';
import ChatbotComponent from './chts'; // Your chatbot component

Modal.setAppElement('#root'); // Set app element for accessibility

const ChatbotModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal} style={styles.openButton}>Open Chatbot</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Chatbot Modal"
        style={modalStyles}
      >
        <button onClick={closeModal} style={styles.closeButton}>Close</button>
        <ChatbotComponent />
      </Modal>
    </div>
  );
};

// Inline styles
const styles = {
  openButton: {
    background: '#007bff',
    color: '#fff',
    padding: '12px', // Increase padding to make the button circular
    border: 'none',
    borderRadius: '50%', // Make the button circular
    cursor: 'pointer',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: 16,
    color: '#999',
  },
};

// Modal styles
const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Modal overlay background color
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    outline: 'none',
    backgroundColor: '#fff', // Modal background color
    borderRadius: 8,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Modal box shadow
    padding: 20,
    maxWidth: 400,
    width: '90%',
  },
};

export default ChatbotModal;
