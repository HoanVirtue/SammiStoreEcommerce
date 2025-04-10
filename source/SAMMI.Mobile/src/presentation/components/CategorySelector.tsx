import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { colors } from '@/src/constants/colors';

interface CategorySelectorProps {
  categories: { id: string; name: string }[];
  selectedCategory?: string;
  onSelectCategory: (category?: string) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <Pressable
        style={[
          styles.categoryItem,
          !selectedCategory && styles.selectedCategory,
        ]}
        onPress={() => onSelectCategory(undefined)}
      >
        <Text
          style={[
            styles.categoryText,
            !selectedCategory && styles.selectedCategoryText,
          ]}
        >
          All
        </Text>
      </Pressable>

      {categories.map((category) => (
        <Pressable
          key={category.id}
          style={[
            styles.categoryItem,
            selectedCategory === category.id && styles.selectedCategory,
          ]}
          onPress={() => onSelectCategory(category.id)}
        >
          <Text
            style={[
              styles.categoryText,
              selectedCategory === category.id && styles.selectedCategoryText,
            ]}
          >
            {category.name}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.card,
    marginRight: 8,
  },
  selectedCategory: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  selectedCategoryText: {
    color: colors.background,
  },
});