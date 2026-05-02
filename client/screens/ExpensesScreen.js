import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MonthSelector from '../components/MonthSelector';
import ProgressBar from '../components/ProgressBar';
import { useTheme } from '../theme/ThemeContext';
import {
  CATEGORIES,
  getExpensesByMonth,
  getTotalExpensesByMonth,
  getIncomeByMonth,
  getExpensesByCategoryAndMonth,
} from '../data/dummyData';

const { width } = Dimensions.get('window');

const ExpensesScreen = () => {
  const insets = useSafeAreaInsets();
  const { colors, background, card, text, textMuted, primaryText, border, isDarkMode } = useTheme();
  const [month, setMonth] = useState(4);
  const [year, setYear] = useState(2024);

  const handlePrev = () => {
    if (month === 1) { setMonth(12); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
  };
  const handleNext = () => {
    if (month === 12) { setMonth(1); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
  };

  const totalIncome = getIncomeByMonth(month, year);
  const totalExpense = getTotalExpensesByMonth(month, year);
  const savings = totalIncome - totalExpense;
  const categoryData = getExpensesByCategoryAndMonth(month, year);

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top, backgroundColor: background }]}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Page Header */}
      <View style={styles.pageHeader}>
        <Text style={[styles.pageTitle, { color: text }]}>Expenses</Text>
        <Text style={[styles.pageSubtitle, { color: textMuted }]}>Track your spending</Text>
      </View>

      <View style={styles.content}>
        <MonthSelector month={month} year={year} onPrev={handlePrev} onNext={handleNext} />

        {/* Summary Cards */}
        <View style={styles.summaryRow}>
          <LinearGradient colors={[colors.primary[400], colors.primary[500]]} style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Income</Text>
            <Text style={styles.summaryAmount}>${totalIncome.toLocaleString()}</Text>
            <Text style={styles.summaryTag}>💰 This month</Text>
          </LinearGradient>

          <LinearGradient colors={[colors.primary[600], colors.primary[700]]} style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Expense</Text>
            <Text style={styles.summaryAmount}>${totalExpense.toFixed(2)}</Text>
            <Text style={styles.summaryTag}>💸 This month</Text>
          </LinearGradient>
        </View>

        {/* Savings card */}
        <View style={[styles.savingsCard, { backgroundColor: card, shadowColor: isDarkMode ? '#000' : colors.primary[500] }]}>
          <View>
            <Text style={[styles.savingsLabel, { color: textMuted }]}>Net Savings</Text>
            <Text style={[styles.savingsAmount, { color: savings >= 0 ? colors.primary[400] : colors.primary[700] }]}>
              {savings >= 0 ? '+' : '-'}${Math.abs(savings).toFixed(2)}
            </Text>
          </View>
          <View style={[styles.savingsBadge, { backgroundColor: isDarkMode ? colors.dark[700] : colors.primary[50] }]}>
            <Text style={[styles.savingsBadgeText, { color: primaryText }]}>
              {totalIncome > 0 ? `${Math.round((savings / totalIncome) * 100)}% saved` : 'No income'}
            </Text>
          </View>
        </View>

        {/* Category Breakdown */}
        <Text style={[styles.sectionTitle, { color: text }]}>Category Breakdown</Text>

        {categoryData.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>📭</Text>
            <Text style={[styles.emptyText, { color: textMuted }]}>No expenses this month</Text>
          </View>
        ) : (
          <View style={[styles.card, { backgroundColor: card, shadowColor: isDarkMode ? '#000' : colors.primary[500] }]}>
            {categoryData.map((cat, index) => (
              <View key={cat.id} style={[styles.catRow, index < categoryData.length - 1 && { borderBottomWidth: 1, borderBottomColor: border }]}>
                <View style={[styles.catIcon, { backgroundColor: isDarkMode ? colors.dark[700] : cat.bg }]}>
                  <Text style={{ fontSize: 12, color: isDarkMode ? colors.white : cat.color }}>
                    {cat.name.split(' ')[0].slice(0, 2)}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.catHeader}>
                    <Text style={[styles.catName, { color: text }]}>{cat.name}</Text>
                    <Text style={[styles.catAmount, { color: text }]}>${cat.total.toFixed(2)}</Text>
                  </View>
                  <ProgressBar
                    progress={totalExpense > 0 ? cat.total / totalExpense : 0}
                    color={cat.color}
                    backgroundColor={isDarkMode ? colors.dark[700] : cat.bg}
                    height={6}
                    showPercent={false}
                  />
                  <Text style={[styles.catPercent, { color: isDarkMode ? colors.primary[300] : cat.color }]}>
                    {totalExpense > 0 ? `${Math.round((cat.total / totalExpense) * 100)}% of total` : '0%'}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  pageHeader: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 8 },
  pageTitle: { fontSize: 28, fontWeight: '800' },
  pageSubtitle: { fontSize: 14, marginTop: 2 },
  content: { paddingHorizontal: 16, paddingTop: 16 },

  summaryRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  summaryCard: {
    flex: 1, borderRadius: 20, padding: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12, shadowRadius: 8, elevation: 4,
  },
  summaryLabel: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginBottom: 4 },
  summaryAmount: { fontSize: 22, fontWeight: '800', color: '#fff', marginBottom: 4 },
  summaryTag: { fontSize: 11, color: 'rgba(255,255,255,0.7)' },

  savingsCard: {
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  savingsLabel: { fontSize: 13, marginBottom: 4 },
  savingsAmount: { fontSize: 24, fontWeight: '800' },
  savingsBadge: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  savingsBadgeText: { fontSize: 12, fontWeight: '700' },

  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  card: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 4,
  },
  catRow: { paddingVertical: 14, gap: 12, flexDirection: 'row', alignItems: 'flex-start' },
  catIcon: {
    width: 36, height: 36, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  catHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  catName: { fontSize: 14, fontWeight: '600' },
  catAmount: { fontSize: 14, fontWeight: '700' },
  catPercent: { fontSize: 11, fontWeight: '500', marginTop: 4 },

  emptyState: { alignItems: 'center', paddingVertical: 40 },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: 16 },
});

export default ExpensesScreen;
