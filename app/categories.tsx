import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity } from "react-native";

const Categories = () => {
  const categories = [
    { name: "general", icon: "earth" },
    { name: "science", icon: "flask" },
    { name: "history", icon: "book" },
  ];

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(
    categories.map(() => new Animated.Value(50)),
  ).current;
  //   const scaleAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Title fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // stagger buttons
    Animated.stagger(
      150,
      slideAnim.map((anim) =>
        Animated.spring(anim, {
          toValue: 0,
          useNativeDriver: true,
        }),
      ),
    ).start();

    // Bounce effect
    Animated.spring(bounceAnim, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  }, [bounceAnim, fadeAnim, slideAnim]);

  const handlePress = (category: string) => {
    router.push({
      pathname: "/quiz",
      params: { category },
    });
  };

  return (
    <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.container}>
      <Animated.Text
        style={[
          styles.title,
          { opacity: fadeAnim, transform: [{ scale: bounceAnim }] },
        ]}
      >
        Select Category
      </Animated.Text>
      {categories.map((cat, index) => (
        <Animated.View
          key={index}
          style={{
            transform: [{ translateY: slideAnim[index] }],
            opacity: fadeAnim,
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePress(cat.name)}
          >
            <Ionicons
              name={cat.icon as any}
              size={22}
              color={"white"}
              style={{ marginRight: 10 }}
            />
            <Text style={styles.buttonText}>{cat.name.toUpperCase()}</Text>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
    color: "white",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 18,
    borderRadius: 14,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
export default Categories;
