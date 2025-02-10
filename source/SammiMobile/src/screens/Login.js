import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Image,
  StatusBar,
} from "react-native";
import { Layout, Text, Input, Icon, Button } from "@ui-kitten/components";
import {
  ToastCustom,
  isVietnamesePhoneNumberValid,
  validateEmail,
  validatePassword,
  validateSdt,
} from "../utils";
import { useGlobalContext } from "../store/contexts/GlobalContext";
import { colors, fontSize } from "../utils/constants";
import VerifyOTPModal from "../components/modal/VerifyOTPModal";
import userApi from "../api/userApi";
import { useEffect } from "react";
import store from "../store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [sdtOrEmail, setSdtOrEmail] = useState("");
  const [sdtEmailCaption, setSdtEmailCaption] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [verifyModal, setVerifyModal] = useState(false);
  const [result, setResult] = useState({
    isSuccess: false,
    message: "",
  });
  const { globalFunc } = useGlobalContext();

  async function checkLocalStorage() {
    let phone = await AsyncStorage.getItem("phone");

    if (phone && isVietnamesePhoneNumberValid(phone)) {
      globalFunc.login(phone);
      setResult({
        isSuccess: false,
      });
    }
  }

  async function onLogin() {
    if (isVietnamesePhoneNumberValid(sdtOrEmail)) {
      setVerifyModal(true);
    } else {
      setErrMessage("Số điện thoại không hợp lệ!");
    }
  }

  useEffect(() => {
    if (result.isSuccess) {
      globalFunc.login(sdtOrEmail);
      setResult({
        isSuccess: false,
      });
    } else {
      setErrMessage(result.message);
    }
    return () => {};
  }, [result]);

  useEffect(() => {
    checkLocalStorage();
    return () => {};
  }, []);

  return (
    <Layout style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={colors.green2}
        // barStyle={statusBarStyle}
        // showHideTransition={statusBarTransition}
        // hidden={hidden}
      />
      <View style={styles.body}>
        <View style={styles.enter}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/logo.png")}
              style={{
                width: 200,
                height: 200,
              }}
            />
          </View>
          <Text category="h1">Đăng nhập</Text>
          <Input
            style={styles.input}
            value={sdtOrEmail}
            label="Số điện thoại"
            placeholder="Số điện thoại"
            type="number"
            caption={sdtEmailCaption}
            onChangeText={(sdtOrEmail) => setSdtOrEmail(sdtOrEmail)}
          />
          <Text style={styles.errMessage}>{errMessage}</Text>

          <Button size="medium" style={styles.button} onPress={onLogin}>
            Gửi OTP
          </Button>

          {/* <Text category="s1" style={{ textAlign: "center" }}>
            Đăng nhập bằng cách khác
          </Text> */}
          {/* <View style={styles.otherLogin}>
            <View style={[styles.item, { backgroundColor: "#db6f21" }]}>
              <Icon fill="#fff" name="google" style={styles.icon} />
            </View>
            <View style={[styles.item, { backgroundColor: "#1559bf" }]}>
              <Icon fill="#fff" name="facebook" style={styles.icon} />
            </View>
          </View> */}
        </View>
      </View>
      <VerifyOTPModal
        visible={verifyModal}
        setVisible={setVerifyModal}
        phone={sdtOrEmail}
        setResult={setResult}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  body: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  imageContainer: {},
  enter: {
    width: "80%",
    // marginTop: 36,
    flex: 1,
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  errMessage: {
    paddingBottom: 12,
    fontSize: fontSize.S,
    color: colors.red,
    width: "100%",
  },
  input: {
    paddingBottom: 12,
  },
  icon: {
    width: 36,
    height: 36,
  },
  forgotPass: {
    marginLeft: "auto",
    marginBottom: 12,
  },
  button: {
    marginBottom: 24,
    width: "100%",
  },
  otherLogin: {
    flexDirection: "row",
    justifyContent: "center",
  },
  item: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 16,
    marginHorizontal: 8,
  },
});

export default Login;
