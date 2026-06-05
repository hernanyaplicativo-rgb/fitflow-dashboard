import { create } from "zustand";

export type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: string;
  load: string;
  rest: number; // In seconds
};

interface AppState {
  workout: Exercise[];
  setWorkout: (exercises: Exercise[]) => void;
  addExercise: (exercise: Exercise) => void;
}

export const useStore = create<AppState>((set) => ({
  workout: [
    { id: "1", name: "Supino reto", sets: 4, reps: "8-10", load: "70 kg", rest: 90 },
    { id: "2", name: "Remada curvada", sets: 4, reps: "8", load: "60 kg", rest: 90 },
    { id: "3", name: "Desenvolvimento militar", sets: 3, reps: "10", load: "40 kg", rest: 60 },
    { id: "4", name: "Puxada alta", sets: 3, reps: "12", load: "50 kg", rest: 60 },
    { id: "5", name: "Tríceps no pulley", sets: 3, reps: "15", load: "30 kg", rest: 45 },
    { id: "6", name: "Rosca direta", sets: 3, reps: "12", load: "14 kg", rest: 45 },
  ],
  setWorkout: (exercises) => set({ workout: exercises }),
  addExercise: (exercise) => set((state) => ({ workout: [...state.workout, exercise] })),
}));
