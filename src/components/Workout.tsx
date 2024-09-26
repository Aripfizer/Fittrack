import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputField from "./InputField";
import Button from "./Button";
import { WorkoutContext } from "../context/WorkoutContext";
import { activities } from "../data/activities";
import { Picker } from "@react-native-picker/picker";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Dialog,
} from "react-native-alert-notification";
import { WorkoutFormDataType, WorkoutType } from "../types/app-types";

const Workout = () => {
  const context = useContext(WorkoutContext);
  
  if (!context) {
    throw new Error("useContext must be used within a WorkoutProvider");
  }

  const { workouts, addWorkout } = context;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WorkoutFormDataType>({
    defaultValues: {
      exerciseName: "",
      repetitionNumber: "",
      weight: "",
    },
  });

  const onSubmit: SubmitHandler<WorkoutFormDataType> = (data) => {
    const dataToSubmit: WorkoutType = {
      id: workouts.length + 1,
      exerciseName: data.exerciseName,
      repetitionNumber: Number(data.repetitionNumber),
      weight: Number(data.weight),
      date: new Date(),
    };

    addWorkout(dataToSubmit);

    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: "Success",
      textBody: "Félicitation! Vous avez enregistrer une nouvelle activité.",
      button: "close",
      autoClose: 500,
      onPressButton: () => {
        Dialog.hide();
        // navigation.navigate("WorkoutStats");
      },
    });

    reset();
  };

  return (
    <AlertNotificationRoot>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 14,
            color: "gray",
            marginLeft: 6,
          }}
        >
          Nom de l'activité *
        </Text>

        <Controller
          name="exerciseName"
          control={control}
          rules={{
            required: "L'activité est réquise",
            validate: (value) =>
              value !== "default" || "Veuillez sélectionner une activité",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.card}>
              <Picker
                style={styles.picker}
                selectedValue={value}
                onValueChange={onChange}
                onBlur={onBlur}
              >
                <Picker.Item
                  label="Sélectionnez une activité"
                  value="default"
                />
                {activities.map((activity, index) => (
                  <Picker.Item
                    key={index}
                    label={activity.label}
                    value={activity.value}
                  />
                ))}
              </Picker>
            </View>
          )}
        />
        {errors.exerciseName && (
          <Text style={styles.errorText}>{errors.exerciseName.message}</Text>
        )}

        <Controller
          name="repetitionNumber"
          control={control}
          rules={{
            validate: (value) =>
              value.toString() !== "" || "Le nombre de répétition est réquis",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              placeholder=""
              label="Nombre de répétitions *"
              value={value}
              onChangeText={onChange}
              keyboardType="numeric"
              onBlur={onBlur}
            />
          )}
        />

        {errors.repetitionNumber && (
          <Text style={styles.errorText}>
            {errors.repetitionNumber.message}
          </Text>
        )}

        <Controller
          name="weight"
          control={control}
          rules={{
            validate: (value) =>
              value.toString() !== "" || "Le poids est réquis",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              placeholder=""
              label="Poids (KG) *"
              value={value}
              onChangeText={onChange}
              keyboardType="numeric"
              onBlur={onBlur}
            />
          )}
        />

        {errors.weight && (
          <Text style={styles.errorText}>{errors.weight.message}</Text>
        )}

        <Button
          title="Enregistrer l'activité"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pickerView: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 8,
    paddingVertical: 10,
    paddingHorizontal: 0,
    fontSize: 16,
    height: 50,
    width: "100%",
  },
  picker: {
    height: "auto",
    width: "100%",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 14,
    padding: 0,
    marginVertical: 10,
    shadowColor: "#4b5563",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 14,
    width: "auto",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: -5,
    marginBottom: 10,
    marginLeft: 10,
  },
});

export default Workout;
