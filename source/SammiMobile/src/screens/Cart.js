import React, { useState, useContext } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CartItem from "../components/cart/CartItem";
import Header from "../components/header/Header";
import RedirectRouter from "../components/RedirectRouter";
import { colors, fontSize, headerHeight } from "../utils/constants";
import { Icon } from "@ui-kitten/components";
import SubmitOrder from "../components/cart/SubmitOrder";
import { Shadow } from "react-native-shadow-2";
import Voucher from "../components/common/Voucher";
import SpaceLine from "../components/common/SpaceLine";
import AddToCartModal from "../components/modal/AddToCartModal";
import VoucherModal from "../components/modal/VoucherModal";
import { FlatList } from "react-native";
import { OrderContext } from "../store/contexts/OrderContext";
import { convertToVND } from "../utils";
import { Touchable } from "react-native";
import { TouchableOpacity } from "react-native";
import store from "../store";

const Cart = ({ navigation }) => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isVisibleVoucherModal, setIsVisibleVoucherModal] = useState(false);
  const { listOrders = [], amountMoney, orderFunc } = useContext(OrderContext);

  return (
    <SafeAreaView style={styles.wrap}>
      <Header navigation={navigation} />
      <View style={styles.wrap2}>
        <ScrollView style={styles.scroll}>
          <View style={styles.container}>
            <RedirectRouter
              title={"Giỏ hàng của bạn"}
              isTitleCenter={true}
              navigation={navigation}
            />
            <View style={styles.body}>
              {(listOrders || []).length == 0 ? (
                <Text style={styles.emptyText}>Chưa có sản phẩm nào</Text>
              ) : (
                <View style={styles.list}>
                  {listOrders.map((item, index) => (
                    <CartItem item={item} key={index} />
                  ))}
                </View>
              )}
              <View style={styles.btnList}>
                {listOrders && listOrders.length > 0 && (
                  <TouchableOpacity
                    onPress={orderFunc.clearCart}
                    style={styles.btnWithCartItem}
                  >
                    <Icon
                      name="trash-2-outline"
                      fill={colors.gray2}
                      style={styles.trashIcon}
                    />
                    <Text style={styles.btnWithCartItemText}>
                      Xóa hết giỏ hàng
                    </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("HomeStack");
                  }}
                  style={styles.btnWithCartItem}
                >
                  <Icon
                    name="diagonal-arrow-right-up-outline"
                    fill={colors.gray2}
                    style={styles.trashIcon}
                  />
                  <Text style={styles.btnWithCartItemText}>
                    Tiếp tục mua sắm
                  </Text>
                </TouchableOpacity>
              </View>
              {(listOrders || []).length > 0 && (
                <>
                  <SpaceLine />
                  <Voucher
                    setIsVisibleVoucherModal={setIsVisibleVoucherModal}
                  />
                  <View style={styles.totalPrice}>
                    <Text style={styles.totalPriceLabel}>Tạm tính: </Text>
                    <Text style={styles.totalPriceValue}>
                      {convertToVND(amountMoney.subTotal)}
                    </Text>
                  </View>
                  <View style={styles.totalPrice}>
                    <Text style={styles.totalPriceLabel}>
                      Giảm giá theo giá trị đơn hàng:{" "}
                    </Text>
                    <Text style={styles.totalPriceValue}>
                      -{convertToVND(amountMoney.discountOnBill)}
                    </Text>
                  </View>
                  <View style={styles.totalPrice}>
                    <Text style={styles.totalPriceLabel}>Phiếu giảm giá: </Text>
                    <Text style={styles.totalPriceValue}>
                      -{convertToVND(amountMoney.discountByVoucher)}
                    </Text>
                  </View>
                  <View style={styles.totalPrice}>
                    <Text
                      style={[
                        styles.totalPriceLabel,
                        styles.totalPriceLabelLast,
                      ]}
                    >
                      Tổng cần thanh toán:{" "}
                    </Text>
                    <Text
                      style={[
                        styles.totalPriceValue,
                        styles.totalPriceValueLast,
                      ]}
                    >
                      {convertToVND(amountMoney.total)}
                    </Text>
                  </View>
                </>
              )}
            </View>
          </View>
        </ScrollView>
        {listOrders && listOrders.length > 0 && (
          <View style={styles.submitOrderContainer}>
            <SubmitOrder
              navigation={navigation}
              sum={amountMoney.total}
              quantity={listOrders.length}
            />
          </View>
        )}
        {/* <AddToCartModal
          visible={isVisibleModal}
          setVisible={setIsVisibleModal}
        /> */}
        <VoucherModal
          visible={isVisibleVoucherModal}
          setVisible={setIsVisibleVoucherModal}
        />
      </View>
    </SafeAreaView>
  );
};

const submitOrderHeight = 98;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  wrap2: {
    backgroundColor: colors.white,
    flex: 1,
  },
  scroll: {
    marginBottom: submitOrderHeight,
  },
  container: {
    paddingTop: headerHeight,
    position: "relative",
  },
  body: {
    paddingHorizontal: 12,
  },
  title: {
    fontSize: fontSize.XL,
    textTransform: "uppercase",
    paddingTop: 12,
    fontWeight: "bold",
    color: colors.gray2,
    paddingLeft: 12,
  },
  emptyText: {
    textAlign: "center",
    paddingVertical: 12,
  },
  list: {},
  btnList: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
  },
  btnWithCartItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.grayLighter,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  trashIcon: {
    width: 24,
    height: 24,
  },
  btnWithCartItemText: {
    color: colors.gray2,
    paddingLeft: 4,
  },
  totalPrice: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderTopColor: colors.grayLighter,
    borderTopWidth: 1,
  },
  totalPriceLabel: {
    fontSize: fontSize.XL,
    flex: 1,
  },
  totalPriceValue: {
    fontSize: fontSize.XL,
  },
  totalPriceLabelLast: {
    fontWeight: "bold",
    fontSize: 18,
  },
  totalPriceValueLast: {
    fontWeight: "bold",
    fontSize: 18,
    color: colors.green2,
  },
  submitOrderContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: colors.white,
    backgroundColor: "skyblue",
    // height: submitOrderHeight,
  },
});

export default Cart;
