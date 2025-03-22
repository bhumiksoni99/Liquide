import {
  View,
  Text,
  StatusBar,
  Dimensions,
  Animated,
  StyleSheet,
  Easing,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { CircularText } from "./CircularText";
import { Data } from "../data";

const { width, height } = Dimensions.get("window");

interface Props {
  item: Data;
  index: number;
  animatedValue: Animated.Value;
  scrollToPrevious: () => void;
}

const ListItem = React.memo(
  ({ item, index, animatedValue, scrollToPrevious }: Props) => {
    const translateYAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }, []);

    const renderIcon = () => (
      <View
        style={{
          height: 40,
          width: 40,
          backgroundColor: "rgba(232, 232, 224, 0.2)",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6,
        }}
      >
        <Text style={{ fontSize: 30 }}>{"\u2B06"}</Text>
      </View>
    );
    return (
      <View
        style={{
          paddingVertical: StatusBar.currentHeight ?? 20 + 30,
          zIndex: 1,
          flex: 1,
          paddingHorizontal: 24,
          maxHeight: height,
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={scrollToPrevious}>
            {index > 0 && <Text style={{ fontSize: 48 }}>{"\u2B06"}</Text>}
          </TouchableOpacity>

          <View style={{ flexDirection: "row", gap: 16 }}>
            {renderIcon()}
            {renderIcon()}
          </View>
        </View>
        <View
          style={{
            marginVertical: 64,
            alignItems: "center",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Animated.Text
              style={[
                { color: "white", fontSize: 24 },
                {
                  opacity: animatedValue,
                  transform: [
                    {
                      translateX: animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0], // Moves up when visible
                      }),
                    },
                  ],
                },
              ]}
            >
              {item.city}
            </Animated.Text>
            <Animated.Text
              style={[
                styles.bigText,

                {
                  opacity: animatedValue,
                  transform: [
                    {
                      translateY: animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0], // Moves up when visible
                      }),
                    },
                  ],
                },
              ]}
            >
              {item.subText.toUpperCase()}
            </Animated.Text>
          </View>
          <View>
            <CircularText
              text={"Explore.Explore.Explore.Explore"}
              radius={40}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              color: "white",
              flexBasis: "50%",
            }}
          >
            {"\u2661"} Like
          </Text>
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              color: "white",
              flexBasis: "50%",
            }}
          >
            {"\u21B1"} Share
          </Text>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  bigText: {
    color: "white",
    marginTop: 24,
    fontSize: 52,
    textAlign: "center",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    flexWrap: "wrap",
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "blue",
  },
});

export default ListItem;
