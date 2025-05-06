import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react-native';
import { RootState, useAppDispatch, useAppSelector } from '@/stores';
import { useTheme } from '@/hooks/useTheme';
import { palette } from '@/theme/palette';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Alert } from '@/components/Alert';
import { useAuth } from '@/hooks/useAuth';
import Toast from 'react-native-toast-message';
import { colors } from '@/constants/colors';

export default function LoginScreen() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector((state: RootState) => state.auth);
    const { isDark } = useTheme();

    const { login } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isRemember, setIsRemember] = useState(false);
    const [error, setError] = useState('');

    const validateForm = () => {
        let isValid = true;
        // Username validation
        if (!username.trim()) {
            setUsernameError('Tên đăng nhập là bắt buộc');
            isValid = false;
        } else {
            setUsernameError('');
        }

        // Password validation
        if (!password) {
            setPasswordError('Mật khẩu là bắt buộc');
            isValid = false;
        } else if (password.length < 6) {
            setPasswordError('Mật khẩu phải có ít nhất 6 ký tự');
            isValid = false;
        } else {
            setPasswordError('');
        }

        return isValid;
    };

    const handleLogin = async () => {
        const isValid = validateForm();
        if (isValid) {
            login({ username, password, rememberMe: isRemember || true  }, (err) => {
                console.log("handleLogin", err);
                if (err) {
                    Toast.show({
                        type: 'warning',
                        text1: 'Đã có lỗi xảy ra',
                        text2: err.message || 'Tài khoản hoặc mật khẩu không chính xác'
                    });
                }
            })
        }
    };

    const handleBack = () => {
        if (router.canGoBack()) {
            router.back();
        }
    };

    const handleRegister = () => {
        router.push('/register' as any);
    };

    const handleForgotPassword = () => {
        router.push('/forgot-password' as any);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
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
                        <ArrowLeft size={24} color={colors.primary} />
                    </TouchableOpacity>

                    <View style={styles.header}>
                        {/* <Image 
                            source={require('@/assets/images/logo.png')} 
                            style={styles.logo}
                            resizeMode="contain"
                        /> */}
                        <Text style={[styles.title, { color: colors.text }]}>
                            Chào mừng trở lại
                        </Text>
                        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                            Đăng nhập để khám phá thế giới làm đẹp
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
                            label="Tên đăng nhập"
                            placeholder="Nhập tên đăng nhập của bạn"
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize="none"
                            leftIcon={<User size={20} color={colors.primary} />}
                            error={usernameError}
                        />

                        <Input
                            label="Mật khẩu"
                            placeholder="Nhập mật khẩu của bạn"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            leftIcon={<Lock size={20} color={colors.primary} />}
                            error={passwordError}
                            rightIcon={
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    {showPassword ? (
                                        <Eye size={20} color={colors.primary} />
                                    ) : (
                                        <EyeOff size={20} color={colors.primary} />
                                    )}
                                </TouchableOpacity>
                            }
                        />

                        <TouchableOpacity
                            style={styles.forgotPasswordButton}
                            onPress={handleForgotPassword}
                        >
                            <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>
                                Quên mật khẩu?
                            </Text>
                        </TouchableOpacity>

                        <Button
                            title="Đăng nhập"
                            onPress={handleLogin}
                            style={styles.loginButton}
                            loading={isLoading}
                        />
                    </View>

                    <View style={styles.footer}>
                        <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                            Chưa có tài khoản?
                        </Text>
                        <TouchableOpacity onPress={handleRegister}>
                            <Text style={[styles.registerText, { color: colors.primary }]}>
                                Đăng ký
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
        alignItems: 'center',
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
    },
    alert: {
        marginBottom: 16,
    },
    form: {
        marginBottom: 24,
    },
    input: {
        marginBottom: 16,
    },
    forgotPasswordButton: {
        alignSelf: 'flex-end',
        marginTop: 4,
        marginBottom: 24,
    },
    forgotPasswordText: {
        fontSize: 14,
        fontWeight: '500',
    },
    loginButton: {
        marginBottom: 16,
        backgroundColor: colors.primary,
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
    registerText: {
        fontSize: 14,
        fontWeight: '600',
    },
});