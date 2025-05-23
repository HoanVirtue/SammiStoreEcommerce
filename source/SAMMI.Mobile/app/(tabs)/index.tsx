import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, Pressable, RefreshControl, StatusBar, TextInput, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Category } from '@/domain/entities/Category';
import { ChevronRight, Search } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { LoadingIndicator } from '@/presentation/components/LoadingIndicator';
import { ErrorView } from '@/presentation/components/ErrorView';
import { SearchBar } from '@/presentation/components/SearchBar';
import { ProductCard } from '@/presentation/components/ProductCard';
import { getAllProducts } from '@/services/product';
import { TProduct } from '@/types/product';
import { useAuth } from '@/hooks/useAuth';
import HotSale from '@/presentation/components/HotSale';
import { Banner } from '@/presentation/components/Banner';
import TopSale from '@/presentation/components/TopSale';
import VoucherList from '@/presentation/components/VoucherList';

export default function HomeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [publicProducts, setPublicProducts] = useState<TProduct[]>([]);
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshTrigger(prev => prev + 1);
    setRefreshing(false);
  }, []);

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

  const renderHeader = () => (
    <View style={styles.searchContainer}>
      <Search size={20} color={colors.textSecondary} />
      <TextInput
        placeholder="Tìm kiếm sản phẩm..."
        value=""
        editable={false}
        onPress={() => router.push('/search')}
        style={styles.searchInput}
      />
    </View>
  );

  const renderVoucherList = () => (
    <View style={styles.voucherListContainer}>
      <VoucherList />
    </View>
  );

  const renderHotSale = () => (
    <View style={styles.hotSaleContainer}>
      <HotSale refreshTrigger={refreshTrigger} />
    </View>
  );

  const renderTopSale = () => (
    <View style={styles.topSaleContainer}>
      <TopSale />
    </View>
  );

  const renderItem = () => null; // We don't need to render items since we're using sections

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={[1]}
        renderItem={renderItem}
        keyExtractor={() => 'home'}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        ListHeaderComponent={
          <>
            {renderHeader()}
            {renderVoucherList()}
            {renderHotSale()}
            {renderTopSale()}
          </>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingTop: Platform.OS === 'ios' ? 40 : 30,
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
  topSaleContainer: {
    marginTop: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 16,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: colors.text,
    height: '100%',
  },
  voucherListContainer: {
    marginTop: 16,
  },
});