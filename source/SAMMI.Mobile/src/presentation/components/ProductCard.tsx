import React from 'react';
import { StyleSheet, Text, View, Pressable, Image, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Product } from '@/domain/entities/Product';
import { colors } from '@/src/constants/colors';
import { Heart, ShoppingBag, Star } from 'lucide-react-native';
import { useUserStore } from '../stores/userStore';
import { useCartStore } from '../stores/cartStore';

interface ProductCardProps {
  product: Product;
  onPress?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const router = useRouter();
  const { isInWishlist, toggleWishlist } = useUserStore();
  const { addToCart } = useCartStore();
  
  const isWishlisted = isInWishlist(product.id);
  
  const handlePress = () => {
    if (onPress) {
      onPress(product);
    } else {
      router.push(`/product/${product.id}`);
    }
  };
  
  const handleWishlist = (e: any) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };
  
  const handleAddToCart = (e: any) => {
    e.stopPropagation();
    addToCart(product, 1);
  };
  
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed
      ]}
      onPress={handlePress}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: product.imageUrls[0] }} 
          style={styles.image}
          resizeMode="cover"
        />
        
        {product.isNew && (
          <View style={styles.newBadge}>
            <Text style={styles.badgeText}>NEW</Text>
          </View>
        )}
        
        {product.isOnSale && (
          <View style={[styles.badge, styles.saleBadge]}>
            <Text style={styles.badgeText}>SALE</Text>
          </View>
        )}
        
        <Pressable 
          style={[styles.wishlistButton, isWishlisted && styles.wishlisted]} 
          onPress={handleWishlist}
        >
          <Heart 
            size={18} 
            color={isWishlisted ? colors.white : colors.text} 
            fill={isWishlisted ? colors.primary : 'transparent'} 
          />
        </Pressable>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        
        <View style={styles.ratingContainer}>
          <Star size={14} color={colors.warning} fill={colors.warning} />
          <Text style={styles.rating}>{product.rating.toFixed(1)}</Text>
          <Text style={styles.reviews}>({product.reviewCount})</Text>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          {product.originalPrice && (
            <Text style={styles.originalPrice}>${product.originalPrice.toFixed(2)}</Text>
          )}
        </View>
      </View>
      
      <Pressable style={styles.addToCartButton} onPress={handleAddToCart}>
        <ShoppingBag size={16} color={colors.white} />
        <Text style={styles.addToCartText}>Add</Text>
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    width: '100%',
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  imageContainer: {
    position: 'relative',
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  newBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  saleBadge: {
    backgroundColor: colors.error,
  },
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '600',
  },
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.white,
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  wishlisted: {
    backgroundColor: colors.primaryLight,
  },
  content: {
    padding: 12,
  },
  brand: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    height: 40,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '600',
    marginLeft: 4,
  },
  reviews: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 2,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  originalPrice: {
    fontSize: 14,
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
    marginLeft: 6,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 8,
    gap: 6,
  },
  addToCartText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
});