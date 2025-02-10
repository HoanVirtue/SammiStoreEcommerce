import React, { useContext, useState } from "react";
import {
  Image,
  Pressable,
  Text,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import { View, StyleSheet } from "react-native";
import { Icon } from "@ui-kitten/components";
import { backgroundColors, colors, fontSize } from "../../utils/constants";
import afucntion, { OrderContext } from "../../store/contexts/OrderContext";
import { ToastCustom, convertToVND } from "../../utils";
import AddToCartModal from "../modal/AddToCartModal";

const Product = ({ navigation, item }) => {
  const { orderFunc } = useContext(OrderContext);

  let newPrice = item.price;

  let maxQuantity = Math.floor(
    item.ProductUnitType.Product.quantity /
      item.ProductUnitType.UnitType.convertionQuantity
  );
  let DRP = item.ProductUnitType.DiscountRateProduct;
  let PP =
    item.ProductUnitType.ProductPromotions &&
    item.ProductUnitType.ProductPromotions[0];

  if (DRP) {
    newPrice = (item.price * (100 - DRP.discountRate)) / 100;
  }

  return (
    <Pressable
      style={styles.item}
      onPress={() =>
        navigation.navigate("Details", item.ProductUnitType.Product.id)
      }
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.ProductUnitType.Product.images[0].uri }}
          style={styles.image}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.information}>
          <Text style={styles.name}>
            {item.ProductUnitType.Product.name +
              "(" +
              item.ProductUnitType.UnitType.name +
              ")"}
          </Text>
          <Text style={styles.newPrice}>{convertToVND(newPrice)}</Text>
          <View style={styles.priceContainer}>
            {DRP && (
              <>
                <Text style={styles.price}>{convertToVND(item.price)}</Text>
                <Text style={styles.percent}>
                  {"-" + DRP.discountRate + "%"}
                </Text>
              </>
            )}
          </View>
          {PP && (
            <View style={styles.ppContainer}>
              <Text style={styles.ppText}>
                <Icon
                  name="gift-outline"
                  fill={"red"}
                  style={styles.giftIcon}
                />
                {PP.title}
              </Text>
            </View>
          )}
        </View>

        {orderFunc.isExistInCart(item.id) ? (
          <TouchableOpacity
            style={[styles.btnContainer]}
            onPress={() => {
              navigation.navigate("Cart");
            }}
            disabled={maxQuantity <= 0}
          >
            <Text style={styles.btnLabel}>Xem giỏ hàng</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.btnContainer,
              maxQuantity <= 0 && styles.btnContainerSoldOut,
            ]}
            onPress={() => {
              orderFunc.addToCart(item);
              ToastCustom.infor("Thêm vào giỏ hàng thành công");
            }}
            disabled={maxQuantity <= 0}
          >
            <Text
              style={[
                styles.btnLabel,
                maxQuantity <= 0 && styles.btnLabelSoldOut,
              ]}
            >
              {maxQuantity <= 0 ? "Đã hết hàng" : "Mua"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "white",
    width: "45%",
    alignItems: "center",
    marginBottom: 12,
    overflow: "hidden",
    position: "relative",
    borderWidth: 1,
    borderColor: colors.grayLighter,
  },
  imageContainer: {
    width: "100%",
  },
  image: {
    width: "100%",
    height: 160,
  },
  content: {
    paddingBottom: 12,
    paddingHorizontal: 12,
    width: "100%",
    flex: 1,
    justifyContent: "space-between",
  },
  information: {
    width: "100%",
    paddingBottom: 12,
  },
  name: {
    fontSize: 14,
    paddingTop: 4,
    paddingBottom: 4,
  },
  newPrice: {
    fontSize: fontSize.L,
    fontWeight: "bold",
  },
  priceContainer: {
    flexDirection: "row",
  },
  price: {
    textDecorationLine: "line-through",
    fontSize: fontSize.S,
    color: colors.gray1,
  },
  percent: {
    marginLeft: 12,
    color: "red",
    fontSize: 16,
  },
  right: {
    justifyContent: "flex-end",
  },
  quantity: {
    paddingTop: 4,
  },
  btnContainer: {
    borderWidth: 1,
    borderColor: colors.green,
    width: "100%",
    paddingVertical: 6,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: backgroundColors.gray,
  },

  btnContainerSoldOut: {
    borderColor: "red",
  },
  btnLabel: {
    color: colors.green2,
    fontSize: fontSize.L,
  },
  btnLabelSoldOut: {
    color: "red",
  },
  heartContainer: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#82b478",
  },
  giftIcon: {
    width: 14,
    height: 14,
  },

  ppContainer: {},
  ppText: {
    fontSize: 12,
    color: "green",
  },
});

export default Product;
