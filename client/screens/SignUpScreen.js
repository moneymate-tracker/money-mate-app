import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../redux/slices/auth.slice';
import { useTheme } from '../theme/ThemeContext';

export default function SignUpScreen({ navigation }) {
  const dispatch = useDispatch();
  const { colors, isDarkMode, background, text, textMuted, card, border } = useTheme();
  const { loading, error } = useSelector((state) => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long');
      return;
    }


    try {
      const resultAction = await dispatch(signup({
        username: name.trim().toLowerCase().replace(/\s+/g, ''),
        fullname: name.trim(),
        email: email.trim(),
        password
      }));

      console.log('Signup result:', resultAction);

      if (signup.fulfilled.match(resultAction)) {
        Alert.alert(
          'Success',
          'Account created successfully! Please check your email for verification.',
          [
            { text: 'OK', onPress: () => navigation.navigate('Login') }
          ]
        );
      } else if (signup.rejected.match(resultAction)) {
        Alert.alert('Sign Up Failed', resultAction.payload || 'Failed to create account');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
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
              <Text style={styles.welcomeText}>Create Account</Text>
              <Text style={styles.subWelcomeText}>Start your journey to financial freedom.</Text>
            </View>
          </LinearGradient>

          {/* Form Section */}
          <View style={[styles.formContainer, { backgroundColor: background }]}>
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: text }]}>Full Name</Text>
              <TextInput
                style={[styles.input, { backgroundColor: card, color: text, borderColor: border }]}
                placeholder="Enter your full name"
                placeholderTextColor={textMuted}
                value={name}
                onChangeText={setName}
              />
            </View>

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
                placeholder="Create a secure password"
                placeholderTextColor={textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity onPress={handleSignUp} activeOpacity={0.8} style={styles.buttonWrapper} disabled={loading}>
              <LinearGradient 
                colors={loading ? [colors.primary[300], colors.primary[400]] : [colors.primary[400], colors.primary[600]]} 
                style={styles.loginButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.loginButtonText}>
                  {loading ? 'Creating Account...' : 'Sign Up'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.footerContainer}>
              <Text style={[styles.footerText, { color: textMuted }]}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={[styles.signupText, { color: colors.primary[500] }]}>Sign In</Text>
              </TouchableOpacity>
            </View>
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
    marginBottom: 30,
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
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  footerText: {
    fontSize: 15,
  },
  signupText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
