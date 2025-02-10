import React from "react";
import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import { colors, fontSize, backgroundColors } from "../../utils/constants";
import { Icon } from "@ui-kitten/components";
import { OrderContext } from "../../store/contexts/OrderContext";
import { useContext, useState, useEffect } from "react";
import { ToastCustom, convertToVND } from "../../utils";
import { useNavigation } from "@react-navigation/native";

const CartItem = ({ item }) => {
  const { orderFunc } = useContext(OrderContext);

  const navigation = useNavigation();

  let total = item.price * item.amount;
  let newPrice = item.price;
  let DRP = item.ProductUnitType.DiscountRateProduct;
  if (DRP) {
    newPrice = (item.price * (100 - DRP.discountRate)) / 100;
    total = newPrice * item.amount;
  }
  let maxQuantity =
    Math.floor(
      item?.ProductUnitType.Product.quantity /
        item?.ProductUnitType.UnitType.convertionQuantity
    ) || 0;

  return (
    <View style={styles.wrap}>
      <View style={styles.container}>
        <Pressable
          style={styles.imageContainer}
          onPress={() => {
            navigation.navigate("Details", item?.ProductUnitType.ProductId);
          }}
        >
          <Image
            style={styles.image}
            source={{ uri: item.ProductUnitType.Product.images[0].uri }}
          />
        </Pressable>
        <View style={styles.body}>
          <Text style={styles.nameProduct}>
            {item.ProductUnitType.Product.name}
          </Text>
          <View style={styles.preserveContainer}>
            {item.isPP && (
              <Text style={styles.preserveText}>{item.PP.title}</Text>
            )}
          </View>
          <View>
            <Text> {item.ProductUnitType.UnitType.name}</Text>
          </View>
        </View>
        <View style={styles.right}>
          {DRP && (
            <View style={styles.drpContainer}>
              <Text style={styles.priceOld}>{convertToVND(item.price)}</Text>
              <Text style={styles.percentDiscount}>-{DRP.discountRate}%</Text>
            </View>
          )}
          <Text style={styles.priceSub}>{convertToVND(newPrice)}</Text>

          <View style={styles.quantityContainer}>
            {!item.isPP && (
              <Pressable
                style={styles.quantityBtn}
                onPress={() => {
                  orderFunc.decreaseQuantity(item.id);
                }}
              >
                <Icon
                  name="minus-outline"
                  fill={colors.gray2}
                  style={styles.quantityIcon}
                />
              </Pressable>
            )}
            <Text style={styles.quantityValue}>{Number(item.amount)}</Text>
            {!item.isPP && (
              <Pressable
                style={styles.quantityBtn}
                onPress={() => {
                  let current = item.amount;

                  if (maxQuantity == current) {
                    ToastCustom.error(
                      "Số lượng sản phẩm bên cửa hàng không đủ, mong quý khách thông cảm!"
                    );
                  } else {
                    orderFunc.increaseQuantity(item.id);
                  }
                }}
              >
                <Icon
                  name="plus-outline"
                  fill={colors.gray2}
                  style={styles.quantityIcon}
                />
              </Pressable>
            )}
          </View>
          <Text style={styles.price}> {convertToVND(total)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 12,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 5,
    backgroundColor: backgroundColors.greenLighter,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "90%",
    height: "90%",
    borderRadius: 10,
  },
  body: {
    flex: 1,
    paddingHorizontal: 12,
  },
  nameProduct: {
    fontWeight: "bold",
    color: colors.gray2,
    paddingBottom: 12,
  },
  preserveContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  coldIcon: {
    width: 24,
    height: 24,
  },
  preserveText: {
    color: colors.gray,
    paddingLeft: 8,
  },
  right: {},
  price: {
    fontSize: fontSize.L,
    fontWeight: "500",
    textAlign: "right",
  },
  priceOld: {
    fontSize: fontSize.S,
    textDecorationLine: "line-through",
    textAlign: "right",
  },
  percentDiscount: {
    color: "red",
    textAlign: "right",
    paddingLeft: 4,
  },
  priceSub: {
    fontSize: fontSize.S,
    textAlign: "right",
  },
  quantityContainer: {
    flexDirection: "row",
    marginVertical: 12,
    borderRadius: 4,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  quantityBtn: {
    backgroundColor: colors.grayLighter,
    paddingHorizontal: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityIcon: {
    width: 24,
    height: 24,
  },
  quantityValue: {
    fontSize: fontSize.XXL,
    fontWeight: "bold",
    textAlign: "center",
    minWidth: 32,
    minHeight: 32,
    lineHeight: 32,
    paddingHorizontal: 4,
  },
  drpContainer: { flexDirection: "row" },
});

export default CartItem;
