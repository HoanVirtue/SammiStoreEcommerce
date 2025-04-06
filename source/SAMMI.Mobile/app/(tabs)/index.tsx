import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { useProductStore } from '@/presentation/stores/productStore';
import { useUserStore } from '@/presentation/stores/userStore';
import { ProductCard } from '@/presentation/components/ProductCard';
import { CategoryCard } from '@/presentation/components/CategoryCard';
import { SearchBar } from '@/presentation/components/SearchBar';
import { LoadingIndicator } from '@/presentation/components/LoadingIndicator';
import { ErrorView } from '@/presentation/components/ErrorView';
import { Category } from '@/domain/entities/Category';
import { Product } from '@/domain/entities/Product';
import { ChevronRight } from 'lucide-react-native';

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
  
  useEffect(() => {
    fetchFeaturedProducts();
    fetchCategories();
    fetchUser();
  }, []);
  
  const handleCategoryPress = (category: Category) => {
    router.push(`/search?category=${category.id}`);
  };
  
  const handleProductPress = (product: Product) => {
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
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello Beautiful!</Text>
          <Text style={styles.subtitle}>Find your beauty essentials</Text>
        </View>
        
        <SearchBar 
          value="" 
          onSearch={handleSearch} 
          onClear={() => {}} 
          placeholder="Search for products..."
        />
        
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
          
          <View style={styles.productsGrid}>
            {featuredProducts.map((product) => (
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
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>New Arrivals</Text>
            <Pressable style={styles.viewAllButton} onPress={handleViewAll}>
              <Text style={styles.viewAllText}>View All</Text>
              <ChevronRight size={16} color={colors.primary} />
            </Pressable>
          </View>
          
          <View style={styles.productsGrid}>
            {featuredProducts
              .filter(product => product.isNew)
              .slice(0, 4)
              .map((product) => (
                <View key={product.id} style={styles.productItem}>
                  <ProductCard 
                    product={product} 
                    onPress={handleProductPress} 
                  />
                </View>
              ))}
          </View>
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