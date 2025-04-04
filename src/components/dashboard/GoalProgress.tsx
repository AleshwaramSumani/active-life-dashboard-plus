
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target } from "lucide-react";
import { useFitness } from "../../context/FitnessContext";
import { calculateProgress } from "../../utils/fitness-utils";

export function GoalProgress() {
  const { goals } = useFitness();

  // Display the first 3 uncompleted goals
  const activeGoals = goals
    .filter((goal) => !goal.completed)
    .slice(0, 3);

  if (activeGoals.length === 0) {
    return (
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2 text-fitness-blue" />
            Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-32">
            <p className="text-muted-foreground">No active goals</p>
            <p className="text-sm text-muted-foreground mt-1">
              Add new goals to track your progress
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Target className="h-5 w-5 mr-2 text-fitness-blue" />
          Goal Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activeGoals.map((goal) => {
            const progress = calculateProgress(goal.current, goal.target);
            
            return (
              <div key={goal.id} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium capitalize">
                    {goal.type} Goal
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {goal.current} / {goal.target} {goal.unit}
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
