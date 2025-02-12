import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { colors, fontSize } from "../../utils/constants";
import PaymentItem from "./PaymentItem";

const PaymentWays = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chọn hình thức thanh toán</Text>
      <View style={styles.list}>
        <PaymentItem isSelected={true} />
        {/* <PaymentItem />
        <PaymentItem /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
  title: {
    fontSize: fontSize.XL,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: colors.gray2,
    paddingVertical: 12,
  },
  list: {},
});

export default PaymentWays;
