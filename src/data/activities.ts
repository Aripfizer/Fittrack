import { getRandomPastDate } from "../services/workoutService";
import { ActivityType, WorkoutType } from "../types/app-types";

export const activities: ActivityType[] = [
  { label: "Squat", value: "Squat" },
  { label: "Soulevé de terre", value: "Soulevé de terre" },
  { label: "Développé couché", value: "Développé couché" },
  { label: "Tractions", value: "Tractions" },
  { label: "Pompes", value: "Pompes" },
  { label: "Fentes", value: "Fentes" },
  { label: "Curl biceps", value: "Curl biceps" },
  { label: "Planche", value: "Planche" },
  { label: "Sauts en extension", value: "Sauts en extension" },
  { label: "Gainage", value: "Gainage" },
];

export const defaultWorkouts: WorkoutType[] = [
  {
    id: 1,
    exerciseName: "Pompes",
    repetitionNumber: 1,
    weight: 30,
    date: getRandomPastDate(),
  },
  {
    id: 2,
    exerciseName: "Fentes",
    repetitionNumber: 4,
    weight: 40,
    date: getRandomPastDate(),
  },
  {
    id: 3,
    exerciseName: "Gainage",
    repetitionNumber: 3,
    weight: 50,
    date: getRandomPastDate(),
  },
  {
    id: 4,
    exerciseName: "Tractions",
    repetitionNumber: 1,
    weight: 30,
    date: getRandomPastDate(),
  },
  // Vous pouvez décommenter ces entrées si vous en avez besoin
  // {
  //   id: 5,
  //   exerciseName: "Fentes",
  //   repetitionNumber: 4,
  //   weight: 70,
  //   date: getRandomPastDate(),
  // },
  // {
  //   id: 6,
  //   exerciseName: "Planche",
  //   repetitionNumber: 3,
  //   weight: 80,
  //   date: getRandomPastDate(),
  // },
];
