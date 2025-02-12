import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { colors, fontSize } from "../../utils/constants";
import { TouchableOpacity } from "react-native";
import { ToastCustom, convertToVND } from "../../utils";
import { useGlobalContext } from "../../store/contexts/GlobalContext";
import useOrderContext from "../../store/contexts/OrderContext";
import axiosClient from "../../api/axiosClient";
import billApi from "../../api/billApi";
import { Linking } from "react-native";
import { useState } from "react";
import { useEffect } from "react";

const PaymentSubmit = ({ style, navigation }) => {
  const { account } = useGlobalContext();
  const { amountMoney, orderFunc } = useOrderContext();
  const [tranId, setTranId] = useState(null);

  async function onSubmit() {
    let resultPayment = false;
    if (amountMoney.total == 0) {
      resultPayment = true;
    }

    if (!resultPayment) {
      let res = await billApi.requestPayment(amountMoney.total);

      if (!res) {
        return;
      }
      setTranId(res.appTransId);
      Linking.openURL(res.zalo.order_url).catch((err) =>
        console.error("Couldn't load page", err)
      );
    }

    if (resultPayment) {
      paymentOke();
    }
  }

  useEffect(() => {
    if (tranId) {
      checkStatusPayment();
    }
    return () => {};
  }, [tranId]);

  useEffect(() => {
    let id = setInterval(() => {
      if (tranId) {
        checkStatusPayment();
      }
    }, 3000);
    return () => {
      clearInterval(id);
    };
  }, [tranId]);

  async function checkStatusPayment() {
    try {
      let res = await billApi.getStatusPayment(tranId);
      if (res?.return_code == 1) {
        ToastCustom.infor("Thanh toán thành công");

        paymentOke();
        setTranId(null);
      }
    } catch (err) {}
  }

  async function paymentOke() {
    let result = await orderFunc.paymentOke();
    if (result) {
      navigation.navigate("History");
    }
  }

  return (
    <Shadow distance={24} style={styles.shadow} startColor="#00000021">
      <TouchableOpacity style={styles.wrap} onPress={onSubmit}>
        <View style={styles.container}>
          <Text style={styles.text}>
            Tiến hành thanh toán {convertToVND(amountMoney.total)}
          </Text>
        </View>
      </TouchableOpacity>
    </Shadow>
  );
};

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  container: {
    backgroundColor: colors.green2,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  shadow: {
    width: "100%",
  },
  text: {
    fontSize: fontSize.XXL,
    color: colors.white,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default PaymentSubmit;
