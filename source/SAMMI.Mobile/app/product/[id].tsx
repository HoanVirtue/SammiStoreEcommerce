import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  Dimensions,
  FlatList
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { useProductStore } from '@/presentation/stores/productStore';
import { useCartStore } from '@/presentation/stores/cartStore';
import { useUserStore } from '@/presentation/stores/userStore';
import { LoadingIndicator } from '@/presentation/components/LoadingIndicator';
import { ErrorView } from '@/presentation/components/ErrorView';
import { Button } from '@/presentation/components/Button';
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  Star,
  Minus,
  Plus,
  ChevronDown,
  ChevronUp
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { selectedProduct, isLoading, error, fetchProductById } = useProductStore();
  const { addToCart } = useCartStore();
  const { isInWishlist, toggleWishlist } = useUserStore();

  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showDescription, setShowDescription] = useState(true);
  const [showIngredients, setShowIngredients] = useState(false);
  const [showHowToUse, setShowHowToUse] = useState(false);

  const isWishlisted = selectedProduct ? isInWishlist(selectedProduct.id) : false;

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
  }, [id]);

  const handleGoBack = () => {
    router.back();
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart(selectedProduct, quantity);
    }
  };

  const handleToggleWishlist = () => {
    if (selectedProduct) {
      toggleWishlist(selectedProduct.id);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const toggleIngredients = () => {
    setShowIngredients(!showIngredients);
  };

  const toggleHowToUse = () => {
    setShowHowToUse(!showHowToUse);
  };

  if (isLoading) {
    return <LoadingIndicator fullScreen />;
  }

  if (error || !selectedProduct) {
    return <ErrorView message={error || 'Product not found'} onRetry={() => id && fetchProductById(id)} />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.header}>
        <Pressable onPress={handleGoBack} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </Pressable>

        <Pressable onPress={handleToggleWishlist} style={styles.wishlistButton}>
          <Heart
            size={24}
            color={isWishlisted ? colors.primary : colors.text}
            fill={isWishlisted ? colors.primary : 'transparent'}
          />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <FlatList
            data={selectedProduct.imageUrls}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
              const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
              setActiveImageIndex(newIndex);
            }}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                style={styles.image}
                resizeMode="cover"
              />
            )}
            keyExtractor={(_, index) => index.toString()}
          />

          <View style={styles.pagination}>
            {selectedProduct.imageUrls.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === activeImageIndex && styles.paginationDotActive
                ]}
              />
            ))}
          </View>

          {selectedProduct.isNew && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>NEW</Text>
            </View>
          )}

          {selectedProduct.isOnSale && (
            <View style={[styles.badge, styles.saleBadge]}>
              <Text style={styles.badgeText}>SALE</Text>
            </View>
          )}
        </View>

        <View style={styles.content}>
          <Text style={styles.brand}>{selectedProduct.brand}</Text>
          <Text style={styles.name}>{selectedProduct.name}</Text>

          <View style={styles.ratingContainer}>
            <Star size={16} color={colors.warning} fill={colors.warning} />
            <Text style={styles.rating}>{selectedProduct.rating.toFixed(1)}</Text>
            <Text style={styles.reviews}>({selectedProduct.reviewCount} reviews)</Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            {selectedProduct.originalPrice && (
              <Text style={styles.originalPrice}>${selectedProduct.originalPrice.toFixed(2)}</Text>
            )}
          </View>

          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Quantity</Text>
            <View style={styles.quantityControls}>
              <Pressable
                style={[styles.quantityButton, quantity <= 1 && styles.quantityButtonDisabled]}
                onPress={handleDecreaseQuantity}
                disabled={quantity <= 1}
              >
                <Minus size={16} color={quantity <= 1 ? colors.textSecondary : colors.text} />
              </Pressable>

              <Text style={styles.quantity}>{quantity}</Text>

              <Pressable style={styles.quantityButton} onPress={handleIncreaseQuantity}>
                <Plus size={16} color={colors.text} />
              </Pressable>
            </View>
          </View>

          <Pressable style={styles.section} onPress={toggleDescription}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Description</Text>
              {showDescription ? (
                <ChevronUp size={20} color={colors.text} />
              ) : (
                <ChevronDown size={20} color={colors.text} />
              )}
            </View>

            {showDescription && (
              <Text style={styles.sectionContent}>{selectedProduct.description}</Text>
            )}
          </Pressable>

          {selectedProduct.ingredients && (
            <Pressable style={styles.section} onPress={toggleIngredients}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Ingredients</Text>
                {showIngredients ? (
                  <ChevronUp size={20} color={colors.text} />
                ) : (
                  <ChevronDown size={20} color={colors.text} />
                )}
              </View>

              {showIngredients && (
                <Text style={styles.sectionContent}>{selectedProduct.ingredients}</Text>
              )}
            </Pressable>
          )}

          {selectedProduct.howToUse && (
            <Pressable style={styles.section} onPress={toggleHowToUse}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>How to Use</Text>
                {showHowToUse ? (
                  <ChevronUp size={20} color={colors.text} />
                ) : (
                  <ChevronDown size={20} color={colors.text} />
                )}
              </View>

              {showHowToUse && (
                <Text style={styles.sectionContent}>{selectedProduct.howToUse}</Text>
              )}
            </Pressable>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Add to Cart"
          onPress={handleAddToCart}
          icon={<ShoppingBag size={18} color={colors.white} />}
          style={styles.addToCartButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    zIndex: 10,
    marginTop: 24
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  wishlistButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width,
    height: 400,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: colors.primary,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  badge: {
    position: 'absolute',
    top: 16,
    left: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  saleBadge: {
    backgroundColor: colors.error,
    left: 80,
  },
  badgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  brand: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rating: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
    marginLeft: 4,
  },
  reviews: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  originalPrice: {
    fontSize: 18,
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  quantityButton: {
    padding: 12,
    backgroundColor: colors.card,
  },
  quantityButtonDisabled: {
    backgroundColor: colors.border,
  },
  quantity: {
    paddingHorizontal: 20,
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  sectionContent: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
    marginTop: 12,
  },
  footer: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  addToCartButton: {
    width: '100%',
  },
});