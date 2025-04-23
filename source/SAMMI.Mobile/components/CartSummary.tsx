import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors } from '@/constants/colors';
import { Button } from '@/presentation/components/Button';
import { formatPrice } from '@/utils';

type CartSummaryProps = {
    subtotal: number;
    total: number;
    save: number;
    onCheckout: () => void;
};

export const CartSummary = ({
    subtotal,
    total,
    save,
    onCheckout,
}: CartSummaryProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Order Summary</Text>

            <View style={styles.summaryItem}>
                <Text style={styles.label}>Subtotal</Text>
                <Text style={styles.value}>{formatPrice(subtotal)}</Text>
            </View>

            {save > 0 && (
                <View style={styles.summaryItem}>
                    <Text style={styles.label}>You Save</Text>
                    <Text style={[styles.value, styles.saveValue]}>
                        {formatPrice(save)}
                    </Text>
                </View>
            )}

            <View style={styles.divider} />

            <View style={styles.summaryItem}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>{formatPrice(total)}</Text>
            </View>

            <Button
                title="Proceed to Checkout"
                onPress={onCheckout}
                disabled={total === 0}
                style={styles.checkoutButton}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: colors.border,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.text,
        marginBottom: 16,
    },
    summaryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    label: {
        fontSize: 14,
        color: colors.textSecondary,
    },
    value: {
        fontSize: 14,
        color: colors.text,
        fontWeight: '500',
    },
    saveValue: {
        color: colors.success,
    },
    divider: {
        height: 1,
        backgroundColor: colors.border,
        marginVertical: 12,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
    },
    totalValue: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.primary,
    },
    checkoutButton: {
        marginTop: 16,
    },
}); 