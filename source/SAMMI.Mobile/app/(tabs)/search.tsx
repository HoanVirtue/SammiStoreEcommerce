import React, { useState, useCallback, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, TouchableOpacity, StatusBar, Image, Pressable, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { Search, X, Clock, Trash2 } from 'lucide-react-native';
import { getAllProducts, getSuggestProduct } from '@/services/product';
import {  TParamsGetSuggest, TParamsSuggestProduct, TProduct } from '@/types/product';
import { ProductCard } from '@/presentation/components/ProductCard';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

type RootStackParamList = {
  ProductDetail: { productId: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductDetail'>;

export default function Search1Screen() {
  const navigation = useNavigation<NavigationProp>();
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [allSuggestions, setAllSuggestions] = useState<any[]>([]);
  const [products, setProducts] = useState<TProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const searchInputRef = useRef<TextInput>(null);
  const [hotKeywords] = useState([
    'Son môi',
    'Kem dưỡng da',
    'Serum',
    'Tẩy trang',
    'Sữa rửa mặt',
    'Kem chống nắng',
    'Mặt nạ',
    'Toner',
    'Kem nền',
    'Phấn phủ'
  ]);

  useFocusEffect(
    useCallback(() => {
      // Focus the input when the screen is focused
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }, [])
  );

  // Load search history when component mounts
  useEffect(() => {
    loadSearchHistory();
  }, []);

  const loadSearchHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('searchHistory');
      if (history) {
        setSearchHistory(JSON.parse(history));
      }
    } catch (error) {
      console.error('Error loading search history:', error);
    }
  };

  const saveSearchHistory = async (text: string) => {
    try {
      const newHistory = [text, ...searchHistory.filter(item => item !== text)].slice(0, 10);
      setSearchHistory(newHistory);
      await AsyncStorage.setItem('searchHistory', JSON.stringify(newHistory));
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  };

  const clearSearchHistory = async () => {
    try {
      await AsyncStorage.removeItem('searchHistory');
      setSearchHistory([]);
    } catch (error) {
      console.error('Error clearing search history:', error);
    }
  };

  const fetchSuggestions = useCallback(async (text: string) => {
    if (text.length < 2) {
      setSuggestions([]);
      setAllSuggestions([]);
      return;
    }
    try {
      const params: TParamsGetSuggest = {
        keyWord: text,
        size: 7
      };
      const response = await getSuggestProduct({ params });
      const results = response?.result || [];
      setAllSuggestions(results);
      setSuggestions(results.slice(0, 4));
      setShowAllSuggestions(false);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchSuggestions(searchText);
    }, 200);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText, fetchSuggestions]);

  const convertToTProduct = (item: any): TProduct => ({
    id: item.id,
    code: item.code,
    name: item.name,
    stockQuantity: 0,
    price: item.price,
    discount: item.discount,
    ingredient: '',
    uses: '',
    usageGuide: '',
    brandId: 0,
    categoryId: 0,
    status: 1,
    startDate: null,
    endDate: null,
    images: item.productImage
      ? [{ imageUrl: item.productImage, imageBase64: '', publicId: '', typeImage: '', value: '', id: 0, displayOrder: 0 }]
      : [],
  });

  const handleSearch = async () => {
    if (!searchText.trim()) return;
    const products = (allSuggestions || []).map(convertToTProduct);
    console.log('products', products[0].images[0].imageUrl);
    setProducts(products);
    setShowSuggestions(false);
    saveSearchHistory(searchText.trim());
    // setIsLoading(true);
    // try {
    //   const params: TParamsGetSuggest = {
    //     keyWord: searchText,
    //     size: 7
    //   };
    //   const response = await getSuggestProduct({ params });
    //   console.log('response', response);
    //   setProducts(response?.result.map(convertToTProduct) || []);
    //   setShowSuggestions(false);
    //   saveSearchHistory(searchText.trim());
    // } catch (error) {
    //   console.error('Error searching products:', error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const handleProductPress = (product: any) => {
    router.push(`/product/${product.id}`);
  };

  const handleSuggestionPress = (suggestion: TParamsSuggestProduct) => {
    setSearchText(suggestion.name);
    setShowSuggestions(false);
    // handleSearch();
    handleProductPress(suggestion);
  };

  const handleViewMore = () => {
    setSuggestions(allSuggestions);
    setShowAllSuggestions(true);
  };

  const handleHistoryPress = (text: string) => {
    setSearchText(text);
    handleSearch();
  };

  const renderContent = () => {
    if (suggestions.length > 0) {
      return renderSuggestions();
    }

    return (
      <>
        {searchText && products.length === 0 && (
          <View style={styles.suggestionsContainer}>
            <View style={styles.suggestionItem}>
              <Text style={styles.noResultsText}>
                Không tìm thấy kết quả của "{searchText}"
              </Text>
            </View>
          </View>
        )}

        {products.length > 0 && (
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.productItemContainer}>
                  <ProductCard product={item} />
              </View>
              // <ProductCard
              //   product={item}
              //   onPress={handleProductPress}
              // />
            )}
            numColumns={2}
            contentContainerStyle={styles.productsContainer}
          />
        )}

        {searchHistory.length > 0 && (
          <View style={styles.historyContainer}>
            <View style={styles.historyHeader}>
              <Text style={styles.historyTitle}>Lịch sử tìm kiếm</Text>
              <Pressable onPress={clearSearchHistory}>
                <Text style={styles.clearHistoryText}>Xóa tất cả</Text>
              </Pressable>
            </View>
            {searchHistory.map((item, index) => (
              <Pressable
                key={index}
                style={styles.historyItem}
                onPress={() => handleHistoryPress(item)}
              >
                <Search size={16} color={colors.textSecondary} />
                <Text style={styles.historyText}>{item}</Text>
              </Pressable>
            ))}
          </View>
        )}

        <View style={styles.hotKeywordsContainer}>
          <Text style={styles.hotKeywordsTitle}>Từ khóa hot</Text>
          <View style={styles.hotKeywordsList}>
            {hotKeywords.map((keyword, index) => (
              <Pressable
                key={index}
                style={styles.hotKeywordItem}
                onPress={() => handleHistoryPress(keyword)}
              >
                <Text style={styles.hotKeywordText}>{keyword}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </>
    );
  };

  const renderSuggestions = () => {
    if (showSuggestions) {
      if (suggestions.length > 0) {
        return (
          <View style={styles.suggestionsContainer}>
            {suggestions.map((item) => (
              <TouchableOpacity
                key={item.id.toString()}
                style={styles.suggestionItem}
                onPress={() => handleSuggestionPress(item)}
              >
                <Image 
                  source={{ uri: item.productImage }} 
                  style={styles.suggestionImage}
                  resizeMode="cover"
                />
                <View style={styles.suggestionContent}>
                  <Text style={styles.suggestionText} numberOfLines={2}>{item.name}</Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.suggestionPrice}>{item.newPrice?.toLocaleString('vi-VN')}đ</Text>
                    {item.newPrice > item.price && (
                      <Text style={styles.originalPrice}>{item.price?.toLocaleString('vi-VN')}đ</Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
            {!showAllSuggestions && allSuggestions.length > 4 && (
              <TouchableOpacity 
                style={styles.viewMoreButton}
                onPress={handleViewMore}
              >
                <Text style={styles.viewMoreText}>Xem thêm {allSuggestions.length - 4} sản phẩm</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      }
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color={colors.textSecondary} />
          <TextInput
            ref={searchInputRef}
            style={styles.searchInput}
            placeholder="Tìm kiếm sản phẩm..."
            value={searchText}
            autoFocus={true}
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => {
              setSearchText(text);
              setShowSuggestions(true);
            }}
            onSubmitEditing={handleSearch}
          />
          {searchText.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setSearchText('');
                setSuggestions([]);
                setAllSuggestions([]);
                setShowAllSuggestions(false);
              }}
            >
              <X size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {renderContent()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: colors.text,
  },
  suggestionsContainer: {
    backgroundColor: colors.white,
    borderRadius: 8,
    elevation: 4,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 4,
    marginHorizontal: 16,
  },
  suggestionItem: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: 'center',
  },
  suggestionImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  suggestionContent: {
    flex: 1,
  },
  suggestionText: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  suggestionPrice: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  originalPrice: {
    fontSize: 12,
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  viewMoreButton: {
    padding: 12,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
  },
  viewMoreText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  productsContainer: {
    padding: 16,
  },
  historyContainer: {
    backgroundColor: colors.white,
    borderRadius: 8,
    marginTop: 4,
    marginHorizontal: 16,
    padding: 12,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  historyText: {
    marginLeft: 12,
    fontSize: 14,
    color: colors.text,
  },
  noResultsText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    width: '100%',
  },
  clearHistoryText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  hotKeywordsContainer: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  hotKeywordsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  hotKeywordsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  hotKeywordItem: {
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  hotKeywordText: {
    fontSize: 14,
    color: colors.text,
  },
  productItemContainer: {
    // Calculates width for 2 columns with spacing
    width: (Dimensions.get('window').width - 40) / 2,
    marginBottom: 10,
     // Adjust based on numColumns and desired spacing
 },
});