
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useFitness, ActivityType } from "../../context/FitnessContext";
import { calculateCaloriesBurned } from "../../utils/fitness-utils";

export function ActivityForm() {
  const { addActivity, userStats } = useFitness();
  const [activityType, setActivityType] = useState<ActivityType>("running");
  const [duration, setDuration] = useState("");
  const [distance, setDistance] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!activityType || !duration || !date) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Parse numeric values
    const durationMinutes = parseInt(duration);
    const distanceKm = distance ? parseFloat(distance) : undefined;

    if (isNaN(durationMinutes) || durationMinutes <= 0) {
      toast.error("Please enter a valid duration");
      return;
    }

    if (distance && (isNaN(distanceKm!) || distanceKm! <= 0)) {
      toast.error("Please enter a valid distance");
      return;
    }

    // Calculate calories burned based on activity type, duration, and user weight
    const caloriesBurned = calculateCaloriesBurned(
      activityType,
      durationMinutes,
      userStats.weight
    );

    // Add the new activity
    addActivity({
      type: activityType,
      duration: durationMinutes,
      distance: distanceKm,
      calories: caloriesBurned,
      date: new Date(date).toISOString(),
      notes: notes.trim() || undefined,
    });

    // Reset form
    setActivityType("running");
    setDuration("");
    setDistance("");
    setNotes("");
    setDate(new Date().toISOString().split("T")[0]);

    toast.success("Activity added successfully");
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Log New Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="activityType">Activity Type</Label>
              <Select
                value={activityType}
                onValueChange={(value) => setActivityType(value as ActivityType)}
              >
                <SelectTrigger id="activityType">
                  <SelectValue placeholder="Select activity type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="running">Running</SelectItem>
                  <SelectItem value="walking">Walking</SelectItem>
                  <SelectItem value="cycling">Cycling</SelectItem>
                  <SelectItem value="swimming">Swimming</SelectItem>
                  <SelectItem value="weightlifting">Weight Lifting</SelectItem>
                  <SelectItem value="yoga">Yoga</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                min="1"
                placeholder="30"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="distance">Distance (km) - Optional</Label>
              <Input
                id="distance"
                type="number"
                min="0"
                step="0.1"
                placeholder="5"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add notes about your workout..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="resize-none"
            />
          </div>

          <Button type="submit" className="w-full bg-fitness-blue hover:bg-blue-600">
            Add Activity
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
