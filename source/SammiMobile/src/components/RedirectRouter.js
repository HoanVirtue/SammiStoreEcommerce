import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { Icon } from "@ui-kitten/components";
import { colors, fontSize } from "../utils/constants";

const RedirectRouter = ({ title, navigation, isTitleCenter }) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={
          navigation
            ? () => navigation.goBack()
            : () => {
                console.warn("Vui long truyen navigation");
              }
        }
      >
        <Icon
          fill={colors.black}
          name="arrow-ios-back-outline"
          style={styles.iconBack}
        />
      </Pressable>

      <View style={isTitleCenter ? styles.centerTitle : styles.leftTitle}>
        <Text
          style={isTitleCenter ? styles.centerTitleText : styles.leftTitleText}
        >
          {title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 4,
    backgroundColor: colors.white,
  },
  iconBack: {
    width: 32,
    height: 32,
    marginLeft: 4,
  },
  centerTitle: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  leftTitle: {
    justifyContent: "center",
    alignItems: "center",
  },
  centerTitleText: {
    fontSize: fontSize.XXL,
    fontWeight: "bold",
  },
  leftTitleText: {
    fontSize: fontSize.L,
    fontWeight: "bold",
  },
});

export default RedirectRouter;
