const {
  View,
  Text,
  Pressable,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} = require("react-native");
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Test = (props) => {
  const WIDTH = Dimensions.get("window").width;
  const numColumns = 2;
  const [data, setData] = useState([1, 2, 3, 4, 5, 6, 7, 7, 4, 3, 2, 1]);

  const oneCoffee = ({ item }) => (
    <Pressable
      style={[styles.item, { height: WIDTH / numColumns }]}
      onPress={() => {
        props.navigation.navigate("details", { item });
      }}
    >
      <View style={styles.avatarContainer}></View>
      <Text style={styles.fruitname}> Cong </Text>
      <Text style={styles.text}> 10 $ </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.wellcome}>
          <Text style={styles.wellcometext}>wellcome back</Text>
          <Text style={styles.wellcometext1}>le dinh but</Text>
        </View>
      </View>
      <View style={styles.banner}>
        {/* <Image source={banner} resizeMode={'cover'} style = {styles.bannerImage} /> */}
        <Text style={styles.slogan}> new product</Text>
        <View style={styles.searchview}></View>
      </View>
      <View style={styles.selection}>
        <TouchableOpacity style={styles.touchable}>
          <Text> trendding</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable}>
          <Text> popular</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable}>
          <Text> we recomment</Text>
        </TouchableOpacity>
      </View>
      <SafeAreaView style={styles.list}>
        <FlatList
          data={data}
          renderItem={oneCoffee}
          ListEmptyComponent={<Text>this is very coffees</Text>}
          keyExtractor={(item, index) => index}
          numColumns={numColumns}
          key={(item, index) => index}
        />
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
  },
  top: {
    flex: 1,
  },
  innerTop: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  wellcome: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  banner: {
    // flexDirection:'row',
    flex: 2,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  bannerImage: {},
  selection: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#F0F4F7",
    marginHorizontal: 16,
  },
  touchable: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  list: {
    flex: 6,
  },
  item: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 13,
    paddingHorizontal: 13,
    margin: 10,
    borderRadius: 20,
  },
  avatarContainer: {
    height: 89,
    width: 89,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    height: 100,
    width: 100,
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
    color: "#DDDACB",
  },
  wellcometext: {
    fontSize: 21,
    fontWeight: "500",
  },
  wellcometext1: {
    fontSize: 16,
    fontWeight: "300",
  },
  text: {
    color: "black",
  },
  searchview: {
    flexDirection: "row",
    backgroundColor: "#F0F4F7",
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
  },
  textinput: {
    flex: 1,
    marginLeft: 20,
  },
  slogan: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FCB569",
    marginBottom: 10,
  },
  man: {
    height: 48,
    width: 48,
  },
  fruitname: {
    fontSize: 20,
    fontWeight: "400",
  },
});
export default Test;
