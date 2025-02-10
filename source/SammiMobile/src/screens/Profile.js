import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Category from "../components/home/Category";
import { SafeAreaView } from "react-native";
import Header from "../components/header/Header";
import { backgroundColors, colors, headerHeight } from "../utils/constants";
import Group from "../components/home/Group";
import AddToCartModal from "../components/modal/AddToCartModal";
import promotionApi from "../api/promotionApi";
import { usePriceContext } from "../store/contexts/PriceContext";

const Profile = ({ navigation }) => {
  const { priceFunc, allPriceDRPList, allPricePPList } = usePriceContext();

  const [ppData, setPpData] = useState([]);
  const [drpData, setDrpData] = useState([]);
  const [numOfPP, setNumOfPP] = useState(9);
  const [numOfDRP, setNumOfDRP] = useState(9);

  useEffect(() => {
    setPpData(priceFunc.getLimitPPList(numOfPP));

    return () => {};
  }, [numOfPP]);

  useEffect(() => {
    setDrpData(priceFunc.getLimitDRPList(numOfDRP));

    return () => {};
  }, [numOfDRP]);

  const [isVisibleModal, setIsVisibleModal] = useState(true);
  return (
    <SafeAreaView style={{ backgroundColor: colors.green2 }}>
      <Header navigation={navigation} />

      <View style={styles.container}>
        <ScrollView style={styles.promotion}>
          <View>
            <Group
              title=" Tặng sản phẩm"
              type="special"
              setIsVisibleModal={setIsVisibleModal}
              backgroundColor="#d3db76"
              navigation={navigation}
              data={priceFunc.getLimitPPList(numOfPP)}
              onViewMore={
                numOfPP < allPricePPList.length &&
                (() => {
                  setNumOfPP(numOfPP + 9);
                })
              }
            />
          </View>

          <View>
            <Group
              title="Siêu ưu đãi giảm giá"
              type="special"
              setIsVisibleModal={setIsVisibleModal}
              backgroundColor={backgroundColors.greenLighter}
              navigation={navigation}
              data={priceFunc.getLimitDRPList(numOfDRP) || []}
              onViewMore={
                numOfDRP < allPriceDRPList.length &&
                (() => {
                  setNumOfDRP(numOfDRP + 9);
                })
              }
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    // paddingTop: Platform.OS != "ios" && 24,
  },
  promotion: {
    marginTop: headerHeight,
  },
  more: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    backgroundColor: "#eee",
  },
});

export default Profile;
