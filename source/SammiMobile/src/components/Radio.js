import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { colors } from "../utils/constants";

const Radio = ({ label, setSelected, style }) => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <View style={style}>
      <Pressable
        style={styles.container}
        onPress={() => setIsSelected(!isSelected)}
      >
        <View style={styles.circle}>
          {isSelected && <View style={styles.innerCircle}></View>}
        </View>
        <Text style={styles.label}>{label}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 12,
    backgroundColor: colors.white,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 50,
    borderColor: colors.green1,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: 12,
    height: 12,
    backgroundColor: colors.green1,
    borderRadius: 50,
  },
  label: {
    paddingLeft: 8,
  },
});

export default Radio;
