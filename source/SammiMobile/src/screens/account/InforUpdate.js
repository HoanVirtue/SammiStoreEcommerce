import React from "react";
import { TextInput } from "react-native";
import { Text } from "react-native";
import { ScrollView, StatusBar } from "react-native";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/header/Header";
import Radio from "../../components/Radio";
import RedirectRouter from "../../components/RedirectRouter";
import {
  backgroundColors,
  colors,
  fontSize,
  headerHeight,
} from "../../utils/constants";
import { useGlobalContext } from "../../store/contexts/GlobalContext";
import { useState } from "react";
import { useEffect } from "react";
import { Input } from "@ui-kitten/components";
import SelectDropdown from "react-native-select-dropdown";
import addressApi from "../../api/addressApi";

import { addressData } from "../../utils/constants";
import { ToastCustom } from "../../utils";
import userApi from "../../api/userApi";

const InforUpdate = ({ navigation }) => {
  const { account, globalFunc } = useGlobalContext();

  const [formState, setFormState] = useState({
    id: "",
    firstName: "",
    lastName: "",
    phonenumber: "",
    email: "",
    HomeAddressId: "",
    homeName: "",
    cityId: "",
    districtId: "",
    wardId: "",
    cityIndSelected: "",
    districtIndexSelected: "",
    wardIndexSelected: "",
  });

  useEffect(() => {
    if (account) {
      let address = {};
      if (account.HomeAddress) {
        address.wardId = account.HomeAddress.WardId;
        address.districtId = account.HomeAddress.Ward.DistrictId;
        address.cityId = account.HomeAddress.Ward.District.CityId;
        address.homeName = account.HomeAddress.homeAddress;
      }

      setFormState({
        ...formState,
        ...account,
        ...address,
      });
    }
    return () => {};
  }, [account]);

  let districts = [];
  let wards = [];

  if (formState.cityId) {
    districts = addressData.districts.filter((district) => {
      return district.CityId == formState.cityId;
    });
  }

  if (formState.districtId) {
    wards = addressData.wards.filter((ward) => {
      return ward.DistrictId == formState.districtId;
    });
  }

  async function onSubmit() {
    let homeAddresId = null;
    globalFunc.setLoadingModalState(true, "Đang cập nhật...");
    if (await checkData()) {
      let res = await userApi.updateOneCustomer({
        firstName: formState.firstName,
        lastName: formState.lastName,
        phonenumber: formState.phonenumber,
        HomeAddressId: homeAddresId,
      });
      if (res.isSuccess) {
        await globalFunc.refresh();
        ToastCustom.infor("Cập nhật thành công");
      } else {
        ToastCustom.error("Thông tin không hợp lệ, vui lòng thử lại");
      }
    }
    globalFunc.setLoadingModalState(false);

    async function checkData() {
      let isCheck = true;

      if (formState.wardId && formState.homeName) {
        let res = await addressApi.addHomeAddress({
          homeAddress: formState.homeName,
          wardId: formState.wardId,
        });
        if (res.isSuccess) {
          homeAddresId = res.home.id;
        }
      }

      if (!isCheck) {
        ToastCustom.error("Vui lòng điền đầy đủ thông tin!");
      }
      return isCheck;
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={colors.green2}
        // barStyle={statusBarStyle}
        // showHideTransition={statusBarTransition}
        // hidden={hidden}
      />
      {/* <Header /> */}
      <SafeAreaView>
        <ScrollView>
          <View style={styles.content}>
            <RedirectRouter
              title="Thông tin tài khoản"
              navigation={navigation}
              isTitleCenter={true}
            />
            {/* <View style={styles.row}>
                <Radio label="Anh" setSelected={false} style={styles.radio} />
                <Radio label="Chị" setSelected={false} style={styles.radio} />
              </View> */}
            <View style={styles.body}>
              <View style={styles.form}>
                <Input
                  style={styles.input}
                  placeholder="Số điện thoại"
                  value={formState.phonenumber}
                  onChangeText={(value) => {
                    setFormState({
                      ...formState,
                      phonenumber: value,
                    });
                  }}
                  disabled
                />

                <Input
                  style={styles.input}
                  placeholder="Họ và tên đệm"
                  value={formState.firstName}
                  onChangeText={(value) => {
                    setFormState({
                      ...formState,
                      firstName: value,
                    });
                  }}
                />
                <Input
                  style={styles.input}
                  placeholder="Tên"
                  value={formState.lastName}
                  onChangeText={(value) => {
                    setFormState({
                      ...formState,
                      lastName: value,
                    });
                  }}
                />
                <View style={styles.inputGroup}>
                  <SelectDropdown
                    defaultButtonText="Tỉnh/thành phố"
                    data={addressData.cities.map((city) => {
                      return city.name;
                    })}
                    onSelect={(selectedItem, index) => {
                      let cityId = addressData.cities[index].id;
                      setFormState({
                        ...formState,
                        cityId,
                        cityIndSelected: index,
                        districtId: addressData.districts.filter(
                          (district) => district.CityId == cityId
                        )[0].id,
                        districtIndexSelected: 0,
                        wardId: "",
                        wardIndexSelected: "",
                      });
                    }}
                    defaultValueByIndex={
                      formState.cityId &&
                      addressData.cities.indexOf(
                        addressData.cities.filter(
                          (city) => city.id == formState.cityId
                        )[0]
                      )
                    }
                    buttonStyle={styles.select}
                    rowStyle={styles.select}
                    buttonTextStyle={styles.selectText}
                    rowTextStyle={styles.selectText}
                  />

                  <SelectDropdown
                    defaultButtonText="Quận/huyện"
                    data={districts.map((item) => item.name)}
                    onSelect={(selectedItem, index) => {
                      let districtId = districts[index].id;
                      setFormState({
                        ...formState,
                        districtId,
                        districtIndexSelected: index,
                        wardId: addressData.wards.filter(
                          (ward) => ward.DistrictId == districtId
                        )[0].id,
                        wardIndexSelected: 0,
                      });
                    }}
                    defaultValueByIndex={
                      (formState.districtId &&
                        districts.indexOf(
                          districts.filter(
                            (item) => item.id == formState.districtId
                          )[0]
                        )) ||
                      0
                    }
                    buttonStyle={styles.select}
                    rowStyle={styles.select}
                    buttonTextStyle={styles.selectText}
                    rowTextStyle={styles.selectText}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <SelectDropdown
                    defaultButtonText="Phường/xã"
                    data={wards.map((item) => item.name)}
                    onSelect={(selectedItem, index) => {
                      let wardId = wards[index].id;
                      setFormState({
                        ...formState,
                        wardId,
                        wardIndexSelected: index,
                      });
                    }}
                    defaultValueByIndex={
                      (formState.wardId &&
                        wards.indexOf(
                          wards.filter((item) => item.id == formState.wardId)[0]
                        )) ||
                      0
                    }
                    buttonStyle={styles.select}
                    rowStyle={styles.select}
                    buttonTextStyle={styles.selectText}
                    rowTextStyle={styles.selectText}
                  />
                </View>

                <Input
                  style={styles.input}
                  value={formState.homeName}
                  placeholder="Số nhà, tên đường"
                  onChangeText={(value) => {
                    setFormState({
                      ...formState,
                      homeName: value,
                    });
                  }}
                />
              </View>
            </View>
            <Text style={styles.btnSave} onPress={onSubmit}>
              Lưu chỉnh sửa
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  content: {
    // marginTop: 12,
  },
  body: {
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  row: {
    flexDirection: "row",
  },
  body: {
    paddingHorizontal: 12,
  },
  form: {
    paddingVertical: 12,
  },
  title: {
    fontSize: fontSize.XL,
    textTransform: "uppercase",
    paddingTop: 12,
    fontWeight: "bold",
    color: colors.gray2,
  },

  input: {
    marginBottom: 12,
  },
  gender: {
    flexDirection: "row",
  },
  radioItem: {
    paddingRight: 24,
  },
  inputGroup: {
    flexDirection: "row",
    flex: 1,
  },
  select: {
    height: 38,
    flex: 1,
    borderRadius: 4,
    backgroundColor: "#eee",
    marginBottom: 12,
    marginHorizontal: 4,
  },

  selectText: {
    fontSize: 14,
  },
  btnSave: {
    backgroundColor: colors.green2,
    paddingVertical: 12,
    color: colors.white,
    textAlign: "center",
    fontSize: fontSize.L,
    textTransform: "uppercase",
    borderRadius: 4,
    marginVertical: 12,
    marginHorizontal: 12,
  },
});

export default InforUpdate;
