import React from "react";
import { Image, Text } from "react-native";
import { View, StyleSheet } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { colors } from "../../utils/constants";

const SearchResultCategoryItem = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/product_tao.jpg")}
        style={styles.image}
      />
      <Text style={styles.name}>Gạo các loại An an</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.grayLighter,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
  image: {
    width: 82,
    height: 82,
  },
  name: {
    textAlign: "center",
    paddingTop: 4,
  },
});

export default SearchResultCategoryItem;
