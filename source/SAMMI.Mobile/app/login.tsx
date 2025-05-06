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
import { User, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react-native';
import { RootState, useAppDispatch, useAppSelector } from '@/stores';
import { useTheme } from '@/hooks/useTheme';
import { palette } from '@/theme/palette';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Alert } from '@/components/Alert';
import { useAuth } from '@/hooks/useAuth';
import Toast from 'react-native-toast-message';
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
                if (err?.response?.errors !== "") {
                    Toast.show({
                        type: 'error',
                        text1: err?.response?.message || 'Đã có lỗi xảy ra'
                    })
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
                            Chào mừng trở lại
                        </Text>
                        <Text style={[styles.subtitle, { color: isDark ? palette.neutral[400] : palette.neutral[500] }]}>
                            Đăng nhập vào tài khoản của bạn để tiếp tục
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
                            leftIcon={<User size={20} color={isDark ? palette.neutral[400] : palette.neutral[500]} />}
                            error={usernameError}
                        />

                        <Input
                            label="Mật khẩu"
                            placeholder="Nhập mật khẩu của bạn"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            leftIcon={<Lock size={20} color={isDark ? palette.neutral[400] : palette.neutral[500]} />}
                            error={passwordError}
                            rightIcon={
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    {showPassword ? (
                                        <Eye size={20} color={isDark ? palette.neutral[400] : palette.neutral[500]} />
                                    ) : (
                                        <EyeOff size={20} color={isDark ? palette.neutral[400] : palette.neutral[500]} />
                                    )}
                                </TouchableOpacity>
                            }
                        />

                        <TouchableOpacity
                            style={styles.forgotPasswordButton}
                            onPress={handleForgotPassword}
                        >
                            <Text style={[styles.forgotPasswordText, { color: isDark ? palette.primary[400] : palette.primary[600] }]}>
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
                        <Text style={[styles.footerText, { color: isDark ? palette.neutral[400] : palette.neutral[500] }]}>
                            Chưa có tài khoản?
                        </Text>
                        <TouchableOpacity onPress={handleRegister}>
                            <Text style={[styles.registerText, { color: isDark ? palette.primary[400] : palette.primary[600] }]}>
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