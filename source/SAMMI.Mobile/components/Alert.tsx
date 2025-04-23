import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

interface AlertProps {
    type: 'error' | 'success' | 'warning' | 'info';
    message: string;
    style?: ViewStyle;
}

export const Alert: React.FC<AlertProps> = ({ type, message, style }) => {
    const getBackgroundColor = () => {
        switch (type) {
            case 'error':
                return '#FEE2E2';
            case 'success':
                return '#D1FAE5';
            case 'warning':
                return '#FEF3C7';
            case 'info':
                return '#DBEAFE';
            default:
                return '#F3F4F6';
        }
    };

    const getTextColor = () => {
        switch (type) {
            case 'error':
                return '#DC2626';
            case 'success':
                return '#059669';
            case 'warning':
                return '#D97706';
            case 'info':
                return '#2563EB';
            default:
                return '#374151';
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: getBackgroundColor() }, style]}>
            <Text style={[styles.text, { color: getTextColor() }]}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    text: {
        fontSize: 14,
        fontWeight: '500',
    },
}); 