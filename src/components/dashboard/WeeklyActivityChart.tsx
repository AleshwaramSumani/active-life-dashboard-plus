
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { useFitness } from "../../context/FitnessContext";

export function WeeklyActivityChart() {
  const { weeklyActivity } = useFitness();
  
  // Create data for the chart
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date().getDay();
  
  const chartData = weeklyActivity.map((calories, index) => {
    // Adjust the index to start from Sunday and mark today
    const dayIndex = index;
    const isToday = dayIndex === today;
    
    return {
      day: days[dayIndex],
      calories,
      fill: isToday ? "#3B82F6" : "#93C5FD",
    };
  });

  return (
    <Card className="col-span-1 lg:col-span-2 shadow-sm">
      <CardHeader>
        <CardTitle>Weekly Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis 
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-2 border border-gray-200 rounded-md shadow-sm">
                        <p className="font-medium">{`${payload[0].payload.day}: ${payload[0].value} calories`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="calories"
                radius={[4, 4, 0, 0]}
                fill="#93C5FD"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
