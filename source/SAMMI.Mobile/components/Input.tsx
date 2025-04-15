import React from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface InputProps {
    label?: string;
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    error?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export const Input: React.FC<InputProps> = ({
    label,
    placeholder,
    value,
    onChangeText,
    error,
    leftIcon,
    rightIcon,
    secureTextEntry,
    keyboardType = 'default',
    autoCapitalize = 'none',
}) => {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[styles.inputContainer, error ? styles.errorBorder : {}]}>
                {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                />
                {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        marginBottom: 8,
        fontWeight: '500',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        paddingHorizontal: 12,
    },
    input: {
        flex: 1,
        height: 48,
        fontSize: 16,
    },
    iconContainer: {
        marginHorizontal: 8,
    },
    errorBorder: {
        borderColor: '#EF4444',
    },
    errorText: {
        color: '#EF4444',
        fontSize: 12,
        marginTop: 4,
    },
}); 