import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { useCartStore } from '@/presentation/stores/cartStore';
import { CartItemComponent } from '@/presentation/components/CartItem';
import { LoadingIndicator } from '@/presentation/components/LoadingIndicator';
import { ErrorView } from '@/presentation/components/ErrorView';
import { Button } from '@/presentation/components/Button';
import { ShoppingBag } from 'lucide-react-native';

export default function CartScreen() {
  const router = useRouter();
  const { 
    cart, 
    isLoading, 
    error,
    fetchCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCartStore();
  
  useEffect(() => {
    fetchCart();
  }, []);
  
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };
  
  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };
  
  const handleClearCart = () => {
    clearCart();
  };
  
  const handleCheckout = () => {
    router.push('/checkout');
  };
  
  const handleContinueShopping = () => {
    router.push('/');
  };
  
  if (isLoading && cart.items.length === 0) {
    return <LoadingIndicator fullScreen />;
  }
  
  if (error) {
    return <ErrorView message={error} onRetry={fetchCart} />;
  }
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.header}>
        <Text style={styles.title}>Shopping Cart</Text>
        <Text style={styles.subtitle}>
          {cart.totalItems} {cart.totalItems === 1 ? 'item' : 'items'}
        </Text>
      </View>
      
      {cart.items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <ShoppingBag size={64} color={colors.primaryLight} />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptyText}>
            Add products to your cart to checkout
          </Text>
          <Button 
            title="Continue Shopping" 
            onPress={handleContinueShopping} 
            style={styles.shopButton}
          />
        </View>
      ) : (
        <>
          <ScrollView style={styles.itemsContainer}>
            {cart.items.map((item) => (
              <CartItemComponent
                key={item.id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem}
              />
            ))}
          </ScrollView>
          
          <View style={styles.footer}>
            <View style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>${cart.subtotal.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Shipping</Text>
                <Text style={styles.summaryValue}>$0.00</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>${cart.subtotal.toFixed(2)}</Text>
              </View>
            </View>
            
            <View style={styles.buttonsContainer}>
              <Button 
                title="Checkout" 
                onPress={handleCheckout} 
                style={styles.checkoutButton}
              />
              <Button 
                title="Clear Cart" 
                onPress={handleClearCart} 
                variant="outline"
                style={styles.clearButton}
              />
            </View>
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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  itemsContainer: {
    flex: 1,
    padding: 16,
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
  summaryContainer: {
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  summaryValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  buttonsContainer: {
    gap: 12,
  },
  checkoutButton: {
    width: '100%',
  },
  clearButton: {
    width: '100%',
  },
});