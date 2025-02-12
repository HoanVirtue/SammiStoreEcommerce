import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Icon } from "@ui-kitten/components";
import { colors, fontSize } from "../../utils/constants";

const PaymentItem = ({ isSelected, title = "Zalo Pay" }) => {
  return (
    <View style={[styles.container, isSelected && { borderWidth: 1 }]}>
      <View
        style={[
          styles.radioContainer,
          isSelected && { backgroundColor: colors.green1, borderWidth: 1 },
        ]}
      >
        <Icon
          name="checkmark-outline"
          fill={colors.white}
          style={styles.radioIcon}
        />
      </View>
      <View style={styles.paymentLogo}>
        <Icon
          name="credit-card-outline"
          style={styles.paymentIcon}
          fill={colors.gray2}
        />
      </View>
      <View style={styles.right}>
        <Text style={styles.name}>{title}</Text>
        <Text style={styles.subText}>Thoanh toán nhanh trong 1 phút</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: colors.green1,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: colors.grayLighter,
  },
  radioContainer: {
    height: 20,
    width: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.green1,
    justifyContent: "center",
    alignItems: "center",
  },
  radioIcon: {
    width: 14,
    height: 14,
  },
  paymentLogo: {
    paddingHorizontal: 12,
  },
  paymentIcon: {
    width: 32,
    height: 32,
  },
  right: {},
  name: {
    fontSize: fontSize.XL,
  },
  subText: {
    color: colors.gray,
  },
});

export default PaymentItem;
