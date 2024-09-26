import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

// Définir les types pour les props
interface HeaderProps {
  page: string;
  title: string;
  description: string;
}

const Header: React.FC<HeaderProps> = ({ page, title, description }) => {
  return (
    <ScrollView
      style={[
        styles.container,
        page === "home" ? styles.paddingLeft : styles.paddingRight,
      ]}
    >
      <LinearGradient
        colors={["#163EA6", "#3676A5"]} // Dégradé
        start={{ x: 0.5, y: 0 }} // Début
        end={{ x: 0.5, y: 1 }} // Fin
        style={page === "home" ? styles.rightCircle : styles.leftCircle}
      ></LinearGradient>

      <View style={page === "home" ? styles.leftWrapper : styles.rightWrapper}>
        <Text style={[styles.title, page !== "home" && styles.centerText]}>
          {" "}
          {title}
        </Text>
        <Text
          style={[styles.description, page !== "home" && styles.centerText]}
        >
          {" "}
          {description}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    paddingBottom: 20,
  },
  paddingLeft: {
    paddingLeft: 15,
  },
  paddingRight: {
    paddingRight: 15,
  },
  centerText: {
    textAlign: "center",
  },
  leftWrapper: {
    paddingTop: "20%",
  },
  rightWrapper: {
    paddingTop: "20%",
    alignSelf: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#0369a1",
  },
  description: {
    fontSize: 16,
    fontWeight: "500",
    color: "#9ca3af",
    marginTop: 10,
    textAlign: "left",
    position: "relative",
    left: 5,
  },
  leftCircle: {
    width: 90,
    height: 100,
    position: "absolute",
    top: -20,
    left: 0,
    borderBottomRightRadius: 100,
  },
  rightCircle: {
    width: 100,
    height: 90,
    position: "absolute",
    top: -20,
    right: 0,
    borderBottomLeftRadius: 100,
  },
});

export default Header;
