import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { colors, fontSize } from "../../utils/constants";
import { convertToVND } from "../../utils";
import { OrderContext } from "../../store/contexts/OrderContext";
import { useContext } from "react";

const PaymentBill = () => {
  const { amountMoney } = useContext(OrderContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin hóa đơn</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Tạm tính:</Text>
        <Text style={styles.value}>{convertToVND(amountMoney.subTotal)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Tổng giảm giá:</Text>
        <Text style={styles.value}>
          -
          {convertToVND(
            amountMoney.discountOnBill + amountMoney.discountByVoucher
          )}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={[styles.label, styles.totalLabel]}>Tổng đơn hàng:</Text>
        <Text style={[styles.value, styles.totalValue]}>
          {convertToVND(amountMoney.total)}
        </Text>
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 12,
  },
  label: {},
  value: {},
  voucherLabel: {
    color: colors.green,
    fontSize: fontSize.XL,
  },
  voucherValue: {
    color: colors.green,
  },
  totalLabel: {
    fontSize: fontSize.XL,
    fontWeight: "bold",
  },
  totalValue: {
    fontWeight: "bold",
    fontSize: fontSize.XL,
  },
});

export default PaymentBill;
