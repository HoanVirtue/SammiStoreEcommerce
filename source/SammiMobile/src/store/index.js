import AsyncStorage from "@react-native-async-storage/async-storage";
const phone = "phone";

class Store {
  async getPhoneInLocalStorage() {
    try {
      let value = await AsyncStorage.getItem(phone);

      return value;
    } catch (error) {
      return value;
    }
  }

  async setPhoneInLocalStorage(phone) {
    try {
      let value = await AsyncStorage.setItem(phone, phone);
      value = await AsyncStorage.getItem("phone");
      console.log(value);
    } catch (err) {
      console.log(err);
    }
  }

  removePhoneInLocalStorage() {
    AsyncStorage.removeItem(phone);
  }
}

const store = new Store();

export default store;
