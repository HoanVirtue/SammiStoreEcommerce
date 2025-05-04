import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList, Pressable, RefreshControl, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Category } from '@/domain/entities/Category';
import { ChevronRight } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { LoadingIndicator } from '@/presentation/components/LoadingIndicator';
import { ErrorView } from '@/presentation/components/ErrorView';
import { SearchBar } from '@/presentation/components/SearchBar';
import { ProductCard } from '@/presentation/components/ProductCard';
import { getAllProducts } from '@/services/product';
import { TProduct } from '@/types/product';
import { useAuth } from '@/hooks/useAuth';
import HotSale from '@/presentation/components/HotSale';

export default function HomeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [publicProducts, setPublicProducts] = useState<TProduct[]>([]);
  const { user } = useAuth();



  const handleCategoryPress = (category: Category) => {
    // router.push(`/search?category=${category.id}`);
  };

  const handleProductPress = (product: TProduct) => {
    if (product?.id) {
      router.push(`/product/${product.id}`);
    }
  };

  const handleSearch = (query: string) => {
    router.push('/search');
  };

  const handleViewAll = () => {
    router.push('/search');
  };

  if (loading && publicProducts.length === 0) {
    return <LoadingIndicator fullScreen />;
  }


  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Chào {user?.fullName} !</Text>
        </View>

        <SearchBar
          value=""
          onSearch={handleSearch}
          onClear={() => { }}
          placeholder="Tìm kiếm sản phẩm..."
        />

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Sản phẩm bán chạy</Text>
            <Pressable style={styles.viewAllButton} onPress={handleViewAll}>
              <Text style={styles.viewAllText}>Xem tất cả</Text>
              <ChevronRight size={16} color={colors.primary} />
            </Pressable>
          </View>
        </View>
        <View style={styles.hotSaleContainer}>
          <HotSale />
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
  hotSaleContainer: {
    marginTop: 16,
  },
});