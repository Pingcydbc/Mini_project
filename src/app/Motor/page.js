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
    <div>
      <h1>Motor Control</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <p>Current Motor Command: {motorCommand}</p>
      <button onClick={() => saveMotorCommand('FORWARD')}>Set Motor Command to FORWARD</button>
      <button onClick={() => saveMotorCommand('BACKWARD')}>Set Motor Command to BACKWARD</button>

    </div>
  );
};

export default MotorPage;
