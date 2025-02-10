import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchHeader from "../components/search/SearchHeader";
import SearchPopular from "../components/search/SearchPopular";
import SearchResult from "../components/search/SearchResult";
import SpecialOffer from "../components/search/SpecialOffer";
import { colors } from "../utils/constants";
import Test from "./Test";
import { usePriceContext } from "../store/contexts/PriceContext";

const Search = ({ navigation }) => {
  const [isShowResult, setIsShowResult] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <SearchHeader
          isShowResult={isShowResult}
          setIsShowResult={setIsShowResult}
          navigation={navigation}
        />
        <ScrollView
          onScroll={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.body}>
            <SearchResult navigation={navigation} />

            {/* <>
                <SearchPopular />
                <SpecialOffer />
              </> */}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body: {
    flex: 1,
  },
});

export default Search;
