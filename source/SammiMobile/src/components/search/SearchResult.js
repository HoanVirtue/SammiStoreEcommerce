import React from "react";
import { View, StyleSheet, Image, ScrollView, Text } from "react-native";
import { colors, fontSize, windowWidth } from "../../utils/constants";
import SearchResultCategoryItem from "./SearchResultCategoryItem";
import { Icon } from "@ui-kitten/components";
import SearchResultProductItem from "./SearchResultProductItem";
import { usePriceContext } from "../../store/contexts/PriceContext";

const SearchResult = ({ navigation }) => {
  const { priceListSearch = [] } = usePriceContext();

  return (
    <View style={styles.container}>
      <View style={styles.categoryListContainer}>
        {/* <Text style={styles.title}>Các thể loại</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          style={styles.scroll}
        >
          <View style={styles.categoryList}>
            <SearchResultCategoryItem />
            <SearchResultCategoryItem />
            <SearchResultCategoryItem />
            <SearchResultCategoryItem />
            <SearchResultCategoryItem />
            <SearchResultCategoryItem />
            <SearchResultCategoryItem />
          </View>
        </ScrollView> */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Các sản phẩm</Text>
          <Text style={styles.subTitle}>
            (có {priceListSearch.length} kết quả)
          </Text>
        </View>
        <View style={styles.productList}>
          {priceListSearch &&
            priceListSearch.map((item) => {
              return (
                <SearchResultProductItem
                  key={item.id}
                  data={item}
                  navigation={navigation}
                />
              );
            })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryList: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: fontSize.L,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: colors.gray2,
    paddingVertical: 12,
    paddingLeft: 8,
  },
  subTitle: {
    paddingLeft: 12,
  },
  scroll: {
    position: "relative",
  },
  productList: {
    paddingBottom: 12,
  },
});

export default SearchResult;
