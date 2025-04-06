import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { CartItem as CartItemType } from '@/domain/entities/CartItem';
import { colors } from '@/constants/colors';
import { Minus, Plus, Trash2 } from 'lucide-react-native';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export const CartItemComponent: React.FC<CartItemProps> = ({ 
  item, 
  onUpdateQuantity, 
  onRemove 
}) => {
  const handleIncrement = () => {
    onUpdateQuantity(item.product.id, item.quantity + 1);
  };
  
  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.product.id, item.quantity - 1);
    }
  };
  
  const handleRemove = () => {
    onRemove(item.product.id);
  };
  
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: item.product.imageUrls[0] }} 
        style={styles.image}
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>{item.product.brand}</Text>
            <Text style={styles.name} numberOfLines={2}>{item.product.name}</Text>
          </View>
          
          <Pressable onPress={handleRemove} hitSlop={8}>
            <Trash2 size={18} color={colors.textSecondary} />
          </Pressable>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.price}>${(item.product.price * item.quantity).toFixed(2)}</Text>
          
          <View style={styles.quantityContainer}>
            <Pressable 
              style={[styles.quantityButton, item.quantity <= 1 && styles.quantityButtonDisabled]} 
              onPress={handleDecrement}
              disabled={item.quantity <= 1}
            >
              <Minus size={16} color={item.quantity <= 1 ? colors.textSecondary : colors.text} />
            </Pressable>
            
            <Text style={styles.quantity}>{item.quantity}</Text>
            
            <Pressable style={styles.quantityButton} onPress={handleIncrement}>
              <Plus size={16} color={colors.text} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  brand: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    width: '90%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  quantityButton: {
    padding: 6,
    backgroundColor: colors.card,
  },
  quantityButtonDisabled: {
    backgroundColor: colors.border,
  },
  quantity: {
    paddingHorizontal: 12,
    fontSize: 14,
    fontWeight: '600',
  },
});