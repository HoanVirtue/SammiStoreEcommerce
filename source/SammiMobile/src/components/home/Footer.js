import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Icon } from "@ui-kitten/components";

const Footer = () => {
  return (
    <View style={styles.container}>
      <Text category="h4" style={styles.title}>
        Liên hệ
      </Text>

      <View style={styles.address}>
        <Text category="label" style={styles.label}>
          Địa chỉ:
        </Text>
        <Text category="s2" style={styles.sub}>
          29/8/7 đại lộ 15, tòa nhà 7, Hiệp Bình Chánh, Thủ Đức
        </Text>
      </View>
      <View style={styles.hotline}>
        <Text category="label" style={styles.label}>
          Hotline:
        </Text>
        <Text category="s2" style={styles.sub}>
          0977 777 777 - mr. butle
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    paddingBottom: 8,
    paddingHorizontal: 8
  },
  title: {
    paddingBottom: 12,
  },
  label: { fontSize: 16 },
  sub: {
    fontSize: 16,
    paddingLeft: 8,
    flex: 1,
  },
  address: {
    flexDirection: "row",
  },
  hotline: {
    flexDirection: "row",
  },
});

export default Footer;
