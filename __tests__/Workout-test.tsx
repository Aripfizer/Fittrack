import React, { useContext } from "react";
import { render, fireEvent, screen, act } from "@testing-library/react-native";
import { WorkoutContext, WorkoutProvider } from "../src/context/WorkoutContext";
import Workout from "../src/components/Workout";

// Définir les propriétés pour le Provider
interface ProviderProps {
  children?: React.ReactNode;
}

// Simuler le composant Workout dans un Provider
const renderWithContext = (
  ui: React.ReactNode,
  { providerProps, ...renderOptions }: { providerProps?: ProviderProps } = {}
) => {
  return render(
    <WorkoutProvider {...providerProps}>{ui}</WorkoutProvider>,
    renderOptions
  );
};

describe("Workout Component", () => {
  test("ajoute un nouvel exercice au contexte après la soumission du formulaire", async () => {
    // Rendre le composant Workout dans le Provider
    renderWithContext(<Workout />, { providerProps: {} });

    // Sélectionner une activité
    const picker = screen.getByRole("combobox");
    fireEvent.changeText(picker, { target: { value: "Squat" } });

    // Remplir le champ Nombre de répétitions
    const repetitionsInput = screen.getByLabelText("Nombre de répétitions *");
    fireEvent.changeText(repetitionsInput, "12");

    // Remplir le champ Poids
    const weightInput = screen.getByLabelText("Poids (KG) *");
    fireEvent.changeText(weightInput, "80");

    // Soumettre le formulaire
    const submitButton = screen.getByText("Enregistrer l'activité");
    fireEvent.press(submitButton);

    // Attendre que l'action soit effectuée
    await act(async () => {
      fireEvent.press(submitButton);
    });

    // Vérifier que l'activité a été ajoutée au contexte
    const workoutContext = useContext(WorkoutContext);

    if (!workoutContext) {
      throw new Error("useContext must be used within a WorkoutProvider");
    }
    expect(workoutContext.workouts).toHaveLength(1);
    expect(workoutContext.workouts[0]).toMatchObject({
      exerciseName: "Squat",
      repetitionNumber: 12,
      weight: 80,
    });
  });
});
