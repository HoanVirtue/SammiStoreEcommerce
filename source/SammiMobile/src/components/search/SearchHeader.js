import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Icon } from "@ui-kitten/components";
import {
  colors,
  headerInputHeight,
  headerSearchHeight,
} from "../../utils/constants";
import { usePriceContext } from "../../store/contexts/PriceContext";
import { useEffect } from "react";

const SearchHeader = ({ isShowResult, setIsShowResult, navigation }) => {
  const [searchInput, setSearchInput] = useState("");
  const [isShowCloseIcon, setIsShowCloseIcon] = useState(false);
  const { priceFunc } = usePriceContext();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    let timoutId = null;
    if (searchInput) {
      timoutId = setTimeout(() => {
        priceFunc.searchByProductName(searchInput);
        setIsLoading(false);
      }, 300);
    } else {
      priceFunc.searchByProductName(searchInput);
      setIsLoading(false);
    }
    return () => {
      clearTimeout(timoutId);
    };
  }, [searchInput]);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.backIconContainer}
        onPress={() => navigation.goBack()}
      >
        <Icon
          name="arrow-ios-back-outline"
          fill={colors.white}
          style={styles.backIcon}
        />
      </Pressable>
      <View style={styles.inputContainer}>
        <Pressable style={styles.searchIconContainer}>
          <Icon
            name="search-outline"
            fill={colors.gray1}
            style={styles.searchIcon}
          />
        </Pressable>
        <TextInput
          placeholder="Nhập tên sản phẩm bạn muốn tìm"
          style={styles.searchInput}
          value={searchInput}
          onChangeText={(text) => {
            setSearchInput(text);

            if (text.length > 0) {
              setIsShowCloseIcon(true);
              setIsShowResult(true);
            } else {
              setIsShowCloseIcon(false);
              setIsShowResult(false);
            }
          }}
        />
        {isLoading && (
          <View style={styles.loaderIconContainer}>
            <ActivityIndicator size="small" color={colors.greenLighter} />
          </View>
        )}

        {isShowCloseIcon ? (
          <Pressable
            style={styles.closeIconContainer}
            onPress={() => {
              setSearchInput("");
              setIsShowCloseIcon(false);
              setIsShowResult(false);
            }}
          >
            <Icon
              name="close-outline"
              fill={colors.white}
              style={styles.closeIcon}
            />
          </Pressable>
        ) : (
          <View style={styles.micIconContainer}>
            {/* <Icon
              name="mic-outline"
              fill={colors.gray2}
              style={styles.micIcon}
            /> */}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: headerSearchHeight,
    paddingHorizontal: 12,
    backgroundColor: colors.green2,
    alignItems: "center",
  },
  backIconContainer: {
    height: 30,
    width: 30,
    marginLeft: 12,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  backIcon: {
    width: 48,
    height: 48,
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: colors.white,
    alignItems: "center",
    borderRadius: 4,
    flex: 1,
    paddingHorizontal: 12,
    height: headerInputHeight,
  },
  searchIconContainer: {},
  searchIcon: {
    width: 24,
    height: 24,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    color: colors.gray2,
  },
  loaderIconContainer: {
    height: 24,
    width: 24,
  },
  loaderIcon: {
    width: 24,
    height: 24,
  },
  micIconContainer: {
    height: 24,
    width: 32,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  micIcon: {
    width: 28,
    height: 28,
  },
  closeIconContainer: {
    backgroundColor: colors.gray1,
    borderRadius: 50,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
});

export default SearchHeader;
