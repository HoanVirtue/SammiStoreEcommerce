"use client"

// React & Next
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Image, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@/constants/colors'
import { Heart, ArrowLeft } from 'lucide-react-native'
import NoData from '@/components/NoData'

// Hardcoded data for cosmetics products
const MOCK_FAVOURITES = [
  {
    id: 1,
    name: 'Kem dưỡng da ban đêm',
    price: 450000,
    imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500',
    brand: 'Laneige',
    description: 'Kem dưỡng da ban đêm giúp phục hồi và tái tạo làn da'
  },
  {
    id: 2,
    name: 'Serum Vitamin C',
    price: 680000,
    imageUrl: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500',
    brand: 'The Ordinary',
    description: 'Serum Vitamin C giúp làm sáng da và chống lão hóa'
  },
  {
    id: 3,
    name: 'Son dưỡng môi',
    price: 250000,
    imageUrl: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500',
    brand: 'Dior',
    description: 'Son dưỡng môi giúp môi mềm mại và căng mọng'
  }
]

export default function FavouriteProductScreen() {
  const router = useRouter()
  const [refreshing, setRefreshing] = useState(false)
  const [favourites, setFavourites] = useState(MOCK_FAVOURITES)

  const onRefresh = () => {
    setRefreshing(true)
    // Simulate refresh delay
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }

  const handleRemoveFavourite = (productId: number) => {
    setFavourites(prev => prev.filter(item => item.id !== productId))
  }

  const handleProductPress = (productId: number) => {
    router.push(`/product/${productId}`)
  }

  const handleBack = () => {
    router.push('/(tabs)/profile' as any)
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => {handleBack()}} style={styles.backButton}>
            <ArrowLeft size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>Sản phẩm yêu thích</Text>
        </View>

        <ScrollView
          style={styles.content}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.primary]}
              tintColor={colors.primary}
            />
          }
        >
          {favourites.length > 0 ? (
            <View style={styles.productGrid}>
              {favourites.map((product) => (
                <View key={product.id} style={styles.productCard}>
                  <TouchableOpacity
                    onPress={() => handleProductPress(product.id)}
                    style={styles.productContent}
                  >
                    <Image 
                      source={{ uri: product.imageUrl }} 
                      style={styles.productImage}
                      resizeMode="cover"
                    />
                    <View style={styles.productInfo}>
                      <Text style={styles.brandName}>{product.brand}</Text>
                      <Text style={styles.productName} numberOfLines={2}>
                        {product.name}
                      </Text>
                      <Text style={styles.productPrice}>
                        {product.price.toLocaleString('vi-VN')}đ
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveFavourite(product.id)}
                  >
                    <Heart size={20} color={colors.error} fill={colors.error} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.noDataContainer}>
              <NoData
                imageWidth="60px"
                imageHeight="60px"
                textNodata="Chưa có sản phẩm yêu thích"
              />
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.white,
  },
  backButton: {
    marginRight: 16,
    color: colors.primary,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
  },
  content: {
    flex: 1,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  productCard: {
    width: '50%',
    padding: 8,
  },
  productContent: {
    backgroundColor: colors.white,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 150,
    backgroundColor: colors.border,
  },
  productInfo: {
    padding: 12,
  },
  brandName: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  removeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
}) 