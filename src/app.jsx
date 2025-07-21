import React, { useState, useEffect } from 'react';
import GoalList from './components/GoalList';
import GoalForm from './components/GoalForm';
import SavingsOverview from './components/SavingsOverview';
import DepositForm from './components/DepositForm';
import './styles.css';

function App() {
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await fetch('http://localhost:3000/goals');
      if (!response.ok) {
        throw new Error('Failed to fetch goals');
      }
      const data = await response.json();
      setGoals(data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const addGoal = async (newGoal) => {
    try {
      const response = await fetch('http://localhost:3000/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGoal),
      });
      if (!response.ok) {
        throw new Error('Failed to add goal');
      }
      const data = await response.json();
      setGoals([...goals, data]);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateGoal = async (updatedGoal) => {
    try {
      const response = await fetch(`http://localhost:3000/goals/${updatedGoal.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedGoal),
      });
      if (!response.ok) {
        throw new Error('Failed to update goal');
      }
      setGoals(goals.map(goal => goal.id === updatedGoal.id ? updatedGoal : goal));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteGoal = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/goals/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete goal');
      }
      setGoals(goals.filter(goal => goal.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const makeDeposit = async (goalId, amount) => {
    try {
      const goalToUpdate = goals.find(goal => goal.id === goalId);
      const updatedGoal = {
        ...goalToUpdate,
        savedAmount: Number(goalToUpdate.savedAmount) + Number(amount)
      };

      const response = await fetch(`http://localhost:3000/goals/${goalId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ savedAmount: updatedGoal.savedAmount }),
      });
      if (!response.ok) {
        throw new Error('Failed to make deposit');
      }
      setGoals(goals.map(goal => goal.id === goalId ? updatedGoal : goal));
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Smart Goal Planner</h1>
      </header>
      <main>
        <div className="dashboard">
          <div className="goals-section">
            <h2>My Savings Goals</h2>
            <GoalList 
              goals={goals} 
              onUpdate={updateGoal} 
              onDelete={deleteGoal} 
            />
            <GoalForm onAddGoal={addGoal} />
          </div>
          <div className="actions-section">
            <DepositForm goals={goals} onDeposit={makeDeposit} />
            <SavingsOverview goals={goals} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;