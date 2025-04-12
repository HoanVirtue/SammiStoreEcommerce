import React, { useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { colors } from '@/constants/colors';
import { useProductStore } from '@/presentation/stores/productStore';
import { ProductCard } from '@/presentation/components/ProductCard';
import { SearchBar } from '@/presentation/components/SearchBar';
import { LoadingIndicator } from '@/presentation/components/LoadingIndicator';
import { ErrorView } from '@/presentation/components/ErrorView';
import { Product } from '@/domain/entities/Product';

export default function SearchScreen() {
  const { category } = useLocalSearchParams<{ category?: string }>();

  const {
    products,
    isLoading,
    error,
    searchQuery,
    selectedCategory,
    fetchProducts,
    setSearchQuery,
    fetchProductById,
  } = useProductStore();

  useEffect(() => {
    if (category) {
      fetchProducts(category, searchQuery);
    } else if (selectedCategory || searchQuery) {
      fetchProducts(selectedCategory, searchQuery);
    } else {
      fetchProducts();
    }
  }, [category]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleClear = () => {
    setSearchQuery('');
  };

  const handleProductPress = (product: Product) => {
    fetchProductById(Number(product.id));
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.productItem}>
      <ProductCard product={item} onPress={handleProductPress} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <SearchBar
        value={searchQuery}
        onSearch={handleSearch}
        onClear={handleClear}
      />

      {isLoading && products.length === 0 ? (
        <LoadingIndicator fullScreen />
      ) : error ? (
        <ErrorView
          message={error}
          onRetry={() => fetchProducts(selectedCategory, searchQuery)}
        />
      ) : (
        <>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsText}>
              {products.length} {products.length === 1 ? 'result' : 'results'}
              {selectedCategory ? ` in ${selectedCategory}` : ''}
              {searchQuery ? ` for "${searchQuery}"` : ''}
            </Text>
          </View>

          <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No products found</Text>
              </View>
            }
          />
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
  resultsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  resultsText: {
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
    padding: 20,
    height: 300,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});