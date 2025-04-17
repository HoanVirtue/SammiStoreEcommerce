import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { StyleSheet, View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { Button } from '@/presentation/components/Button';
import { ShoppingBag, Check } from 'lucide-react-native';
import { CartItem } from '@/components/CartItem';
import Toast from 'react-native-toast-message';
import { getCarts, createCart, deleteCart } from '@/services/cart';
import { TItemOrderProduct } from '@/types/cart';
import { formatPrice } from '@/utils';
import { getProductDetail } from '@/services/product';
import { isExpired } from '@/utils';
import { useCart } from './_layout';

export default function CartScreen() {
  const { refreshCart } = useCart();
  const [cart, setCart] = useState<{ data: TItemOrderProduct[] }>({ data: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [originalPrice, setOriginalPrice] = useState<number>(0);

  const fetchCart = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getCarts({
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
      setCart({ data: response?.result || [] });
    } catch (error) {
      console.error('Error fetching cart:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to load cart',
      });
      setCart({ data: [] });
    } finally {
      setIsLoading(false);
    }
  }, []);

  
  const memoSelectedProduct = useMemo(() => {
    return cart?.data?.filter((item: TItemOrderProduct) => selectedItems.includes(item.productId)) || [];
}, [selectedItems, cart]);


  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const subtotal = useMemo(() => {
    if (!cart?.data) return 0;
    return cart.data
      .filter((item) => selectedItems.includes(item.productId))
      .reduce((total, item) => {
        const price = item.price || 0;
        const discount = item.discount || 0;
        const quantity = item.quantity || 1;
        const currentPrice = discount > 0 ? (price * (100 - discount)) / 100 : price;
        return total + currentPrice * quantity;
      }, 0);
  }, [cart?.data, selectedItems, discountValue, originalPrice]);

  const handleUpdateQuantity = useCallback(
    async (productId: number, quantity: number) => {
      setCart((prevCart) => ({
        data: prevCart.data.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        ),
      }));

      try {
        const data = {
          cartId: 0,
          productId,
          quantity,
          operation: 2,
        };
        await createCart(data);
        refreshCart();
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Failed to update quantity',
        });
        await fetchCart();
      }
    },
    [fetchCart, refreshCart]
  );

  const handleRemoveItem = useCallback(
    async (productId: number) => {
      try {
        await deleteCart(productId);
        setCart((prevCart) => ({
          data: prevCart.data.filter((item) => item.productId !== productId),
        }));
        setSelectedItems((prev) => prev.filter((id) => id !== productId));
        Toast.show({
          type: 'success',
          text1: 'Item removed from cart',
        });
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Failed to remove item',
        });
        await fetchCart();
      }
    },
    [fetchCart]
  );

  const handleRemoveSelected = useCallback(async () => {
    try {
      for (const productId of selectedItems) {
        await deleteCart(productId);
      }
      setCart((prevCart) => ({
        data: prevCart.data.filter((item) => !selectedItems.includes(item.productId)),
      }));
      setSelectedItems([]);
      Toast.show({
        type: 'success',
        text1: 'Selected items removed from cart',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to remove items',
      });
      await fetchCart();
    }
  }, [selectedItems, fetchCart]);

  const handleContinueShopping = useCallback(() => {
    router.push('/');
  }, []);

  

  const handleCheckout = useCallback(() => {
    const selectedProducts = cart.data.filter((item) => selectedItems.includes(item.productId));
    console.log('Selected products:', selectedProducts);
    if (selectedProducts.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Vui lòng chọn ít nhất một sản phẩm',
      });
      return;
    }

    router.push({
      pathname: '/checkout',
      params: {
        selectedProducts: JSON.stringify(
          memoSelectedProduct.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price || 0,
            discount: item.discount || 0,
            name: item.name || 'Không có tên sản phẩm',
            images: item.images || [],
          }))
        ),
        totalPrice: subtotal.toString(),
      },
    });
  }, [cart.data, selectedItems, subtotal]);

  const handleCheckboxChange = useCallback((productId: number) => {
    setSelectedItems((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  }, []);

  const handleCheckAll = useCallback(() => {
    if (!cart?.data) return;
    const allProductIds = cart.data.map((item) => item.productId);
    const isAllSelected = allProductIds.every((id) => selectedItems.includes(id));
    setSelectedItems(isAllSelected ? [] : allProductIds);
  }, [cart?.data, selectedItems]);

  useEffect(() => {
    const fetchDiscounts = async () => {
      for (const productId of selectedItems) {
        const res = await getProductDetail(productId);
        const data = res?.result;
        if (data) {
          const discount = data.startDate && data.endDate && isExpired(data?.startDate, data.endDate) ? data.discount : 0;
          setDiscountValue(discount);
          setOriginalPrice(data.price);
        }
      }
    };

    if (selectedItems.length > 0) {
      fetchDiscounts();
    }
  }, [selectedItems]);


  const memoSave = useMemo(() => {
    return cart?.data?.reduce((result: number, current: TItemOrderProduct) => {
        const price = originalPrice || 0;
        const discount = discountValue * 100 || 0;
        const quantity = current?.quantity || 1;
        if (discount > 0) {
            const savedPrice = (price * discount) / 100 * quantity;
            return result + savedPrice;
        }
        return result;
    }, 0);
}, [cart?.data, discountValue, originalPrice]);

  const cartItems = useMemo(() => cart?.data || [], [cart?.data]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.header}>
        <Text style={styles.title}>Giỏ hàng của tôi</Text>
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <ShoppingBag size={64} color={colors.primaryLight} />
          <Text style={styles.emptyTitle}>Giỏ hàng trống</Text>
          <Text style={styles.emptyText}>Hãy thêm sản phẩm vào giỏ hàng</Text>
          <Button
            title="Tiếp tục mua sắm"
            onPress={handleContinueShopping}
            style={styles.shopButton}
          />
        </View>
      ) : (
        <>
          <ScrollView style={styles.itemsContainer}>
            <View style={styles.cartHeader}>
              <View style={styles.checkboxContainer}>
                <TouchableOpacity
                  onPress={handleCheckAll}
                  style={[
                    styles.checkbox,
                    selectedItems.length === cartItems.length && styles.checkboxChecked
                  ]}
                >
                  {selectedItems.length === cartItems.length && <Check size={16} color={colors.white} />}
                </TouchableOpacity>
              </View>
              {selectedItems.length > 0 && (
                <Button
                  title="Xóa"
                  onPress={handleRemoveSelected}
                  style={styles.deleteSelectedButton}
                />
              )}
            </View>
            {cartItems.map((item: TItemOrderProduct) => (
              <CartItem
                key={item.productId}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem}
                onCheckboxChange={handleCheckboxChange}
                isChecked={selectedItems.includes(item.productId)}
              />
            ))}
          </ScrollView>

          <View style={styles.footer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>{selectedItems.length} sản phẩm đã chọn</Text>
              <Text style={styles.totalText}>Tạm tính: {formatPrice(subtotal)}</Text>
              {/* {memoSave > 0 && (
                <Text style={styles.saveText}>Tiết kiệm: {formatPrice(memoSave)}</Text>
              )} */}
            </View>
            <Button
              title="Mua hàng"
              onPress={handleCheckout}
              style={styles.checkoutButton}
              disabled={selectedItems.length === 0}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  itemsContainer: {
    flex: 1,
  },
  cartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  checkboxContainer: {
    justifyContent: 'center',
    marginRight: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
  },
  deleteSelectedButton: {
    backgroundColor: colors.error,
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  shopButton: {
    width: 200,
  },
  footer: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  totalContainer: {
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  totalText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  saveText: {
    fontSize: 14,
    color: colors.success,
    marginBottom: 8,
  },
  checkoutButton: {
    backgroundColor: colors.primary,
  },
});