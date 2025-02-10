import Toast from "react-native-root-toast";
import billApi from "../api/billApi";
import productApi from "./../api/productApi";
import promotionApi from "../api/promotionApi";
import storeApi from "./../api/storeApi";

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validateSdt = (sdt) => {
  return sdt.trim().match(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g);
};

export const validatePassword = (pwd) => {
  return String(pwd).trim().length > 6;
};

export function sqlToHHmmDDmmYYYY(date) {
  var myDate = new Date(date);
  let d = myDate.getDate();
  let m = myDate.getMonth() + 1;
  let y = myDate.getFullYear();
  let hh = myDate.getHours();
  let minutes = myDate.getMinutes();
  if (d < 10) {
    d = "0" + d;
  }
  if (m < 10) {
    m = "0" + m;
  }

  return hh + ":" + minutes + " , " + d + "/" + m + "/" + y;
}

export function convertToVND(value) {
  function format1(n, currency) {
    return (
      currency +
      n.toFixed(2).replace(/./g, (c, i, a) => {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
      })
    );
  }

  let str = format1(value, " ") + "";

  return (str && str.slice(0, -3)) + " đ";

  // let num = value || 0;
  // num = Number(num);
  // return num.toLocaleString("it-IT");
}

export const ToastCustom = {
  infor: (text, position = "CENTER") => {
    Toast.show(text, {
      duration: Toast.durations.SHORT,
      position: Toast.positions[position],
      backgroundColor: "green",

      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  },
  error: (text, position = "CENTER") => {
    Toast.show(text, {
      duration: Toast.durations.SHORT,
      position: Toast.positions[position],
      backgroundColor: "red",
      opacity: 1,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  },
};

export function compareDMY(jsDate1, jsDate2) {
  let d1 = jsDate1.getDate();
  let m1 = jsDate1.getMonth();
  let y1 = jsDate1.getFullYear();

  let d2 = jsDate2.getDate();
  let m2 = jsDate2.getMonth();
  let y2 = jsDate2.getFullYear();

  if (y1 == y2 && m2 == m1 && d1 == d2) {
    return 0;
  }

  if (y1 < y2) {
    return -1;
  }

  if (y2 == y1) {
    if (m1 < m2) {
      return -1;
    } else if (m2 == m1) {
      if (d1 < d2) {
        return -1;
      } else {
        return 1;
      }
    } else {
      return 1;
    }
  }

  return 1;
}
export function isVietnamesePhoneNumberValid(number) {
  return /0(3|5|7|8|9)+([0-9]{8})\b/.test(number);
}

export function sqlToDDmmYYY(date) {
  var myDate = new Date(date);

  let d = myDate.getDate();
  let m = myDate.getMonth() + 1;
  let y = myDate.getFullYear();

  if (d < 10) {
    d = "0" + d;
  }
  if (m < 10) {
    m = "0" + m;
  }

  return d + "/" + m + "/" + y;
}

export async function handleStoreTranAfterCreateBill(
  billId,
  listOrders,
  MPused,
  voucherUsed,
  discountMoneyByMoneyPromotion,
  discountMoneyByVoucher
) {
  let res = await billApi.getOneBillById(billId);
  let bill = res.bill || {};
  let billDetails = bill.BillDetails || [];
  let employeeId = bill.EmployeeId;

  // tính lại số lượng để cộng lại cho đồng bộ
  let _quantitys = {};

  listOrders.map((cartItem) => {
    _quantitys;
  });

  let storeTrans = [];

  billDetails.map((billDetail) => {
    storeTrans.push({
      quantity: -billDetail.quantity,
      ProductUnitTypeId: billDetail.Price.ProductUnitTypeId,
      type: "Bán hàng",
      productId: billDetail.Price.ProductUnitType.ProductId,
      convertionQuantity:
        billDetail.Price.ProductUnitType.UnitType.convertionQuantity,
    });
  });

  // tạo promotion result, và xử lí kho sau khi áp dụng khuyến mãi
  for (const row of listOrders) {
    /// PP result
    if (row.isPP) {
      let quantityApplied = row.amount;

      if (quantityApplied > 0) {
        let res = await promotionApi.addResult({
          isSuccess: true,
          note: "Được khuyến mãi khi mua hàng",
          BillId: billId,
          ProductPromotionId: row.PP.id,
          quantityApplied,
        });

        if (res.isSuccess) {
          storeTrans.push({
            quantity: -quantityApplied,
            ProductUnitTypeId: row.PP.ProductUnitType.id,
            type: "Khuyến mãi bán hàng",
            productId: row.PP.ProductId,
            convertionQuantity:
              row.PP.ProductUnitType.UnitType.convertionQuantity,
          });
        }
      }
    }

    if (row.ProductUnitType.DiscountRateProduct) {
      await promotionApi.addResult({
        isSuccess: true,
        note: "Được khuyến mãi khi mua hàng",
        BillId: billId,
        DiscountRateProductId: row.ProductUnitType.DiscountRateProduct.id,
      });
    }
  }

  if (MPused) {
    let res = await promotionApi.addResult({
      isSuccess: true,
      note: "Được khuyến mãi khi mua hàng",
      BillId: billId,
      MoneyPromotionId: MPused.id,
      discountMoneyByMoneyPromotion,
    });

    if (res.isSuccess) {
      // trừ vào ngân sách còn lại của km
      await promotionApi.updateOneMP(MPused.id, {
        availableBudget: MPused.availableBudget - discountMoneyByMoneyPromotion,
      });
    }
  }

  if (voucherUsed) {
    await promotionApi.addResult({
      isSuccess: true,
      note: "Được khuyến mãi khi mua hàng",
      BillId: billId,
      VoucherId: voucherUsed.id,
      discountMoneyByVoucher,
    });
  }

  // create store
  res = await storeApi.addMany({
    data: storeTrans.map((item) => {
      return {
        quantity: item.quantity,
        ProductUnitTypeId: item.ProductUnitTypeId,
        type: item.type,
      };
    }),
  });

  // cộng lại số lượng đã trừ trước khi tạo bill

  // for (const item of storeTrans) {
  //   let productId = item.productId;
  //   let convertionQuantity = item.convertionQuantity;
  //   let quantity = item.quantity * -1;
  //   let quantityChange = quantity * convertionQuantity;
  //   if (!_quantitys[productId]) {
  //     _quantitys[productId] = 0;
  //   }
  //   _quantitys[productId] += quantityChange;
  // }

  // let productIds = Object.keys(_quantitys);

  // for (const productId of productIds) {
  //   await productApi.updateQuantity(productId, _quantitys[productId]);
  // }
}
