import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, Image, Linking, Platform } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { LoadingIndicator } from '@/presentation/components/LoadingIndicator';
import { ErrorView } from '@/presentation/components/ErrorView';

import { ArrowLeft, ExternalLink, Clock, User } from 'lucide-react-native';
import { formatDate } from '@/utils';

export default function ArticleDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  useEffect(() => {
    // if (id && (!selectedArticle || selectedArticle.id !== id)) {
    //   getArticleById(id);
    // }
  }, [id]);

  const handleOpenArticle = async () => {
    // if (selectedArticle?.url) {
    //   const canOpen = await Linking.canOpenURL(selectedArticle.url);
    //   if (canOpen) {
    //     await Linking.openURL(selectedArticle.url);
    //   }
    // }
  };

  const handleGoBack = () => {
    router.back();
  };

  // if (isLoading) {
  //   return <LoadingIndicator fullScreen />;
  // }

  // if (error || !selectedArticle) {
  //   return <ErrorView message={error || 'Article not found'} onRetry={() => id && getArticleById(id)} />;
  // }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: '',
          headerLeft: () => (
            <Pressable onPress={handleGoBack} style={styles.backButton}>
              <ArrowLeft size={24} color={colors.text} />
            </Pressable>
          ),
          headerShadowVisible: false,
        }}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* <Text style={styles.source}>{selectedArticle.source.name }</Text> */}
        {/* <Text style={styles.title}>{selectedArticle.title}</Text> */}

        <View style={styles.metaInfo}>
          {/* {selectedArticle.author && (
            <View style={styles.metaItem}>
              <User size={16} color={colors.textSecondary} />
              <Text style={styles.metaText}>{selectedArticle.author}</Text>
            </View>
          )} */}

          <View style={styles.metaItem}>
            <Clock size={16} color={colors.textSecondary} />
            <Text style={styles.metaText}>{'publishedAt'}</Text>
          </View>
        </View>

        {/* {selectedArticle.urlToImage && (
          <Image
            source={{ uri: 'urlToImage' }}
            style={styles.image}
            resizeMode="cover"
          />
        )} */}

        <Text style={styles.description}>{'description'}</Text>

        {/* {selectedArticle.content && (
          <Text style={styles.content}>
            {selectedArticle.content.replace(/\[\+\d+ chars\]$/, '')}
          </Text>
        )} */}

        <Pressable style={styles.readMoreButton} onPress={handleOpenArticle}>
          <Text style={styles.readMoreText}>Read Full Article</Text>
          <ExternalLink size={16} color={colors.background} />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backButton: {
    padding: 8,
  },
  scrollContent: {
    padding: 16,
  },
  source: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
    lineHeight: 32,
  },
  metaInfo: {
    flexDirection: 'row',
    marginBottom: 20,
    flexWrap: 'wrap',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  image: {
    width: '100%',
    height: 240,
    borderRadius: 12,
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
    lineHeight: 26,
  },
  content: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    marginBottom: 24,
  },
  readMoreButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 40,
    gap: 8,
  },
  readMoreText: {
    color: colors.background,
    fontWeight: '600',
    fontSize: 16,
  },
});