import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { USER_PROFILE } from '../data/dummyData';
import { useTheme } from '../theme/ThemeContext';

const ProfileScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { isDarkMode, toggleDarkMode, colors, background, card, text, textMuted, border } = useTheme();

  const [notifications, setNotifications] = useState(true);
  const [biometrics, setBiometrics] = useState(false);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => Alert.alert('Logged out!') },
    ]);
  };

  const menuItems = [
    {
      section: 'Account',
      items: [
        { icon: 'person-outline', label: 'Edit Profile', color: colors.primary[500] },
        { icon: 'wallet-outline', label: 'Payment Methods', color: colors.primary[600] },
        { icon: 'shield-checkmark-outline', label: 'Security', color: colors.primary[400] },
        { icon: 'notifications-outline', label: 'Notifications', color: colors.primary[500], toggle: true, value: notifications, onChange: setNotifications },
      ],
    },
    {
      section: 'Preferences',
      items: [
        { icon: 'moon-outline', label: 'Dark Mode', color: colors.primary[700], toggle: true, value: isDarkMode, onChange: toggleDarkMode },
        { icon: 'finger-print-outline', label: 'Biometric Login', color: colors.primary[800], toggle: true, value: biometrics, onChange: setBiometrics },
        { icon: 'language-outline', label: 'Language', color: colors.primary[500], value: 'English' },
        { icon: 'cash-outline', label: 'Currency', color: colors.primary[600], value: 'USD' },
      ],
    },
    {
      section: 'Support',
      items: [
        { icon: 'help-circle-outline', label: 'Help & FAQ', color: colors.primary[500], screen: 'HelpFAQ' },
        { icon: 'mail-outline', label: 'Contact Support', color: colors.primary[600], screen: 'ContactSupport' },
        { icon: 'star-outline', label: 'Rate App', color: colors.primary[400] },
        { icon: 'document-text-outline', label: 'Privacy Policy', color: textMuted, screen: 'PrivacyPolicy' },
      ],
    },
  ];

  const stats = [
    { label: 'Total Expenses', value: '24', icon: 'receipt-outline', color: colors.primary[400] },
    { label: 'Categories', value: '8', icon: 'grid-outline', color: colors.primary[500] },
    { label: 'Savings', value: '$4.2K', icon: 'trending-up-outline', color: colors.primary[600] },
    { label: 'Member Since', value: 'Mar 24', icon: 'calendar-outline', color: colors.primary[700] },
  ];

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top, backgroundColor: background }]}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Header */}
      <LinearGradient colors={[colors.primary[500], colors.primary[700]]} style={styles.profileHeader}>
        {/* Avatar */}
        <LinearGradient colors={[colors.primary[300], colors.primary[400]]} style={styles.avatar}>
          <Text style={styles.avatarText}>
            {USER_PROFILE.name.split(' ').map((n) => n[0]).join('')}
          </Text>
        </LinearGradient>
        <Text style={styles.name}>{USER_PROFILE.name}</Text>
        <Text style={styles.email}>{USER_PROFILE.email}</Text>

        <View style={styles.memberBadge}>
          <Ionicons name="ribbon" size={12} color={colors.primary[200]} />
          <Text style={[styles.memberText, { color: colors.primary[200] }]}>Premium Member · {USER_PROFILE.memberSince}</Text>
        </View>
      </LinearGradient>

      {/* Stats */}
      <View style={styles.statsGrid}>
        {stats.map((stat) => (
          <View key={stat.label} style={[styles.statCard, { backgroundColor: card }]}>
            <View style={[styles.statIcon, { backgroundColor: stat.color + '18' }]}>
              <Ionicons name={stat.icon} size={20} color={stat.color} />
            </View>
            <Text style={[styles.statValue, { color: text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: textMuted }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Menu Sections */}
      {menuItems.map((section) => (
        <View key={section.section} style={styles.menuSection}>
          <Text style={styles.sectionLabel}>{section.section.toUpperCase()}</Text>
          <View style={[styles.menuCard, { backgroundColor: card }]}>
            {section.items.map((item, index) => (
              <TouchableOpacity
                key={item.label}
                style={[
                  styles.menuItem,
                  index < section.items.length - 1 && { borderBottomWidth: 1, borderBottomColor: border },
                ]}
                onPress={() => {
                  if (item.screen) {
                    navigation.navigate(item.screen);
                  }
                }}
                activeOpacity={item.toggle ? 1 : 0.7}
              >
                <View style={styles.menuLeft}>
                  <View style={[styles.menuIcon, { backgroundColor: item.color + '18' }]}>
                    <Ionicons name={item.icon} size={18} color={item.color} />
                  </View>
                  <Text style={[styles.menuLabel, { color: text }]}>{item.label}</Text>
                </View>
                {item.toggle ? (
                  <Switch
                    value={item.value}
                    onValueChange={item.onChange}
                    trackColor={{ false: border, true: colors.primary[500] }}
                    thumbColor={item.value ? '#fff' : textMuted}
                  />
                ) : item.value ? (
                  <View style={[styles.menuValueBadge, { backgroundColor: background }]}>
                    <Text style={[styles.menuValueText, { color: textMuted }]}>{item.value}</Text>
                  </View>
                ) : (
                  <Ionicons name="chevron-forward" size={16} color={border} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      {/* Logout */}
      <View className='w-full m-auto mt-2 px-20 '>
        <TouchableOpacity onPress={handleLogout} activeOpacity={0.85}>
          <View style={[styles.logoutBtn, { backgroundColor: isDarkMode ? colors.dark[700] : colors.primary[50], borderColor: isDarkMode ? colors.dark[600] : colors.primary[100] }]}>
            <Ionicons name="log-out-outline" size={20} color={colors.primary[500]} style={{ marginRight: 8 }} />
            <Text style={[styles.logoutText, { color: colors.primary[500] }]}>Logout</Text>
          </View>
        </TouchableOpacity>
        <Text style={[styles.versionText, { color: textMuted }]}>MoneyMate v1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  profileHeader: {
    alignItems: 'center', paddingTop: 32, paddingBottom: 40,
    paddingHorizontal: 24,
  },
  avatar: {
    width: 88, height: 88, borderRadius: 44, alignItems: 'center', justifyContent: 'center',
    marginBottom: 14,
    borderWidth: 4, borderColor: 'rgba(255,255,255,0.3)',
  },
  avatarText: { fontSize: 28, fontWeight: '800', color: '#fff' },
  name: { fontSize: 22, fontWeight: '800', color: '#fff', marginBottom: 4 },
  email: { fontSize: 14, color: 'rgba(255,255,255,0.75)', marginBottom: 12 },
  memberBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 6,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.25)',
  },
  memberText: { fontSize: 12, fontWeight: '600' },

  statsGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: 16, gap: 12,
    marginTop: -24, marginBottom: 8,
  },
  statCard: {
    width: '47%', borderRadius: 20, padding: 16,
    alignItems: 'center', gap: 8,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, shadowRadius: 12, elevation: 4,
  },
  statIcon: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  statValue: { fontSize: 20, fontWeight: '800' },
  statLabel: { fontSize: 11, textAlign: 'center' },

  menuSection: { paddingHorizontal: 16, marginTop: 20 },
  sectionLabel: { fontSize: 11, fontWeight: '700', color: '#999', letterSpacing: 1.2, marginBottom: 10 },
  menuCard: {
    borderRadius: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06, shadowRadius: 12, elevation: 3,
  },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 14,
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  menuIcon: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  menuLabel: { fontSize: 14, fontWeight: '500' },
  menuValueBadge: {
    borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4,
  },
  menuValueText: { fontSize: 12, fontWeight: '600' },

  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    borderRadius: 18, paddingVertical: 16,
    borderWidth: 1,

  },
  logoutText: { fontSize: 15, fontWeight: '700' },
  versionText: { fontSize: 12, marginTop: 16 },
});

export default ProfileScreen;
