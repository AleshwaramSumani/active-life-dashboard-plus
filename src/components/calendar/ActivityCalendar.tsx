
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Activity, ArrowLeft, ArrowRight } from "lucide-react";
import { useFitness } from "../../context/FitnessContext";
import { formatDate, formatDuration } from "../../utils/fitness-utils";

export function ActivityCalendar() {
  const { activities } = useFitness();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [month, setMonth] = useState<Date>(new Date());

  // Create a map of dates with activities
  const activitiesByDate = activities.reduce((acc, activity) => {
    const date = new Date(activity.date).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(activity);
    return acc;
  }, {} as Record<string, typeof activities>);

  // Calculate dates with activities for styling in the calendar
  const datesWithActivities = Object.keys(activitiesByDate).map(dateString => 
    new Date(dateString)
  );

  // Get activities for the selected date
  const selectedDateActivities = selectedDate
    ? activitiesByDate[selectedDate.toDateString()] || []
    : [];

  // Functions to navigate between months
  const prevMonth = () => {
    setMonth(new Date(month.getFullYear(), month.getMonth() - 1));
  };

  const nextMonth = () => {
    setMonth(new Date(month.getFullYear(), month.getMonth() + 1));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Calendar</CardTitle>
            <div className="flex space-x-2">
              <button onClick={prevMonth} className="p-1 hover:text-fitness-blue">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button onClick={nextMonth} className="p-1 hover:text-fitness-blue">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            month={month}
            onMonthChange={setMonth}
            className="rounded-md"
            modifiers={{
              hasActivity: datesWithActivities,
            }}
            modifiersStyles={{
              hasActivity: {
                backgroundColor: "#EBF4FF",
                borderBottom: "2px solid #3B82F6",
              },
            }}
          />
        </CardContent>
      </Card>

      <Card className="lg:col-span-2 shadow-sm">
        <CardHeader>
          <CardTitle>
            Activities on {selectedDate ? formatDate(selectedDate.toISOString()) : "Select a date"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedDateActivities.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10">
              <Activity className="h-12 w-12 text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium">No activities</h3>
              <p className="text-sm text-muted-foreground">
                No workouts tracked for this date
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {selectedDateActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium capitalize">
                        {activity.type}
                      </h3>
                      {activity.notes && (
                        <p className="text-muted-foreground mt-1">
                          {activity.notes}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        {formatDuration(activity.duration)}
                      </p>
                      <p className="text-sm font-medium text-orange-500">
                        {activity.calories} calories
                      </p>
                      {activity.distance && (
                        <p className="text-sm font-medium text-green-500">
                          {activity.distance} km
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
