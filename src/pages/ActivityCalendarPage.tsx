
import React from "react";
import { ActivityCalendar } from "../components/calendar/ActivityCalendar";

const ActivityCalendarPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Activity Calendar</h1>
      <p className="text-muted-foreground">
        View and manage your activities by date
      </p>
      
      <ActivityCalendar />
    </div>
  );
};

export default ActivityCalendarPage;
