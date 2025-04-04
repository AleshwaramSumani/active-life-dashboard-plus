
import React from "react";
import { GoalForm } from "../components/goals/GoalForm";
import { GoalsList } from "../components/goals/GoalsList";

const Goals = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Goals Tracker</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <GoalForm />
        </div>
        <div className="md:col-span-2">
          <GoalsList />
        </div>
      </div>
    </div>
  );
};

export default Goals;
