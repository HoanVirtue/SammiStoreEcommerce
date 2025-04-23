import React, { useState, useEffect, useMemo } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    StyleProp,
    TextStyle,
    ViewStyle,
} from 'react-native';
import { Minus, Plus, Trash, Check } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { TItemOrderProduct } from '@/types/cart';
import Toast from 'react-native-toast-message';
import { getProductDetail } from '@/services/product';
import { useDebounce } from '@/hooks/useDebounce';

interface TItemOrderProductState extends TItemOrderProduct {
    stockQuantity?: number;
    discount?: number;
}

interface CartItemProps {
    item: TItemOrderProduct;
    onUpdateQuantity: (productId: number, quantity: number) => void;
    onRemove: (productId: number) => Promise<void>;
    onCheckboxChange: (productId: number) => void;
    isChecked: boolean;
}

const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + 'đ';
};

export function CartItem({ item, onUpdateQuantity, onRemove, onCheckboxChange, isChecked }: CartItemProps) {
    const [itemState, setItemState] = useState<TItemOrderProductState>(item);
    const [inputQuantity, setInputQuantity] = useState<string>(item.quantity.toString());
    const debouncedQuantity = useDebounce<string>(inputQuantity, 500);

    const fetchProductDetail = async (id: number) => {
        try {
            const res = await getProductDetail(id);
            const data = res?.result;
            if (data) {
                setItemState({
                    ...itemState,
                    name: data.name,
                    images: data.images,
                    price: data.price,
                    discount: data.discount,
                    stockQuantity: data.stockQuantity,
                });
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Không thể tải thông tin sản phẩm!',
            });
        }
    };

    useEffect(() => {
        if (item.productId && item.productId === itemState.productId) {
            fetchProductDetail(item.productId);
        }
    }, []);

    useEffect(() => {
        if (debouncedQuantity === inputQuantity && debouncedQuantity !== itemState.quantity.toString()) {
            const newQuantity = parseInt(debouncedQuantity);
            if (!isNaN(newQuantity) && newQuantity >= 1) {
                if (!itemState.stockQuantity || newQuantity <= itemState.stockQuantity) {
                    setItemState(prev => ({ ...prev, quantity: newQuantity }));
                    onUpdateQuantity(itemState.productId, newQuantity);
                } else {
                    Toast.show({
                        type: 'error',
                        text1: `Số lượng không được vượt quá ${itemState.stockQuantity} sản phẩm trong kho!`,
                    });
                    setInputQuantity(itemState.quantity.toString());
                }
            } else {
                setInputQuantity(itemState.quantity.toString());
            }
        }
    }, [debouncedQuantity]);

    const handleChangeQuantity = (newQuantity: number) => {
        if (newQuantity < 1) {
            Toast.show({
                type: 'error',
                text1: 'Số lượng không được nhỏ hơn 1!',
            });
            return;
        }

        if (itemState.stockQuantity && newQuantity > itemState.stockQuantity) {
            Toast.show({
                type: 'error',
                text1: `Số lượng không được vượt quá ${itemState.stockQuantity} sản phẩm trong kho!`,
            });
            return;
        }

        setInputQuantity(newQuantity.toString());
    };

    const handleInputChange = (value: string) => {
        const numValue = parseInt(value);
        if (value === '' || (numValue >= 0 && numValue <= 999)) {
            setInputQuantity(value);
        }
    };

    const handleRemove = () => {
        onRemove(itemState.productId);
    };

    const totalPrice = useMemo(() => {
        const basePrice =
            itemState?.discount && itemState?.discount > 0
                ? (itemState.price * (100 - itemState.discount)) / 100
                : itemState.price;
        return basePrice * itemState.quantity;
    }, [itemState.quantity, itemState.price, itemState.discount]);

    const priceTextStyle: StyleProp<TextStyle>[] = [
        styles.price,
        itemState.discount && itemState.discount > 0 ? styles.originalPrice : undefined,
    ].filter(Boolean);

    const quantityButtonStyle: StyleProp<ViewStyle>[] = [
        styles.quantityButton,
        itemState.stockQuantity && itemState.quantity >= itemState.stockQuantity
            ? styles.quantityButtonDisabled
            : undefined,
    ].filter(Boolean);


    return (
        <View style={styles.container}>
            <View style={styles.checkboxContainer}>
                <TouchableOpacity
                    onPress={() => onCheckboxChange(itemState.productId)}
                    disabled={!itemState.stockQuantity || itemState.stockQuantity === 0}
                    style={[
                        styles.checkbox,
                        isChecked && styles.checkboxChecked,
                        (!itemState.stockQuantity || itemState.stockQuantity === 0) && styles.checkboxDisabled,
                    ]}
                >
                    {isChecked && <Check size={16} color={colors.white} />}
                </TouchableOpacity>
            </View>

            <Image
                source={{ uri: itemState.images?.[0]?.imageUrl || '/public/svgs/placeholder.svg' }}
                style={styles.image}
                resizeMode="contain"
            />
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.name} numberOfLines={2}>
                        {itemState.name || 'Đang tải...'}
                    </Text>
                    <TouchableOpacity onPress={handleRemove} style={styles.removeButton}>
                        <Trash size={20} color={colors.error} />
                    </TouchableOpacity>
                </View>

                <View style={styles.priceContainer}>
                    <Text style={priceTextStyle}>{formatPrice(itemState.price)}</Text>
                    {itemState.discount && itemState.discount > 0 && (
                        <Text style={styles.discountedPrice}>
                            {formatPrice((itemState.price * (100 - itemState.discount)) / 100)}
                        </Text>
                    )}
                </View>

                <View style={styles.footer}>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity
                            onPress={() => handleChangeQuantity(itemState.quantity - 1)}
                            style={[styles.quantityButton, itemState.quantity <= 1 && styles.quantityButtonDisabled]}
                        >
                            <Minus size={20} color={itemState.quantity <= 1 ? colors.textSecondary : colors.text} />
                        </TouchableOpacity>

                        <TextInput
                            style={styles.quantityInput}
                            value={inputQuantity}
                            onChangeText={handleInputChange}
                            keyboardType="numeric"
                            maxLength={3}
                        />

                        <TouchableOpacity
                            onPress={() => handleChangeQuantity(itemState.quantity + 1)}
                            style={quantityButtonStyle}
                        >
                            <Plus
                                size={20}
                                color={
                                    itemState.stockQuantity && itemState.quantity >= itemState.stockQuantity
                                        ? colors.textSecondary
                                        : colors.text
                                }
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.totalPrice}>{formatPrice(totalPrice)}</Text>
                </View>

                <Text style={styles.stockInfo}>Còn {itemState.stockQuantity || 0} sản phẩm</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    checkboxContainer: {
        justifyContent: 'center',
        marginRight: 8,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: colors.primary,
    },
    checkboxDisabled: {
        opacity: 0.5,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 12,
    },
    content: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    name: {
        flex: 1,
        fontSize: 14,
        fontWeight: '500',
        color: colors.text,
        marginRight: 8,
    },
    removeButton: {
        padding: 4,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        gap: 8,
    },
    price: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.primary,
    },
    originalPrice: {
        textDecorationLine: 'line-through',
        color: colors.textSecondary,
        fontWeight: '400',
    },
    discountedPrice: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.primary,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background,
        borderRadius: 8,
    },
    quantityButton: {
        padding: 8,
    },
    quantityButtonDisabled: {
        opacity: 0.5,
    },
    quantityInput: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.text,
        minWidth: 32,
        textAlign: 'center',
        padding: 0,
    },
    totalPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.primary,
    },
    stockInfo: {
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 4,
    },
});