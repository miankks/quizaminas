import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../constants/colors";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Aminas</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/categories")}
      >
        <Text style={styles.buttonText}>Start Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    color: colors.white,
    fontWeight: "bold",
    marginBottom: 30,
  },
  button: {
    backgroundColor: colors.white,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },
});
