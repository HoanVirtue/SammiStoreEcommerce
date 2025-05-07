import React from 'react';
import { StyleSheet, Text, View, Pressable, Image, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { TProduct } from '@/types/product';
import { colors } from '@/constants/colors';
import { Heart, Star } from 'lucide-react-native';
import { formatPrice } from '@/utils';
import { useAuth } from '@/hooks/useAuth';
import { createCartAsync, getCartsAsync } from '@/stores/cart/action';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/stores';
import Toast from 'react-native-toast-message';
import { ROUTE_CONFIG } from '@/configs/route';
import { ProductCardSkeleton } from './ProductCardSkeleton';
import { useCart } from '@/app/(tabs)/_layout';

interface ProductCardProps {
  product: TProduct;
  onPress?: (product: TProduct) => void;
  isLoading?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress, isLoading }) => {
  const router = useRouter();
  const { user } = useAuth();
  const dispatch: AppDispatch = useDispatch();
  const { isSuccessCreate, isErrorCreate, errorMessageCreate } = useSelector((state: RootState) => state.cart);
  const { refreshCart } = useCart();

  if (isLoading) {
    return <ProductCardSkeleton />;
  }

  if (!product) {
    return null;
  }

  const isWishlisted = false;

  const handlePress = () => {
    if (onPress) {
      onPress(product);
    } else {
      router.push(`/product/${product.id}`);
    }
  };

  const handleWishlist = (e: any) => {
    e.stopPropagation();
  };

  const handleAddToCart = (e: any) => {
    e.stopPropagation();

    if (user?.id) {
      dispatch(
        createCartAsync({
          cartId: 0,
          productId: product.id,
          quantity: 1,
          operation: 0,
        })
      ).then(() => {
        if (isSuccessCreate) {
          Toast.show({
            type: 'success',
            text1: 'Thành công',
            text2: 'Thêm vào giỏ hàng thành công'
          });
          // Refetch cart data
          dispatch(getCartsAsync({
            params: {
              take: -1,
              skip: 0,
              paging: false,
              orderBy: "name",
              dir: "asc",
              keywords: "''",
              filters: ""
            }
          }));
          // Add this line to update cart count in layout
          refreshCart();
        } else if (isErrorCreate) {
          Toast.show({
            type: 'error',
            text1: 'Lỗi',
            text2: errorMessageCreate
          });
        }
      });
    } else {
      router.push(ROUTE_CONFIG.LOGIN as any);
    }
  };

  const calculateDiscountedPrice = () => {
    if (product.discount > 0) {
      return product.price * (1 - product.discount / 100);
    }
    return product.price;
  };

  const isOutOfStock = (product.stockQuantity || 0) <= 0;
  const defaultImage = 'https://via.placeholder.com/300';

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
          source={{ uri: product.images?.[0]?.imageUrl || defaultImage }}
          style={styles.image}
          resizeMode="cover"
        />

        {(product.discount || 0) > 0 && (
          <View style={[styles.badge, styles.discountBadge]}>
            <Text style={styles.badgeText}>-{(product.discount || 0) * 100}%</Text>
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
        <Text style={styles.name} numberOfLines={2}>{product.name || 'Unnamed Product'}</Text>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>{formatPrice(calculateDiscountedPrice())}</Text>
          {(product.discount || 0) > 0 && (
            <Text style={styles.originalPrice}>{formatPrice(product.price || 0)}</Text>
          )}
        </View>

        <View style={styles.stockContainer}>
          <Text style={[
            styles.stockText,
            isOutOfStock ? styles.outOfStock : styles.inStock
          ]}>
            {isOutOfStock ? 'Hết hàng' : `Còn ${product.stockQuantity || 0} sản phẩm`}
          </Text>
        </View>
      </View>
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
    paddingBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
    height: 40,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
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
    marginBottom: 10,
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
  }
});