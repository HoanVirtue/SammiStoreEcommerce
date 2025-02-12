import React, { useState } from "react";
import { Text } from "react-native";
import { View, StyleSheet, Modal } from "react-native";
import { backgroundColors, colors, fontSize } from "../../utils/constants";
import Select from "../common/Select";

const LocationModal = ({ visible, setVisible }) => {
  return (
    <Modal visible={false}>
      <View style={styles.layer}>
        <View style={styles.container}>
          <Text style={styles.noteText}>
            Quý khách vui lòng chọn địa chỉ giao hàng để biết chính xác giá và
            khuyến mãi
          </Text>
          <View style={styles.heading}>
            <Text style={styles.headLabel}>Địa chỉ nhận hàng</Text>
          </View>
          <View style={styles.form}>
            <Select />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  layer: {},
  container: {},
  noteText: {
    backgroundColor: backgroundColors.gray,
    padding: 8,
    fontSize: fontSize.S,
    fontWeight: "bold",
    textAlign: "justify",
  },
  heading: {},
  headLabel: {
    fontSize: fontSize.XL,
    fontWeight: "bold",
    textTransform: "uppercase",
    paddingVertical: 12,
    backgroundColor: colors.green2,
    color: colors.white,
    paddingLeft: 12,
  },
  form: {
    paddingHorizontal: 12,
  },
  select: {
    marginTop: 12,
  },
});

export default LocationModal;
