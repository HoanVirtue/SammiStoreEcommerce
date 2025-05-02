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
import Toast from 'react-native-toast-message';
import { useDebounce } from '@/hooks/useDebounce';

type TProps = {
    item: {
        cartId: number;
        productId: number;
        productName: string;
        price: number;
        newPrice: number;
        quantity: number;
        productImage: string;
        stockQuantity: number;
    };
    index: number;
    handleChangeCheckBox: (value: number) => void;
    selectedRow: number[];
    onUpdateQuantity: (productId: number, quantity: number) => void;
    onRemove: (productId: number) => Promise<void>;
};

const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + 'đ';
};

export function CartItem({ item, index, handleChangeCheckBox, selectedRow, onUpdateQuantity, onRemove }: TProps) {
    const [inputQuantity, setInputQuantity] = useState<string>(item.quantity.toString());
    const debouncedQuantity = useDebounce<string>(inputQuantity, 500);

    useEffect(() => {
        if (debouncedQuantity === inputQuantity && debouncedQuantity !== item.quantity.toString()) {
            const newQuantity = parseInt(debouncedQuantity);
            if (!isNaN(newQuantity) && newQuantity >= 1) {
                if (!item.stockQuantity || newQuantity <= item.stockQuantity) {
                    onUpdateQuantity(item.productId, newQuantity);
                } else {
                    Toast.show({
                        type: 'error',
                        text1: `Số lượng không được vượt quá ${item.stockQuantity} sản phẩm trong kho!`,
                    });
                    setInputQuantity(item.quantity.toString());
                }
            } else {
                setInputQuantity(item.quantity.toString());
            }
        }
    }, [debouncedQuantity]);

    const handleChangeQuantity = (amountChange: number) => {
        const newQuantity = item.quantity + amountChange;
        if (newQuantity < 1) {
            Toast.show({
                type: 'error',
                text1: 'Số lượng không được nhỏ hơn 1!',
            });
            return;
        }
        if (item.stockQuantity && newQuantity > item.stockQuantity) {
            Toast.show({
                type: 'error',
                text1: `Số lượng không được vượt quá ${item.stockQuantity} sản phẩm trong kho!`,
            });
            return;
        }

        setInputQuantity(newQuantity.toString());
    };

    const handleInputChange = (value: string) => {
        if (value === '') {
            setInputQuantity('');
            return;
        }
        const newQuantity = parseInt(value);
        if (isNaN(newQuantity)) {
            Toast.show({
                type: 'error',
                text1: 'Vui lòng nhập số hợp lệ!',
            });
            return;
        }
        setInputQuantity(value);
    };

    const handleRemove = () => {
        onRemove(item.productId);
    };

    const totalPrice = item.newPrice * item.quantity;

    const priceTextStyle: StyleProp<TextStyle>[] = [
        styles.price,
        item.price !== item.newPrice ? styles.originalPrice : undefined,
    ].filter(Boolean);

    const quantityButtonStyle: StyleProp<ViewStyle>[] = [
        styles.quantityButton,
        item.stockQuantity && item.quantity >= item.stockQuantity
            ? styles.quantityButtonDisabled
            : undefined,
    ].filter(Boolean);

    return (
        <View style={styles.container}>
            <View style={styles.checkboxContainer}>
                <TouchableOpacity
                    onPress={() => handleChangeCheckBox(item.productId)}
                    disabled={!item.stockQuantity || item.stockQuantity === 0}
                    style={[
                        styles.checkbox,
                        selectedRow.includes(item.productId) && styles.checkboxChecked,
                        (!item.stockQuantity || item.stockQuantity === 0) && styles.checkboxDisabled,
                    ]}
                >
                    {selectedRow.includes(item.productId) && <Check size={16} color={colors.white} />}
                </TouchableOpacity>
            </View>

            <Image
                source={{ uri: item.productImage || '/public/svgs/placeholder.svg' }}
                style={styles.image}
                resizeMode="contain"
            />
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.name} numberOfLines={2}>
                        {item.productName}
                    </Text>
                    <TouchableOpacity onPress={handleRemove} style={styles.removeButton}>
                        <Trash size={20} color={colors.error} />
                    </TouchableOpacity>
                </View>

                <View style={styles.priceContainer}>
                    <Text style={priceTextStyle}>{formatPrice(item.price)}</Text>
                    {item.price !== item.newPrice && (
                        <Text style={styles.discountedPrice}>
                            {formatPrice(item.newPrice)}
                        </Text>
                    )}
                </View>

                <View style={styles.footer}>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity
                            onPress={() => handleChangeQuantity(-1)}
                            style={[styles.quantityButton, item.quantity <= 1 && styles.quantityButtonDisabled]}
                        >
                            <Minus size={20} color={item.quantity <= 1 ? colors.textSecondary : colors.text} />
                        </TouchableOpacity>

                        <TextInput
                            style={styles.quantityInput}
                            value={inputQuantity}
                            onChangeText={handleInputChange}
                            keyboardType="numeric"
                            maxLength={3}
                        />

                        <TouchableOpacity
                            onPress={() => handleChangeQuantity(1)}
                            style={quantityButtonStyle}
                        >
                            <Plus
                                size={20}
                                color={
                                    item.stockQuantity && item.quantity >= item.stockQuantity
                                        ? colors.textSecondary
                                        : colors.text
                                }
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.totalPrice}>{formatPrice(totalPrice)}</Text>
                </View>

                <Text style={styles.stockInfo}>Còn {item.stockQuantity || 0} sản phẩm</Text>
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