import React from 'react';

function SavingsOverview({ goals }) {
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const completedGoals = goals.filter(goal => goal.savedAmount >= goal.targetAmount);
  const inProgressGoals = goals.filter(goal => goal.savedAmount < goal.targetAmount);
  
  const calculateDaysLeft = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nearDeadlineGoals = inProgressGoals.filter(goal => {
    const daysLeft = calculateDaysLeft(goal.deadline);
    return daysLeft <= 30 && daysLeft > 0;
  });

  const overdueGoals = inProgressGoals.filter(goal => {
    const daysLeft = calculateDaysLeft(goal.deadline);
    return daysLeft < 0;
  });

  return (
    <div className="savings-overview">
      <h2>Savings Overview</h2>
      <div className="overview-stats">
        <div className="stat-card">
          <h3>Total Goals</h3>
          <p>{goals.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Saved</h3>
          <p>${totalSaved.toLocaleString()}</p>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <p>{completedGoals.length}</p>
        </div>
        <div className="stat-card">
          <h3>Progress</h3>
          <p>{totalTarget > 0 ? Math.round((totalSaved / totalTarget) * 100) : 0}%</p>
        </div>
      </div>
      
      {nearDeadlineGoals.length > 0 && (
        <div className="alert-section warning">
          <h3>Goals Nearing Deadline ({nearDeadlineGoals.length})</h3>
          <ul>
            {nearDeadlineGoals.map(goal => (
              <li key={goal.id}>
                {goal.name} - {calculateDaysLeft(goal.deadline)} days left
                (${goal.targetAmount - goal.savedAmount} needed)
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {overdueGoals.length > 0 && (
        <div className="alert-section danger">
          <h3>Overdue Goals ({overdueGoals.length})</h3>
          <ul>
            {overdueGoals.map(goal => (
              <li key={goal.id}>
                {goal.name} - {Math.abs(calculateDaysLeft(goal.deadline))} days overdue
                (${goal.targetAmount - goal.savedAmount} short)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SavingsOverview;