import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, Button } from "@ui-kitten/components";
import useOrderContext from "../../store/contexts/OrderContext";
import { convertToVND } from "../../utils";

const Banner = ({ navigation }) => {
  const { MPlist = [] } = useOrderContext();

  const [indexShow, setIndexShow] = useState(0);

  return (
    <View style={styles.container}>
      {MPlist.length > 0 ? (
        <View style={styles.row}>
          <View style={styles.left}>
            {MPlist[0].type == "discountRate" ? (
              <Text category="h2" style={styles.title}>
                -{MPlist[0].discountRate}%
              </Text>
            ) : (
              <Text category="h4" style={styles.title}>
                GIẢM GIÁ {convertToVND(MPlist[0].discountMoney)}
              </Text>
            )}
            <Text category="s2" style={styles.subtitle}>
              {MPlist[0].title}
            </Text>
            <Text category="s2" style={styles.subtitle2}>
              {MPlist[0].description}
            </Text>
            {/* <Button size="small" onPress={() => {}}>
              Chi tiết
            </Button> */}
          </View>
          <View style={styles.right}>
            <Image
              source={require("../../../assets/home_banner.jpg")}
              style={styles.bannerImage}
            />
          </View>
        </View>
      ) : (
        <View style={styles.row}>
          <View style={styles.left}>
            <Text category="h4" style={styles.title}>
              ECO-MARK
            </Text>

            <Text category="s2" style={styles.subtitle2}>
              Giá cả phải chăng, cùng nhiều ưu đãi
            </Text>
            <Button
              size="small"
              onPress={() => {
                navigation.navigate("Profile");
              }}
            >
              Chi tiết
            </Button>
          </View>
          <View style={styles.right}>
            <Image
              source={require("../../../assets/home_banner.jpg")}
              style={styles.bannerImage}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#82b478",
    borderRadius: 12,
    alignItems: "center",
  },
  title: {
    color: "green",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    color: "green",
    marginBottom: 2,
    fontSize: 14,
    textTransform: "uppercase",
    textAlign: "justify",
  },
  subtitle2: {
    color: "white",
    marginBottom: 12,
  },
  left: {
    flex: 1,
    paddingRight: 12,
  },
  right: {
    flex: 1,
  },
  bannerImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
    borderRadius: 6,
  },
});

export default Banner;
