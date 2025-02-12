import React, { useState } from "react";
import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import { Icon } from "@ui-kitten/components";
import {
  backgroundColors,
  colors,
  fontSize,
  windowWidth,
} from "../../utils/constants";
import { color } from "react-native-reanimated";

const DrawerItem = ({ index, indexActiveCategory, setIndexActiveCategory }) => {
  const isShowListCategory = index == indexActiveCategory;

  // const [isShowListCategory, setIndexActiveCategory] = useState(false);
  return (
    <Pressable
      onPress={() => {
        if (isShowListCategory) {
          setIndexActiveCategory(-1);
        } else {
          setIndexActiveCategory(index);
        }
      }}
      style={styles.container}
    >
      <View
        style={[
          styles.titleContainer,
          isShowListCategory && { backgroundColor: backgroundColors.gray },
        ]}
      >
        <Text style={[styles.title, isShowListCategory && styles.activeTitle]}>
          Thịt, cá, trứng, hải sản
        </Text>
        <Text
          style={[
            styles.numOfProduct,
            isShowListCategory && styles.activeTitle,
          ]}
        >
          (100)
        </Text>
        <View style={styles.downIconContainer}>
          <Icon
            name="arrow-ios-downward-outline"
            fill={isShowListCategory ? colors.green2 : colors.gray2}
            style={styles.downIcon}
          />
        </View>
      </View>
      <View
        style={[
          styles.body,
          isShowListCategory
            ? { backgroundColor: backgroundColors.gray }
            : { display: "none" },
        ]}
      >
        <View style={styles.categoryItem}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../../assets/product_tao.jpg")}
              style={styles.image}
            />
          </View>
          <Text style={styles.categoryName}>Dầu ăn</Text>
        </View>
        <View style={styles.categoryItem}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../../assets/product_tao.jpg")}
              style={styles.image}
            />
          </View>
          <Text style={styles.categoryName}>Dầu ăn</Text>
        </View>
        <View style={styles.categoryItem}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../../assets/product_tao.jpg")}
              style={styles.image}
            />
          </View>
          <Text style={styles.categoryName}>Dầu ăn</Text>
        </View>
        <View style={styles.categoryItem}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../../assets/product_tao.jpg")}
              style={styles.image}
            />
          </View>
          <Text style={styles.categoryName}>Dầu ăn</Text>
        </View>
        <View style={styles.categoryItem}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../../assets/product_tao.jpg")}
              style={styles.image}
            />
          </View>
          <Text style={styles.categoryName}>Dầu ăn</Text>
        </View>
        <View style={styles.categoryItem}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../../assets/product_tao.jpg")}
              style={styles.image}
            />
          </View>
          <Text style={styles.categoryName}>Dầu ăn đỉnh</Text>
        </View>
        <View style={styles.categoryItem}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../../assets/product_tao.jpg")}
              style={styles.image}
            />
          </View>
          <Text style={styles.categoryName}>Dầu ăn</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: colors.grayLighter,
    borderBottomWidth: 1,
  },
  titleContainer: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
  },
  title: {
    textTransform: "uppercase",
    fontSize: fontSize.XL,
    fontWeight: "bold",
    color: colors.gray2,
  },
  activeTitle: {
    color: colors.green2,
  },
  numOfProduct: {
    paddingLeft: 12,
    color: colors.gray,
  },
  downIconContainer: {
    marginLeft: "auto",
  },
  downIcon: {
    width: 28,
    height: 28,
  },
  body: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 6,
  },
  categoryItem: {
    width: (windowWidth - 48) / 3,
    margin: 6,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.grayLighter,
    borderRadius: 4,
    backgroundColor: colors.white,
  },
  imageContainer: {},
  image: {
    width: 88,
    height: 88,
  },
  categoryName: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    textAlign: "center",
  },
});

export default DrawerItem;
