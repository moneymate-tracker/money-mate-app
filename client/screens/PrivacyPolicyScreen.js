import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';

const PrivacyPolicyScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { colors, background, card, text, textMuted, border, primaryText, isDarkMode } = useTheme();

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: background }]}>
      <View style={[styles.header, { borderBottomColor: border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: text }]}>Privacy Policy</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.card, { backgroundColor: card, shadowColor: isDarkMode ? '#000' : colors.primary[500] }]}>
          <Text style={[styles.sectionTitle, { color: primaryText }]}>1. Data Collection</Text>
          <Text style={[styles.paragraph, { color: textMuted }]}>
            We collect information you provide directly to us when you create an account, update your profile, or use our services. This includes your name, email address, and financial data such as expenses and income inputted into the app.
          </Text>

          <Text style={[styles.sectionTitle, { color: primaryText }]}>2. How We Use Your Data</Text>
          <Text style={[styles.paragraph, { color: textMuted }]}>
            Your data is used to provide, maintain, and improve our services. Specifically, we use it to calculate your budgets, generate analytics, and offer personalized insights into your spending habits.
          </Text>

          <Text style={[styles.sectionTitle, { color: primaryText }]}>3. Data Security</Text>
          <Text style={[styles.paragraph, { color: textMuted }]}>
            We implement robust security measures to protect your personal information. Your data is encrypted in transit and at rest. We do not share your financial information with third-party advertisers.
          </Text>

          <Text style={[styles.sectionTitle, { color: primaryText }]}>4. Your Rights</Text>
          <Text style={[styles.paragraph, { color: textMuted }]}>
            You have the right to access, correct, or delete your personal data at any time. You can manage these preferences directly from your account settings.
          </Text>

          <Text style={[styles.sectionTitle, { color: primaryText }]}>5. Contact Us</Text>
          <Text style={[styles.paragraph, { color: textMuted }]}>
            If you have any questions about this Privacy Policy, please contact our support team.
          </Text>
          
          <Text style={[styles.lastUpdated, { color: border }]}>Last Updated: October 2024</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  content: { padding: 16, paddingBottom: 40 },
  card: {
    borderRadius: 20,
    padding: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginTop: 16, marginBottom: 8 },
  paragraph: { fontSize: 14, lineHeight: 22, marginBottom: 8 },
  lastUpdated: { fontSize: 12, marginTop: 24, textAlign: 'center' }
});

export default PrivacyPolicyScreen;
