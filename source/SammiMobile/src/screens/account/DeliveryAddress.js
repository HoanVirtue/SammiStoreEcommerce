import React from "react";
import { Text } from "react-native";
import { ScrollView } from "react-native";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddressItem from "../../components/account/AddressItem";
import Header from "../../components/header/Header";
import RedirectRouter from "../../components/RedirectRouter";
import { backgroundColors, colors, headerHeight } from "../../utils/constants";

const DeliveryAddress = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header />
      <SafeAreaView>
        <ScrollView>
          <View style={styles.wrap}>
            <RedirectRouter
              title="Địa chỉ nhận hàng"
              isTitleCenter={true}
              navigation={navigation}
            />
            <View style={styles.content}>
              <View style={styles.list}>
                <AddressItem isAcctive={true} />
                <AddressItem />
              </View>
              <View style={styles.btnContainer}>
                <Text style={styles.btnLabel}>Thêm địa chỉ mới</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  wrap: {
    marginTop: headerHeight,
  },
  content: {
    backgroundColor: backgroundColors.gray,
  },
  list: {},
  btnContainer: {
    padding: 16,
    borderColor: colors.green1,
    borderStyle: "dotted",
    borderWidth: 2,
    backgroundColor: colors.white,
    margin: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  btnLabel: {
    color: colors.green2,
  },
});

export default DeliveryAddress;
