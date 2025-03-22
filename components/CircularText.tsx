import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";

export const CircularText = ({
  text,
  radius,
}: {
  text: string;
  radius: number;
}) => {
  const chars = text.split("");
  const textRadius = radius + 10;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View
      style={[
        styles.container,
        { width: textRadius * 2, height: textRadius * 2 },
      ]}
    >
      <Animated.View
        style={[
          styles.textContainer,
          {
            width: textRadius * 2,
            height: textRadius * 2,
            transform: [{ rotate: rotateInterpolate }],
          },
        ]}
      >
        {chars.map((char, index) => {
          const angle = (360 / chars.length) * index;
          const x = textRadius * Math.cos((angle * Math.PI) / 180);
          const y = textRadius * Math.sin((angle * Math.PI) / 180);

          return (
            <Text
              key={index}
              style={[
                styles.char,
                { fontFamily: "Merriweather" },
                {
                  transform: [
                    { translateX: x },
                    { translateY: y },
                    { rotate: `${angle + 90}deg` },
                  ],
                },
              ]}
            >
              {char}
            </Text>
          );
        })}
      </Animated.View>
      <View style={[styles.circle, { width: radius * 2, height: radius * 2 }]}>
        <Text
          style={{
            fontSize: 48,
            top: -16,
          }}
        >
          {"\u2192"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  char: {
    position: "absolute",
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  circle: {
    position: "absolute",
    borderRadius: 100,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
});
