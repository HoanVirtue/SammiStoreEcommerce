import React from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  backgroundColors,
  colors,
  fontSize,
  windowWidth,
} from "../../utils/constants";

const LabelHeading = ({ title, type, backgroundColor }) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.content,
          backgroundColor && { backgroundColor: backgroundColor },
        ]}
      >
        <Text
          style={[
            styles.title,
            type == "special" && {
              backgroundColor: colors.green1,
              color: colors.white,
              borderColor: colors.green1,
            },
          ]}
        >
          {title}
        </Text>
        <View style={styles.boxForBorder}></View>
        <View style={styles.boxForLine}></View>
      </View>
    </View>
  );
};

const titleWidth = windowWidth * 0.64;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 24,
  },
  content: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    height: 32,
  },
  title: {
    fontSize: fontSize.XL,
    textTransform: "uppercase",
    fontWeight: "bold",
    letterSpacing: 1,
    backgroundColor: "#e8e3e3",
    width: titleWidth,
    textAlign: "center",
    height: 32,
    lineHeight: 32,
    color: colors.green2,
    zIndex: 1,
    borderWidth: 1,
    borderColor: colors.green2,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    position: "absolute",
    top: -8,
  },
  boxForBorder: {
    borderWidth: 15,
    position: "absolute",
    width: titleWidth + 16,
    borderColor: "transparent",
    borderBottomColor: colors.green2,
    borderRightWidth: 8,
    borderLeftWidth: 8,
    top: -23,
  },
  boxForLine: {
    height: 2,
    width: "100%",
    backgroundColor: colors.green2,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
});

export default LabelHeading;
