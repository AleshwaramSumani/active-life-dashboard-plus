
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Timer, Flame } from "lucide-react";
import { useFitness } from "../../context/FitnessContext";
import { formatDuration } from "../../utils/fitness-utils";

export function ActivitySummary() {
  const { activities } = useFitness();

  // Calculate total stats from all activities
  const totalActivities = activities.length;
  const totalDuration = activities.reduce((sum, a) => sum + a.duration, 0);
  const totalCalories = activities.reduce((sum, a) => sum + a.calories, 0);
  const totalDistance = activities.reduce((sum, a) => sum + (a.distance || 0), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Workouts</CardTitle>
          <Activity className="h-4 w-4 text-fitness-blue" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalActivities}</div>
          <p className="text-xs text-muted-foreground">
            All time tracked activities
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Duration</CardTitle>
          <Timer className="h-4 w-4 text-fitness-blue" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatDuration(totalDuration)}</div>
          <p className="text-xs text-muted-foreground">
            Time spent working out
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Distance</CardTitle>
          <Activity className="h-4 w-4 text-fitness-green" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalDistance.toFixed(1)} km</div>
          <p className="text-xs text-muted-foreground">
            Distance covered in workouts
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Calories Burned</CardTitle>
          <Flame className="h-4 w-4 text-orange-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCalories}</div>
          <p className="text-xs text-muted-foreground">
            Total calories burned
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
