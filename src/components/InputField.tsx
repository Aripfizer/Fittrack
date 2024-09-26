import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

// Définir les types pour les props
interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad"; // Types de clavier possibles
  onBlur?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  onBlur,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType}
          onBlur={onBlur}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
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
  label: {
    fontSize: 14,
    color: "gray",
    marginLeft: 6,
  },
  input: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    width: "100%",
    color: "black",
  },
});

export default InputField;
