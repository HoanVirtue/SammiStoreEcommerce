import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  Platform,
} from "react-native";
import Header from "../components/header/Header";
import RedirectRouter from "../components/RedirectRouter";
import { colors, fontSize, headerHeight } from "../utils/constants";
import {
  Input,
  IndexPath,
  Layout,
  Select,
  SelectItem,
} from "@ui-kitten/components";
import Radio from "../components/Radio";
import PaymentSubmit from "../components/payment/PaymentSubmit";
import DeliveryTime from "../components/payment/DeliveryTime";
import PaymentWays from "../components/payment/PaymentWays";
import SpaceLine from "../components/common/SpaceLine";
import Voucher from "../components/common/Voucher";
import PaymentBill from "../components/payment/PaymentBill";
import DeliveryNote from "../components/payment/DeliveryNote";
import { SafeAreaView } from "react-native-safe-area-context";
import VoucherModal from "../components/modal/VoucherModal";
import addressApi from "./../api/addressApi";
import { useEffect } from "react";
import { useGlobalContext } from "../store/contexts/GlobalContext";
import { ToastCustom } from "../utils";
import SelectDropdown from "react-native-select-dropdown";
import useOrderContext from "../store/contexts/OrderContext";

const Payment = ({ navigation }) => {
  const [isVisibleVoucherModal, setIsVisibleVoucherModal] = useState(false);

  const { account, isLogin } = useGlobalContext();
  const { listOrders = [] } = useOrderContext();

  let address = "";

  if (account.HomeAddress) {
    address =
      account.HomeAddress.homeAddress +
      ", " +
      account.HomeAddress.Ward.name +
      ", " +
      account.HomeAddress.Ward.District.name +
      ", " +
      account.HomeAddress.Ward.District.City.name;
  }

  useEffect(() => {
    if (listOrders && listOrders.length == 0) {
      navigation.navigate("Cart");
    }
    return () => {};
  }, [listOrders]);

  return (
    <>
      <SafeAreaView style={styles.wrap}>
        <Header navigation={navigation} />
        <ScrollView>
          <View style={styles.container}>
            <RedirectRouter
              title={"Xem lại giỏ hàng"}
              navigation={navigation}
            />
            <View style={styles.body}>
              <Text style={styles.title}>Thông tin người đặt</Text>

              <View style={styles.form}>
                <Input
                  disabled
                  style={styles.input}
                  placeholder="Số điện thoại"
                  value={account.phonenumber}
                />

                <Input
                  disabled
                  style={styles.input}
                  placeholder="Họ và tên đệm"
                  value={account.firstName}
                />
                <Input
                  style={styles.input}
                  placeholder="Tên"
                  disabled
                  value={account.lastName}
                />

                <Input
                  style={styles.input}
                  placeholder="Số nhà, tên đường"
                  value={address}
                  disabled
                />
              </View>
            </View>

            <SpaceLine />
            <PaymentWays />

            <SpaceLine />
            <PaymentBill />
            {/* <SpaceLine /> */}
            {/* <DeliveryNote /> */}
          </View>
        </ScrollView>
        <VoucherModal
          visible={isVisibleVoucherModal}
          setVisible={setIsVisibleVoucherModal}
        />
      </SafeAreaView>
      <View
        style={[Platform.OS != "ios" ? styles.submitAndroid : styles.submit]}
      >
        <PaymentSubmit navigation={navigation} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.white,
  },
  container: {
    paddingTop: headerHeight,
    paddingBottom: 72,
  },

  body: {
    paddingHorizontal: 12,
  },
  form: {
    paddingVertical: 12,
  },
  title: {
    fontSize: fontSize.XL,
    textTransform: "uppercase",
    paddingTop: 12,
    fontWeight: "bold",
    color: colors.gray2,
  },

  input: {
    marginBottom: 12,
  },
  gender: {
    flexDirection: "row",
  },
  radioItem: {
    paddingRight: 24,
  },
  inputGroup: {
    flexDirection: "row",
    flex: 1,
  },
  select: {
    flex: 1,
    marginBottom: 12,
  },
  submit: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  submitAndroid: {
    position: "absolute",
    left: 0,
    right: 0,

    bottom: 0,
  },
});

export default Payment;
