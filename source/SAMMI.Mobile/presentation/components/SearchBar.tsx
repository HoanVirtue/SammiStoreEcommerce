import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Pressable } from 'react-native';
import { colors } from '@/constants/colors';
import { Search, X } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface SearchBarProps {
  value: string;
  onSearch: (query: string) => void;
  onClear: () => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onSearch,
  onClear,
  placeholder = 'Tìm kiếm sản phẩm...',
}) => {
  const [localValue, setLocalValue] = useState(value);
  const router = useRouter();

  const handleSubmit = () => {
    onSearch(localValue);
  };

  const handleClear = () => {
    setLocalValue('');
    onClear();
  };

  const handlePress = () => {
    router.push('/search');
  };

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <View style={styles.searchIcon}>
        <Search size={20} color={colors.textSecondary} />
      </View>

      <TextInput
        style={styles.input}
        value={localValue}
        onChangeText={setLocalValue}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        returnKeyType="search"
        onSubmitEditing={handleSubmit}
        clearButtonMode="never"
        editable={false}
      />

      {localValue.length > 0 && (
        <Pressable onPress={handleClear} style={styles.clearButton}>
          <X size={18} color={colors.textSecondary} />
        </Pressable>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    height: '100%',
  },
  clearButton: {
    padding: 4,
  },
});