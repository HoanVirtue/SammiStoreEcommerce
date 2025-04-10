import React from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Article } from '@/domain/entities/Article';
import { colors } from '@/src/constants/colors';
import { Clock, User } from 'lucide-react-native';
import { formatDate } from '@/src/utils';

interface ArticleCardProps {
  article: Article;
  onPress: (article: Article) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed
      ]}
      onPress={() => onPress(article)}
    >
      {article.urlToImage ? (
        <Image
          source={{ uri: article.urlToImage }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>{article.source.name}</Text>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.source}>{article.source.name}</Text>
        <Text style={styles.title} numberOfLines={2}>{article.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{article.description}</Text>

        <View style={styles.footer}>
          {article.author && (
            <View style={styles.footerItem}>
              <User size={14} color={colors.textSecondary} />
              <Text style={styles.footerText} numberOfLines={1}>{article.author}</Text>
            </View>
          )}

          <View style={styles.footerItem}>
            <Clock size={14} color={colors.textSecondary} />
            <Text style={styles.footerText}>{formatDate(article.publishedAt)}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  image: {
    width: '100%',
    height: 180,
  },
  imagePlaceholder: {
    width: '100%',
    height: 180,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 16,
  },
  content: {
    padding: 16,
  },
  source: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerText: {
    fontSize: 12,
    color: colors.textSecondary,
    maxWidth: 150,
  },
});