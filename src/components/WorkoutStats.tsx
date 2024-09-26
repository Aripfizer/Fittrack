import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { WorkoutContext } from "../context/WorkoutContext";
import Entypo from "react-native-vector-icons/Entypo";
import { LinearGradient } from "expo-linear-gradient";
import { exportAndNotify } from "../services/workoutService";

const WorkoutStats = () => {
  const { workouts } = useContext(WorkoutContext);

  // Regrouper les séances par date
  const sessions = workouts.reduce((acc, workout) => {
    const dateKey = new Date(workout.date).toLocaleDateString();
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(workout);
    return acc;
  }, {});

  // Calculer les statistiques globales
  const totalWorkouts = workouts.length;
  const totalRepetitions = workouts.reduce(
    (total, workout) => total + Number(workout.repetitionNumber),
    0
  );
  const totalWeight = workouts.reduce(
    (total, workout) => total + Number(workout.weight),
    0
  );

  const exportGlobalStat = async () => {
    exportAndNotify("global-stats", {
      totalWorkouts,
      totalRepetitions,
      totalWeight,
    });
  };

  const exportStatBySeance = async () => {
    exportAndNotify("seance-stats", sessions);
  };

  return (
    <SafeAreaView>
      <LinearGradient
        colors={["#163EA6", "#96D15B"]}
        style={styles.gradiantWrapper}
        start={{ x: 0, y: 0 }} // Début
        end={{ x: 1, y: 0 }} // Fin du dégradé
      >
        <View style={styles.statPerSeanceWrapper}>
          <Text style={styles.title}>Statistiques Globales</Text>

          <TouchableOpacity
            style={styles.exportButton}
            onPress={() => exportGlobalStat()}
          >
            <Entypo name="export" size={22} color={"white"} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.detailsWrapper}>
        <Text style={styles.details}>Total d'activités: {totalWorkouts}</Text>
        <Text style={styles.details}>
          Total de répétitions: {totalRepetitions}
        </Text>
        <Text style={styles.details}>
          Poids total soulevé: {totalWeight} KG
        </Text>
      </View>

      <LinearGradient
        colors={["#163EA6", "#96D15B"]} // Dégradé
        style={styles.gradiantWrapper}
        start={{ x: 0, y: 0 }} // Début
        end={{ x: 1, y: 0 }} // Fin
      >
        <View style={styles.statPerSeanceWrapper}>
          <Text style={styles.title}>Statistiques par Séance</Text>

          <TouchableOpacity
            style={styles.exportButton}
            onPress={() => exportStatBySeance()}
          >
            <Entypo name="export" size={22} color={"white"} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <FlatList
        scrollEnabled={false}
        data={Object.keys(sessions)}
        renderItem={({ item }) => {
          const sessionWorkouts = sessions[item];
          const sessionRepetitions = sessionWorkouts.reduce(
            (total, workout) => total + Number(workout.repetitionNumber),
            0
          );
          const sessionWeight = sessionWorkouts.reduce(
            (total, workout) => total + Number(workout.weight),
            0
          );

          //Formatage de la date
          const [month, day, year] = item.split("/"); // Sépare la chaîne
          const formattedString = `${year}-${month.padStart(
            2,
            "0"
          )}-${day.padStart(2, "0")}`; // Convertit en YYYY-MM-DD

          const dateObject = new Date(formattedString);

          const formattedDate = dateObject.toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });

          return (
            <View style={styles.sessionContainer}>
              <View style={styles.dateWrapper}>
                <Entypo name="star" size={22} color={"#163EA6"} />
                <Text style={styles.sessionDate}>{formattedDate}</Text>
              </View>

              <View style={styles.detailsWrapper}>
                <Text style={styles.seanceDetails}>
                  Nombre d'activités: {sessionWorkouts.length}
                </Text>
                <Text style={styles.seanceDetails}>
                  Répétitions totales: {sessionRepetitions}
                </Text>
                <Text style={styles.seanceDetails}>
                  Poids total soulevé: {sessionWeight} KG
                </Text>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "white",
  },
  sessionContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginVertical: 5,
  },
  sessionDate: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 10,
  },
  details: {
    fontSize: 18,
  },
  seanceDetails: {
    fontSize: 16,
    color: "#1e293b",
    marginTop: 5,
  },
  detailsWrapper: {
    marginLeft: 10,
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
  statPerSeanceWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "flex-start",
    paddingLeft: 10,
  },
  gradiantWrapper: {
    marginVertical: 20,
  },
  dateWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#163EA6",
  },
});

export default WorkoutStats;
