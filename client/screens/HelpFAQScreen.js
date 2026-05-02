import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';

const FAQItem = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);
  const { colors, card, text, textMuted, border, primaryText } = useTheme();

  return (
    <View style={[styles.faqItem, { backgroundColor: card, borderColor: border }]}>
      <TouchableOpacity 
        style={styles.faqHeader} 
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
      >
        <Text style={[styles.question, { color: text }]}>{question}</Text>
        <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={20} color={primaryText} />
      </TouchableOpacity>
      {expanded && (
        <View style={[styles.faqBody, { borderTopColor: border }]}>
          <Text style={[styles.answer, { color: textMuted }]}>{answer}</Text>
        </View>
      )}
    </View>
  );
};

const HelpFAQScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { background, text, border } = useTheme();

  const faqs = [
    {
      question: "How do I add a new expense?",
      answer: "Tap the floating '+' button at the bottom of the screen to open the Add Expense modal. Enter the amount, select a category, and hit Save."
    },
    {
      question: "How are budgets calculated?",
      answer: "Budgets are set per category for the current month. Your total spent in that category is subtracted from the budget to show remaining funds."
    },
    {
      question: "Can I use multiple currencies?",
      answer: "Currently, MoneyMate supports a single currency defined in your Profile Settings. Multi-currency support is coming soon."
    },
    {
      question: "How do I toggle Dark Mode?",
      answer: "Go to your Profile tab, and under Preferences, toggle the switch for 'Dark Mode'."
    },
    {
      question: "Is my financial data secure?",
      answer: "Yes, all data is securely stored locally on your device or encrypted via our secure cloud servers."
    }
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: background }]}>
      <View style={[styles.header, { borderBottomColor: border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: text }]}>Help & FAQ</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.subText, { color: text }]}>Common Questions</Text>
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
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
  subText: { fontSize: 16, fontWeight: '700', marginBottom: 16 },
  faqItem: {
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
    overflow: 'hidden',
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  question: { fontSize: 15, fontWeight: '600', flex: 1, paddingRight: 8 },
  faqBody: { padding: 16, paddingTop: 12, borderTopWidth: 1 },
  answer: { fontSize: 14, lineHeight: 22 },
});

export default HelpFAQScreen;
