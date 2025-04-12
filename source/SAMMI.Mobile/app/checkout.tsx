import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { useCartStore } from '@/presentation/stores/cartStore';
import { Button } from '@/presentation/components/Button';
import { CreditCard, MapPin, Truck, Check } from 'lucide-react-native';

export default function CheckoutScreen() {
  const router = useRouter();
  const { cart, clearCart } = useCartStore();

  const [activeStep, setActiveStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const handleNextStep = () => {
    setActiveStep(prev => prev + 1);
  };

  const handlePreviousStep = () => {
    setActiveStep(prev => prev - 1);
  };

  const handlePlaceOrder = () => {
    setIsOrderPlaced(true);
    clearCart();

    // In a real app, we would send the order to the server here

    // Simulate a delay before redirecting to home
    setTimeout(() => {
      router.replace('/');
    }, 3000);
  };

  const renderShippingStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Shipping Information</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={shippingInfo.fullName}
          onChangeText={(text) => setShippingInfo({ ...shippingInfo, fullName: text })}
          placeholder="Enter your full name"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={shippingInfo.address}
          onChangeText={(text) => setShippingInfo({ ...shippingInfo, address: text })}
          placeholder="Enter your address"
        />
      </View>

      <View style={styles.formRow}>
        <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            value={shippingInfo.city}
            onChangeText={(text) => setShippingInfo({ ...shippingInfo, city: text })}
            placeholder="City"
          />
        </View>

        <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
          <Text style={styles.label}>State</Text>
          <TextInput
            style={styles.input}
            value={shippingInfo.state}
            onChangeText={(text) => setShippingInfo({ ...shippingInfo, state: text })}
            placeholder="State"
          />
        </View>
      </View>

      <View style={styles.formRow}>
        <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
          <Text style={styles.label}>Zip Code</Text>
          <TextInput
            style={styles.input}
            value={shippingInfo.zipCode}
            onChangeText={(text) => setShippingInfo({ ...shippingInfo, zipCode: text })}
            placeholder="Zip Code"
            keyboardType="numeric"
          />
        </View>

        <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={shippingInfo.phone}
            onChangeText={(text) => setShippingInfo({ ...shippingInfo, phone: text })}
            placeholder="Phone Number"
            keyboardType="phone-pad"
          />
        </View>
      </View>

      <Button
        title="Continue to Payment"
        onPress={handleNextStep}
        style={styles.button}
      />
    </View>
  );

  const renderPaymentStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Payment Information</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Card Number</Text>
        <TextInput
          style={styles.input}
          value={paymentInfo.cardNumber}
          onChangeText={(text) => setPaymentInfo({ ...paymentInfo, cardNumber: text })}
          placeholder="1234 5678 9012 3456"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Card Holder Name</Text>
        <TextInput
          style={styles.input}
          value={paymentInfo.cardHolder}
          onChangeText={(text) => setPaymentInfo({ ...paymentInfo, cardHolder: text })}
          placeholder="Enter card holder name"
        />
      </View>

      <View style={styles.formRow}>
        <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
          <Text style={styles.label}>Expiry Date</Text>
          <TextInput
            style={styles.input}
            value={paymentInfo.expiryDate}
            onChangeText={(text) => setPaymentInfo({ ...paymentInfo, expiryDate: text })}
            placeholder="MM/YY"
          />
        </View>

        <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
          <Text style={styles.label}>CVV</Text>
          <TextInput
            style={styles.input}
            value={paymentInfo.cvv}
            onChangeText={(text) => setPaymentInfo({ ...paymentInfo, cvv: text })}
            placeholder="123"
            keyboardType="numeric"
            secureTextEntry
          />
        </View>
      </View>

      <View style={styles.buttonGroup}>
        <Button
          title="Back"
          onPress={handlePreviousStep}
          variant="outline"
          style={{ ...styles.button, flex: 1, marginRight: 8 }}
        />

        <Button
          title="Continue to Review"
          onPress={handleNextStep}
          style={{ ...styles.button, flex: 2 }}
        />
      </View>
    </View>
  );

  const renderReviewStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Order Review</Text>

      <View style={styles.summarySection}>
        <View style={styles.summaryHeader}>
          <MapPin size={18} color={colors.primary} />
          <Text style={styles.summaryTitle}>Shipping Information</Text>
        </View>

        <View style={styles.summaryContent}>
          <Text style={styles.summaryText}>{shippingInfo.fullName}</Text>
          <Text style={styles.summaryText}>{shippingInfo.address}</Text>
          <Text style={styles.summaryText}>
            {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
          </Text>
          <Text style={styles.summaryText}>{shippingInfo.phone}</Text>
        </View>
      </View>

      <View style={styles.summarySection}>
        <View style={styles.summaryHeader}>
          <CreditCard size={18} color={colors.primary} />
          <Text style={styles.summaryTitle}>Payment Information</Text>
        </View>

        <View style={styles.summaryContent}>
          <Text style={styles.summaryText}>
            Card ending in {paymentInfo.cardNumber.slice(-4)}
          </Text>
          <Text style={styles.summaryText}>{paymentInfo.cardHolder}</Text>
          <Text style={styles.summaryText}>Expires {paymentInfo.expiryDate}</Text>
        </View>
      </View>

      <View style={styles.summarySection}>
        <View style={styles.summaryHeader}>
          <Truck size={18} color={colors.primary} />
          <Text style={styles.summaryTitle}>Order Summary</Text>
        </View>

        <View style={styles.orderSummary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${cart.subtotal.toFixed(2)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>$0.00</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax</Text>
            <Text style={styles.summaryValue}>${(cart.subtotal * 0.08).toFixed(2)}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              ${(cart.subtotal + (cart.subtotal * 0.08)).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonGroup}>
        <Button
          title="Back"
          onPress={handlePreviousStep}
          variant="outline"
          style={{ ...styles.button, flex: 1, marginRight: 8 }}
        />

        <Button
          title="Place Order"
          onPress={handlePlaceOrder}
          style={{ ...styles.button, flex: 2 }}
        />
      </View>
    </View>
  );

  const renderOrderPlaced = () => (
    <View style={styles.orderPlacedContainer}>
      <View style={styles.checkmarkContainer}>
        <Check size={48} color={colors.white} />
      </View>

      <Text style={styles.orderPlacedTitle}>Order Placed Successfully!</Text>
      <Text style={styles.orderPlacedText}>
        Thank you for your purchase. Your order has been placed and will be processed soon.
      </Text>

      <Text style={styles.redirectingText}>Redirecting to home page...</Text>
    </View>
  );

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      <View style={[styles.step, activeStep >= 1 && styles.activeStep]}>
        <Text style={[styles.stepNumber, activeStep >= 1 && styles.activeStepNumber]}>1</Text>
        <Text style={styles.stepLabel}>Shipping</Text>
      </View>

      <View style={styles.stepConnector} />

      <View style={[styles.step, activeStep >= 2 && styles.activeStep]}>
        <Text style={[styles.stepNumber, activeStep >= 2 && styles.activeStepNumber]}>2</Text>
        <Text style={styles.stepLabel}>Payment</Text>
      </View>

      <View style={styles.stepConnector} />

      <View style={[styles.step, activeStep >= 3 && styles.activeStep]}>
        <Text style={[styles.stepNumber, activeStep >= 3 && styles.activeStepNumber]}>3</Text>
        <Text style={styles.stepLabel}>Review</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {!isOrderPlaced && renderStepIndicator()}

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {isOrderPlaced ? (
          renderOrderPlaced()
        ) : (
          <>
            {activeStep === 1 && renderShippingStep()}
            {activeStep === 2 && renderPaymentStep()}
            {activeStep === 3 && renderReviewStep()}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 16,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  step: {
    alignItems: 'center',
  },
  activeStep: {

  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.card,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 28,
    fontWeight: '600',
    marginBottom: 4,
  },
  activeStepNumber: {
    backgroundColor: colors.primary,
    color: colors.white,
  },
  stepLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  stepConnector: {
    width: 40,
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: 8,
  },
  stepContainer: {
    marginBottom: 24,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.text,
  },
  button: {
    marginTop: 8,
  },
  buttonGroup: {
    flexDirection: 'row',
    marginTop: 16,
  },
  summarySection: {
    marginBottom: 24,
    backgroundColor: colors.card,
    borderRadius: 12,
    overflow: 'hidden',
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.primaryLight,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  summaryContent: {
    padding: 16,
  },
  summaryText: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 4,
  },
  orderSummary: {
    padding: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  summaryValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  orderPlacedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    marginTop: 40,
  },
  checkmarkContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  orderPlacedTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  orderPlacedText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  redirectingText: {
    fontSize: 14,
    color: colors.primary,
    fontStyle: 'italic',
  },
});