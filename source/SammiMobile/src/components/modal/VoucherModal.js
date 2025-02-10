import React from "react";
import {
  View,
  StyleSheet,
  Modal,
  TextInput,
  Text,
  Pressable,
} from "react-native";
import { colors, fontSize } from "../../utils/constants";
import { Icon } from "@ui-kitten/components";
import { useContext } from "react";
import { OrderContext } from "../../store/contexts/OrderContext";
import { useState } from "react";
import { ToastAndroid } from "react-native";
import promotionApi from "../../api/promotionApi";
import {
  ToastCustom,
  compareDMY,
  convertToVND,
  sqlToDDmmYYY,
} from "../../utils";
import { color } from "react-native-reanimated";

const VoucherModal = ({ visible, setVisible }) => {
  const [voucherInput, setVoucherInput] = useState("");
  const { voucherUsed, orderFunc, customerType, amountMoney } =
    useContext(OrderContext);

  let discountByVoucher = convertToVND(amountMoney.discountByVoucher);

  const [errMessage, setErrMessage] = useState("");
  async function onSubmit() {
    setErrMessage("");
    if (!voucherInput) {
      setErrMessage("Mã không hợp lệ!");
    } else {
      let res = await promotionApi.getOneVByCode(voucherInput);
      if (res.isSuccess) {
        let voucher = res.voucher;

        let headerState = voucher.PromotionHeader.state;
        let TypeCustomers = voucher.PromotionHeader.TypeCustomers;
        let start = new Date(voucher.startDate);
        let end = new Date(voucher.endDate);
        let now = new Date();
        let state = voucher.state;
        let PromotionResult = voucher.PromotionResult;
        let isCheck = false;

        for (const type of TypeCustomers) {
          if (type.id == customerType) {
            isCheck = true;
            break;
          }
        }

        if (!isCheck) {
          setErrMessage("Mã giảm giá không hợp lệ!");
        }

        if (!headerState || !state) {
          isCheck = false;
          setErrMessage("Khuyến mãi đã ngưng!");
        } else {
          if (compareDMY(start, now) > 0) {
            isCheck = false;
            setErrMessage("Phiếu giảm giá chưa tới ngày sử dụng!");
          }

          if (compareDMY(end, now) < 0) {
            setErrMessage("Phiếu giảm giá đã hết hạn!");
            isCheck = false;
          }
        }

        if (PromotionResult) {
          isCheck = false;
          setErrMessage("Phiếu giảm giá chỉ được sử dụng một lần");
        }

        if (isCheck) {
          ToastCustom.infor("Áp dụng thành công");
          orderFunc.setVoucherUsed(voucher);
        }
      } else {
        setErrMessage("Phiếu giảm giá không hợp lệ!");
      }
    }
  }

  function onCancel() {
    orderFunc.setVoucherUsed(null);

    setVoucherInput("");
  }

  return (
    <Modal
      style={styles.modal}
      transparent
      visible={visible}
      animationType="slide"
    >
      <View style={styles.wrap}>
        <View style={styles.container}>
          <Text style={styles.title}>Áp dụng</Text>
          <View style={styles.content}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Nhập mã giảm giá"
                value={voucherInput}
                onChangeText={(value) => {
                  if (errMessage) {
                    setErrMessage("");
                  }
                  setVoucherInput(value);
                }}
                editable={!voucherUsed}
              />
              {voucherUsed ? (
                <Text
                  style={[styles.btn, styles.btnEnalbe, styles.btnCancel]}
                  onPress={onCancel}
                >
                  Hủy
                </Text>
              ) : (
                <Text style={[styles.btn, styles.btnEnalbe]} onPress={onSubmit}>
                  Sử dụng
                </Text>
              )}
            </View>
            <Text style={styles.errMessage}>{errMessage}</Text>
            {voucherUsed && (
              <>
                <Text style={styles.label}>
                  Phiếu giảm giá áp dụng thành công
                </Text>

                <View style={styles.voucherInfor}>
                  <Text style={styles.voucherValue}>-{discountByVoucher}</Text>
                  <View style={styles.voucherRight}>
                    <Text style={styles.voucherDescription}>
                      {voucherUsed.title}
                    </Text>

                    <Text style={styles.expiredTime}>
                      Hết hạn: {sqlToDDmmYYY(voucherUsed.endDate)}
                    </Text>
                  </View>
                </View>
              </>
            )}
          </View>
          <Pressable
            style={styles.closeIconContainer}
            onPress={() => {
              setVisible(false);
            }}
          >
            <Icon
              name="close-outline"
              fill={colors.gray}
              style={styles.closeIcon}
            />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {},
  wrap: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  container: {
    backgroundColor: colors.white,
    marginTop: "auto",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    paddingBottom: 32,
  },
  title: {
    textAlign: "center",
    paddingVertical: 12,
    fontSize: fontSize.XXL,
    fontWeight: "bold",
    color: colors.gray2,
    borderBottomColor: colors.gray,
    borderBottomWidth: 2,
  },
  content: {
    padding: 12,
    paddingTop: 24,
  },
  inputContainer: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.grayLighter,
  },
  input: {
    flex: 1,
    fontSize: fontSize.XL,
    paddingHorizontal: 12,
  },
  btn: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.grayLighter,
    color: colors.gray,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  btnEnalbe: {
    borderColor: colors.green,
    color: colors.white,
    backgroundColor: colors.green2,
  },
  btnCancel: {
    backgroundColor: "red",
    color: "white",
    borderWidth: 0,
  },
  errMessage: {
    color: "red",
  },

  label: {
    fontSize: fontSize.XL,
    paddingVertical: 12,
  },
  voucherInfor: {
    borderWidth: 2,
    borderColor: colors.green,
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    paddingBottom: 32,
  },
  voucherValue: {
    minWidth: 64,
    height: 64,
    backgroundColor: colors.grayLighter,
    color: colors.green2,
    fontWeight: "bold",
    borderRadius: 4,
    textAlign: "center",
    fontSize: fontSize.XXL,
    lineHeight: 64,
    paddingHorizontal: 4,
  },
  voucherRight: {
    flex: 1,
    paddingLeft: 12,
  },
  voucherDescription: {
    paddingBottom: 12,
    fontSize: fontSize.L,
  },
  expiredTime: {
    color: colors.red,
    fontSize: fontSize.M,
  },
  closeIconContainer: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    width: 32,
    height: 32,
  },
});

export default VoucherModal;
