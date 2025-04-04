
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useFitness } from "../context/FitnessContext";
import { getBMICategory } from "../utils/fitness-utils";

const Profile = () => {
  const { userStats, updateUserStats } = useFitness();
  const [weight, setWeight] = useState<number>(userStats.weight);
  const [height, setHeight] = useState<number>(userStats.height);
  const bmiCategory = getBMICategory(userStats.bmi);

  const handleUpdateProfile = () => {
    if (weight <= 0 || height <= 0) {
      toast.error("Please enter valid measurements");
      return;
    }

    updateUserStats({
      weight,
      height
    });

    toast.success("Profile updated successfully");
  };

  // Function to reset demo data
  const handleResetData = () => {
    // Clear local storage
    localStorage.removeItem("fitness_activities");
    localStorage.removeItem("fitness_goals");
    localStorage.removeItem("fitness_user_stats");
    localStorage.removeItem("fitness_weekly_activity");
    
    toast.success("Data reset successfully. Refresh the page to see changes.");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Your Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                min="30"
                max="300"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                min="100"
                max="250"
                value={height}
                onChange={(e) => setHeight(parseFloat(e.target.value))}
              />
            </div>

            <Button
              onClick={handleUpdateProfile}
              className="w-full bg-fitness-blue hover:bg-blue-600"
            >
              Update Profile
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Health Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">BMI</p>
                <p className={`text-xl font-bold ${bmiCategory.color}`}>
                  {userStats.bmi}
                </p>
                <p className={`text-xs ${bmiCategory.color}`}>
                  {bmiCategory.category}
                </p>
              </div>
              
              <div className="border rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">Weight</p>
                <p className="text-xl font-bold">{userStats.weight} kg</p>
              </div>
              
              <div className="border rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">Height</p>
                <p className="text-xl font-bold">{userStats.height} cm</p>
              </div>
              
              <div className="border rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">Ideal Weight</p>
                <p className="text-xl font-bold">
                  {Math.round((22.5 * userStats.height * userStats.height) / 10000)} kg
                </p>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-2">About Your BMI</h4>
              <p className="text-sm text-gray-500">
                {bmiCategory.category === "Underweight" && 
                  "You are underweight. Consider consulting with a nutritionist for a healthy weight gain plan."}
                {bmiCategory.category === "Normal weight" && 
                  "You have a healthy weight. Keep maintaining your balanced diet and regular exercise."}
                {bmiCategory.category === "Overweight" && 
                  "You are slightly overweight. Focus on regular exercise and a balanced diet to reach a healthier weight."}
                {bmiCategory.category === "Obesity" && 
                  "Your BMI indicates obesity. It's recommended to consult with a healthcare provider for personalized advice."}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm md:col-span-2">
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Reset your fitness data if you want to start fresh. This will remove all your activities, goals, and stats.
              </p>
              <Button
                variant="destructive"
                onClick={handleResetData}
              >
                Reset All Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
