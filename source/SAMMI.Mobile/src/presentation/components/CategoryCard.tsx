import React from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { Category } from '@/domain/entities/Category';
import { colors } from '@/src/constants/colors';

interface CategoryCardProps {
  category: Category;
  onPress: (category: Category) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onPress }) => {
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed
      ]}
      onPress={() => onPress(category)}
    >
      <Image 
        source={{ uri: category.imageUrl }} 
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.overlay} />
      <Text style={styles.name}>{category.name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
    position: 'relative',
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  name: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});