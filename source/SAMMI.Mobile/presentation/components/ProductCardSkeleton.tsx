import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors } from '@/constants/colors';
import Animated, { 
  useAnimatedStyle, 
  withRepeat, 
  withTiming,
  useSharedValue,
  withSequence
} from 'react-native-reanimated';

export const ProductCardSkeleton: React.FC = () => {
  const opacity = useSharedValue(0.5);

  React.useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000 }),
        withTiming(0.5, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Animated.View style={[styles.image, animatedStyle]} />
        <View style={[styles.badge, styles.discountBadge]}>
          <Text style={styles.badgeText}>-20%</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Animated.View style={[styles.name, animatedStyle]} />
        <Animated.View style={[styles.name, { width: '80%' }, animatedStyle]} />

        <View style={styles.priceContainer}>
          <Animated.View style={[styles.price, animatedStyle]} />
          <Animated.View style={[styles.originalPrice, animatedStyle]} />
        </View>

        <View style={styles.stockContainer}>
          <Animated.View style={[styles.stockText, animatedStyle]} />
        </View>
      </View>

      <Animated.View style={[styles.addToCartButton, animatedStyle]}>
        <Text style={styles.addToCartText}>Đang tải...</Text>
      </Animated.View>
    </View>
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
  imageContainer: {
    position: 'relative',
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.skeleton,
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
  content: {
    padding: 12,
    paddingBottom: 8,
  },
  name: {
    height: 16,
    backgroundColor: colors.skeleton,
    borderRadius: 4,
    marginBottom: 6,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 6,
  },
  price: {
    width: 100,
    height: 20,
    backgroundColor: colors.skeleton,
    borderRadius: 4,
  },
  originalPrice: {
    width: 80,
    height: 16,
    backgroundColor: colors.skeleton,
    borderRadius: 4,
  },
  stockContainer: {
    marginBottom: 10,
  },
  stockText: {
    width: 120,
    height: 14,
    backgroundColor: colors.skeleton,
    borderRadius: 4,
  },
  addToCartButton: {
    height: 44,
    backgroundColor: colors.skeleton,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
}); 