import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface QuestionsCardProps {
  question: string;
}

const QuestionCard = ({ question }: QuestionsCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.questionText}>{question}</Text>
    </View>
  );
};

export default QuestionCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  questionText: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "600",
    color: "32E3A59",
  },
});
