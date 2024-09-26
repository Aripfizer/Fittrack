// Définir le type pour les activités
export interface ActivityType {
  label: string;
  value: string;
}

// Définir le type pour les workouts
export interface WorkoutType {
  id?: number;
  exerciseName: string;
  repetitionNumber: number;
  weight: number;
  date: Date;
}

// Définir le type pour le formulaire
export interface WorkoutFormDataType {
  exerciseName: string;
  repetitionNumber: string;
  weight: string;
}
