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
import Toast from 'react-native-toast-message';
import { getCaculatedFee } from '@/services/delivery-method';
import { getCurrentAddress } from '@/services/address';
import { getAllPaymentMethods } from '@/services/payment-method';
import { getCartData } from '@/services/cart';
import { formatPrice } from '@/utils';
import { Truck, Wallet, Ticket } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ProductImage, TProduct } from '../types/product';
import { TParamsAddresses } from '@/types/address';
import AddressModal from './address';
import VoucherModal from './voucher';
import { colors } from '@/constants/colors';
import { WebView } from 'react-native-webview';

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [showWebView, setShowWebView] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  const { user } = useAuth();
  const navigation = useNavigation();
  const router = useRouter();
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
        }
      }
    } catch (error) {
      console.error('Error parsing params:', error);
      Toast.show({
        type: 'error',
        text1: 'Lỗi khi tải dữ liệu đơn hàng',
        text2: 'Vui lòng thử lại sau.'
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
    setIsLoading(true);
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
        platForm: 'App',
        paymentMethodId: Number(selectedPayment),
      })
    ).then(async (res) => {
      console.log('checkout vnpay res', res);
      if (res?.payload?.isSuccess) {
        const resultData = res.payload.result;
        const orderId = resultData?.orderId;
        const returnUrl = resultData?.returnUrl;
        const totalPriceFromApi = resultData?.totalAmount;
        const finalTotalPrice = totalPriceFromApi !== undefined
          ? totalPriceFromApi
          : (memoQueryProduct.totalPrice + shippingPrice - voucherDiscount);

        if (returnUrl) {
          router.push({
            pathname: 'vnpayview' as any,
            params: {
              paymentUrl: returnUrl,
              orderId: orderId,
              totalPrice: finalTotalPrice,
            }
          });
        } else {
          router.push({
            pathname: 'payment/vnpay' as any,
            params: {
              orderId: orderId,
              totalPrice: finalTotalPrice,
              paymentStatus: 'pending',
            }
          });
        }
      } else {
        Toast.show({
          type: 'error',
          text1: res?.payload?.message || 'Đặt hàng thất bại',
          text2: 'Vui lòng thử lại sau.'
        });
      }
    }).finally(() => {
      setIsLoading(false);
    });
  };

  const onChangeDelivery = (value: string) => setSelectedDelivery(value);
  const onChangePayment = (value: string) => setSelectedPayment(value);

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

  const productIdsString = useMemo(() => {
    return memoQueryProduct.selectedProducts.map((p) => p.productId).join(',');
  }, [memoQueryProduct.selectedProducts]);

  useEffect(() => {
    const fetchCartData = async () => {
      if (memoQueryProduct.selectedProducts.length > 0) {
        setLoading(true);
        try {
          const response = await getCartData({
            params: { productIds: productIdsString }
          });
          if (response?.isSuccess && response?.result) {
            const itemsWithQuantity = response.result.map((item: any) => {
              const originalProduct = memoQueryProduct.selectedProducts.find(p => p.productId === item.productId);
              return {
                ...item,
                quantity: originalProduct?.quantity || 0
              };
            });
            setCartItems(itemsWithQuantity);
          }
        } catch (error) {
          console.error('Error fetching cart data:', error);
          Toast.show({
            type: 'error',
            text1: 'Lỗi khi tải dữ liệu giỏ hàng',
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCartData();
  }, [productIdsString]);

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

        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Tóm tắt đơn hàng</Text>

          <View style={styles.productList}>
            {cartItems.length === 0 ? (
              <Text style={styles.emptyText}>Không có sản phẩm nào được chọn</Text>
            ) : (
              cartItems.map((item: any) => {
                return (
                  <View key={`${item.productId}-${item.quantity}`} style={styles.productItem}>
                    <View style={styles.productImageContainer}>
                      {item.productImage ? (
                        <Image
                          source={{ uri: item.productImage }}
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
                      <Text style={styles.productName}>{item.productName}</Text>
                      <Text style={styles.productQuantity}>Số lượng: {item.quantity}</Text>
                      <Text style={styles.productPrice}>
                        {formatPrice(
                          item.newPrice * item.quantity
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
            style={[styles.placeOrderButton]}
            onPress={handlePlaceOrder}
          >
            <Text style={styles.placeOrderButtonText}>
              {
                isLoading ? <ActivityIndicator size="small" color={colors.white} /> : 'Đặt hàng'
              }
            </Text>
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

      {showWebView && (
        <View style={styles.webViewContainer}>
          {isPaymentLoading && (
            <View style={styles.loadingOverlay}>
              <View style={styles.loadingContent}>
                <ActivityIndicator size="large" color={colors.white} />
                <Text style={styles.loadingText}>Đang tải trang thanh toán...</Text>
              </View>
            </View>
          )}
          <WebView
            source={{ uri: paymentUrl }}
            style={styles.webView}
            onLoadStart={() => setIsPaymentLoading(true)}
            onLoadEnd={() => setIsPaymentLoading(false)}
            onNavigationStateChange={(navState) => {
              if (navState.url.includes('payment_complete')) {
                setShowWebView(false);
                Toast.show({ type: 'success', text1: 'Thanh toán thành công!' });
                navigation.navigate('order-success' as never);
              } else if (navState.url.includes('payment_failed')) {
                setShowWebView(false);
                Toast.show({ 
                  type: 'error', 
                  text1: 'Thanh toán thất bại',
                  text2: 'Vui lòng thử lại sau'
                });
              }
            }}
          />
        </View>
      )}
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
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  deliveryOption: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 8,
  },
  selectedOption: {
    borderColor: colors.primary,
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
    backgroundColor: colors.primary,
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
  discountValue: {
    color: '#4CAF50',
  },
  webViewContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    zIndex: 1000,
  },
  webView: {
    flex: 1,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1001,
  },
  loadingContent: {
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  loadingText: {
    color: colors.white,
    marginTop: 10,
    fontSize: 16,
  },
});

export default CheckoutScreen;