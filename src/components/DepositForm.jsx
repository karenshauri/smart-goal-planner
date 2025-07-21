import React, { useState } from 'react';

function DepositForm({ goals, onDeposit }) {
  const [depositData, setDepositData] = useState({
    goalId: '',
    amount: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDepositData({
      ...depositData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!depositData.goalId || !depositData.amount || Number(depositData.amount) <= 0) {
      alert('Please select a goal and enter a valid amount');
      return;
    }
    onDeposit(depositData.goalId, depositData.amount);
    setDepositData({
      goalId: '',
      amount: ''
    });
  };

  return (
    <div className="deposit-form">
      <h3>Make a Deposit</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Goal:</label>
          <select
            name="goalId"
            value={depositData.goalId}
            onChange={handleInputChange}
            required
          >
            <option value="">-- Select a Goal --</option>
            {goals.map(goal => (
              <option key={goal.id} value={goal.id}>
                {goal.name} (${goal.savedAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()})
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={depositData.amount}
            onChange={handleInputChange}
            min="0.01"
            step="0.01"
            required
          />
        </div>
        <button type="submit">Deposit</button>
      </form>
    </div>
  );
}

export default DepositForm;