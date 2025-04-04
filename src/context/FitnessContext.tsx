
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types for activity and goals
export type ActivityType = 'running' | 'walking' | 'cycling' | 'swimming' | 'weightlifting' | 'yoga' | 'other';

export interface Activity {
  id: string;
  type: ActivityType;
  duration: number; // in minutes
  distance?: number; // in km
  calories: number;
  date: string; // ISO string
  notes?: string;
}

export interface Goal {
  id: string;
  type: 'calories' | 'distance' | 'workouts';
  target: number;
  current: number;
  unit: string;
  deadline?: string;
  completed: boolean;
}

export interface UserStats {
  weight: number; // in kg
  height: number; // in cm
  bmi: number;
}

interface FitnessContextType {
  activities: Activity[];
  goals: Goal[];
  userStats: UserStats;
  todaysActivity: number; // calories burned today
  weeklyActivity: number[]; // calories for each day of the week
  addActivity: (activity: Omit<Activity, 'id'>) => void;
  addGoal: (goal: Omit<Goal, 'id' | 'current' | 'completed'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  completeGoal: (id: string) => void;
  updateUserStats: (stats: Partial<UserStats>) => void;
  deleteActivity: (id: string) => void;
  deleteGoal: (id: string) => void;
}

// Mock data generator functions
const generateMockActivities = (): Activity[] => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  
  return [
    {
      id: '1',
      type: 'running',
      duration: 30,
      distance: 5,
      calories: 300,
      date: today.toISOString(),
      notes: 'Morning run in the park'
    },
    {
      id: '2',
      type: 'cycling',
      duration: 45,
      distance: 15,
      calories: 400,
      date: yesterday.toISOString(),
      notes: 'Evening ride'
    },
    {
      id: '3',
      type: 'weightlifting',
      duration: 60,
      calories: 250,
      date: twoDaysAgo.toISOString(),
      notes: 'Upper body workout'
    },
    {
      id: '4',
      type: 'yoga',
      duration: 45,
      calories: 150,
      date: twoDaysAgo.toISOString(),
      notes: 'Evening relaxation'
    }
  ];
};

const generateMockGoals = (): Goal[] => {
  return [
    {
      id: '1',
      type: 'calories',
      target: 10000,
      current: 4500,
      unit: 'kcal',
      deadline: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
      completed: false
    },
    {
      id: '2',
      type: 'distance',
      target: 100,
      current: 45,
      unit: 'km',
      deadline: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString(),
      completed: false
    },
    {
      id: '3',
      type: 'workouts',
      target: 12,
      current: 5,
      unit: 'sessions',
      deadline: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString(),
      completed: false
    }
  ];
};

const generateMockWeeklyActivity = (): number[] => {
  return [250, 300, 150, 400, 320, 280, 350];
};

const calculateBMI = (weight: number, height: number): number => {
  // Height in meters (convert from cm)
  const heightInMeters = height / 100;
  return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
};

// Create the context
const FitnessContext = createContext<FitnessContextType | undefined>(undefined);

// Create the provider component
export const FitnessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activities, setActivities] = useState<Activity[]>(() => {
    const storedActivities = localStorage.getItem('fitness_activities');
    return storedActivities ? JSON.parse(storedActivities) : generateMockActivities();
  });
  
  const [goals, setGoals] = useState<Goal[]>(() => {
    const storedGoals = localStorage.getItem('fitness_goals');
    return storedGoals ? JSON.parse(storedGoals) : generateMockGoals();
  });
  
  const [userStats, setUserStats] = useState<UserStats>(() => {
    const storedStats = localStorage.getItem('fitness_user_stats');
    if (storedStats) return JSON.parse(storedStats);
    
    const defaultStats = { weight: 70, height: 170, bmi: 24.2 };
    return defaultStats;
  });
  
  const [weeklyActivity, setWeeklyActivity] = useState<number[]>(() => {
    const storedWeekly = localStorage.getItem('fitness_weekly_activity');
    return storedWeekly ? JSON.parse(storedWeekly) : generateMockWeeklyActivity();
  });

  // Calculate today's activity
  const todaysActivity = activities
    .filter(activity => new Date(activity.date).toDateString() === new Date().toDateString())
    .reduce((total, activity) => total + activity.calories, 0);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('fitness_activities', JSON.stringify(activities));
    localStorage.setItem('fitness_goals', JSON.stringify(goals));
    localStorage.setItem('fitness_user_stats', JSON.stringify(userStats));
    localStorage.setItem('fitness_weekly_activity', JSON.stringify(weeklyActivity));
  }, [activities, goals, userStats, weeklyActivity]);

  // Add a new activity
  const addActivity = (activity: Omit<Activity, 'id'>) => {
    const newActivity = {
      ...activity,
      id: Date.now().toString()
    };
    
    setActivities(prev => [newActivity, ...prev]);
    
    // Update goals based on the activity
    setGoals(prev => 
      prev.map(goal => {
        if (goal.completed) return goal;
        
        let updatedCurrent = goal.current;
        
        if (goal.type === 'calories' && activity.calories) {
          updatedCurrent += activity.calories;
        } else if (goal.type === 'distance' && activity.distance) {
          updatedCurrent += activity.distance;
        } else if (goal.type === 'workouts') {
          updatedCurrent += 1;
        }
        
        const completed = updatedCurrent >= goal.target;
        
        return {
          ...goal,
          current: updatedCurrent,
          completed
        };
      })
    );
    
    // Update weekly activity
    const today = new Date().getDay();
    setWeeklyActivity(prev => {
      const updated = [...prev];
      updated[today] += activity.calories;
      return updated;
    });
  };

  // Add a new goal
  const addGoal = (goal: Omit<Goal, 'id' | 'current' | 'completed'>) => {
    const newGoal = {
      ...goal,
      id: Date.now().toString(),
      current: 0,
      completed: false
    };
    
    setGoals(prev => [...prev, newGoal]);
  };

  // Update a goal
  const updateGoal = (id: string, updates: Partial<Goal>) => {
    setGoals(prev => 
      prev.map(goal => 
        goal.id === id ? { ...goal, ...updates } : goal
      )
    );
  };

  // Complete a goal
  const completeGoal = (id: string) => {
    setGoals(prev => 
      prev.map(goal => 
        goal.id === id ? { ...goal, completed: true } : goal
      )
    );
  };

  // Update user stats
  const updateUserStats = (stats: Partial<UserStats>) => {
    setUserStats(prev => {
      const updated = { ...prev, ...stats };
      
      // Recalculate BMI if weight or height changed
      if (stats.weight || stats.height) {
        updated.bmi = calculateBMI(
          stats.weight || prev.weight,
          stats.height || prev.height
        );
      }
      
      return updated;
    });
  };
  
  // Delete an activity
  const deleteActivity = (id: string) => {
    const activityToDelete = activities.find(a => a.id === id);
    if (!activityToDelete) return;
    
    setActivities(prev => prev.filter(activity => activity.id !== id));
    
    // Update goals based on the deleted activity
    setGoals(prev => 
      prev.map(goal => {
        if (goal.completed) return goal;
        
        let updatedCurrent = goal.current;
        
        if (goal.type === 'calories' && activityToDelete.calories) {
          updatedCurrent = Math.max(0, updatedCurrent - activityToDelete.calories);
        } else if (goal.type === 'distance' && activityToDelete.distance) {
          updatedCurrent = Math.max(0, updatedCurrent - activityToDelete.distance);
        } else if (goal.type === 'workouts') {
          updatedCurrent = Math.max(0, updatedCurrent - 1);
        }
        
        return {
          ...goal,
          current: updatedCurrent
        };
      })
    );
    
    // Update weekly activity
    const day = new Date(activityToDelete.date).getDay();
    setWeeklyActivity(prev => {
      const updated = [...prev];
      updated[day] = Math.max(0, updated[day] - activityToDelete.calories);
      return updated;
    });
  };
  
  // Delete a goal
  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  const value = {
    activities,
    goals,
    userStats,
    todaysActivity,
    weeklyActivity,
    addActivity,
    addGoal,
    updateGoal,
    completeGoal,
    updateUserStats,
    deleteActivity,
    deleteGoal
  };

  return <FitnessContext.Provider value={value}>{children}</FitnessContext.Provider>;
};

// Custom hook to use the fitness context
export const useFitness = () => {
  const context = useContext(FitnessContext);
  if (context === undefined) {
    throw new Error('useFitness must be used within a FitnessProvider');
  }
  return context;
};
