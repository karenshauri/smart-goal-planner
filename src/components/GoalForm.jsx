import React, { useState } from 'react';

function GoalForm({ onAddGoal }) {
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    savedAmount: 0,
    category: 'Travel',
    deadline: '',
    createdAt: new Date().toISOString().split('T')[0]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoal({
      ...newGoal,
      [name]: name === 'targetAmount' ? Number(value) : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newGoal.name || !newGoal.targetAmount || !newGoal.deadline) {
      alert('Please fill in all required fields');
      return;
    }
    onAddGoal(newGoal);
    setNewGoal({
      name: '',
      targetAmount: '',
      savedAmount: 0,
      category: 'Travel',
      deadline: '',
      createdAt: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <form className="goal-form" onSubmit={handleSubmit}>
      <h3>Add New Goal</h3>
      <div className="form-group">
        <label>Goal Name*:</label>
        <input
          type="text"
          name="name"
          value={newGoal.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Target Amount*:</label>
        <input
          type="number"
          name="targetAmount"
          value={newGoal.targetAmount}
          onChange={handleInputChange}
          min="1"
          required
        />
      </div>
      <div className="form-group">
        <label>Category:</label>
        <select
          name="category"
          value={newGoal.category}
          onChange={handleInputChange}
        >
          <option value="Travel">Travel</option>
          <option value="Emergency">Emergency</option>
          <option value="Electronics">Electronics</option>
          <option value="Real Estate">Real Estate</option>
          <option value="Vehicle">Vehicle</option>
          <option value="Education">Education</option>
          <option value="Shopping">Shopping</option>
          <option value="Retirement">Retirement</option>
          <option value="Home">Home</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label>Deadline*:</label>
        <input
          type="date"
          name="deadline"
          value={newGoal.deadline}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">Add Goal</button>
    </form>
  );
}

export default GoalForm;