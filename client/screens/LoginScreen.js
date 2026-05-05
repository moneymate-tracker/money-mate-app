import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices/auth.slice';
import { useTheme } from '../theme/ThemeContext';
import AppModal from '../components/AppModal';

export default function LoginScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { colors, isDarkMode, background, text, textMuted, card, border } = useTheme();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modal, setModal] = useState({ visible: false });
  const showModal = (cfg) => setModal({ ...cfg, visible: true });
  const hideModal = () => setModal(m => ({ ...m, visible: false }));

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      showModal({ type: 'warning', title: 'Fields Required', message: 'Please fill in your email and password to continue.' });
      return;
    }

    try {
      const resultAction = await dispatch(login({ email: email.trim(), password }));

      if (login.fulfilled.match(resultAction)) {
        navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
      } else if (login.rejected.match(resultAction)) {
        showModal({ type: 'error', title: 'Login Failed', message: resultAction.payload || 'Invalid credentials. Please try again.' });
      }
    } catch (error) {
      showModal({ type: 'error', title: 'Something Went Wrong', message: 'Please check your connection and try again.' });
    }
  };

  const gradientColors = isDarkMode 
    ? [colors.dark[800], colors.dark[900]] 
    : [colors.primary[500], colors.primary[700]];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: background }]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          {/* Top Header Section with Gradient */}
          <LinearGradient
            colors={gradientColors}
            style={styles.headerGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.headerContent}>
              <Text style={styles.welcomeText}>Welcome Back!</Text>
              <Text style={styles.subWelcomeText}>Sign in to continue tracking your finances.</Text>
            </View>
          </LinearGradient>

          {/* Form Section */}
          <View style={[styles.formContainer, { backgroundColor: background }]}>
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: text }]}>Email</Text>
              <TextInput
                style={[styles.input, { backgroundColor: card, color: text, borderColor: border }]}
                placeholder="Enter your email"
                placeholderTextColor={textMuted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: text }]}>Password</Text>
              <TextInput
                style={[styles.input, { backgroundColor: card, color: text, borderColor: border }]}
                placeholder="Enter your password"
                placeholderTextColor={textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity onPress={handleLogin} activeOpacity={0.8} style={styles.buttonWrapper} disabled={loading}>
              <LinearGradient 
                colors={loading ? [colors.primary[300], colors.primary[400]] : [colors.primary[400], colors.primary[600]]} 
                style={styles.loginButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.loginButtonText}>
                  {loading ? 'Signing In...' : 'Sign In'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity>
                <Text style={[styles.forgotPasswordText, { color: colors.primary[500] }]}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dividerContainer}>
              <View style={[styles.divider, { backgroundColor: border }]} />
              <Text style={[styles.dividerText, { color: textMuted }]}>OR</Text>
              <View style={[styles.divider, { backgroundColor: border }]} />
            </View>

            <TouchableOpacity style={[styles.socialButton, { backgroundColor: card, borderColor: border }]} activeOpacity={0.7}>
              <Text style={[styles.socialButtonText, { color: text }]}>Sign in with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.socialButton, { backgroundColor: card, borderColor: border }]} activeOpacity={0.7}>
              <Text style={[styles.socialButtonText, { color: text }]}>Continue with Apple</Text>
            </TouchableOpacity>

            <View style={styles.footerContainer}>
              <Text style={[styles.footerText, { color: textMuted }]}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={[styles.signupText, { color: colors.primary[500] }]}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <AppModal
        visible={modal.visible}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        onConfirm={hideModal}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  headerContent: {
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subWelcomeText: {
    fontSize: 16,
    color: '#e4e1fd',
    opacity: 0.9,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    marginTop: -20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  buttonWrapper: {
    marginTop: 10,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    fontWeight: '500',
  },
  socialButton: {
    height: 56,
    borderWidth: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 30,
  },
  footerText: {
    fontSize: 15,
  },
  signupText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});