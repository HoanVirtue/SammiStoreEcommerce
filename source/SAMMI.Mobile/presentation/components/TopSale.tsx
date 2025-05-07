import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';
import { getBestSellingProducts } from '@/services/product';
import { ProductCard } from './ProductCard';
import { TProduct } from '@/types/product';
import { colors } from '@/constants/colors';
import NoData from '@/components/NoData';

interface TopSaleProps {
    initialData?: TProduct[];
}

const TopSale: React.FC<TopSaleProps> = ({ initialData }) => {
    const [publicProducts, setPublicProducts] = useState<TProduct[]>([]);
    const [loading, setLoading] = useState(false);

    const handleGetListProduct = async () => {
        setLoading(true);
        try {
            const res = await getBestSellingProducts({ numberTop: 20 });
            if (res?.result) {
                setPublicProducts(res.result);
            }
        } catch (error) {
            console.error('Error fetching best selling products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleGetListProduct();
    }, []);

    const renderItem = ({ item }: { item: TProduct }) => (
        <View style={styles.productItem}>
            <ProductCard product={item} />
        </View>
    );

    const renderLoadingSkeleton = () => (
        <View style={styles.skeletonContainer}>
            {Array.from(new Array(20)).map((_, index) => (
                <View key={index} style={styles.skeletonItem}>
                    <View style={styles.skeletonImage} />
                    <View style={styles.skeletonText} />
                    <View style={[styles.skeletonText, { width: '60%' }]} />
                </View>
            ))}
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Top 20 sản phẩm bán chạy</Text>
            </View>
            
            {loading ? (
                renderLoadingSkeleton()
            ) : publicProducts.length > 0 ? (
                <FlatList
                    data={publicProducts}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    contentContainerStyle={styles.productList}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <View style={styles.noDataContainer}>
                    <NoData imageWidth={60} imageHeight={60} textNodata="Không có dữ liệu" />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        width: '100%',
        padding: 10,
        marginTop: 20,
    },
    header: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        textTransform: 'uppercase',
        color: colors.text,
    },
    productList: {
        paddingHorizontal: 8,
    },
    productItem: {
        flex: 1,
        margin: 8,
    },
    noDataContainer: {
        padding: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    skeletonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 8,
    },
    skeletonItem: {
        width: '48%',
        margin: 8,
    },
    skeletonImage: {
        height: 200,
        backgroundColor: colors.border,
        borderRadius: 8,
    },
    skeletonText: {
        height: 16,
        backgroundColor: colors.border,
        marginTop: 8,
        borderRadius: 4,
    },
});

export default TopSale;
