import React from 'react';
import { StyleSheet, View } from 'react-native';
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
      <Animated.View style={[styles.image, animatedStyle]} />
      <View style={styles.content}>
        <Animated.View style={[styles.name, animatedStyle]} />
        <Animated.View style={[styles.name, { width: '60%' }, animatedStyle]} />
        <Animated.View style={[styles.price, animatedStyle]} />
      </View>
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
  image: {
    width: '100%',
    height: 180,
    backgroundColor: colors.skeleton,
    borderRadius: 12,
    marginBottom: 12,
  },
  content: {
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
  name: {
    height: 16,
    backgroundColor: colors.skeleton,
    borderRadius: 4,
    marginBottom: 8,
  },
  price: {
    width: 80,
    height: 16,
    backgroundColor: colors.skeleton,
    borderRadius: 4,
    marginTop: 8,
  },
}); 