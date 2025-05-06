import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { getHomeBanners } from '@/services/banner';

const { width: screenWidth } = Dimensions.get('window');

interface Banner {
  id: number;
  imageUrl: string;
  name?: string;
  description?: string;
}

interface CarouselProps {
  initialData?: Banner[];
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
  },
  textContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -screenWidth / 4 }, { translateY: -50 }],
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const Banner: React.FC<CarouselProps> = ({ initialData }) => {
  const carouselRef = useRef<Carousel<Banner>>(null);
  const [banners, setBanners] = useState<Banner[]>(initialData || []);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await getHomeBanners({ numberTop: 5 });
        if (response?.result?.subset) {
          setBanners(response.result.subset as Banner[]);
        }
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };

    if (!initialData) {
      fetchBanners();
    }
  }, [initialData]);

  useEffect(() => {
    // Auto-play functionality
    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.snapToNext();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const renderItem = ({ item }: { item: Banner }) => (
    <View style={styles.slide}>
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.image}
        resizeMode="contain"
      />
      {item.name && (
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.name}</Text>
          {item.description && (
            <Text style={styles.description}>{item.description}</Text>
          )}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Xem thêm</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  if (!banners.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={banners}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        autoplay={true}
        autoplayInterval={3000}
        loop={true}
        enableMomentum={false}
        lockScrollWhileSnapping={true}
      />
    </View>
  );
};

export default Banner;