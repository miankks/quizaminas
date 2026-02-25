import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isHapticsOn, setIsHapticsOn] = useState(true);

  // Load settings from storage once on mount
  useEffect(() => {
    const loadSettings = async () => {
      const sound = (await AsyncStorage.getItem("isSoundOn")) === "true";
      const haptics = (await AsyncStorage.getItem("isHapticsOn")) === "true";
      setIsSoundOn(sound);
      setIsHapticsOn(haptics);
    };
    loadSettings();
  }, []);

  // Save whenever settings change
  useEffect(() => {
    AsyncStorage.setItem("isSoundOn", isSoundOn ? "true" : "false");
  }, [isSoundOn]);

  useEffect(() => {
    AsyncStorage.setItem("isHapticsOn", isHapticsOn ? "true" : "false");
  }, [isHapticsOn]);

  return (
    <SettingsContext.Provider
      value={{ isSoundOn, setIsSoundOn, isHapticsOn, setIsHapticsOn }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
