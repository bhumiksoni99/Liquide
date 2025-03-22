import {
  View,
  Text,
  StatusBar,
  Dimensions,
  Animated,
  StyleSheet,
  Easing,
  TouchableOpacity,
  Touchable,
  Share,
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
  isLiked: boolean;
  onPressLike: (id: number) => void;
}

const ListItem = React.memo(
  ({
    item,
    index,
    animatedValue,
    scrollToPrevious,
    isLiked,
    onPressLike,
  }: Props) => {
    const translateYAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }, []);

    const shareContent = async (item: Data) => {
      try {
        await Share.share({
          message: `${item.city} - ${item.subText}`,
          title: "Amazing Content",
        });
      } catch (error) {
        console.error("Error sharing content:", error);
      }
    };

    const renderIcon = (item: Data, icon: string) => (
      <View style={styles.iconContainer}>
        <Text style={{ fontSize: 24, color: item.isDark ? "white" : "black" }}>
          {icon}
        </Text>
      </View>
    );
    return (
      <View style={styles.itemContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={scrollToPrevious}>
            {index > 0 && (
              <Text
                style={{ fontSize: 48, color: item.isDark ? "white" : "black" }}
              >
                {"\u2B06"}
              </Text>
            )}
          </TouchableOpacity>

          <View style={{ flexDirection: "row", gap: 16 }}>
            {renderIcon(item, "\u2605")}
            {renderIcon(item, "\u2630")}
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
          <View style={{ alignItems: "center", justifyContent: "flex-start" }}>
            <Animated.Text
              style={[
                {
                  color: item.isDark ? "white" : "black",
                  fontSize: 24,
                  fontFamily: "Merriweather",
                },
                {
                  opacity: animatedValue,
                  transform: [
                    {
                      translateY: animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0],
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
                { color: item.isDark ? "white" : "black" },
                {
                  opacity: animatedValue,
                  transform: [
                    {
                      translateY: animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0],
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
              text={"Explore.Explore.Explore.Explore."}
              radius={40}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => onPressLike(item.id)}
          >
            <Text
              style={[
                styles.option,
                { color: item.isDark ? "white" : "black", flex: 1 },
              ]}
            >
              {isLiked ? "\u2665 Unlike" : "\u2661 Like"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => shareContent(item)}
          >
            <Text
              style={[
                styles.option,
                { color: item.isDark ? "white" : "black" },
              ]}
            >
              {"\u21B1"} Share
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  bigText: {
    color: "white",
    marginTop: 16,
    fontSize: 50,
    textAlign: "center",
    fontFamily: "Merriweather",
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
  iconContainer: {
    height: 40,
    width: 40,
    backgroundColor: "rgba(232, 232, 224, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  itemContainer: {
    marginTop: StatusBar.currentHeight,
    zIndex: 1,
    flex: 1,
    paddingHorizontal: 24,
    maxHeight: height,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 36,
  },
  option: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Merriweather",
  },
});

export default ListItem;
