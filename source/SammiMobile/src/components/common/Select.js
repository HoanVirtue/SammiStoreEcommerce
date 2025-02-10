import React from "react";
import { View, StyleSheet, Text, TextInput, ScrollView } from "react-native";
import { Icon } from "@ui-kitten/components";
import { backgroundColors, colors, fontSize } from "../../utils/constants";
import SelectDropdown from "react-native-select-dropdown";

const countries = [
  "Egypt",
  "Canada",
  "Australia",
  "Ireland",
  "Canada",
  "Australia",
  "Ireland",
  "Canada",
  "Australia",
  "Ireland",
  "Canada",
  "Australia",
  "Ireland",
  "Canada",
  "Australia",
  "Ireland",
];

const Select = () => {
  return (
    <View style={styles.container}>
      <SelectDropdown
        data={countries}
        onSelect={(selectedItem, index) => {}}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
        buttonStyle={styles.button}
      />
    </View>
  );
};

const inputHeight = 36;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 12,
  },
  button: {
    height: inputHeight,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.grayLighter,
  },
});

export default Select;
