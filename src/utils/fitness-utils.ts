
import { ActivityType } from "../context/FitnessContext";

// Calculate calories burned based on activity type, duration, and user's weight
export const calculateCaloriesBurned = (
  activityType: ActivityType,
  durationMinutes: number,
  weightKg: number
): number => {
  // MET values (Metabolic Equivalent of Task) for different activities
  const metValues: Record<ActivityType, number> = {
    running: 9.8, // Running 6 mph (10 min mile)
    walking: 3.5, // Walking 4 mph
    cycling: 8.0, // Cycling 12-14 mph
    swimming: 7.0, // Swimming, moderate effort
    weightlifting: 3.5, // Weight lifting, light/moderate effort
    yoga: 2.5, // Yoga, Hatha
    other: 4.0, // Average MET for general activity
  };

  // Formula: Calories = MET × weight (kg) × duration (hours)
  const durationHours = durationMinutes / 60;
  return Math.round(metValues[activityType] * weightKg * durationHours);
};

// Format a date to a readable string
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

// Format time from minutes to HH:MM format
export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins} min`;
};

// Get activity icon name based on activity type
export const getActivityIcon = (type: ActivityType): string => {
  switch (type) {
    case 'running':
      return 'activity';
    case 'walking':
      return 'footprints';
    case 'cycling':
      return 'bike';
    case 'swimming':
      return 'waves';
    case 'weightlifting':
      return 'dumbbell';
    case 'yoga':
      return 'heart';
    default:
      return 'activity';
  }
};

// Get color based on activity type
export const getActivityColor = (type: ActivityType): string => {
  switch (type) {
    case 'running':
      return 'text-fitness-blue';
    case 'walking':
      return 'text-green-500';
    case 'cycling':
      return 'text-yellow-500';
    case 'swimming':
      return 'text-blue-400';
    case 'weightlifting':
      return 'text-fitness-purple';
    case 'yoga':
      return 'text-pink-400';
    default:
      return 'text-gray-500';
  }
};

// Calculate progress percentage
export const calculateProgress = (current: number, target: number): number => {
  const progress = (current / target) * 100;
  return Math.min(100, Math.max(0, progress)); // Clamp between 0 and 100
};

// Calculate BMI category
export const getBMICategory = (bmi: number): {
  category: string;
  color: string;
} => {
  if (bmi < 18.5) {
    return { category: 'Underweight', color: 'text-blue-500' };
  } else if (bmi >= 18.5 && bmi < 25) {
    return { category: 'Normal weight', color: 'text-green-500' };
  } else if (bmi >= 25 && bmi < 30) {
    return { category: 'Overweight', color: 'text-yellow-500' };
  } else {
    return { category: 'Obesity', color: 'text-red-500' };
  }
};
