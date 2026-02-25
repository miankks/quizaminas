import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import colors from "../constants/colors";

const HomeScreen = () => {
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isHapticsOn, setIsHapticsOn] = useState(true);

  const handleStartQuiz = () => {
    // Pass preferences as router params
    router.push({
      pathname: "/categories",
      params: {
        isSoundOn: isSoundOn.toString(),
        isHapticsOn: isHapticsOn.toString(),
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Aminas</Text>

      {/* Sound toggle */}
      <View style={styles.toggleRow}>
        <Text style={styles.toggleLabel}>Enable Sound</Text>
        <Switch value={isSoundOn} onValueChange={setIsSoundOn} />
      </View>

      {/* Haptics toggle */}
      <View style={styles.toggleRow}>
        <Text style={styles.toggleLabel}>Enable Haptics</Text>
        <Switch value={isHapticsOn} onValueChange={setIsHapticsOn} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleStartQuiz}>
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
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  toggleLabel: {
    fontSize: 18,
    color: colors.white,
    marginRight: 10,
  },
});
