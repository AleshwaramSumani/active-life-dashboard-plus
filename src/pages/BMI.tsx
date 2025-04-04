
import React from "react";
import { BMICalculator } from "../components/bmi/BMICalculator";

const BMI = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">BMI Calculator</h1>
      <p className="text-muted-foreground">
        Track your BMI (Body Mass Index) to monitor your health and fitness progress
      </p>
      
      <BMICalculator />
    </div>
  );
};

export default BMI;
