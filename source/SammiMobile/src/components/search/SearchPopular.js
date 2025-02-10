import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { colors, fontSize } from "../../utils/constants";

const SearchPopular = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tìm kiếm phổ biến</Text>
      <View style={styles.popularSearchList}>
        <Text style={styles.popularSearchItem}>Sữa</Text>
        <Text style={styles.popularSearchItem}>Bánh</Text>
        <Text style={styles.popularSearchItem}>Sữa chua</Text>
        <Text style={styles.popularSearchItem}>Mì</Text>
        <Text style={styles.popularSearchItem}>Sữa</Text>
        <Text style={styles.popularSearchItem}>Bánh</Text>
        <Text style={styles.popularSearchItem}>Sữa chua</Text>
        <Text style={styles.popularSearchItem}>Mì</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
  title: {
    fontSize: fontSize.L,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: colors.gray2,
    paddingVertical: 12,
    paddingLeft: 8,
  },
  popularSearchList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  popularSearchItem: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: colors.grayLighter,
    marginRight: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
});

export default SearchPopular;
