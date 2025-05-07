import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Carousel from 'react-native-snap-carousel'; // Ensure this is installed and imported correctly
import { getHomeBanners } from '@/services/banner';

const { width: screenWidth } = Dimensions.get('window');

interface Banner {
  id: number;
  imageUrl: string;
  name?: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width: screenWidth,
    height: Platform.OS === 'ios' ? 400 : 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  loadingContainer: {
    height: Platform.OS === 'ios' ? 400 : 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const Banner: React.FC = () => {
  const carouselRef = useRef<Carousel<Banner>>(null);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await getHomeBanners({ numberTop: 3 });

      if (response?.isSuccess) {
        setBanners(response.result);
      }
    } catch (error) {
      console.error('Error fetching banners:', error);
      setError('Failed to load banners');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const renderItem = ({ item }: { item: Banner }) => {
    if (!item?.imageUrl) {
      return <View style={styles.slide} />;
    }

    return (
      <View style={styles.slide}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.image}
          onError={(e) => console.error('Image loading error:', e.nativeEvent.error)}
        />
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !banners.length) {
    return <View style={{ height: 0 }} />;
  }

  return (
    <View style={styles.container}>
        {/* <Carousel
          ref={carouselRef}
          data={banners}
          renderItem={renderItem}
          sliderWidth={screenWidth}
          itemWidth={screenWidth}
          autoplay
          autoplayInterval={3000}
          loop
          enableMomentum={false}
          lockScrollWhileSnapping
          inactiveSlideScale={0.9}
          inactiveSlideOpacity={0.7}
          onSnapToItem={(index) => console.log('Current index:', index)}
        /> */}
    </View>
  );
};
