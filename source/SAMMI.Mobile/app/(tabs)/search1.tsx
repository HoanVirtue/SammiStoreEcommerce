import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { Search, X } from 'lucide-react-native';
import { getAllProducts, getSuggestProduct } from '@/services/product';
import {  TParamsGetSuggest, TParamsSuggestProduct } from '@/types/product';
import { ProductCard } from '@/presentation/components/ProductCard';

export default function Search1Screen() {
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchSuggestions = useCallback(async (text: string) => {
    if (text.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const params: TParamsGetSuggest = {
        keyWord: text,
        size: 5
      };
      const response = await getSuggestProduct({ params });
      setSuggestions(response?.result || []);
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

  const handleSearch = async () => {
    if (!searchText.trim()) return;

    setIsLoading(true);
    try {

      // get product find id
        const params: TParamsGetSuggest = {
            keyWord: searchText,
            size: 5
          };
        const response = await getSuggestProduct({ params });
      setProducts(response?.result || []);
      setShowSuggestions(false);
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionPress = (suggestion: TParamsSuggestProduct) => {
    setSearchText(suggestion.name);
    setShowSuggestions(false);
    handleSearch();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm sản phẩm..."
            value={searchText}
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
              }}
            >
              <X size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {showSuggestions && suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => handleSuggestionPress(item)}
              >
                <Text style={styles.suggestionText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => {/* Handle product press */}}
          />
        )}
        numColumns={2}
        contentContainerStyle={styles.productsContainer}
      />
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
    maxHeight: 200,
    marginTop: 4, // tạo khoảng cách với ô nhập
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  suggestionText: {
    fontSize: 16,
    color: colors.text,
  },
  productsContainer: {
    padding: 16,
  },
}); 