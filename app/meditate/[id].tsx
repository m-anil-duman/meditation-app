import { View, Text, ImageBackground, Pressable, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import MEDITATION_IMAGES from "@/constants/meditation-images";
import AppGradient from "@/components/AppGradient";
import { router, useLocalSearchParams } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomButton from "@/components/CustomButton";
import { Audio } from "expo-av";
import { MEDITATION_DATA, AUDIO_FILES } from "@/constants/MeditationData";
const Meditate = () => {
  const { id } = useLocalSearchParams();
  const [secondsRemaining, setSecondsRemaining] = useState(10);
  const [isMeditating, setMeditating] = useState(false);
  const [audioSound, setSound] = useState<Audio.Sound>();
  const [isPlayingAudio, setPlayingAudio] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (secondsRemaining === 0) {
      setMeditating(false);
      return;
    }
    if (isMeditating) {
      timerId = setTimeout(
        () => setSecondsRemaining(secondsRemaining - 1),
        1000
      );
      return () => {
        clearTimeout(timerId);
      };
    }
  }, [secondsRemaining, isMeditating]);

  useEffect(() => {
    return () => {
      audioSound?.unloadAsync();
    };
  }, [audioSound]);

  const toggleMeditationSessionStatus = async () => {
    if (secondsRemaining === 0) setSecondsRemaining(10);
    setMeditating(!isMeditating);
    await toggleSound();
  };
  const toggleSound = async () => {
    const sound = audioSound ? audioSound : await initializeSound();
    const status = await sound?.getStatusAsync();
    if (status?.isLoaded && !isPlayingAudio) {
      await sound.playAsync();
      setPlayingAudio(true);
    } else {
      await sound.pauseAsync();
      setPlayingAudio(false);
    }
  };
  const initializeSound = async () => {
    const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;
    console.log(audioFileName);

    const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFileName]);
    setSound(sound);
    return sound;
  };

  const handleAdjustDuration = () => {
    if (isMeditating) toggleMeditationSessionStatus();
    setModalVisible(true);
  };
  const handleModalButtonPress = (duration: number) => {
    setSecondsRemaining(duration);
    setModalVisible(false);
  };
  const formattedTimeMinutes = String(
    Math.floor(secondsRemaining / 60)
  ).padStart(2, "0");
  const formattedTimeSeconds = String(
    Math.floor(secondsRemaining % 60)
  ).padStart(2, "0");

  return (
    <View className="flex-1">
      <ImageBackground
        source={MEDITATION_IMAGES[Number(id) - 1]}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient colors={["transparent", "rgba(0,0,0,0.8)"]}>
          <Pressable
            onPress={() => router.back()}
            className="absolute top-16 left-6 z-10"
          >
            <AntDesign name="leftcircleo" size={35} color="white" />
          </Pressable>
          <View className="flex-1 justify-center">
            <View className="mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center">
              <Text className="text-4xl text-blue-800 font-rmono">
                {formattedTimeMinutes}:{formattedTimeSeconds}
              </Text>
            </View>
          </View>
          <View className="mb-5">
            <CustomButton
              title={"Adjust Duration"}
              onPress={handleAdjustDuration}
            />
            <CustomButton
              title={isMeditating ? "Stop Meditating" : "Start Meditating"}
              onPress={toggleMeditationSessionStatus}
              containerStyles="mt-5"
            />
          </View>
        </AppGradient>
        <Modal
          animationType="slide"
          visible={modalVisible}
          className="flex-1 relative"
        >
          <AppGradient colors={["#161b2e", "#0a4d4a", "#766e67"]}>
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              className="absolute top-8 left-6 z-10"
            >
              <AntDesign name="leftcircleo" size={35} color="white" />
            </Pressable>
            <CustomButton
              title="10 seconds"
              onPress={() => handleModalButtonPress(10)}
              containerStyles="mb-5"
            />
            <CustomButton
              title="5 minutes"
              onPress={() => handleModalButtonPress(5 * 60)}
              containerStyles="mb-5"
            />
            <CustomButton
              title="10 minutes"
              onPress={() => handleModalButtonPress(10 * 60)}
              containerStyles="mb-5"
            />
            <CustomButton
              title="15 minutes"
              onPress={() => handleModalButtonPress(15 * 60)}
              containerStyles="mb-5"
            />
          </AppGradient>
        </Modal>
      </ImageBackground>
    </View>
  );
};

export default Meditate;
