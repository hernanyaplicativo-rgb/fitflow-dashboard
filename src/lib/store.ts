import { create } from "zustand";

export type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: string;
  load: string;
  rest: number; // In seconds
};

export type Aluno = {
  id: string;
  name: string;
  goal: string;
  avatar: string;
};

export type Produto = {
  id: number;
  name: string;
  price: number;
  stock: number;
  img: string;
};

interface AppState {
  workout: Exercise[];
  alunos: Aluno[];
  inventario: Produto[];
  setWorkout: (exercises: Exercise[]) => void;
  addExercise: (exercise: Exercise) => void;
  addAluno: (aluno: Aluno) => void;
  addProduto: (produto: Produto) => void;
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
  alunos: [
    { id: "1", name: "Marina Sousa", goal: "Hipertrofia", avatar: "MS" },
    { id: "2", name: "Diego Ferraz", goal: "Força", avatar: "DF" },
    { id: "3", name: "Lucas Tavares", goal: "Condicionamento", avatar: "LT" },
    { id: "4", name: "Ana Beatriz", goal: "Perda de gordura", avatar: "AB" },
    { id: "5", name: "Pedro Henrique", goal: "Powerlifting", avatar: "PH" },
  ],
  inventario: [
    { id: 1, name: "Whey Protein Isolado 900g", price: 8900, stock: 42, img: "💪" },
    { id: 2, name: "Creatina Monohidratada 300g", price: 4500, stock: 4, img: "⚡" },
    { id: 3, name: "Pré-treino Neon Burst", price: 5200, stock: 18, img: "🔥" },
    { id: 4, name: "BCAA em Pó 250g", price: 3800, stock: 0, img: "🧬" },
    { id: 5, name: "Shaker PULSE 700ml", price: 950, stock: 120, img: "🥤" },
    { id: 6, name: "Faixa de Resistência Kit", price: 3200, stock: 7, img: "🎯" },
  ],
  setWorkout: (exercises) => set({ workout: exercises }),
  addExercise: (exercise) => set((state) => ({ workout: [...state.workout, exercise] })),
  addAluno: (aluno) => set((state) => ({ alunos: [...state.alunos, aluno] })),
  addProduto: (produto) => set((state) => ({ inventario: [...state.inventario, produto] })),
}));
