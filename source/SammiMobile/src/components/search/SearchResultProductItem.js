import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { backgroundColors, colors, fontSize } from "../../utils/constants";
import { convertToVND } from "../../utils";
import useOrderContext from "../../store/contexts/OrderContext";
import { useEffect } from "react";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Icon } from "@ui-kitten/components";
import { usePriceContext } from "../../store/contexts/PriceContext";

const SearchResultProductItem = ({ data, navigation }) => {
  const { orderFunc, listOrders } = useOrderContext();
  const { allPrices } = usePriceContext();
  const [ppList, setPpList] = useState([]);

  useEffect(() => {
    let _ppList = [];

    allPrices.map((item) => {
      if (item.id == data.id) {
        if (item.ProductUnitType.ProductPromotions?.length > 0) {
          _ppList.push(item.ProductUnitType.ProductPromotions[0]);
        }
      }
    });

    setPpList(_ppList);
    return () => {};
  }, []);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate("Details", data.ProductUnitType.ProductId);
      }}
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: data.ProductUnitType.Product.images[0].uri }}
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.name}>{data.ProductUnitType.Product.name}</Text>
        <Text style={styles.description}>
          {data.ProductUnitType.Product.description}
        </Text>
        {ppList?.length > 0 &&
          ppList.map((item, index) => {
            return (
              <View style={styles.promotionPP} key={index}>
                <Icon
                  name="gift-outline"
                  fill={"green"}
                  style={styles.giftIcon}
                />
                <Text style={styles.ppText}>{item.title}</Text>
              </View>
            );
          })}
      </View>
      <View style={styles.right}>
        <View style={styles.btnContainer}>
          <Text
            style={styles.btnLabel}
            onPress={() => {
              navigation.navigate("Details", data.ProductUnitType.Product.id);
            }}
          >
            Chi tiết
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: colors.grayLighter,
  },
  imageContainer: {},
  image: {
    width: 80,
    height: 80,
  },
  body: {
    flex: 1,
    paddingLeft: 12,
    height: "100%",
  },
  name: {
    fontWeight: "bold",
  },

  row: {
    flexDirection: "row",
  },
  price: {
    fontSize: fontSize.XL,
    fontWeight: "bold",
  },
  btnContainer: {
    paddingVertical: 8,
    paddingHorizontal: 28,
    borderWidth: 1,
    borderColor: colors.green1,
    borderRadius: 4,
    backgroundColor: backgroundColors.gray,
  },
  btnLabel: {
    // fontWeight: "bold",
    fontSize: 12,
    textTransform: "uppercase",
    color: colors.green2,
  },

  // pp
  promotionPP: {
    marginVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  giftIcon: {
    width: 24,
    height: 24,
  },
  ppText: {
    marginLeft: 8,
    flex: 1,
    color: colors.greenLighter,
  },
});

export default SearchResultProductItem;
