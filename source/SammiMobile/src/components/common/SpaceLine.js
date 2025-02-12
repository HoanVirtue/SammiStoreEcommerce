import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../../utils/constants";

const SpaceLine = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    height: 8,
    backgroundColor: colors.grayLighter,
  },
});

export default SpaceLine;
