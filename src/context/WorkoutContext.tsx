import React, { createContext, useState, ReactNode } from "react";
import { WorkoutType } from "../types/app-types";

// Définition du type pour le contexte
interface WorkoutContextType {
  workouts: WorkoutType[];
  addWorkout: (workout: WorkoutType) => void;
}

// Création du contexte avec un type par défaut
export const WorkoutContext = createContext<WorkoutContextType | undefined>(
  undefined
);

// Définition des props pour le provider
interface WorkoutProviderProps {
  children: ReactNode;
}

export const WorkoutProvider: React.FC<WorkoutProviderProps> = ({
  children,
}) => {
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);

  const addWorkout = (workout: WorkoutType) => {
    setWorkouts((prevWorkouts) => [...prevWorkouts, workout]);
  };

  return (
    <WorkoutContext.Provider value={{ workouts, addWorkout }}>
      {children}
    </WorkoutContext.Provider>
  );
};
