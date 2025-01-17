import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import React from "react";

import beachImage from "@/assets/meditation-images/beach.webp";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";

import Animated, {
  FadeInDown,
  FadeInUp,
  withSpring,
} from "react-native-reanimated";
const App = () => {
  const router = useRouter();

  return (
    <View className="flex-1">
      <ImageBackground
        source={beachImage}
        resizeMode="cover"
        className="flex-1"
      >
        <LinearGradient
          // Background Linear Gradient
          colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}
          className="flex-1"
        >
          <SafeAreaView className="flex flex-1 px-1 my-20 mx-5 justify-between">
            <Animated.View
              entering={FadeInDown.delay(300)
                .mass(0.5)
                .stiffness(80)
                .springify(20)}
            >
              <Text className="text-center text-white font-bold text-4xl">
                Simple Meditation
              </Text>
              <Text className="text-center text-white font-regular text-2xl mt-3">
                Simplifying Meditation for Everyone
              </Text>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(300)
                .mass(0.5)
                .stiffness(80)
                .springify(20)}
            >
              <CustomButton
                onPress={() => router.push("/nature-meditate")}
                title="Get Started"
              />
            </Animated.View>

            <StatusBar style="light" />
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
export default App;
