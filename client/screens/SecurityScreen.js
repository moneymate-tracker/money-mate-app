import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, SafeAreaView, StyleSheet, ScrollView, Switch, Alert, Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeContext';

export default function SecurityScreen() {
  const navigation = useNavigation();
  const { colors, isDarkMode, background, card, text, textMuted, border } = useTheme();

  // Security Toggles State
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [appLockEnabled, setAppLockEnabled] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const gradientColors = isDarkMode 
    ? [colors.dark[800], colors.dark[900]] 
    : [colors.primary[500], colors.primary[700]];

  const handlePasswordChange = () => {
    Alert.alert('Change Password', 'A password reset link has been sent to your registered email.');
  };

  const handleDeviceManagement = () => {
    Alert.alert('Active Sessions', 'You are currently logged in on 1 device (This iPhone).');
  };

  const securityOptions = [
    {
      title: 'App Access',
      items: [
        {
          icon: 'finger-print',
          label: 'Face ID / Touch ID',
          description: 'Unlock MoneyMate with biometrics',
          color: colors.primary[500],
          isToggle: true,
          value: biometricsEnabled,
          onToggle: setBiometricsEnabled,
        },
        {
          icon: 'keypad',
          label: 'App PIN Lock',
          description: 'Require a PIN when opening the app',
          color: colors.primary[600],
          isToggle: true,
          value: appLockEnabled,
          onToggle: setAppLockEnabled,
        },
      ]
    },
    {
      title: 'Account Security',
      items: [
        {
          icon: 'shield-half',
          label: 'Two-Factor Authentication',
          description: 'Add an extra layer of security',
          color: colors.primary[400],
          isToggle: true,
          value: twoFactorEnabled,
          onToggle: setTwoFactorEnabled,
        },
        {
          icon: 'lock-closed',
          label: 'Change Password',
          description: 'Update your account password',
          color: colors.primary[700],
          isToggle: false,
          onPress: handlePasswordChange,
        },
        {
          icon: 'phone-portrait',
          label: 'Manage Devices',
          description: 'Review active sessions',
          color: colors.primary[500],
          isToggle: false,
          onPress: handleDeviceManagement,
        },
      ]
    }
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: background }]}>
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
              <Text style={styles.headerTitle}>Security</Text>
              <View style={{ width: 40 }} />
            </View>

            <View style={styles.headerContent}>
              <Ionicons name="shield-checkmark" size={60} color="#fff" style={styles.headerIcon} />
              <Text style={styles.welcomeText}>Secure Your Data</Text>
              <Text style={styles.subWelcomeText}>Manage your authentication methods and keep your financial data safe.</Text>
            </View>
          </SafeAreaView>
        </LinearGradient>

        {/* Security Options List */}
        <View style={styles.contentContainer}>
          {securityOptions.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>{section.title.toUpperCase()}</Text>
              <View style={[styles.card, { backgroundColor: card }]}>
                {section.items.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.menuItem,
                      index < section.items.length - 1 && { borderBottomWidth: 1, borderBottomColor: border },
                    ]}
                    onPress={item.isToggle ? () => item.onToggle(!item.value) : item.onPress}
                    activeOpacity={item.isToggle ? 1 : 0.7}
                  >
                    <View style={styles.menuLeft}>
                      <View style={[styles.menuIcon, { backgroundColor: item.color + '18' }]}>
                        <Ionicons name={item.icon} size={22} color={item.color} />
                      </View>
                      <View style={styles.textContainer}>
                        <Text style={[styles.menuLabel, { color: text }]}>{item.label}</Text>
                        <Text style={[styles.menuDescription, { color: textMuted }]}>{item.description}</Text>
                      </View>
                    </View>
                    {item.isToggle ? (
                      <Switch
                        value={item.value}
                        onValueChange={item.onToggle}
                        trackColor={{ false: border, true: colors.primary[500] }}
                        thumbColor={Platform.OS === 'ios' ? '#fff' : (item.value ? '#fff' : '#f4f3f4')}
                      />
                    ) : (
                      <Ionicons name="chevron-forward" size={18} color={textMuted} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
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
  headerContent: {
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 30,
  },
  headerIcon: {
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subWelcomeText: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    lineHeight: 22,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#999',
    letterSpacing: 1.2,
    marginBottom: 10,
    marginLeft: 12,
  },
  card: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 16,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  menuDescription: {
    fontSize: 13,
  },
});
