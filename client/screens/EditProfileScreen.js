import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import AppModal from '../components/AppModal';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeContext';
import { USER_PROFILE } from '../data/dummyData';

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const { colors, isDarkMode, background, card, text, textMuted, border } = useTheme();

  const [name, setName] = useState(USER_PROFILE.name);
  const [email, setEmail] = useState(USER_PROFILE.email);
  const [phone, setPhone] = useState('+1 234 567 8900'); // Dummy data for phone
  const [currency, setCurrency] = useState(USER_PROFILE.currency);

  const [modal, setModal] = useState({ visible: false });

  const handleSave = () => {
    setModal({ visible: true, type: 'success', title: 'Profile Updated!', message: 'Your profile has been saved successfully.' });
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
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
          {/* Header Section */}
          <LinearGradient
            colors={gradientColors}
            style={styles.headerGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <SafeAreaView>
              <View style={styles.headerTop}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                  <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit Profile</Text>
                <View style={{ width: 40 }} />
              </View>

              <View style={styles.avatarContainer}>
                <View style={styles.avatarWrapper}>
                  <LinearGradient colors={[colors.primary[300], colors.primary[400]]} style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {name.split(' ').map((n) => n[0]).join('').substring(0, 2)}
                    </Text>
                  </LinearGradient>
                  <TouchableOpacity style={[styles.editAvatarBtn, { backgroundColor: colors.primary[500], borderColor: isDarkMode ? colors.dark[800] : colors.primary[500] }]} activeOpacity={0.8}>
                    <Ionicons name="camera" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            </SafeAreaView>
          </LinearGradient>

          {/* Form Section */}
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: text }]}>Full Name</Text>
              <TextInput
                style={[styles.input, { backgroundColor: card, color: text, borderColor: border }]}
                placeholder="Enter your full name"
                placeholderTextColor={textMuted}
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: text }]}>Email Address</Text>
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

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: text }]}>Phone Number</Text>
              <TextInput
                style={[styles.input, { backgroundColor: card, color: text, borderColor: border }]}
                placeholder="Enter your phone number"
                placeholderTextColor={textMuted}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: text }]}>Preferred Currency</Text>
              <TextInput
                style={[styles.input, { backgroundColor: card, color: text, borderColor: border }]}
                placeholder="USD, EUR, etc."
                placeholderTextColor={textMuted}
                value={currency}
                onChangeText={setCurrency}
                autoCapitalize="characters"
              />
            </View>

            <TouchableOpacity onPress={handleSave} activeOpacity={0.8} style={styles.buttonWrapper}>
              <LinearGradient 
                colors={[colors.primary[400], colors.primary[600]]} 
                style={styles.saveButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <AppModal
        visible={modal.visible}
        type="success"
        title="Profile Updated!"
        message="Your profile has been saved successfully."
        onConfirm={() => { setModal({ visible: false }); navigation.goBack(); }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 40 : 10,
    marginBottom: 20,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  inputGroup: {
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
    marginTop: 20,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
