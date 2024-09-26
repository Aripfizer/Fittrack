import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import WorkoutStats from "../components/WorkoutStats";
import Header from "../components/Header";

const StatsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Header
        page="stats"
        title="Statistiques"
        description="Suivez vos progrès et revivez vos activités passées ! 🤓💪🏽"
      />

      <View style={styles.statContainer}>
        <WorkoutStats />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  statContainer: {
    padding: 20,
  },
});

export default StatsScreen;
