import { TProduct } from '@/types/product';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import { ProductCard } from './ProductCard';
import CountdownTimer from './CountDownTimer';
import NoData from '@/components/NoData';
import { getEndowProducts } from '@/services/product';



interface HotSaleProps {
    initialData?: any[];
}

const HotSale: React.FC<HotSaleProps> = ({ initialData }) => {
    const saleEndTime = '2025-05-26T23:59:59';
    const [publicProducts, setPublicProducts] = useState<{ data: TProduct[]; total: number }>({
        data: [],
        total: 0
    });
    const [loading, setLoading] = useState(false);

    const handleGetListProduct = async () => {
        setLoading(true);
        try {
            const res = await getEndowProducts({ numberTop: 10 });
            if (res?.result) {
                setPublicProducts({
                    data: res.result,
                    total: res.result.length
                });
            } else {
                 setPublicProducts({ data: [], total: 0 });
            }
        } catch (error) {
            console.error("Failed to fetch endow products:", error);
            setPublicProducts({ data: [], total: 0 }); // Reset on error
        } finally {
            setLoading(false); // Ensure loading is set to false
        }
    }

    useEffect(() => {
        handleGetListProduct();
    }, []);

    const skeletonCount = 10; // Number of skeleton loaders

    const renderProductItem = ({ item }: { item: TProduct }) => (
        <View style={styles.productItemContainer}>
            <ProductCard product={item} />
        </View>
    );

    const renderSkeletonItem = ({ item, index }: { item: any, index: number }) => (
        <View style={styles.productItemContainer} key={`skeleton-${index}`}>
             <ProductCard product={{} as TProduct} />
        </View>
    );

    return (
        <View style={styles.outerContainer}>
            <View style={styles.innerContainer}>
                <View style={styles.header}>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerTitle}>Ưu đãi hot, đừng bỏ lỡ!!</Text>
                        <Text style={styles.headerSubtitle}>Sản phẩm sẽ trở về giá gốc khi hết giờ</Text>
                    </View>
                    <View>
                        <CountdownTimer saleEndTime={saleEndTime} />
                    </View>
                </View>
                <View style={styles.productListContainer}>
                    {loading ? (
                        <FlatList
                            data={Array.from(new Array(skeletonCount))}
                            renderItem={renderSkeletonItem}
                            keyExtractor={(_, index) => `skeleton-${index}`}
                            numColumns={2} // Adjust number of columns as needed
                            contentContainerStyle={styles.listContentContainer}
                            columnWrapperStyle={styles.columnWrapper}
                            scrollEnabled={false}
                        />
                    ) : publicProducts?.data?.length > 0 ? (
                        <FlatList
                            data={publicProducts.data}
                            renderItem={renderProductItem}
                            keyExtractor={(item) => item.id.toString()}
                            numColumns={2} // Adjust number of columns as needed
                            contentContainerStyle={styles.listContentContainer}
                            columnWrapperStyle={styles.columnWrapper}
                            scrollEnabled={false}
                        />
                    ) : (
                        <View style={styles.noDataContainer}>
                            <NoData imageWidth="60px" imageHeight="60px" textNodata={"Không có dữ liệu"} />
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#f0f0f0', 
        padding: 2,
        
    },
    innerContainer: {
        flex: 1,
        backgroundColor: '#ffffff', // Example background paper color
        borderRadius: 8,
        marginHorizontal: 'auto', 
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee', // Example border color
    },
    headerTextContainer: {
        flex: 1, // Take remaining space
        flexDirection: 'column',
        marginRight: 10, // Add some space between text and timer
    },
    headerTitle: {
        textTransform: 'uppercase',
        fontSize: 20, // Example size
        fontWeight: 'bold', // Example weight
        marginBottom: 4,
        color: '#333', // Example text color
    },
    headerSubtitle: {
        fontSize: 14, // Example size
        color: '#666', // Example text color
    },
    productListContainer: {
        flex: 1, // Ensure FlatList/NoData takes remaining space
        padding: 2,
    },
    listContentContainer: {
        // Styles for the content container of FlatList if needed
    },
    columnWrapper: {
        justifyContent: 'space-between',
        gap: 10 // Increased gap for horizontal spacing
    },
    productItemContainer: {
       // Calculates width for 2 columns with spacing
       width: (Dimensions.get('window').width - 40) / 2,
       marginBottom: 10,
        // Adjust based on numColumns and desired spacing
    },
    noDataContainer: {
        flex: 1, // Take full space
        padding: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HotSale;
