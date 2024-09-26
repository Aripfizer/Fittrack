import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { WorkoutContext } from "../context/WorkoutContext";
import Entypo from "react-native-vector-icons/Entypo";
import { exportAndNotify } from "../services/workoutService";
import { WorkoutType } from "../types/app-types";

const WorkoutInfo = () => {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error("useContext must be used within a WorkoutProvider");
  }

  const { workouts } = context;

  // Vérifie si workoutData est vide
  if (!workouts || workouts.length === 0) {
    return <Text style={styles.noDataText}>Aucune activité enregistrée</Text>;
  }

  // Fonction pour sauvegarder un fichier JSON dans le dossier sélectionné
  const exportActivityData = async (item: WorkoutType) => {
    exportAndNotify(item.exerciseName, item);
  };

  const renderItem = (item:WorkoutType) => (
    <View key={item.id} style={styles.itemContainer}>
      <View style={styles.headerWrapper}>
        <Text style={styles.exerciseName}>{item.exerciseName}</Text>
        <TouchableOpacity
          style={styles.exportButton}
          onPress={() => exportActivityData(item)}
        >
          <Entypo name="export" size={22} color={"white"} />
        </TouchableOpacity>
      </View>
      <View style={styles.infoWrapper}>
        <Text style={styles.details}>
          Répétitions : {item.repetitionNumber}
        </Text>
        <Text style={styles.details}>Poids : {item.weight}</Text>
        <Text style={styles.details}>
          Date :{" "}
          {item.date
            ? new Date(item.date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : "Non renseignée"}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView>
      {workouts.reverse().map((item) => {
        if (item !== undefined) {
          return renderItem(item);
        }
      })}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "white",
    borderRadius: 14,
    padding: 20,
    marginVertical: 10,
    shadowColor: "#4b5563",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    width: "auto",
    height: "auto",
  },
  infoWrapper: {
    marginLeft: 20,
  },
  exerciseName: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5,
  },
  details: {
    fontSize: 16,
    marginBottom: 4,
    color: "#666",
  },
  noDataText: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
    color: "#888",
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingLeft: 10,
  },
  exportButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#153FA6",
    marginLeft: 10,
    shadowColor: "#4b5563",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 2,
  },
});

export default WorkoutInfo;
