import React from "react";
import { View, StyleSheet } from "react-native";
import { Icon } from "@ui-kitten/components";
import { colors, fontSize } from "../../utils/constants";
import { Text } from "react-native";

const AddressItem = ({ isAcctive }) => {
  return (
    <View style={[styles.container, isAcctive && styles.acctiveItemBorder]}>
      <View style={[styles.body, isAcctive && styles.acctiveItem]}>
        <View style={styles.row}>
          <Icon name="pin-outline" fill={colors.gray1} style={styles.icon} />
          <Text style={styles.valueText}>
            29/3/2 đường số 10 khu phố 2 hiệp bình chánh thủ đức
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone-outline" fill={colors.gray1} style={styles.icon} />
          <Text style={styles.valueText}>0232e534343</Text>
        </View>
        <View style={styles.row}>
          <Icon name="person-outline" fill={colors.gray1} style={styles.icon} />
          <Text style={styles.valueText}>Hoang van cong</Text>
        </View>
      </View>

      <View style={styles.btns}>
        {!isAcctive && (
          <Text style={styles.usingBtn}>Đặt làm địa chỉ mặc định</Text>
        )}
        <View style={styles.using}></View>
        <Text style={styles.btn}>Sửa</Text>
        <Text style={styles.btn}>Xóa</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 12,
    backgroundColor: colors.white,
    marginBottom: 0,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.grayLighter,
  },
  acctiveItemBorder: {
    borderColor: colors.green,
    borderWidth: 2,
  },
  body: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: colors.gray,
    paddingBottom: 12,
    opacity: 0.6,
  },
  acctiveItem: {
    backgroundColor: colors.white,
    opacity: 1,
  },
  row: {
    flexDirection: "row",
    paddingTop: 12,
    paddingHorizontal: 12,
  },
  icon: {
    height: 24,
    width: 24,
  },
  valueText: {
    paddingHorizontal: 12,
    fontSize: fontSize.L,
  },
  btns: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  using: {
    flex: 1,
  },
  usingBtn: {
    padding: 12,
    color: colors.green2,
  },
  btn: {
    color: colors.green2,
    padding: 12,
  },
});

export default AddressItem;
