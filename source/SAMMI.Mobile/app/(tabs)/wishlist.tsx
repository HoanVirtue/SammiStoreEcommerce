import React, { useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { ProductCard } from '@/presentation/components/ProductCard';
import { LoadingIndicator } from '@/presentation/components/LoadingIndicator';
import { ErrorView } from '@/presentation/components/ErrorView';
import { Button } from '@/presentation/components/Button';
import { Product } from '@/domain/entities/Product';
import { Heart } from 'lucide-react-native';

export default function WishlistScreen() {
  const router = useRouter();


  useEffect(() => {
    // fetchUser();
    // fetchProducts();
  }, []);

  // const wishlistProducts = products.filter(
  //   product => user?.wishlist.includes(product.id)
  // );
  const wishlistProducts: any[] = [];


  const handleProductPress = (product: Product) => {
    // fetchProductById(product.id);
    router.push(`/product/${product.id}`);
  };

  const handleShopNow = () => {
    router.back();
  };

  // if (isLoading && wishlistProducts.length === 0) {
  //   return <LoadingIndicator fullScreen />;
  // }

  // if (error) {
  //   return <ErrorView message={error} onRetry={fetchUser} />;
  // }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Sản phẩm yêu thích</Text>
        <Text style={styles.subtitle}>
          {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'}
        </Text>
      </View>

      {wishlistProducts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Heart size={64} color={colors.primaryLight} />
          <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
          <Text style={styles.emptyText}>
            Save your favorite products to buy them later
          </Text>
          <Button
            title="Shop Now"
            onPress={handleShopNow}
            style={styles.shopButton}
          />
        </View>
      ) : (
        <FlatList
          data={wishlistProducts}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              {/* <ProductCard product={item} onPress={handleProductPress} /> */}
            </View>
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
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
    backgroundColor: colors.white,
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
  listContent: {
    padding: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  productItem: {
    width: '48%',
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
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
});