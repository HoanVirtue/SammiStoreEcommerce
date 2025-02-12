import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Button } from "@ui-kitten/components";
import Banner from "../../components/home/Banner";
import Category from "../../components/home/Category";
import Group from "../../components/home/Group";
import Footer from "../../components/home/Footer";
import Header from "../../components/header/Header";
import priceHeaderApi from "../../api/priceHeaderApi";
import {
  backgroundColors,
  bottomTabHeight,
  colors,
  headerHeight,
} from "../../utils/constants";
import AddToCartModal from "../../components/modal/AddToCartModal";
import { usePriceContext } from "../../store/contexts/PriceContext";
import QRCode from "../../components/qrCode/QRCode";

const Home = ({ navigation }) => {
  const { priceFunc, allPrices } = usePriceContext();
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState(8);

  useEffect(() => {
    setData(priceFunc.getLimitPrices(quantity));

    return () => {};
  }, [priceFunc, quantity]);

  return (
    <SafeAreaView style={{ backgroundColor: colors.green2 }}>
      <Header navigation={navigation} />
      <View style={styles.container}>
        <ScrollView style={styles.wrap}>
          <View style={styles.content}>
            <Banner navigation={navigation} />
            <Category />
            <Group
              title="các sản phẩm"
              type="nomal"
              backgroundColor="#eee"
              navigation={navigation}
              data={data || []}
              onViewMore={
                quantity < allPrices.length &&
                (() => {
                  setQuantity(quantity + 9);
                })
              }
            />

            <Footer />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
  },
  wrap: {
    width: "100%",
  },
  content: {
    width: "100%",
    paddingTop: headerHeight + 12,
    flex: 1,
  },
  more: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    backgroundColor: "#eee",
  },
});

export default Home;
