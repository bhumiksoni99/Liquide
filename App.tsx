import { useEffect, useRef } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Animated,
  ViewToken,
} from "react-native";
import { data } from "./data";
import ListItem from "./components/ListItem";
import { FlatList as NativeFlatList } from "react-native";

const { width, height } = Dimensions.get("window");

export default function App() {
  const animatedValues = useRef(data.map(() => new Animated.Value(0))).current;

  const flatListRef = useRef<NativeFlatList | null>(null);
  const scrollPosition = useRef(0);
  const currentIndex = useRef(0);

  const onScroll = (event: {
    nativeEvent: { contentOffset: { y: number } };
  }) => {
    scrollPosition.current = event.nativeEvent.contentOffset.y;
  };

  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 90 };

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    data.forEach((_, index) => {
      if (viewableItems.some((item) => item.index === index)) {
        Animated.timing(animatedValues[index], {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start();
      } else {
        animatedValues[index].setValue(0);
      }
    });
  };

  const onMomentumScrollEnd = () => {
    const index = Math.round(scrollPosition.current / height);
    if (index !== currentIndex.current) {
      currentIndex.current = index;
      flatListRef.current?.scrollToIndex({ index, animated: true });
    }
  };

  const scrollToPrevious = () => {
    if (currentIndex.current > 0) {
      const prevIndex = currentIndex.current - 1;
      flatListRef.current &&
        flatListRef.current?.scrollToIndex({
          index: prevIndex,
          animated: true,
        });
      currentIndex.current = prevIndex;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        initialNumToRender={1}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        onScroll={onScroll}
        keyExtractor={(item, index) => index.toString()}
        onMomentumScrollEnd={onMomentumScrollEnd}
        snapToInterval={height}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        pagingEnabled
        renderItem={({ item, index }) => (
          <View style={{ flex: 1 }}>
            <ImageBackground
              source={item.image}
              style={{ height, width }}
              resizeMode={"cover"}
            >
              <ListItem
                item={item}
                index={index}
                animatedValue={animatedValues[index]}
                scrollToPrevious={scrollToPrevious}
              />
            </ImageBackground>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
