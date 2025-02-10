import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { Icon } from "@ui-kitten/components";
import { colors, fontSize } from "../../utils/constants";
import { useContext } from "react";
import { OrderContext } from "../../store/contexts/OrderContext";

const Voucher = ({ setIsVisibleVoucherModal }) => {
  const { voucherUsed, orderFunc } = useContext(OrderContext);

  return (
    <Pressable
      style={styles.voucherContainer}
      onPress={() => {
        setIsVisibleVoucherModal(true);
      }}
    >
      <View style={styles.voucherTop}>
        <Icon
          name="credit-card-outline"
          fill={colors.green}
          style={styles.voucherIcon}
        />
        <Text style={styles.voucerTitle}>Phiếu mua hàng</Text>
        <Icon
          name="arrow-ios-forward-outline"
          fill={colors.green}
          style={styles.voucherRightIcon}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  voucherContainer: {
    paddingHorizontal: 12,
  },
  voucherTop: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  voucherIcon: {
    width: 28,
    height: 28,
  },
  voucerTitle: {
    flex: 1,
    fontSize: fontSize.XL,
    color: colors.green,
    paddingLeft: 8,
  },
  voucherRightIcon: {
    width: 24,
    height: 24,
  },
});

export default Voucher;
