
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFitness } from "../../context/FitnessContext";
import { getBMICategory } from "../../utils/fitness-utils";

export function BMICalculator() {
  const { userStats, updateUserStats } = useFitness();
  const [weight, setWeight] = useState<number>(userStats.weight);
  const [height, setHeight] = useState<number>(userStats.height);
  const [bmi, setBmi] = useState<number>(userStats.bmi);
  const bmiCategory = getBMICategory(bmi);

  useEffect(() => {
    // Update BMI when weight or height changes
    const heightInMeters = height / 100;
    const calculatedBMI = Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
    setBmi(calculatedBMI);
  }, [weight, height]);

  const handleUpdateStats = () => {
    updateUserStats({
      weight,
      height,
      bmi
    });
  };

  const getBMIGradient = (bmi: number) => {
    if (bmi < 18.5) return "from-blue-500 to-blue-300";
    if (bmi >= 18.5 && bmi < 25) return "from-green-500 to-green-300";
    if (bmi >= 25 && bmi < 30) return "from-yellow-500 to-yellow-300";
    return "from-red-500 to-red-300";
  };

  return (
    <div className="max-w-md mx-auto">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>BMI Calculator</CardTitle>
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
            className="w-full bg-fitness-blue hover:bg-blue-600"
            onClick={handleUpdateStats}
          >
            Save Measurements
          </Button>

          <div className="mt-6 text-center">
            <div className="text-sm font-medium mb-1">Your BMI</div>
            <div className={`text-4xl font-bold mb-2 ${bmiCategory.color}`}>
              {isNaN(bmi) ? "-" : bmi}
            </div>
            <div className={`text-sm ${bmiCategory.color}`}>
              {isNaN(bmi) ? "" : bmiCategory.category}
            </div>

            <div className="mt-6 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${getBMIGradient(bmi)}`}
                style={{
                  width: `${Math.min(100, (bmi / 40) * 100)}%`,
                }}
              ></div>
            </div>

            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Underweight</span>
              <span>Normal</span>
              <span>Overweight</span>
              <span>Obese</span>
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            <h4 className="font-medium mb-1">About BMI</h4>
            <p>
              BMI (Body Mass Index) is a calculation that uses your height and
              weight to determine a number that represents your risk for
              weight-related health problems.
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>Underweight: BMI less than 18.5</li>
              <li>Normal weight: BMI between 18.5 and 24.9</li>
              <li>Overweight: BMI between 25 and 29.9</li>
              <li>Obesity: BMI 30 or greater</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
