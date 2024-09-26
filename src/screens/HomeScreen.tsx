import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";

import Workout from "../components/Workout";
import WorkoutInfo from "../components/workoutInfo";
import Header from "../components/Header";

const HomeScreen = () => {
  return (
    <ScrollView>
      <Header
        page="home"
        title="Bienvenue sur Fittrack !"
        description="N'hésitez pas à enregistrer une nouvelle activitée."
      />

      <View style={styles.container}>
        <Workout />
        <Text style={styles.activityTitle}>Les activités récentes : </Text>
        <WorkoutInfo />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    backgroundColor: "white",
  },
  activityTitle: {
    paddingTop: 20,
    paddingBottom: 10,
    fontSize: 20,
    fontWeight: "700",
  },
});

export default HomeScreen;
