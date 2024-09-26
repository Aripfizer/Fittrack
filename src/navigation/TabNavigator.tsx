import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import StatsScreen from "../screens/StatsScreen";
import { useContext, useEffect } from "react";
import { defaultWorkouts } from "../data/activities";
import { WorkoutContext } from "../context/WorkoutContext";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useContext must be used within a WorkoutProvider');
  }

  const { addWorkout } = context;

  // const { addWorkout } = useContext(WorkoutContext);

  useEffect(() => {
    const initializeDefaultWorkouts = () => {
      defaultWorkouts.forEach((workout) => {
        addWorkout(workout);
      });
    };

    // Appel de la fonction pour initialiser les activités
    initializeDefaultWorkouts();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: "#163EA6",
        tabBarInactiveTintColor: "black",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Accueil",
          tabBarIcon: ({ focused }) => (
            <AntDesignIcon
              name="form"
              size={20}
              color={focused ? "#163EA6" : "black"}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          title: "Statistiques",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="stats-chart"
              size={20}
              color={focused ? "#163EA6" : "black"}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
