
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useFitness } from "../../context/FitnessContext";

export function GoalForm() {
  const { addGoal } = useFitness();
  const [goalType, setGoalType] = useState<"calories" | "distance" | "workouts">("calories");
  const [target, setTarget] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!goalType || !target) {
      toast.error("Please fill in all required fields");
      return;
    }

    const targetValue = parseInt(target);
    if (isNaN(targetValue) || targetValue <= 0) {
      toast.error("Please enter a valid target value");
      return;
    }

    // Get appropriate unit based on goal type
    let unit = "";
    switch (goalType) {
      case "calories":
        unit = "kcal";
        break;
      case "distance":
        unit = "km";
        break;
      case "workouts":
        unit = "sessions";
        break;
    }

    // Add the new goal
    addGoal({
      type: goalType,
      target: targetValue,
      unit,
      deadline: deadline ? new Date(deadline).toISOString() : undefined,
    });

    // Reset form
    setGoalType("calories");
    setTarget("");
    setDeadline("");

    toast.success("Goal added successfully");
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Create New Goal</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="goalType">Goal Type</Label>
            <Select
              value={goalType}
              onValueChange={(value) => setGoalType(value as "calories" | "distance" | "workouts")}
            >
              <SelectTrigger id="goalType">
                <SelectValue placeholder="Select goal type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="calories">Burn Calories</SelectItem>
                <SelectItem value="distance">Cover Distance</SelectItem>
                <SelectItem value="workouts">Complete Workouts</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="target">
                Target ({goalType === "calories" ? "kcal" : goalType === "distance" ? "km" : "sessions"})
              </Label>
              <Input
                id="target"
                type="number"
                min="1"
                placeholder={
                  goalType === "calories"
                    ? "5000"
                    : goalType === "distance"
                    ? "100"
                    : "20"
                }
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline (Optional)</Label>
              <Input
                id="deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-fitness-blue hover:bg-blue-600">
            Set Goal
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
