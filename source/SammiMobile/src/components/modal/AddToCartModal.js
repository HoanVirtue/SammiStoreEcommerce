import React, { useState } from "react";
import { View, StyleSheet, Image, Text, Modal, Pressable } from "react-native";
import { colors, fontSize } from "../../utils/constants";
import ProductQuantityChange from "../common/ProductQuantityChange";
import { Icon } from "@ui-kitten/components";
import { Shadow } from "react-native-shadow-2";

const AddToCartModal = ({ visible, setVisible }) => {
  return (
    <Modal
      visible={visible}
      style={styles.modal}
      transparent
      animationType="fade"
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.top}>
            <View style={styles.imageContainer}>
              <Image
                source={require("../../../assets/product_tao.jpg")}
                style={styles.image}
              />
            </View>
            <View style={styles.information}>
              <Text style={styles.name}>Cá nục làm sạch 500g (5-7 con)</Text>
              <View style={styles.newPirceWrap}>
                <Text style={styles.newPrice}>200.000đ</Text>
                <Text style={styles.unitType}>/ con</Text>
              </View>

              <View style={styles.oldPriceWrap}>
                <Text style={styles.oldPrice}>300.000đ</Text>
                <Text style={styles.discountPercent}>- 32%</Text>
              </View>
            </View>
          </View>
          <View style={styles.bottom}>
            <Text style={styles.quantityLabel}>Số lượng</Text>
            <ProductQuantityChange />
            <View style={styles.btnContainer}>
              <Text style={styles.btnLabel}>MUA</Text>
            </View>
          </View>
          <Pressable
            style={styles.closeIconContainer}
            onPress={() => {
              setVisible(false);
            }}
          >
            <Icon
              name="close-outline"
              fill={colors.gray}
              style={styles.closeIcon}
            />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {},
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    borderWidth: 1,
    borderColor: colors.grayLighter,
    backgroundColor: "white",
    marginHorizontal: 12,
    flex: 1,
    borderRadius: 8,
    padding: 12,
    position: "relative",
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: colors.gray,
  },
  image: {
    width: 48,
    height: 48,
  },
  information: {
    paddingLeft: 12,
    paddingRight: 36,
    flex: 1,
  },
  name: {
    fontSize: fontSize.XL,
    textAlign: "justify",
  },
  newPirceWrap: {
    paddingTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  newPrice: {
    fontWeight: "bold",
    paddingRight: 8,
    fontSize: fontSize.XXL,
  },
  oldPriceWrap: {
    flexDirection: "row",
  },
  oldPrice: {
    fontSize: fontSize.M,
    color: colors.gray,
    paddingRight: 8,
    textDecorationLine: "line-through",
  },
  discountPercent: {
    fontSize: fontSize.S,
    backgroundColor: colors.red,
    borderRadius: 4,
    color: colors.white,
    paddingHorizontal: 4,
    height: 18,
    lineHeight: 18,
    fontWeight: "bold",
  },
  bottom: {
    paddingTop: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  quantityLabel: {
    marginRight: 12,
  },
  btnContainer: {
    marginLeft: 12,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.green1,
    paddingVertical: 8,
    borderRadius: 4,
  },
  btnLabel: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: fontSize.XL,
  },
  closeIconContainer: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    width: 32,
    height: 32,
  },
});

export default AddToCartModal;
