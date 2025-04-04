
import React from "react";
import { ActivitySummary } from "../components/dashboard/ActivitySummary";
import { WeeklyActivityChart } from "../components/dashboard/WeeklyActivityChart";
import { RecentActivities } from "../components/dashboard/RecentActivities";
import { GoalProgress } from "../components/dashboard/GoalProgress";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Your Fitness Dashboard</h1>
      
      <ActivitySummary />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <WeeklyActivityChart />
        <RecentActivities />
        <GoalProgress />
      </div>
    </div>
  );
};

export default Dashboard;
