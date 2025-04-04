
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Activity, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useFitness } from "../../context/FitnessContext";
import { formatDate } from "../../utils/fitness-utils";

export function ActivityList() {
  const { activities, deleteActivity } = useFitness();

  // Sort activities by date (most recent first)
  const sortedActivities = [...activities].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleDelete = (id: string) => {
    deleteActivity(id);
    toast.success("Activity deleted successfully");
  };

  if (activities.length === 0) {
    return (
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Your Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6">
            <Activity className="h-12 w-12 text-muted-foreground mb-2" />
            <h3 className="text-lg font-medium">No activities yet</h3>
            <p className="text-sm text-muted-foreground">
              Start by logging your first workout above
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Your Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Distance</TableHead>
                <TableHead>Calories</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedActivities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">
                    {formatDate(activity.date)}
                  </TableCell>
                  <TableCell className="capitalize">{activity.type}</TableCell>
                  <TableCell>{activity.duration} min</TableCell>
                  <TableCell>
                    {activity.distance ? `${activity.distance} km` : "-"}
                  </TableCell>
                  <TableCell>{activity.calories}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {activity.notes || "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(activity.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
