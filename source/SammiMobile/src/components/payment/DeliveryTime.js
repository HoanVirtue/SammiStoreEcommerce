import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Select, SelectItem, IndexPath } from "@ui-kitten/components";
import { colors, fontSize } from "../../utils/constants";

const DeliveryTime = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chọn thời gian nhận hàng</Text>
      <View style={styles.selectGroup}>
        <Select
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
          style={[styles.select, { paddingRight: 24 }]}
        >
          <SelectItem title="Option 1" />
          <SelectItem title="Option 2" />
          <SelectItem title="Option 3" />
        </Select>
        <Select
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
          style={styles.select}
        >
          <SelectItem title="Option 1" />
          <SelectItem title="Option 2" />
          <SelectItem title="Option 3" />
        </Select>
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
  selectGroup: {
    flexDirection: "row",
  },
  select: {
    flex: 1,
    paddingBottom: 12,
  },
});

export default DeliveryTime;
