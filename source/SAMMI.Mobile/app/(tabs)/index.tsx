import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Category } from '@/domain/entities/Category';
import { Product } from '@/domain/entities/Product';
import { ChevronRight } from 'lucide-react-native';
import { colors } from '@/src/constants/colors';
import { LoadingIndicator } from '@/src/presentation/components/LoadingIndicator';
import { ErrorView } from '@/src/presentation/components/ErrorView';
import { SearchBar } from '@/src/presentation/components/SearchBar';
import { CategoryCard } from '@/src/presentation/components/CategoryCard';
import { ProductCard } from '@/src/presentation/components/ProductCard';
import { useProductStore } from '@/src/presentation/stores/productStore';
import { useUserStore } from '@/src/presentation/stores/userStore';
import { useAuth } from '@/src/hooks/useAuth';
import { getAllProducts } from '@/src/services/product';
import { TProduct } from '@/src/types/product';

export default function HomeScreen() {
  const router = useRouter();
  const {
    featuredProducts,
    categories,
    isLoading,
    error,
    fetchFeaturedProducts,
    fetchCategories,
    setSearchQuery,
    fetchProductById,
  } = useProductStore();

  const { fetchUser } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [publicProducts, setPublicProducts] = useState<TProduct[]>([]);

  const handleGetListProduct = async () => {
    setLoading(true);
    const query = {
      params: {
        take: -1,
        skip: 0,
        paging: false,
        orderBy: "name",
        dir: "asc",
        keywords: "''",
        filters: ""
      },
    };
    try {
      const response = await getAllProducts(query);

      if (response?.result?.subset) {
        setPublicProducts(response.result.subset);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetListProduct();
    fetchFeaturedProducts();
    fetchCategories();
    fetchUser();
  }, []);

  const handleCategoryPress = (category: Category) => {
    router.push(`/search?category=${category.id}`);
  };

  const handleProductPress = (product: TProduct) => {
    fetchProductById(product.id);
    router.push(`/product/${product.id}`);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    router.push('/search');
  };

  const handleViewAll = () => {
    router.push('/search');
  };

  if (isLoading && featuredProducts.length === 0 && categories.length === 0) {
    return <LoadingIndicator fullScreen />;
  }

  if (error && featuredProducts.length === 0 && categories.length === 0) {
    return <ErrorView message={error} onRetry={fetchFeaturedProducts} />;
  }
  // console.log("publicProducts", publicProducts);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello Beautiful !</Text>
          <Text style={styles.subtitle}>Find your beauty essentials cosmetics</Text>
        </View>

        <SearchBar
          value=""
          onSearch={handleSearch}
          onClear={() => { }}
          placeholder="Search for products..."
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Products</Text>
          <View style={styles.productsGrid}>
            {publicProducts.map((product: TProduct) => (
              <View key={product.id} style={styles.productItem}>
                <ProductCard
                  product={product}
                  onPress={handleProductPress}
                  />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onPress={handleCategoryPress}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Products</Text>
            <Pressable style={styles.viewAllButton} onPress={handleViewAll}>
              <Text style={styles.viewAllText}>View All</Text>
              <ChevronRight size={16} color={colors.primary} />
            </Pressable>
          </View>

          {/* <View style={styles.productsGrid}>
            {featuredProducts.map((product) => (
              <View key={product.id} style={styles.productItem}>
                <ProductCard
                  product={product}
                  onPress={handleProductPress}
                />
              </View>
            ))}
          </View> */}
        </View>
      </ScrollView>
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
    paddingTop: 16,
    paddingBottom: 8,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  categoriesContainer: {
    paddingBottom: 8,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productItem: {
    width: '48%',
    marginBottom: 16,
  },
});