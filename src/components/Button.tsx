import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

// Définir les types pour les props
interface ButtonProps {
  title: string;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <LinearGradient
          colors={["#163EA6", "#3676A5"]} // Dégradé
          style={styles.button}
          start={{ x: 0, y: 0 }} // Début
          end={{ x: 1, y: 0 }} // Fin du dégradé
        >
          <Text style={styles.text}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    textAlign: "center",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Button;
