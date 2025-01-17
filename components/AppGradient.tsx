import { View, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Content from "./Content";

const AppGradient = ({ children, colors }: { children: any; colors: any }) => {
  return (
    <LinearGradient colors={colors} className="flex-1">
      {" "}
      <Content>{children}</Content>
    </LinearGradient>
  );
};

export default AppGradient;
