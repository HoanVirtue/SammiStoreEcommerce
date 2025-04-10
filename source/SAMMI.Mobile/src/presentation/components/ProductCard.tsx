import React from 'react';
import { StyleSheet, Text, View, Pressable, Image, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { TProduct } from '@/src/types/product';
import { colors } from '@/src/constants/colors';
import { Heart, ShoppingBag, Star } from 'lucide-react-native';
import { useUserStore } from '../stores/userStore';
import { useCartStore } from '../stores/cartStore';
import { formatPrice } from '@/src/utils';

interface ProductCardProps {
  product: TProduct;
  onPress?: (product: TProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const router = useRouter();
  const { isInWishlist, toggleWishlist } = useUserStore();
  const { addToCart } = useCartStore();

  const isWishlisted = isInWishlist(product.id.toString());

  const handlePress = () => {
    if (onPress) {
      onPress(product);
    } else {
      router.push(`/product/${product.id}`);
    }
  };

  const handleWishlist = (e: any) => {
    e.stopPropagation();
    toggleWishlist(product.id.toString());
  };

  const handleAddToCart = (e: any) => {
    e.stopPropagation();
    // addToCart(product, 1);
  };

  const calculateDiscountedPrice = () => {
    if (product.discount > 0) {
      return product.price * (1 - product.discount / 100);
    }
    return product.price;
  };

  const isOutOfStock = product.stockQuantity <= 0;

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
          source={{ uri: product.images[0]?.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />

        {product.discount > 0 && (
          <View style={[styles.badge, styles.discountBadge]}>
            <Text style={styles.badgeText}>-{product.discount * 100}%</Text>
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
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>{formatPrice(calculateDiscountedPrice())}</Text>
          {product.discount > 0 && (
            <Text style={styles.originalPrice}>{formatPrice(product.price)}</Text>
          )}
        </View>

        <View style={styles.stockContainer}>
          <Text style={[
            styles.stockText,
            isOutOfStock ? styles.outOfStock : styles.inStock
          ]}>
            {isOutOfStock ? 'Hết hàng' : `Còn ${product.stockQuantity} sản phẩm`}
          </Text>
        </View>
      </View>

      <Pressable
        style={[
          styles.addToCartButton,
          isOutOfStock && styles.disabledButton
        ]}
        onPress={handleAddToCart}
        disabled={isOutOfStock}
      >
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
  },
  discountBadge: {
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
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    height: 40,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
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
  stockContainer: {
    marginBottom: 8,
  },
  stockText: {
    fontSize: 12,
    fontWeight: '500',
  },
  inStock: {
    color: colors.success,
  },
  outOfStock: {
    color: colors.error,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 8,
    gap: 6,
  },
  disabledButton: {
    backgroundColor: colors.textSecondary,
    opacity: 0.7,
  },
  addToCartText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
});