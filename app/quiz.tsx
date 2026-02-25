import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import QuestionCard from "../components/QuestionCard";
import { questionBank } from "../data/questions";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

const { width } = Dimensions.get("window");
const playSound = async () => {
  const { sound } = await Audio.Sound.createAsync(
    require("../assets/sounds/click.mp3"), // add your sound file here
  );
  await sound.playAsync();
};
const QuizScreen = () => {
  const { category } = useLocalSearchParams<{ category: string }>();

  const [showNext, setShowNext] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const slideAnim = useState(new Animated.Value(100))[0];

  // Shuffle questions on start
  useEffect(() => {
    if (!category) return;

    const categoryQuestions = questionBank[category];
    if (!categoryQuestions) return;

    const shuffled = [...categoryQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5)
      .map((q) => ({
        ...q,
        options: [...q.options].sort(() => Math.random() - 0.5),
      }));

    setQuestions(shuffled);
  }, [category]);

  useEffect(() => {
    if (showNext) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      slideAnim.setValue(100);
    }
  }, [showNext, slideAnim]);

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (option: string) => {
    if (selectedAnswer) return;

    setSelectedAnswer(option);

    if (option === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }

    setShowNext(true); // show Next button
  };

  const handleNext = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await playSound();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowNext(false);
    } else {
      router.push({
        pathname: "/result",
        params: { score: score.toString() },
      });
    }
  };

  const screenWidth = Dimensions.get("window").width - 40;
  const progressWidth = `${((currentIndex + 1) / questions.length) * screenWidth}%`;

  return (
    <LinearGradient
      colors={["#2E5AAC", "#3B73D1", "#3CA7D8"]}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.category}>{category?.toUpperCase() || "QUIZ"}</Text>
      </View>

      {/* Question Card */}
      <QuestionCard question={currentQuestion.question} />

      {/* Progress Bar */}
      <View style={styles.progressBarBackground}>
        <View
          style={[
            styles.progressBarFill,
            { width: progressWidth as `${number}%` },
          ]}
        />
      </View>

      {/* Options Grid */}
      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => {
          const isSelected = option === selectedAnswer;

          let backgroundColor = "#3B3FAF";

          if (selectedAnswer) {
            if (option === currentQuestion.correctAnswer) {
              backgroundColor = "#4CAF50";
            } else if (isSelected) {
              backgroundColor = "#F44336";
            }
          }

          return (
            <TouchableOpacity
              key={index}
              style={[styles.optionButton, { backgroundColor }]}
              onPress={() => handleAnswer(option)}
              activeOpacity={0.8}
              disabled={!!selectedAnswer}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {showNext && (
        <Animated.View
          style={[
            styles.nextButtonContainer,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentIndex + 1 < questions.length ? "Next" : "See Results"}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </LinearGradient>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  header: {
    alignItems: "center",
    marginBottom: 60,
  },

  category: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },

  progressBarBackground: {
    height: 10,
    backgroundColor: "#2A4FA5",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 30,
  },

  progressBarFill: {
    height: "100%",
    backgroundColor: "#4CD964",
    borderRadius: 20,
  },

  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  optionButton: {
    width: width * 0.42,
    paddingVertical: 28,
    borderRadius: 25,
    marginBottom: 20,
    alignItems: "center",
  },

  optionText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  nextButtonContainer: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
  },

  nextButton: {
    backgroundColor: "#4CD964",
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  nextButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
