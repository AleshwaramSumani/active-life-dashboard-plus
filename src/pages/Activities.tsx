
import React from "react";
import { ActivityForm } from "../components/activities/ActivityForm";
import { ActivityList } from "../components/activities/ActivityList";

const Activities = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Activity Tracker</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <ActivityForm />
        </div>
        <div className="md:col-span-2">
          <ActivityList />
        </div>
      </div>
    </div>
  );
};

export default Activities;
