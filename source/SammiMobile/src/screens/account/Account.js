import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  StatusBar,
} from "react-native";
import { Icon } from "@ui-kitten/components";
import Header from "../../components/header/Header";
import {
  backgroundColors,
  colors,
  fontSize,
  headerHeight,
} from "../../utils/constants";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import VerifyOTPModal from "../../components/modal/VerifyOTPModal";
import { useGlobalContext } from "../../store/contexts/GlobalContext";
import { TouchableOpacity } from "react-native-gesture-handler";

const Account = ({ navigation }) => {
  const [phone, setPhone] = useState("0868283915");
  const [isShowVerifyModal, setIsShowVerifyModal] = useState(false);
  const { account, isLogin, globalFunc } = useGlobalContext();
  let name = "";
  if (account.firstName) {
    name += account.firstName + " ";
  }
  if (account.lastName) {
    name += account.lastName;
  }
  return (
    <View style={styles.container}>
      {/* <Header navigation={navigation} /> */}
      <StatusBar
        animated={true}
        backgroundColor={colors.green2}
        // barStyle={statusBarStyle}
        // showHideTransition={statusBarTransition}
        // hidden={hidden}
      />
      <SafeAreaView>
        <ScrollView>
          <View style={styles.content}>
            <View style={styles.infor}>
              <Text style={styles.title}>Thông tin cá nhân</Text>

              <View style={styles.group}>
                <View style={[styles.row, styles.userNameContainer]}>
                  <Text style={styles.nameUser}>{name}</Text>
                  <Text style={styles.phone}>{account.phonenumber}</Text>
                </View>
              </View>
              {/* <View style={styles.group}>
                  <View style={styles.row}>
                    <Text style={styles.nameUser}>Bạn {account.name}</Text>
                    <Text style={styles.phone}>{account.phonenumber}</Text>
                  </View>
                {isLogin && account ? (
                ) : (
                  <View style={styles.enterPhone}>
                    <Text style={styles.enterPhoneDes}>
                      Để xem "Tài khoản" vui lòng xác thực số điện thoại
                    </Text>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="Số điện thoại"
                        value={phone}
                        onChangeText={setPhone}
                      />
                      <Text
                        style={styles.btnSubmit}
                        onPress={() => {
                          console.log("login");
                          setIsShowVerifyModal(true);
                        }}
                      >
                        gửi OTP
                      </Text>
                    </View>
                  </View>
                )}
              </View> */}

              {/* <Pressable
                style={styles.item}
                onPress={() => {
                  navigation.navigate("Level");
                }}
              >
                <Icon
                  name="layers-outline"
                  fill={colors.black}
                  style={styles.icon}
                />
                <View style={styles.levelGroup}>
                  <Text style={styles.levelLabel}>Hạng Đồng</Text>
                  <Text style={styles.levelSub}>
                    Miễn phí giao hàng cho đơn từ 300.000 đồng trở lên
                  </Text>
                </View>
                <Icon
                  name="chevron-right-outline"
                  fill={colors.black}
                  style={styles.rightIcon}
                />
              </Pressable> */}
              {isLogin && account && (
                <>
                  <Pressable
                    style={styles.item}
                    onPress={() => {
                      navigation.navigate("InforUpdate");
                    }}
                  >
                    <Icon
                      name="person-outline"
                      fill={colors.black}
                      style={styles.icon}
                    />
                    <Text style={styles.itemLabel}>Sửa thông tin cá nhân</Text>
                    <Icon
                      name="chevron-right-outline"
                      fill={colors.black}
                      style={styles.rightIcon}
                    />
                  </Pressable>

                  <Pressable
                    style={styles.item}
                    onPress={() => {
                      navigation.navigate("History");
                    }}
                  >
                    <Icon
                      name="shopping-bag-outline"
                      fill={colors.black}
                      style={styles.icon}
                    />
                    <Text style={styles.itemLabel}>Lịch sử mua hàng</Text>
                    <Icon
                      name="chevron-right-outline"
                      fill={colors.black}
                      style={styles.rightIcon}
                    />
                  </Pressable>
                </>
              )}
            </View>
            <TouchableOpacity
              onPress={() => {
                globalFunc.logOut();
              }}
              style={styles.logOut}
            >
              <View style={styles.btnLogOutContainer}>
                <Icon
                  name="log-out-outline"
                  fill={colors.red}
                  style={styles.logOutIcon}
                />
                <Text style={styles.logOutLabel}>Đăng xuất</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
      <VerifyOTPModal
        visible={isShowVerifyModal}
        setVisible={setIsShowVerifyModal}
        phone={phone}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 12,
    height: "100%",
  },
  content: {
    marginTop: 12,
  },
  infor: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.grayLighter,
    borderRadius: 4,
  },
  title: {
    padding: 13,
    fontSize: fontSize.L,
    borderBottomWidth: 1,
    borderColor: colors.grayLighter,
    fontWeight: "bold",
  },
  group: {
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 12,
  },
  userNameContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLighter,
  },
  nameUser: {
    fontSize: fontSize.L,
    fontWeight: "bold",
    flex: 1,
    color: colors.green,
  },
  phone: {
    fontSize: fontSize.L,
    fontWeight: "bold",
    color: colors.green,
  },
  enterPhone: {
    paddingTop: 12,
  },
  enterPhoneDes: {
    fontSize: fontSize.L,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.grayLighter,
    borderRadius: 4,
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
  },
  input: {
    padding: 8,
    flex: 1,
  },
  btnSubmit: {
    backgroundColor: colors.green2,
    height: 48,
    color: colors.white,
    lineHeight: 48,
    paddingHorizontal: 12,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  item: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLighter,
  },
  icon: {
    width: 28,
    height: 28,
  },
  levelGroup: {
    paddingHorizontal: 12,
    flex: 1,
  },
  levelLabel: {
    fontSize: fontSize.L,
    fontWeight: "bold",
  },
  levelSub: {
    fontSize: fontSize.S,
    paddingTop: 4,
    color: colors.gray2,
  },
  rightIcon: {
    width: 28,
    height: 28,
  },
  itemLabel: {
    paddingHorizontal: 12,
    flex: 1,
  },

  logOut: {
    marginTop: 12,
    backgroundColor: colors.grayLighter,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 4,
  },
  btnLogOutContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  logOutIcon: {
    width: 28,
    height: 28,
  },
  logOutLabel: {
    padding: 12,
    color: colors.red,
  },
});

export default Account;
