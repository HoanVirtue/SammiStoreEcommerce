import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  ScrollView,
  SafeAreaView,
  Pressable,
} from "react-native";
import { colors, fontSize, windowWidth } from "../../utils/constants";

const fakeData = [1, 2, 3, 4, 5, 6, 7];

const SpecialOffer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ưu đãi đặc biệt</Text>
      <View style={styles.list}>
        {fakeData.map((value, index) => {
          return (
            <Pressable style={styles.item} key={index}>
              <View style={styles.imageContainer}>
                <Image
                  source={require("../../../assets/product_tao.jpg")}
                  style={styles.image}
                />
              </View>
              <View style={styles.nameContainer}>
                <Text style={styles.name}>Banh keo snack giảm đến 30%</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    flex: 1,
  },
  title: {
    fontSize: fontSize.L,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: colors.gray2,
    paddingVertical: 12,
    paddingLeft: 8,
  },
  list: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  flatlist: {},
  item: {
    borderWidth: 1,
    borderColor: colors.grayLighter,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    width: windowWidth / 2 - 24,
    marginHorizontal: 6,
    padding: 8,
    marginBottom: 12,
  },
  imageContainer: {},
  image: {
    width: 100,
    height: 100,
  },
  nameContainer: {
    paddingTop: 8,
  },
  name: {
    fontSize: fontSize.XL,
    color: colors.gray2,
  },
});

export default SpecialOffer;
