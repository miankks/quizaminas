import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../constants/colors";
// import { questions } from "../data/questions";

type RootStackParamList = {
  Home: undefined;
  Quiz: undefined;
  Result: { score: number };
};

type Props = NativeStackScreenProps<RootStackParamList, "Result">;

const ResultScreen: React.FC<Props> = () => {
  const { score } = useLocalSearchParams<{ score?: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Score</Text>
      <Text style={styles.score}>{score}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.buttonText}>Play Again</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 12,
    color: colors.white,
  },
  score: {
    fontSize: 48,
    color: colors.white,
    fontWeight: "bold",
    marginVertical: 20,
  },
  button: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
  },
});
