import {
  SafeAreaView,
  ToastAndroid,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Text,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";
import useOrderContext, { OrderContext } from "../store/contexts/OrderContext";
import { AntDesign } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import {
  colors,
  btnColors,
  backgroundColors,
  fontSize,
} from "../utils/constants";
import { usePriceContext } from "../store/contexts/PriceContext";
import { ToastCustom, convertToVND } from "../utils";
import { Button, Icon } from "@ui-kitten/components";
import RedirectRouter from "../components/RedirectRouter";
import ProductQuantityChange from "../components/common/ProductQuantityChange";
import SelectDropdown from "react-native-select-dropdown";
import { useGlobalContext } from "../store/contexts/GlobalContext";

const Details = ({ navigation, route }) => {
  const productId = route.params;
  const { allPrices = [] } = usePriceContext();
  const { orderFunc, listOrders } = useOrderContext();
  const [unitTypeName, setUnitTypeName] = useState("");

  const [onePrice, setOnePrice] = useState(null);
  const [priceList, setPriceList] = useState([]);
  const [ppList, setPpList] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    let _ppList = [];
    let _priceList = [];
    let _onePrice = null;

    allPrices.map((item) => {
      if (item.ProductUnitType.Product.id == productId) {
        _priceList.push(item);
        if (item.ProductUnitType.ProductPromotions?.length > 0) {
          _ppList.push(item.ProductUnitType.ProductPromotions[0]);
        }
      }
    });
    if (unitTypeName && _priceList.length > 1) {
      _priceList.map((item) => {
        if (item.ProductUnitType.UnitType.name == unitTypeName) {
          _onePrice = item;
        }
      });
    }
    if (!_onePrice) {
      _onePrice = _priceList[0];
    }
    setOnePrice(_onePrice);
    setPpList(_ppList);
    setPriceList(_priceList);
    return () => {};
  }, [allPrices, productId, unitTypeName]);

  let maxQuantity = 0;
  if (onePrice) {
    maxQuantity = Math.floor(
      onePrice?.ProductUnitType.Product.quantity /
        onePrice?.ProductUnitType.UnitType.convertionQuantity
    );
  }

  useEffect(() => {
    if (onePrice && orderFunc.isExistInCart(onePrice.id)) {
      listOrders.map((item) => {
        if (item.id == onePrice.id) {
          setQuantity(item.amount);
        }
      });
    }
    return () => {};
  }, [onePrice]);

  return (
    <View style={styles.container}>
      <View style={{}}>
        <RedirectRouter
          title={"Chi tiết sản phẩm"}
          isTitleCenter={false}
          navigation={navigation}
        />
      </View>
      {onePrice ? (
        <>
          <ScrollView style={styles.scrollView}>
            <View style={styles.header}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={{
                    uri: onePrice.ProductUnitType.Product.images[0].uri,
                  }}
                />
              </View>
            </View>
            <View style={styles.body}>
              <View style={styles.row}>
                <View style={styles.nameContainer}>
                  <Text style={styles.name}>
                    {onePrice.ProductUnitType.Product.name}
                  </Text>
                  <View style={styles.listUTs}>
                    {priceList.map((item, index) => {
                      let utName = item.ProductUnitType.UnitType.name;
                      return (
                        <Text
                          key={index}
                          onPress={() => {
                            setUnitTypeName(utName);
                          }}
                          style={[
                            styles.utItem,
                            unitTypeName == utName && styles.utSelected,
                            !unitTypeName && index == 0 && styles.utSelected,
                          ]}
                        >
                          {utName}
                        </Text>
                      );
                    })}
                  </View>
                </View>
                <View style={styles.priceContainer}>
                  {onePrice.ProductUnitType.DiscountRateProduct ? (
                    <>
                      <Text style={styles.oldPrice}>
                        {convertToVND(onePrice.price)}
                      </Text>
                      <Text style={styles.discountPercent}>
                        -
                        {
                          onePrice.ProductUnitType.DiscountRateProduct
                            .discountRate
                        }
                        %
                      </Text>
                      <Text style={styles.newPrice}>
                        {convertToVND(
                          Math.floor(
                            (onePrice.price *
                              (100 -
                                onePrice.ProductUnitType.DiscountRateProduct
                                  .discountRate)) /
                              100
                          )
                        )}
                      </Text>
                    </>
                  ) : (
                    <Text style={styles.newPrice}>
                      {convertToVND(onePrice.price)}
                    </Text>
                  )}
                </View>
              </View>

              {ppList?.length > 0 &&
                ppList.map((item, ind) => {
                  return (
                    <View style={styles.promotionPP} key={ind}>
                      <Icon
                        name="gift-outline"
                        fill={"green"}
                        style={styles.giftIcon}
                      />
                      <Text style={styles.ppText}>{item.title}</Text>
                    </View>
                  );
                })}

              <View style={styles.moreInfor}>
                <Text style={styles.moreInforTitle}>
                  Thông tin chi tiết về sản phẩm
                </Text>
                {/* <View style={styles.item}>
              <Text style={styles.label}>Nhóm sản phẩm:</Text>
              <Text style={styles.value}>{onePrice?.ProductUnitType.Product.}</Text>
            </View> */}
                <View style={styles.item}>
                  <Text style={styles.label}>SL có thể bán:</Text>
                  <Text style={styles.value}>
                    {maxQuantity +
                      " (" +
                      onePrice.ProductUnitType.UnitType.name +
                      ")"}
                  </Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.label}>Mô tả:</Text>
                  <Text style={styles.value}>
                    {onePrice.ProductUnitType.Product.description}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={styles.row}>
            {maxQuantity > 0 && (
              <ProductQuantityChange
                value={quantity}
                setValue={(value) => {
                  if (value > maxQuantity) {
                    ToastCustom.error(
                      "Số lượng bên cửa hàng không đủ, mong quý khách thông cảm"
                    );
                  } else if (value > 0) {
                    if (orderFunc.isExistInCart(onePrice.id)) {
                      if (value > quantity) {
                        orderFunc.increaseQuantity(onePrice.id);
                      } else {
                        orderFunc.decreaseQuantity(onePrice.id);
                      }
                    }

                    setQuantity(value);
                  }
                }}
              />
            )}
            {orderFunc.isExistInCart(onePrice.id) ? (
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  navigation.navigate("Cart");
                }}
              >
                <Text style={styles.btnText}>XEM GIỎ HÀNG</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.btn, maxQuantity == 0 && styles.btnSoldOut]}
                onPress={() => {
                  orderFunc.addToCart(onePrice, quantity);
                  ToastCustom.infor("Thêm vào giỏ hàng thành công");
                }}
                disabled={maxQuantity <= 0}
              >
                <Text
                  style={[
                    styles.btnText,
                    maxQuantity == 0 && styles.btnTextSoldOut,
                  ]}
                >
                  {maxQuantity == 0 ? "ĐÃ HẾT HÀNG" : "THÊM VÀO GIỎ HÀNG"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    // paddingTop: 16,
    paddingHorizontal: 8,
    flex: 1,
  },
  scrollView: {
    // paddingBottom: 24,
  },
  header: {
    flex: 1,
  },
  imageContainer: {
    width: "100%",
  },
  image: {
    width: "100%",
    height: 400,
  },
  body: {
    marginTop: 12,
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: "row",
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  listUTs: {
    flexDirection: "row",
  },
  utItem: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#ddd",
    marginBottom: 6,
    marginRight: 6,
  },
  utSelected: {
    backgroundColor: colors.green,
    color: "white",
  },
  priceContainer: {
    alignItems: "flex-end",
    marginLeft: 24,
  },
  oldPrice: {
    textDecorationLine: "line-through",
  },
  discountPercent: {
    color: "red",
  },
  newPrice: {
    color: colors.green,
    fontWeight: "bold",
    fontSize: 17,
  },
  btn: {
    borderWidth: 1,
    borderColor: colors.green,
    marginVertical: 12,
    marginLeft: 12,
    flex: 1,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: backgroundColors.gray,
    height: 48,
  },

  btnSoldOut: {
    borderColor: "red",
  },
  btnText: {
    color: colors.green2,
    fontSize: fontSize.L,
  },
  btnTextSoldOut: {
    color: "red",
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
    color: colors.greenLighter,
  },

  moreInfor: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginTop: 12,
  },
  moreInforTitle: {
    marginBottom: 12,
  },
  item: {
    flexDirection: "row",
  },
  label: {
    fontSize: 14,
    width: 100,
  },
  value: {
    flex: 1,
  },
});
export default Details;
