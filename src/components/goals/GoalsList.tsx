
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, Target, Trash2, Clock } from "lucide-react";
import { toast } from "sonner";
import { useFitness } from "../../context/FitnessContext";
import { calculateProgress, formatDate } from "../../utils/fitness-utils";

export function GoalsList() {
  const { goals, completeGoal, deleteGoal } = useFitness();

  const handleComplete = (id: string) => {
    completeGoal(id);
    toast.success("Goal marked as complete!");
  };

  const handleDelete = (id: string) => {
    deleteGoal(id);
    toast.success("Goal deleted successfully");
  };

  // Convert deadline to a human-readable format
  const formatDeadline = (deadline?: string) => {
    if (!deadline) return "No deadline";

    const deadlineDate = new Date(deadline);
    const today = new Date();
    
    // Check if passed deadline
    if (deadlineDate < today) {
      return "Passed deadline";
    }
    
    // Calculate days remaining
    const timeDiff = deadlineDate.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    return daysRemaining === 1 
      ? "1 day remaining" 
      : `${daysRemaining} days remaining`;
  };

  if (goals.length === 0) {
    return (
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Your Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6">
            <Target className="h-12 w-12 text-muted-foreground mb-2" />
            <h3 className="text-lg font-medium">No goals set</h3>
            <p className="text-sm text-muted-foreground">
              Set some goals to track your progress
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Your Goals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.map((goal) => {
            const progress = calculateProgress(goal.current, goal.target);
            
            return (
              <div
                key={goal.id}
                className={`border rounded-lg p-4 ${
                  goal.completed
                    ? "border-green-200 bg-green-50"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-lg capitalize flex items-center">
                    {goal.type} Goal
                    {goal.completed && (
                      <span className="ml-2 text-green-500 flex items-center text-sm font-normal">
                        <Check className="h-4 w-4 mr-1" />
                        Completed
                      </span>
                    )}
                  </h3>
                  <div className="flex items-center space-x-2">
                    {!goal.completed && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleComplete(goal.id)}
                      >
                        Mark Complete
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(goal.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>

                <div className="mb-2">
                  <div className="flex justify-between mb-1 text-sm">
                    <span>
                      Progress: {goal.current} / {goal.target} {goal.unit}
                    </span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                {goal.deadline && (
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    {formatDeadline(goal.deadline)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
