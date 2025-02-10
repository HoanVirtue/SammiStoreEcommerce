import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Icon } from "@ui-kitten/components";
import { colors, fontSize } from "../../utils/constants";

const ProductQuantityChange = ({ value, setValue }) => {
  return (
    <View style={styles.quantityContainer}>
      <TouchableOpacity
        onPress={() => {
          setValue(value - 1);
        }}
        style={styles.quantityBtn}
      >
        <Icon
          name="minus-outline"
          fill={colors.gray2}
          style={styles.quantityIcon}
        />
      </TouchableOpacity>
      <View style={styles.valueContainer}>
        <Text style={styles.quantityValue}>{value}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          setValue(value + 1);
        }}
        style={styles.quantityBtn}
      >
        <Icon
          name="plus-outline"
          fill={colors.gray2}
          style={styles.quantityIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  quantityContainer: {
    flexDirection: "row",
    marginVertical: 12,
    borderRadius: 4,
    overflow: "hidden",
    borderWidth: 1,
    alignItems: "center",
    borderColor: "#ddd",
    backgroundColor: colors.grayLighter,
    height: 48,
  },
  quantityBtn: {
    paddingHorizontal: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityIcon: {
    width: 24,
    height: 24,
  },
  valueContainer: {
    height: "100%",
    backgroundColor: "white",
    justifyContent: "center",
  },
  quantityValue: {
    fontSize: fontSize.XXL,
    fontWeight: "bold",
    textAlign: "center",
    minWidth: 32,

    paddingHorizontal: 4,
  },
});

export default ProductQuantityChange;
