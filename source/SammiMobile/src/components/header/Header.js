import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  StatusBar,
} from "react-native";
import { Icon } from "@ui-kitten/components";
import {
  backgroundColors,
  btnColors,
  colors,
  fontSize,
  headerHeight,
  headerInputHeight,
  headerSearchHeight,
} from "../../utils/constants";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import LocationModal from "../modal/LocationModal";
import { useGlobalContext } from "../../store/contexts/GlobalContext";
import QRCode from "../qrCode/QRCode";
import { TouchableOpacity } from "react-native";
import { useEffect } from "react";

function getText(name) {
  let date = new Date();
  let text = "";
  let hh = date.getHours();

  if (hh < 9) {
    text = "Chào buổi sáng " + name;
    return text;
  }

  if (hh < 13) {
    text = "Chúc " + name + " một ngày mua sắm vui vẻ!";
  }
  return text;
}

const Header = ({ navigation }) => {
  const [isShowLocationModal, setIsShowLocationModal] = useState(false);
  const { account, globalFunc } = useGlobalContext();

  return (
    <SafeAreaView style={styles.wrap}>
      <StatusBar
        animated={true}
        backgroundColor={colors.green2}
        // barStyle={statusBarStyle}
        // showHideTransition={statusBarTransition}
        // hidden={hidden}
      />
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.helloUserContainer}>
            {/* <Text style={styles.helloUserLabel}>{text}</Text> */}
            <Text style={styles.helloUserName}>
              {/* {account && account.lastName} */}
            </Text>
          </View>
          {/* <Pressable
            style={styles.location}
            onPress={() => {
              setIsShowLocationModal(true);
            }}
          >
            <View style={styles.locationIconContainer}>
              <Icon
                name="pin-outline"
                fill="#eb9f13"
                style={styles.locationIcon}
              />
            </View>
            <Text style={styles.locationValue}>TP.HCM</Text>
          </Pressable> */}
        </View>
        <Pressable
          onPress={() => navigation.navigate("Search")}
          style={styles.bottom}
        >
          {/* <Pressable
            onPress={() => {
              navigation.openDrawer();
            }}
            style={styles.menuBar}
          >
            <Icon
              fill={colors.green2}
              name="menu-outline"
              style={styles.menuBarIcon}
            />
            <Text style={styles.menuText}>MENU</Text>
          </Pressable> */}
          <View style={styles.searchContainer}>
            <Icon
              fill={colors.gray1}
              name="search-outline"
              style={styles.searchIcon}
            />
            <Text style={styles.searchPlace}>tìm kiếm</Text>
            {/* <View style={styles.micIconContainer}>
              <Icon
                fill={colors.green2}
                name="mic-outline"
                style={styles.micIcon}
              />
            </View>
            <View style={styles.cartIconContainer}>
              <Icon
                fill={colors.green2}
                name="shopping-cart-outline"
                style={styles.cartIcon}
              />
            </View> */}
          </View>
          <TouchableOpacity
            style={styles.qrContainer}
            onPress={() => {
              navigation.navigate("BarcodeScreen");
            }}
          >
            <Image
              source={require("../../../assets/qrIcon.jpg")}
              style={styles.qrImage}
            />
          </TouchableOpacity>
        </Pressable>
      </View>
      <LocationModal
        visible={isShowLocationModal}
        setVisible={setIsShowLocationModal}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrap: { position: "absolute", top: 0, left: 0, right: 0, zIndex: 100 },
  container: {
    paddingHorizontal: 12,
    backgroundColor: colors.green2,
    paddingTop: 8,
    justifyContent: "center",
    height: headerHeight,
  },
  top: {
    flexDirection: "row",
    // backgroundColor: "red",
    flex: 1,
  },
  helloUserContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  helloUserLabel: {
    color: colors.white,
  },
  helloUserName: {
    color: colors.white,
    fontWeight: "bold",
  },
  location: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#aaa",
  },
  locationIconContainer: {},
  locationIcon: {
    width: 24,
    height: 24,
  },

  locationValue: {
    fontWeight: "bold",
    color: "#eb9f13",
    paddingLeft: 8,
    fontSize: fontSize.L,
  },

  cartIconContainer: {
    paddingHorizontal: 12,
    borderRadius: 50,
    backgroundColor: backgroundColors.gray,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  cartIcon: {
    width: 28,
    height: 28,
  },

  bottom: {
    flexDirection: "row",
    height: headerSearchHeight,
    borderRadius: 4,
    borderColor: "#bbb",
    justifyContent: "center",
    alignItems: "center",
  },
  menuBar: {
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: backgroundColors.gray,
    height: headerInputHeight,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  menuBarIcon: {
    width: 28,
    height: 28,
  },
  menuText: {
    fontSize: fontSize.S,
    fontWeight: "bold",
    color: colors.green2,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    height: headerInputHeight,
    backgroundColor: colors.white,
    borderRadius: 4,
  },
  searchIcon: {
    width: 32,
    height: 24,
  },
  searchPlace: {
    flex: 1,
    color: colors.gray,
  },
  micIconContainer: {
    paddingHorizontal: 12,
    borderRadius: 50,
    backgroundColor: backgroundColors.gray,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  micIcon: {
    width: 28,
    height: 28,
  },
  qrContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
  qrImage: {
    width: 32,
    height: 32,
  },
  qrBtnStart: {},
});

export default Header;
