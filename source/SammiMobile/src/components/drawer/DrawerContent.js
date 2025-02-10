import { DrawerContentScrollView } from "@react-navigation/drawer";
import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, ScrollView } from "react-native";
import { Icon } from "@ui-kitten/components";
import { colors, headerSearchHeight } from "../../utils/constants";
import DrawerListItem from "./DrawerListItem";
import DrawerHeader from "./DrawerHeader";
import DrawerItem from "./DrawerItem";
import { SafeAreaView } from "react-native-safe-area-context";

const fakeData = [1, 2, 3, 4, 5, 6];

const DrawerContent = (props) => {
  const { navigation } = props;
  const [indexActiveCategory, setIndexActiveCategory] = useState(-1);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <DrawerHeader navigation={navigation} />
        </View>
        <ScrollView>
          <View style={styles.body}>
            {fakeData.map((item, index) => {
              return (
                <DrawerItem
                  index={index}
                  key={index}
                  indexActiveCategory={indexActiveCategory}
                  setIndexActiveCategory={setIndexActiveCategory}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  header: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    zIndex: 1000,
  },
  body: {
    paddingTop: headerSearchHeight,
  },
});

export default DrawerContent;
