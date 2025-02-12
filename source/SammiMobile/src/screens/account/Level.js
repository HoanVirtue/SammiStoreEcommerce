import { Icon } from "@ui-kitten/components/ui";
import React from "react";
import { ScrollView } from "react-native";
import { Text } from "react-native";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/header/Header";
import RedirectRouter from "../../components/RedirectRouter";
import {
  backgroundColors,
  colors,
  fontSize,
  headerHeight,
} from "../../utils/constants";

const Level = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header />
      <SafeAreaView>
        <ScrollView>
          <View style={styles.wrap}>
            <RedirectRouter
              title="Huy hiệu tích lũy "
              navigation={navigation}
              isTitleCenter={true}
            />
            <View style={styles.content}>
              <View style={styles.top}>
                <Text style={styles.title}>Hạng đồng</Text>
                <View style={styles.row}>
                  <Text style={styles.subText}>Tích lũy </Text>
                  <Text style={styles.point}>0 điểm</Text>
                </View>
              </View>
              <View style={styles.body}>
                <Text style={styles.title}>Quyền lợi</Text>
                <View style={[styles.item, styles.active]}>
                  <View style={styles.left}>
                    <View style={[styles.iconContainer, styles.iconActive]}>
                      <Icon
                        name="shield-outline"
                        fill={colors.black}
                        style={styles.icon}
                      />
                    </View>
                  </View>
                  <View style={styles.right}>
                    <View style={styles.row}>
                      <Text style={styles.heading}>Hạng đồng</Text>
                      <Text style={styles.subHeading}>(Hạng hiện tại)</Text>
                      <Text style={styles.pointCal}> 500 điểm</Text>
                    </View>
                    <Text style={styles.description}>
                      Miễn phí giao hàng cho đơn hàng từ 300.000 đ trở lên
                    </Text>
                  </View>
                </View>
                <View style={styles.item}>
                  <View style={styles.left}>
                    <View style={styles.iconContainer}>
                      <Icon
                        name="shield-outline"
                        fill={colors.black}
                        style={styles.icon}
                      />
                    </View>
                  </View>
                  <View style={styles.right}>
                    <View style={styles.row}>
                      <Text style={styles.heading}>Hạng Bạc</Text>
                      {/* <Text style={styles.subHeading}>(Hạng hiện tại)</Text> */}
                      <Text style={styles.pointCal}> 2000 điểm</Text>
                    </View>
                    <Text style={styles.description}>
                      Miễn phí giao hàng cho đơn hàng từ 300.000 đ trở lên
                    </Text>
                  </View>
                </View>
                <View style={[styles.item, { borderLeftColor: "transparent" }]}>
                  <View style={styles.left}>
                    <View style={styles.iconContainer}>
                      <Icon
                        name="shield-outline"
                        fill={colors.black}
                        style={styles.icon}
                      />
                    </View>
                  </View>
                  <View style={styles.right}>
                    <View style={styles.row}>
                      <Text style={styles.heading}>Hạng Vàng</Text>
                      {/* <Text style={styles.subHeading}>(Hạng hiện tại)</Text> */}
                      <Text style={styles.pointCal}> 5000 điểm</Text>
                    </View>
                    <Text style={styles.description}>
                      Miễn phí giao hàng cho đơn hàng từ 300.000 đ trở lên
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.note}>
                <Text style={styles.title}>Lưu ý</Text>
                <Text style={styles.subText}>
                  - Chỉ tính điểm tích lũy cho đơn hàng trên 100.000 đồng,
                  (1.000 đồng = 1 điểm )
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: backgroundColors.gray,
  },
  wrap: {
    marginTop: headerHeight,
  },
  content: {},
  top: {
    padding: 12,
    borderBottomColor: colors.grayLighter,
    borderBottomWidth: 8,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: fontSize.XL,
    fontWeight: "bold",
    paddingBottom: 12,
  },
  row: {
    flexDirection: "row",
  },
  subText: {},
  point: {
    fontWeight: "bold",
    color: colors.green1,
  },
  body: {
    padding: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 8,
    borderBottomColor: colors.grayLighter,
  },
  item: {
    borderLeftWidth: 4,
    marginLeft: 12,
    borderLeftColor: colors.grayLighter,
  },
  active: {
    borderLeftColor: "#f08718",
  },
  left: {
    position: "relative",
  },
  iconContainer: {
    position: "absolute",
    left: -14,
    top: 0,
    backgroundColor: colors.gray,
    borderRadius: 50,
  },
  iconActive: {
    backgroundColor: "#f08718",
  },
  icon: {
    width: 24,
    height: 24,
  },
  right: {
    paddingLeft: 24,
    paddingBottom: 12,
  },
  heading: {
    fontSize: fontSize.XL,
    fontWeight: "bold",
  },
  subHeading: {
    paddingLeft: 4,
    color: colors.gray,
  },
  pointCal: {
    marginLeft: "auto",
    color: colors.green1,
  },
  description: {
    paddingTop: 8,
  },
  note: {
    padding: 12,
    backgroundColor: colors.white,
  },
});

export default Level;
