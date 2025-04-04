
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFitness } from "../../context/FitnessContext";
import { formatDate, getActivityIcon } from "../../utils/fitness-utils";
import { Activity, Calendar, Timer, Flame } from "lucide-react";

export function RecentActivities() {
  const { activities } = useFitness();

  // Sort activities by date (most recent first) and take the 4 most recent
  const recentActivities = [...activities]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "running":
        return <Activity className="h-5 w-5 text-fitness-blue" />;
      case "walking":
        return <Activity className="h-5 w-5 text-green-500" />;
      case "cycling":
        return <Activity className="h-5 w-5 text-yellow-500" />;
      case "swimming":
        return <Activity className="h-5 w-5 text-blue-400" />;
      case "weightlifting":
        return <Activity className="h-5 w-5 text-fitness-purple" />;
      case "yoga":
        return <Activity className="h-5 w-5 text-pink-400" />;
      default:
        return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  if (recentActivities.length === 0) {
    return (
      <Card className="col-span-1 lg:col-span-2 shadow-sm">
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-40">
            <p className="text-muted-foreground">No activities recorded yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Start tracking your workouts now
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-1 lg:col-span-2 shadow-sm">
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <h4 className="font-medium capitalize text-gray-900">
                  {activity.type}
                  {activity.notes && (
                    <span className="font-normal text-sm text-gray-500 ml-2">
                      - {activity.notes}
                    </span>
                  )}
                </h4>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    {formatDate(activity.date)}
                  </div>
                  <div className="flex items-center">
                    <Timer className="h-3.5 w-3.5 mr-1" />
                    {activity.duration} min
                  </div>
                  <div className="flex items-center">
                    <Flame className="h-3.5 w-3.5 mr-1 text-orange-400" />
                    {activity.calories} cal
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
