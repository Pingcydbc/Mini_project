"use client";

import { useEffect, useState } from 'react';

const MotorPage = () => {
  const [motorCommand, setMotorCommand] = useState('');
  const [error, setError] = useState(null);

  const fetchMotorCommand = async () => {
    try {
      const response = await fetch('/api/updateMotorStatus'); // Update API route if necessary
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setMotorCommand(data.motor_command); // Adjust based on API response
    } catch (err) {
      setError(err.message);
    }
  };

  const saveMotorCommand = async (command) => {
    try {
      const response = await fetch('/api/updateMotorStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ motor_command: command }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      alert(data.message); // Display success message
      fetchMotorCommand(); // Refresh the command display
    } catch (err) {
      setError(err.message);
    }
  };
  

  useEffect(() => {
    fetchMotorCommand();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Motor Control</h1>
      {error && <p style={styles.error}>Error: {error}</p>}
      <p style={styles.command}>Current Motor Command: <strong>{motorCommand}</strong></p>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => saveMotorCommand('FORWARD')}>Set Motor Command to FORWARD</button>
        <button style={styles.button} onClick={() => saveMotorCommand('BACKWARD')}>Set Motor Command to BACKWARD</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  header: {
    marginBottom: '20px',
    color: '#333',
  },
  error: {
    color: 'red',
    marginBottom: '20px',
  },
  command: {
    marginBottom: '20px',
    fontSize: '18px',
    color: '#555',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
};

export default MotorPage;
