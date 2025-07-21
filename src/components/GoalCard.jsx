import React, { useState } from 'react';
import ProgressBar from './ProgressBar';

function GoalCard({ goal, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoal, setEditedGoal] = useState({ ...goal });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedGoal({
      ...editedGoal,
      [name]: name === 'targetAmount' || name === 'savedAmount' ? Number(value) : value
    });
  };

  const handleSave = () => {
    onUpdate(editedGoal);
    setIsEditing(false);
  };

  const calculateDaysLeft = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysLeft = calculateDaysLeft(goal.deadline);
  const isNearDeadline = daysLeft <= 30 && daysLeft > 0 && (goal.savedAmount < goal.targetAmount);
  const isOverdue = daysLeft < 0 && (goal.savedAmount < goal.targetAmount);
  const isCompleted = goal.savedAmount >= goal.targetAmount;

  return (
    <div className={`goal-card ${isCompleted ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      {isEditing ? (
        <div className="edit-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={editedGoal.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Target Amount:</label>
            <input
              type="number"
              name="targetAmount"
              value={editedGoal.targetAmount}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <select
              name="category"
              value={editedGoal.category}
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
            <label>Deadline:</label>
            <input
              type="date"
              name="deadline"
              value={editedGoal.deadline}
              onChange={handleInputChange}
            />
          </div>
          <div className="button-group">
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="goal-header">
            <h3>{goal.name}</h3>
            <div className="goal-category">{goal.category}</div>
          </div>
          <div className="goal-details">
            <div className="amounts">
              <span className="saved">${goal.savedAmount.toLocaleString()}</span>
              <span className="target"> / ${goal.targetAmount.toLocaleString()}</span>
            </div>
            <ProgressBar 
              current={goal.savedAmount} 
              target={goal.targetAmount} 
            />
            <div className="goal-meta">
              <div className="deadline">
                {isCompleted ? (
                  <span className="completed-text">Goal achieved!</span>
                ) : isOverdue ? (
                  <span className="overdue-text">Overdue!</span>
                ) : isNearDeadline ? (
                  <span className="warning-text">{daysLeft} days left - Hurry!</span>
                ) : (
                  <span>{daysLeft} days left</span>
                )}
              </div>
              <div className="created-at">
                Created: {new Date(goal.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div className="goal-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(goal.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default GoalCard;