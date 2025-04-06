import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { colors } from '@/constants/colors';
import { AlertTriangle, RefreshCw } from 'lucide-react-native';

interface ErrorViewProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorView: React.FC<ErrorViewProps> = ({ message, onRetry }) => {
  return (
    <View style={styles.container}>
      <AlertTriangle size={48} color={colors.error} />
      <Text style={styles.message}>{message}</Text>
      
      {onRetry && (
        <Pressable style={styles.retryButton} onPress={onRetry}>
          <RefreshCw size={16} color={colors.white} />
          <Text style={styles.retryText}>Try Again</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  message: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  retryText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
});