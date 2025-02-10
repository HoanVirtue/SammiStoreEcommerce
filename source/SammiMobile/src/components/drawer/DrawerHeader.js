import React from "react";
import { View, StyleSheet, Text, TextInput, Pressable } from "react-native";
import { Icon } from "@ui-kitten/components";
import {
  colors,
  headerInputHeight,
  headerSearchHeight,
} from "../../utils/constants";

const DrawerHeader = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchInputContainer}>
        <TextInput
          placeholder="Tìm kiếm hơn 10K sản phẩm"
          style={styles.input}
        />
        <Icon
          name="search-outline"
          fill={colors.gray}
          style={styles.searchIcon}
        />
      </View>
      <Pressable
        onPress={() => {
          navigation.closeDrawer();
        }}
        style={styles.closeBtnContainer}
      >
        <Icon
          name="close-outline"
          fill={colors.white}
          style={styles.iconClose}
        />
        <Text style={styles.closeLabel}>Đóng</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green2,
    flexDirection: "row",
    alignItems: "center",
    height: headerSearchHeight,
    paddingHorizontal: 12,
  },

  searchInputContainer: {
    flex: 1,
    height: headerInputHeight,
    backgroundColor: colors.white,
    borderRadius: 4,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
  closeBtnContainer: {
    height: headerInputHeight,
    paddingHorizontal: 12,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    backgroundColor: "#dddddd40",
  },
  iconClose: {
    width: 24,
    height: 24,
  },
  closeLabel: {
    color: colors.white,
  },
});

export default DrawerHeader;
