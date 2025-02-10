import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Intro = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Trang intro</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Intro;
