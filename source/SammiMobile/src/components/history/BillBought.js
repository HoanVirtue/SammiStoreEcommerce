import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import { Text } from "react-native";
import { View, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import userApi from "../../api/userApi";
import { Image } from "react-native";
import { useGlobalContext } from "../../store/contexts/GlobalContext";
import { convertToVND, sqlToHHmmDDmmYYYY } from "../../utils";
import billApi from "../../api/billApi";
import useOrderContext from "../../store/contexts/OrderContext";

const BillBought = () => {
  const { account } = useGlobalContext();
  const { orderFunc } = useOrderContext();

  let bills = account.Bills || [];
  const OneItem = ({ item }) => {
    const bill = item;
    let status = "";
    if (bill.type == "pending") {
      status = "Đang chờ giao hàng";
    }

    if (bill.type == "cancel" || bill.type == "retrieve") {
      status = "Đơn hàng bị hủy";
    }
    if (bill.type == "success") {
      status = "Thành công";
    }

    return (
      <View style={styles.item}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={require("../../../assets/cart.png")}
          />
        </View>
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Mã đơn hàng:</Text>
            <Text style={styles.detailValue}>{bill.id}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Ngày đặt hàng:</Text>
            <Text style={styles.detailValue}>
              {sqlToHHmmDDmmYYYY(bill.orderDate)}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Tổng tiền:</Text>
            <Text style={styles.detailValue}>{convertToVND(bill.cost)}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Tình trạng đơn hàng</Text>

            <Text
              style={[
                styles.statusValue,
                bill.type == "pending" && styles.pending,
                bill.type == "success" && styles.success,
                (bill.type == "retrieve" || bill.type == "cancel") &&
                  styles.cancel,
              ]}
            >
              {status}
            </Text>
          </View>

          {/* <View style={styles.btns}>
            {bill.type == "pending" && (
              <Text
                style={styles.btnCancel}
                onPress={() => {
                  cancelOrder(bill.id);
                }}
              >
                Hủy đơn hàng
              </Text>
            )}
            <Text
              style={styles.btnMore}
              onPress={() => {
                detailOrder(bill.id);
              }}
            >
              Chi tiết
            </Text>
          </View> */}
        </View>
      </View>
    );
  };

  async function cancelOrder(billId) {
    orderFunc.cancelOrder(billId);
  }

  function detailOrder(billId) {}

  const itemSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <SafeAreaView>
      <View style={styles.flatList}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={[...bills].reverse()}
          renderItem={OneItem}
          ItemSeparatorComponent={itemSeparator}
          ListEmptyComponent={<Text> bạn chưa có đơn hàng nào </Text>}
          style={styles.flatList}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#CCC",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  avatarContainer: {
    backgroundColor: "red",
    borderRadius: 50,
    overflow: "hidden",
  },
  avatar: {
    height: 55,
    width: 55,
  },

  details: {
    flex: 1,
    paddingLeft: 12,
    marginVertical: 12,
  },
  text: {
    color: "black",
  },
  flatList: {
    marginBottom: 64,
  },

  detailItem: {
    flexDirection: "row",
    paddingBottom: 4,
  },
  detailLabel: {
    width: 140,
  },
  detailValue: {
    fontWeight: "bold",
  },
  statusValue: {
    borderWidth: 1,
    paddingHorizontal: 4,
    backgroundColor: "#ddd",
    fontSize: 11,
    borderRadius: 4,
  },
  pending: {
    color: "blue",
    borderColor: "blue",
  },
  success: {
    color: "green",
    borderColor: "green",
  },

  cancel: {
    color: "red",
    borderColor: "red",
  },
  btns: {
    flexDirection: "row",
    paddingTop: 4,
  },
  btnCancel: {
    marginRight: 12,
    backgroundColor: "red",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    color: "white",
  },
  btnMore: {
    backgroundColor: "green",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    color: "white",
  },
});

export default BillBought;
