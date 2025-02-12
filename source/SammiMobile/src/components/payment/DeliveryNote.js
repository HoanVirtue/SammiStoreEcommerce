import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { CheckBox, Input } from "@ui-kitten/components";

const DeliveryNote = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <View style={styles.container}>
      {/* <View style={styles.checkboxContainer}>
        <CheckBox
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          style={styles.checkbox}
        ></CheckBox>
        <Text style={styles.checkboxLabel}>Xuất hóa đơn công ty</Text>
      </View> */}
      <View style={styles.noteContainer}>
        <Input
          multiline={true}
          textStyle={{ minHeight: 64 }}
          placeholder="Ghi chú cho đơn hàng..."
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  checkboxContainer: {
    flexDirection: "row",
    paddingBottom: 12,
  },
  checkboxLabel: {
    paddingLeft: 8,
  },
  noteContainer: {},
});

export default DeliveryNote;
