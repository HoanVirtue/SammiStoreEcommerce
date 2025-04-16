import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Mail, Lock, ArrowLeft } from 'lucide-react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';
import { registerAuth } from '@/services/auth'; 

export default function RegisterScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateForm = () => {
    let isValid = true;
    
    // Name validation
    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }
    
    // Email validation
    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }
    
    // Password validation
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }
    
    // Confirm password validation
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }
    
    return isValid;
  };

  const handleRegister = () => {
    if (validateForm()) {
      dispatch(register({ name, email, password }));
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? palette.neutral[900] : '#FFFFFF' }]}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBack}
          >
            <ArrowLeft size={24} color={isDark ? palette.neutral[100] : palette.neutral[900]} />
          </TouchableOpacity>
          
          <View style={styles.header}>
            <Text style={[styles.title, { color: isDark ? palette.neutral[100] : palette.neutral[900] }]}>
              Create Account
            </Text>
            <Text style={[styles.subtitle, { color: isDark ? palette.neutral[400] : palette.neutral[500] }]}>
              Sign up to get started with Glow
            </Text>
          </View>
          
          {error && (
            <Alert
              type="error"
              message={error}
              style={styles.alert}
            />
          )}
          
          <View style={styles.form}>
            <Input
              label="Name"
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
              leftIcon={<User size={20} color={isDark ? palette.neutral[400] : palette.neutral[500]} />}
              error={nameError}
            />
            
            <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon={<Mail size={20} color={isDark ? palette.neutral[400] : palette.neutral[500]} />}
              error={emailError}
            />
            
            <Input
              label="Password"
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              isPassword={true}
              leftIcon={<Lock size={20} color={isDark ? palette.neutral[400] : palette.neutral[500]} />}
              error={passwordError}
            />
            
            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              isPassword={true}
              leftIcon={<Lock size={20} color={isDark ? palette.neutral[400] : palette.neutral[500]} />}
              error={confirmPasswordError}
            />
            
            <Button
              title="Register"
              onPress={handleRegister}
              style={styles.registerButton}
              isLoading={isLoading}
            />
          </View>
          
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: isDark ? palette.neutral[400] : palette.neutral[500] }]}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={[styles.loginText, { color: isDark ? palette.primary[400] : palette.primary[600] }]}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  backButton: {
    marginBottom: 24,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  alert: {
    marginBottom: 16,
  },
  form: {
    marginBottom: 24,
  },
  registerButton: {
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
    paddingVertical: 16,
  },
  footerText: {
    fontSize: 14,
    marginRight: 4,
  },
  loginText: {
    fontSize: 14,
    fontWeight: '600',
  },
});