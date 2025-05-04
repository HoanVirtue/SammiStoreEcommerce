import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  Dimensions,
  FlatList,
  ViewStyle
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { LoadingIndicator } from '@/presentation/components/LoadingIndicator';
import { ErrorView } from '@/presentation/components/ErrorView';
import { Button } from '@/presentation/components/Button';
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  Star,
  Minus,
  Plus,
  ChevronDown,
  ChevronUp
} from 'lucide-react-native';
import { TProduct } from '@/types/product';
import { TReviewItem } from '@/types/review';
import { getPublicProductDetail } from '@/services/product';

import { Rating } from 'react-native-ratings';
import { formatPrice } from '@/utils';
import { useDispatch } from 'react-redux';
import { useAuth } from '@/hooks/useAuth';

const { width } = Dimensions.get('window');

interface ProductReviewsProps {
  productId: string | number;
  onRatingDataChange: (data: { averageRating: number; totalRating: number }) => void;
}

const ProductReviews = ({ productId, onRatingDataChange }: ProductReviewsProps) => {
  useEffect(() => {
    onRatingDataChange({ averageRating: 4.5, totalRating: 120 });
  }, [productId, onRatingDataChange]);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Đánh giá sản phẩm</Text>
      <Text style={styles.sectionContent}>Phần giữ chỗ cho đánh giá (Trung bình: 4.5, Tổng: 120)</Text>
    </View>
  );
};

interface RelatedProductListProps {
    productId: string | number;
}

const RelatedProductList = ({ productId }: RelatedProductListProps) => {
  useEffect(() => {
  }, [productId]);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Sản phẩm liên quan</Text>
      <Text style={styles.sectionContent}>Phần giữ chỗ cho sản phẩm liên quan</Text>
    </View>
  );
};

const INITIAL_PRODUCT_STATE: TProduct = {
    id: 0,
    code: '',
    name: '',
    stockQuantity: 0,
    price: 0,
    ingredient: '',
    uses: '',
    discount: 0,
    usageGuide: '',
    brandId: 0,
    categoryId: 0,
    status: 0,
    images: [],
    startDate: null,
    endDate: null,
};


export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(true);
  const [productData, setProductData] = useState<TProduct>(INITIAL_PRODUCT_STATE);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showDescription, setShowDescription] = useState(true);
  const [showIngredients, setShowIngredients] = useState(false);
  const [showHowToUse, setShowHowToUse] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [totalRatings, setTotalRatings] = useState<number>(0);

  const fetchProductDetail = async (productId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getPublicProductDetail(Number(productId));
      if (response?.result) {
        setProductData(response.result);
        setQuantity(response.result.stockQuantity > 0 ? 1 : 0);
      } else {
        setError('Không tìm thấy sản phẩm.');
        setProductData(INITIAL_PRODUCT_STATE);
      }
    } catch (err) {
      console.error("Lỗi khi lấy sản phẩm:", err);
      setError('Không thể tải chi tiết sản phẩm.');
      setProductData(INITIAL_PRODUCT_STATE);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductDetail(id);
    } else {
        setError("Thiếu ID sản phẩm.");
        setLoading(false);
    }
  }, [id]);

  const handleGoBack = () => {
    if (router.canGoBack()) {
        router.back();
    } else {
    }
  };

  const handleAddToCart = () => {
    if (quantity <= 0 || quantity > productData.stockQuantity) {
        console.warn("Số lượng không hợp lệ hoặc hết hàng");
        return;
    }
    console.log(`Thêm ${quantity} của ${productData.name} (ID: ${productData.id}) vào giỏ hàng`);
  };

  const handleBuyNow = () => {
    console.log(`Mua ${quantity} của ${productData.name} ngay`);
    handleAddToCart();
    router.push('/cart');
  };

  const handleToggleWishlist = () => {
    console.log(`Chuyển đổi wishlist cho ${productData.name}`);
  };

  const handleIncreaseQuantity = () => {
    if (quantity < productData.stockQuantity) {
        setQuantity(prev => prev + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

   const handleRatingDataChange = (data: { averageRating: number; totalRating: number }) => {
        setAverageRating(data.averageRating);
        setTotalRatings(data.totalRating);
    };

  const toggleDescription = () => setShowDescription(!showDescription);
  const toggleIngredients = () => setShowIngredients(!showIngredients);
  const toggleHowToUse = () => setShowHowToUse(!showHowToUse);

  if (loading) {
    return <LoadingIndicator fullScreen />;
  }

  if (error || !productData.id) {
    return <ErrorView message={error || 'Không tìm thấy sản phẩm'} onRetry={() => id && fetchProductDetail(id)} />;
  }

  const renderImageCarousel = () => (
    <View style={styles.imageContainer}>
      <FlatList
        data={productData.images || []}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.floor(e.nativeEvent.contentOffset.x / width);
          setActiveImageIndex(newIndex);
        }}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.imageUrl || 'https://via.placeholder.com/400x360.png?text=Khong+Co+Anh' }}
            style={styles.image}
            resizeMode="contain"
          />
        )}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        ListEmptyComponent={
            <View style={[styles.image, styles.imagePlaceholder]}>
                <Text style={styles.imagePlaceholderText}>Không có ảnh</Text>
            </View>
        }
      />
      {productData.images && productData.images.length > 1 && (
        <View style={styles.pagination}>
          {productData.images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === activeImageIndex && styles.paginationDotActive
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );

  const renderProductInfo = () => (
     <View style={styles.content}>
        <Text style={styles.name}>{productData.name || 'Tên sản phẩm không có sẵn'}</Text>

        <View style={styles.ratingContainer}>
             <Rating
                type='star'
                ratingCount={5}
                imageSize={18}
                readonly
                startingValue={averageRating || 0}
                tintColor={colors.background}
                style={styles.ratingStars}
             />
             {totalRatings > 0 && (
                <>
                    <Text style={styles.rating}>{averageRating.toFixed(1)}</Text>
                    <Text style={styles.reviews}>({totalRatings} Đánh giá)</Text>
                </>
             )}
             {totalRatings === 0 && (
                <Text style={styles.reviews}>(Chưa có đánh giá)</Text>
             )}
        </View>

        <View style={styles.priceContainer}>
           <Text style={styles.price}>{formatPrice(productData.price)}</Text>
        </View>

        <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Số lượng</Text>
            <View style={styles.quantityControls}>
              <Pressable
                style={({ pressed }) => [
                    styles.quantityButton,
                    quantity <= 1 && styles.quantityButtonDisabled,
                    pressed && styles.quantityButtonPressed
                ]}
                onPress={handleDecreaseQuantity}
                disabled={quantity <= 1}
              >
                <Minus size={18} color={quantity <= 1 ? colors.textSecondary : colors.text} />
              </Pressable>

              <Text style={styles.quantity}>{quantity}</Text>

              <Pressable
                 style={({ pressed }) => [
                    styles.quantityButton,
                    quantity >= productData.stockQuantity && styles.quantityButtonDisabled,
                    pressed && styles.quantityButtonPressed
                 ]}
                 onPress={handleIncreaseQuantity}
                 disabled={quantity >= productData.stockQuantity || productData.stockQuantity === 0}
                >
                <Plus size={18} color={(quantity >= productData.stockQuantity || productData.stockQuantity === 0) ? colors.textSecondary : colors.text} />
              </Pressable>
            </View>
          </View>
          {productData.stockQuantity < 5 && productData.stockQuantity > 0 && (
              <Text style={styles.lowStockWarning}>Chỉ còn {productData.stockQuantity} sản phẩm!</Text>
          )}
          {productData.stockQuantity === 0 && (
              <Text style={styles.outOfStock}>Hết hàng</Text>
          )}
     </View>
  );

   const renderExpandableSection = (title: string, content: string | undefined | null, isVisible: boolean, toggle: () => void) => {
    if (!content || content.trim() === '') return null;

    const plainTextContent = content.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim();


    return (
      <View style={styles.section}>
          <Pressable style={styles.sectionHeader} onPress={toggle}>
              <Text style={styles.sectionTitle}>{title === 'Description' ? 'Mô tả' : title === 'Ingredients' ? 'Thành phần' : title === 'How to Use' ? 'Cách sử dụng' : title}</Text>
              {isVisible ? (
                <ChevronUp size={20} color={colors.textSecondary} />
              ) : (
                <ChevronDown size={20} color={colors.textSecondary} />
              )}
          </Pressable>
          {isVisible && (
           <Text style={styles.sectionContent}>{plainTextContent}</Text>
          )}
      </View>
    );
  };


  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.header}>
        <Pressable onPress={handleGoBack} style={styles.iconButton} hitSlop={10}>
          <ArrowLeft size={24} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>Chi tiết sản phẩm</Text>
        <Pressable onPress={handleToggleWishlist} style={styles.iconButton} hitSlop={10}>
          <Heart
            size={24}
            color={colors.text}
            fill={'transparent'}
          />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
      >
        {renderImageCarousel()}
        {renderProductInfo()}

         <View style={styles.detailsContainer}>
             {renderExpandableSection('Description', productData.uses, showDescription, toggleDescription)}
             {renderExpandableSection('Ingredients', productData.ingredient, showIngredients, toggleIngredients)}
             {renderExpandableSection('How to Use', productData.usageGuide, showHowToUse, toggleHowToUse)}

            {id && <ProductReviews productId={id} onRatingDataChange={handleRatingDataChange}/>}

            {id && <RelatedProductList productId={id} />}
         </View>

      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Thêm vào giỏ hàng"
          onPress={handleAddToCart}
          icon={<ShoppingBag size={18} color={colors.white} />}
          // @ts-ignore
          style={[styles.footerButton, styles.addToCartButton]}
          disabled={productData.stockQuantity === 0 || quantity <= 0}
          titleStyle={styles.footerButtonTitle}
        />
      </View>
    </SafeAreaView>
  );
}

const badgeBaseStyle: ViewStyle = {
    position: 'absolute',
    top: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.white,
  },
   headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContentContainer: {
     paddingBottom: 80,
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: colors.white,
  },
  image: {
    width: width,
    height: width * 0.9,
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.border,
  },
  imagePlaceholderText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: colors.primary,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
   badgeBase: badgeBaseStyle,
  badgeText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },
  badgeNew: {
    ...badgeBaseStyle,
    left: 16,
    backgroundColor: colors.secondary,
  },
  badgeSale: {
    ...badgeBaseStyle,
    left: 16,
    top: 45,
    backgroundColor: colors.error,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
   detailsContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: colors.white,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10,
    lineHeight: 26,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    minHeight: 20,
  },
  ratingStars: {
     alignSelf: 'flex-start',
     marginRight: 8,
  },
  rating: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
    marginRight: 4,
  },
  reviews: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
    marginTop: 4,
    flexWrap: 'wrap',
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 16,
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  discountBadge: {
    backgroundColor: colors.error,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  discountBadgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 8,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  quantityButton: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 44,
    height: 40,
  },
  quantityButtonPressed: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  quantityButtonDisabled: {
    opacity: 0.4,
  },
  quantity: {
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: '600',
    minWidth: 40,
    textAlign: 'center',
    color: colors.text,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.border,
    height: 40,
    lineHeight: 40,
  },
   lowStockWarning: {
    fontSize: 13,
    color: colors.warning,
    fontWeight: '500',
    marginTop: 4,
    marginBottom: 10,
    textAlign: 'right',
  },
  outOfStock: {
    fontSize: 14,
    color: colors.error,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 10,
    textAlign: 'right',
  },
  section: {
    marginBottom: 0,
    paddingBottom: 0,
  },
   sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  sectionContent: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 21,
    marginTop: 10,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  footer: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerButton: {
    flex: 1,
    marginHorizontal: 4,
    height: 48,
    borderRadius: 8,
  },
  footerButtonTitle: {
     fontWeight: '600',
     fontSize: 16,
  },
  addToCartButton: {
     backgroundColor: colors.primary,
  },
  buyNowButton: {
      backgroundColor: colors.secondary,
  },
});