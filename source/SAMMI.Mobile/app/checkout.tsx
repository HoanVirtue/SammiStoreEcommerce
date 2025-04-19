import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native';
import { useAuth } from '@/hooks/useAuth';
import { AppDispatch, RootState } from '@/stores';
import { useDispatch, useSelector } from 'react-redux';
import { PAYMENT_METHOD } from '@/configs/payment';
import { getVoucherDetail } from '@/services/voucher';
import { createOrderAsync } from '@/stores/order/action';
import { ROUTE_CONFIG } from '@/configs/route';
import Toast from 'react-native-toast-message';
import { createVNPayPaymentUrl } from '@/services/payment';
import { getCaculatedFee } from '@/services/delivery-method';
import { getCurrentAddress } from '@/services/address';
import { getAllPaymentMethods } from '@/services/payment-method';
import { formatPrice } from '@/utils';
import { Truck, Wallet, Ticket } from 'lucide-react-native';
import { useLocalSearchParams } from 'expo-router';
import { ProductImage, TProduct } from '../types/product';
import { TParamsAddresses } from '@/types/address';
import AddressModal from './address';
import { getProductDetail } from '@/services/product';
import VoucherModal from './voucher';

// Types và Interfaces
type TItemOrderProduct = {
  productId: number;
  quantity: number;
  images: ProductImage[];
  product: TProduct;
};

interface PaymentOption {
  label: string;
  value: string;
  type: string;
  id: number;
}

interface VoucherResponse {
  result?: {
    discountValue?: number;
  };
}

type TCheckoutResult = {
  totalPrice: number;
  selectedProducts: TItemOrderProduct[];
};

type TOrderDetail = {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  tax?: number;
  amount: number;
};

const CheckoutScreen = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [openVoucher, setOpenVoucher] = useState(false);
  const [paymentOptions, setPaymentOptions] = useState<PaymentOption[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [selectedDelivery, setSelectedDelivery] = useState<string>('');
  const [shippingPrice, setShippingPrice] = useState<number>(0);
  const [leadTime, setLeadTime] = useState<Date | null>(null);
  const [myCurrentAddress, setMyCurrentAddress] = useState<TParamsAddresses>();
  const [selectedVoucherId, setSelectedVoucherId] = useState<number>(0);
  const [voucherDiscount, setVoucherDiscount] = useState<number>(0);
  const params = useLocalSearchParams();
  const [productDetails, setProductDetails] = useState<{ [key: number]: TProduct }>({});

  const { user } = useAuth();
  const navigation = useNavigation();
  const theme = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const PAYMENT_DATA = PAYMENT_METHOD();
  const { addresses } = useSelector((state: RootState) => state.address);

  const deliveryOption = useMemo(
    () => [
      {
        label: 'Giao hàng nhanh',
        value: 'fast_delivery',
        price: shippingPrice,
        leadTime: leadTime,
      },
    ],
    [shippingPrice, leadTime]
  );

  const memoQueryProduct = useMemo((): TCheckoutResult => {
    const result: TCheckoutResult = {
      totalPrice: 0,
      selectedProducts: [],
    };

    try {
      if (params) {
        result.totalPrice = Number(params.totalPrice) || 0;

        if (params.selectedProducts) {
          const parsedProducts = JSON.parse(params.selectedProducts as string);

          result.selectedProducts = parsedProducts.map((item: any) => {
            return {
              productId: item.productId,
              quantity: item.quantity,
              product: {
                price: item.price || 0,
                discount: item.discount || 0,
                name: item.name || 'Không có tên sản phẩm',
              },
              images: item.images || [],
            };
          });
          console.log('Final formatted products:', result.selectedProducts);
        }
      }
    } catch (error) {
      console.error('Error parsing params:', error);
      Toast.show({
        type: 'error',
        text1: 'Lỗi khi tải dữ liệu đơn hàng',
      });
    }

    return result;
  }, [params]);

  const memoShippingPrice = useMemo(() => {
    const shippingPrice = deliveryOption.find((item) => item.value === selectedDelivery)?.price ?? 0;
    return shippingPrice ? Number(shippingPrice) : 0;
  }, [selectedDelivery, deliveryOption]);

  const memoVoucherDiscountPrice = useMemo(() => {
    let discountPrice = 0;
    if (selectedVoucherId) {
      getVoucherDetail(Number(selectedVoucherId)).then((res: VoucherResponse) => {
        const discountPercent = res?.result?.discountValue || 0;
        discountPrice = (Number(memoQueryProduct.totalPrice) * Number(discountPercent)) / 100;
        setVoucherDiscount(discountPrice);
      });
    }
    return discountPrice;
  }, [selectedVoucherId, memoQueryProduct.totalPrice]);

  const handlePlaceOrder = () => {
    if (!selectedPayment) {
      Toast.show({
        type: 'error',
        text1: 'Vui lòng chọn phương thức thanh toán',
      });
      return;
    }

    if (!selectedDelivery) {
      Toast.show({
        type: 'error',
        text1: 'Vui lòng chọn phương thức vận chuyển',
      });
      return;
    }

    const shipping = selectedDelivery ? shippingPrice : 0;
    const subtotal = memoQueryProduct.totalPrice;
    const totalPrice = Number(subtotal) + Number(shipping) - Number(voucherDiscount);

    const orderDetails: TOrderDetail[] = memoQueryProduct.selectedProducts.map((item: TItemOrderProduct) => ({
      id: 0,
      orderId: 0,
      productId: Number(item.productId),
      quantity: item.quantity,
      tax: 0,
      amount: item.product.price * item.quantity * (item.product.discount ? (100 - item.product.discount) / 100 : 1),
    }));

    dispatch(
      createOrderAsync({
        displayOrder: 0,
        customerId: user ? user.id : 0,
        code: '1',
        paymentStatus: '',
        orderStatus: '',
        shippingStatus: '',
        voucherId: Number(selectedVoucherId),
        wardId: myCurrentAddress?.wardId || 0,
        customerAddress: `${myCurrentAddress?.streetAddress}, ${myCurrentAddress?.wardName}, ${myCurrentAddress?.districtName}, ${myCurrentAddress?.provinceName}`,
        costShip: shippingPrice,
        trackingNumber: '',
        estimatedDeliveryDate: new Date(deliveryOption.find((item) => item.value === selectedDelivery)?.leadTime || new Date()),
        actualDeliveryDate: new Date(),
        shippingCompanyId: 0,
        details: orderDetails,
        totalAmount: totalPrice,
        totalQuantity: memoQueryProduct.selectedProducts.reduce((acc: number, item: TItemOrderProduct) => acc + item.quantity, 0),
        discountAmount: memoVoucherDiscountPrice,
        isBuyNow: false,
        paymentMethodId: Number(selectedPayment),
      })
    ).then((res) => {
      if (res?.payload?.isSuccess) {
        const returnUrl = res?.payload?.result?.returnUrl;
        if (returnUrl) {

        } else {
          navigation.navigate(ROUTE_CONFIG.PAYMENT as never);
        }
      } else {
        Toast.show({
          type: 'error',
          text1: res?.payload?.message,
        });
      }
    });
  };

  const onChangeDelivery = (value: string) => setSelectedDelivery(value);
  const onChangePayment = (value: string) => setSelectedPayment(value);

  const handlePaymentVNPay = async (data: { orderId: number; totalPrice: number }) => {
    setLoading(true);
    try {
      const res = await createVNPayPaymentUrl({
        totalPrice: data.totalPrice,
        orderId: +data?.orderId,
        language: 'vn',
      });
      if (res?.result) {
        // Handle payment URL in React Native
      }
    } catch (error) {
      console.error('Error creating VNPay payment URL:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentTypeOrder = (id: string, data: { orderId: number; totalPrice: number }) => {
    switch (id) {
      case PAYMENT_DATA.VN_PAYMENT.value:
        handlePaymentVNPay(data);
        break;
      default:
        break;
    }
  };

  const getShippingFee = async () => {
    if (myCurrentAddress?.wardId && memoQueryProduct.totalPrice) {
      try {
        const res = await getCaculatedFee({
          params: {
            wardId: myCurrentAddress.wardId,
            totalAmount: Math.floor(memoQueryProduct.totalPrice),
          },
        });
        if (res?.result) {
          setShippingPrice(res.result.total);
          setLeadTime(res.result.leadTime);
        }
      } catch (error) {
        console.error('Error calculating shipping fee:', error);
      }
    }
  };

  const getMyCurrentAddress = async () => {
    try {
      const res = await getCurrentAddress();
      setMyCurrentAddress(res?.result);
    } catch (error) {
      console.error('Error getting current address:', error);
    }
  };

  const getListPaymentMethod = async () => {
    setLoading(true);
    try {
      const res = await getAllPaymentMethods({
        params: {
          take: -1,
          skip: 0,
          paging: false,
          orderBy: 'name',
          dir: 'asc',
          keywords: "''",
          filters: '',
        },
      });
      if (res?.result?.subset) {
        setPaymentOptions(
          res.result.subset.map((item: { name: string; id: string; type: string }) => ({
            label: item.name,
            value: item.id,
            type: item.type,
            id: item.id,
          }))
        );
        setSelectedPayment(res.result.subset[0]?.id);
      }
    } catch (error) {
      console.error('Error getting payment methods:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectVoucher = (voucherId: number) => {
    setSelectedVoucherId(voucherId);
    if (voucherId) {
      getVoucherDetail(Number(voucherId)).then((res) => {
        if (res?.result?.discountValue) {
          const discountPercent = res.result.discountValue;
          const discountPrice = (Number(memoQueryProduct.totalPrice) * Number(discountPercent)) / 100;
          setVoucherDiscount(discountPrice);
        }
      });
    } else {
      setVoucherDiscount(0);
    }
  };

  useEffect(() => {
    if (user) {
      getMyCurrentAddress();
    }
  }, [addresses, user]);

  useEffect(() => {
    getListPaymentMethod();
  }, []);

  useEffect(() => {
    getShippingFee();
  }, [myCurrentAddress, memoQueryProduct.totalPrice]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const details: { [key: number]: TProduct } = {};
      for (const item of memoQueryProduct.selectedProducts) {
        try {
          const res = await getProductDetail(item.productId);
          if (res?.result) {
            details[item.productId] = res.result;
          }
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      }
      setProductDetails(details);
    };

    if (memoQueryProduct.selectedProducts.length > 0) {
      fetchProductDetails();
    }
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Shipping Address Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin giao hàng</Text>
          {user ? (
            <View style={styles.addressContainer}>
              <Text style={styles.addressText}>
                {user?.fullName} {user?.phone}
              </Text>
              <Text style={styles.addressText}>
                {myCurrentAddress?.streetAddress}, {myCurrentAddress?.wardName}, {myCurrentAddress?.districtName},{' '}
                {myCurrentAddress?.provinceName}
              </Text>
              <TouchableOpacity style={styles.button} onPress={() => setOpenAddress(true)}>
                <Text style={styles.buttonText}>Thay đổi địa chỉ</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.button} onPress={() => setOpenAddress(true)}>
              <Text style={styles.buttonText}>Thêm địa chỉ</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Delivery Method Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phương thức giao hàng</Text>
          {deliveryOption.map((delivery) => (
            <TouchableOpacity
              key={delivery.value}
              style={[styles.deliveryOption, true && styles.selectedOption]}
              onPress={() => onChangeDelivery(delivery.value)}
            >
              <View style={styles.deliveryInfo}>
                <Truck size={24} color={theme.colors.text} />
                <Text style={styles.deliveryLabel}>{delivery.label}</Text>
                <Text style={styles.deliveryPrice}>{formatPrice(Number(delivery.price))}</Text>
              </View>
              {delivery.leadTime && (
                <Text style={styles.leadTime}>
                  Dự kiến giao hàng: {new Date(delivery.leadTime).toLocaleDateString()}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Payment Method Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
          {paymentOptions.map((payment) => (
            <TouchableOpacity
              key={payment.value}
              style={[styles.paymentOption, selectedPayment === payment.value && styles.selectedOption]}
              onPress={() => onChangePayment(payment.value)}
            >
              <View style={styles.paymentInfo}>
                <Wallet size={24} color={theme.colors.text} />
                <Text style={styles.paymentLabel}>{payment.label}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Voucher Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mã giảm giá</Text>
          <View style={styles.voucherContainer}>
            <View style={styles.voucherInfo}>
              <Ticket size={24} color={theme.colors.primary} />
              <Text style={styles.voucherLabel}>
                {selectedVoucherId ? 'Đã chọn mã giảm giá' : 'Mã giảm giá Sammi'}
              </Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => setOpenVoucher(true)}>
              <Text style={styles.buttonText}>
                {selectedVoucherId ? 'Thay đổi' : 'Chọn mã giảm giá'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Tóm tắt đơn hàng</Text>

          {/* Product List */}
          <View style={styles.productList}>
            {memoQueryProduct.selectedProducts.length === 0 ? (
              <Text style={styles.emptyText}>Không có sản phẩm nào được chọn</Text>
            ) : (
              memoQueryProduct.selectedProducts.map((item: TItemOrderProduct) => {
                const productDetail = productDetails[item.productId];
                return (
                  <View key={`${item.productId}-${item.quantity}`} style={styles.productItem}>
                    <View style={styles.productImageContainer}>
                      {productDetail?.images?.[0]?.imageUrl ? (
                        <Image
                          source={{ uri: productDetail.images[0].imageUrl }}
                          style={styles.productImage}
                          resizeMode="cover"
                        />
                      ) : (
                        <View style={[styles.productImage, styles.placeholderImage]}>
                          <Text style={styles.placeholderText}>Không có ảnh</Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.productInfo}>
                      <Text style={styles.productName}>{productDetail?.name || item.product.name}</Text>
                      <Text style={styles.productQuantity}>Số lượng: {item.quantity}</Text>
                      <Text style={styles.productPrice}>
                        {formatPrice(
                          (productDetail?.price || item.product.price) *
                          (productDetail?.discount ? (100 - productDetail.discount) / 100 : 1) *
                          item.quantity
                        )}
                      </Text>
                    </View>
                  </View>
                );
              })
            )}
          </View>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Tổng tiền hàng</Text>
            <Text style={styles.summaryValue}>{formatPrice(memoQueryProduct.totalPrice)}</Text>
          </View>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Phí vận chuyển</Text>
            <Text style={styles.summaryValue}>{formatPrice(shippingPrice)}</Text>
          </View>

          {voucherDiscount > 0 && (
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Giảm giá từ voucher</Text>
              <Text style={[styles.summaryValue, styles.discountValue]}>-{formatPrice(voucherDiscount)}</Text>
            </View>
          )}

          <View style={styles.summaryTotal}>
            <Text style={styles.totalLabel}>Tổng cộng</Text>
            <Text style={styles.totalValue}>
              {formatPrice(
                memoQueryProduct.totalPrice +
                shippingPrice -
                voucherDiscount
              )}
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.placeOrderButton,
              (!selectedPayment || !selectedDelivery) && styles.disabledButton
            ]}
            onPress={handlePlaceOrder}
            disabled={!selectedPayment || !selectedDelivery}
          >
            <Text style={styles.placeOrderButtonText}>Đặt hàng</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <AddressModal
        open={openAddress}
        onClose={() => setOpenAddress(false)}
      />

      <VoucherModal
        open={openVoucher}
        onClose={() => setOpenVoucher(false)}
        onSelectVoucher={handleSelectVoucher}
        cartDetails={memoQueryProduct.selectedProducts.map(item => ({
          productId: item.productId,
          discount: item.product.discount || 0,
          quantity: item.quantity,
          price: item.product.price,
          productName: item.product.name
        }))}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  addressContainer: {
    marginBottom: 16,
  },
  addressText: {
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
  deliveryOption: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 8,
  },
  selectedOption: {
    borderColor: '#000',
    borderWidth: 2,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  deliveryLabel: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
  },
  deliveryPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  leadTime: {
    fontSize: 14,
    color: '#4CAF50',
    marginLeft: 32,
  },
  paymentOption: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 8,
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentLabel: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
  },
  voucherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  voucherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voucherLabel: {
    fontSize: 16,
    marginLeft: 8,
  },
  summaryContainer: {
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  productList: {
    marginBottom: 16,
  },
  productItem: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  productImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  productQuantity: {
    fontSize: 14,
    color: '#666',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
  },
  summaryTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeOrderButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  placeOrderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginVertical: 16,
  },
  placeholderImage: {
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 14,
    color: '#666',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  discountValue: {
    color: '#4CAF50',
  },
});

export default CheckoutScreen;