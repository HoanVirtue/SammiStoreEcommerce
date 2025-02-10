import React from "react";
import { View, StyleSheet, Image, FlatList, Text } from "react-native";
import { backgroundColors, colors } from "../../utils/constants";
import LabelHeading from "../common/LabelHeading";
import Product from "./Product";
import { useEffect } from "react";
import { useState } from "react";
import { ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native";
const Group = ({
  title,
  type,
  backgroundColor,
  navigation,
  data,
  onViewMore,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <View style={[styles.container]}>
      <View style={styles.head}>
        <LabelHeading
          title={title}
          type={type}
          backgroundColor={backgroundColor}
        />
      </View>
      <View
        style={[
          styles.body,
          backgroundColor && { backgroundColor: backgroundColor },
          styles.list,
        ]}
      >
        {data.map((item, index) => {
          return <Product navigation={navigation} item={item} key={index} />;
        })}
      </View>

      {onViewMore && (
        <TouchableOpacity
          style={{
            backgroundColor: backgroundColor,
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            if (!isLoading) {
              setIsLoading(true);
              setTimeout(() => {
                onViewMore();
                setIsLoading(false);
              }, 1000);
            }
          }}
        >
          {isLoading && (
            <ActivityIndicator style={{}} color="green" size="small" />
          )}
          <Text
            style={{
              color: "green",
              paddingVertical: 4,
              textAlign: "center",
            }}
          >
            Xem thêm
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.white,
  },
  body: {
    backgroundColor: colors.white,
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 8,
  },
});

export default Group;
