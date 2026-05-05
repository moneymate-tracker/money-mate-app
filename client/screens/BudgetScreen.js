import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, TextInput,
} from 'react-native';
import AppModal from '../components/AppModal';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MonthSelector from '../components/MonthSelector';
import ProgressBar from '../components/ProgressBar';
import { useTheme } from '../theme/ThemeContext';
import {
  CATEGORIES,
  getBudgetsByMonth,
  getExpensesByMonth,
  getTotalExpensesByMonth,
} from '../data/dummyData';

const BudgetScreen = () => {
  const insets = useSafeAreaInsets();
  const { colors, background, card, text, textMuted, primaryText, border, isDarkMode } = useTheme();
  const [month, setMonth] = useState(4);
  const [year, setYear] = useState(2024);
  const [modalVisible, setModalVisible] = useState(false);
  const [budgetInput, setBudgetInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [appModal, setAppModal] = useState({ visible: false });
  const hideAppModal = () => setAppModal(m => ({ ...m, visible: false }));

  const handlePrev = () => {
    if (month === 1) { setMonth(12); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
  };
  const handleNext = () => {
    if (month === 12) { setMonth(1); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
  };

  const budgets = getBudgetsByMonth(month, year);
  const expenses = getExpensesByMonth(month, year);
  const totalExpense = getTotalExpensesByMonth(month, year);
  const totalBudget = budgets.reduce((acc, b) => acc + b.budget, 0);

  const getCategorySpend = (categoryId) =>
    expenses.filter((e) => e.categoryId === categoryId).reduce((a, e) => a + e.amount, 0);

  const handleSaveBudget = () => {
    if (!budgetInput || isNaN(parseFloat(budgetInput))) {
      setAppModal({ visible: true, type: 'warning', title: 'Invalid Amount', message: 'Please enter a valid budget amount.' });
      return;
    }
    setModalVisible(false);
    setBudgetInput('');
    setSelectedCategory(null);
    setAppModal({ visible: true, type: 'success', title: 'Budget Updated!', message: `Budget has been set to $${parseFloat(budgetInput).toFixed(2)}.` });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

        {/* Page Header */}
        <View style={styles.pageHeader}>
          <View>
            <Text style={[styles.pageTitle, { color: text }]}>Budget</Text>
            <Text style={[styles.pageSubtitle, { color: textMuted }]}>Manage your limits</Text>
          </View>
          <TouchableOpacity 
            style={[styles.addBudgetBtn, { backgroundColor: colors.primary[500], shadowColor: isDarkMode ? '#000' : colors.primary[500] }]} 
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="add" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <MonthSelector month={month} year={year} onPrev={handlePrev} onNext={handleNext} />

          {/* Overall Summary */}
          <LinearGradient colors={[colors.primary[500], colors.primary[700]]} style={styles.overallCard}>
            <View style={styles.overallRow}>
              <View>
                <Text style={styles.overallLabel}>Total Budget</Text>
                <Text style={styles.overallAmount}>${totalBudget.toLocaleString()}</Text>
              </View>
              <View style={styles.overallDivider} />
              <View>
                <Text style={styles.overallLabel}>Spent</Text>
                <Text style={styles.overallAmount}>${totalExpense.toFixed(2)}</Text>
              </View>
              <View style={styles.overallDivider} />
              <View>
                <Text style={styles.overallLabel}>Remaining</Text>
                <Text style={[styles.overallAmount, { color: totalBudget - totalExpense < 0 ? colors.primary[200] : colors.primary[50] }]}>
                  ${Math.max(totalBudget - totalExpense, 0).toFixed(2)}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 16 }}>
              <ProgressBar
                progress={totalBudget > 0 ? totalExpense / totalBudget : 0}
                color="rgba(255,255,255,0.9)"
                backgroundColor="rgba(255,255,255,0.2)"
                height={10}
                leftLabel="$0"
                rightLabel={`$${totalBudget}`}
              />
            </View>
          </LinearGradient>

          {/* Per-Category Budgets */}
          <Text style={[styles.sectionTitle, { color: text }]}>Category Limits</Text>

          {budgets.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>💼</Text>
              <Text style={[styles.emptyText, { color: textMuted }]}>No budgets set for this month</Text>
              <TouchableOpacity style={[styles.emptyBtn, { backgroundColor: colors.primary[500] }]} onPress={() => setModalVisible(true)}>
                <Text style={styles.emptyBtnText}>Add Budget</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={[styles.card, { backgroundColor: card, shadowColor: isDarkMode ? '#000' : colors.primary[500] }]}>
              {budgets.map((budget, index) => {
                const cat = CATEGORIES.find((c) => c.id === budget.categoryId);
                if (!cat) return null;
                const spent = getCategorySpend(budget.categoryId);
                const progress = budget.budget > 0 ? spent / budget.budget : 0;
                const remaining = budget.budget - spent;
                const isOver = remaining < 0;

                return (
                  <View
                    key={budget.id}
                    style={[styles.budgetRow, index < budgets.length - 1 && { borderBottomWidth: 1, borderBottomColor: border }]}
                  >
                    <View style={styles.budgetTopRow}>
                      <View style={styles.budgetLeft}>
                        <View style={[styles.catIcon, { backgroundColor: isDarkMode ? colors.dark[700] : cat.bg }]}>
                          <Ionicons name={cat.icon} size={18} color={isDarkMode ? colors.primary[300] : cat.color} />
                        </View>
                        <View>
                          <Text style={[styles.catName, { color: text }]}>{cat.name}</Text>
                          <Text style={[styles.catSubtitle, { color: textMuted }]}>
                            {isOver
                              ? `⚠️ Over by $${Math.abs(remaining).toFixed(2)}`
                              : `$${remaining.toFixed(2)} left`}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.budgetRight}>
                        <Text style={[styles.spentText, { color: text }]}>${spent.toFixed(2)}</Text>
                        <Text style={[styles.budgetText, { color: textMuted }]}>of ${budget.budget}</Text>
                      </View>
                    </View>
                    <ProgressBar
                      progress={progress}
                      color={cat.color}
                      backgroundColor={isDarkMode ? colors.dark[700] : cat.bg}
                      height={8}
                    />
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Budget Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalSheet, { backgroundColor: card }]}>
            <View style={styles.modalHandle} />
            <Text style={[styles.modalTitle, { color: text }]}>Set Budget</Text>

            <Text style={[styles.mLabel, { color: textMuted }]}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.mCatOption,
                    { borderColor: border },
                    selectedCategory === cat.id && { borderColor: cat.color, backgroundColor: isDarkMode ? colors.dark[700] : cat.bg },
                  ]}
                  onPress={() => setSelectedCategory(cat.id)}
                >
                  <Ionicons name={cat.icon} size={20} color={isDarkMode ? colors.primary[300] : cat.color} />
                  <Text style={[styles.mCatText, { color: isDarkMode ? colors.primary[300] : cat.color }]}>{cat.name.split(' ')[0]}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={[styles.mLabel, { color: textMuted }]}>Budget Amount</Text>
            <View style={[styles.mAmountBox, { backgroundColor: isDarkMode ? colors.dark[700] : colors.primary[50] }]}>
              <Text style={[styles.mCurrency, { color: primaryText }]}>$</Text>
              <TextInput
                style={[styles.mAmountInput, { color: text }]}
                value={budgetInput}
                onChangeText={setBudgetInput}
                keyboardType="decimal-pad"
                placeholder="0.00"
                placeholderTextColor={textMuted}
              />
            </View>

            <View style={styles.mBtnRow}>
              <TouchableOpacity style={[styles.mCancelBtn, { backgroundColor: isDarkMode ? colors.dark[700] : colors.primary[50], borderColor: border }]} onPress={() => setModalVisible(false)}>
                <Text style={[styles.mCancelText, { color: textMuted }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSaveBudget} style={{ flex: 1 }}>
                <LinearGradient colors={[colors.primary[500], colors.primary[700]]} style={styles.mSaveBtn}>
                  <Text style={styles.mSaveText}>Save Budget</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <AppModal
        visible={appModal.visible}
        type={appModal.type}
        title={appModal.title}
        message={appModal.message}
        onConfirm={hideAppModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  pageHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 24, paddingTop: 16, paddingBottom: 8,
  },
  pageTitle: { fontSize: 28, fontWeight: '800' },
  pageSubtitle: { fontSize: 14, marginTop: 2 },
  addBudgetBtn: {
    width: 44, height: 44, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35, shadowRadius: 8, elevation: 6,
  },
  content: { paddingHorizontal: 16, paddingTop: 16 },

  overallCard: { borderRadius: 24, padding: 20, marginBottom: 24 },
  overallRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  overallDivider: { width: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.2)' },
  overallLabel: { fontSize: 12, color: 'rgba(255,255,255,0.75)', marginBottom: 4 },
  overallAmount: { fontSize: 18, fontWeight: '800', color: '#fff' },

  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  card: {
    borderRadius: 20,
    paddingHorizontal: 16, paddingVertical: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07, shadowRadius: 12, elevation: 4,
  },
  budgetRow: { paddingVertical: 14 },
  budgetTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  budgetLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  catIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  catName: { fontSize: 14, fontWeight: '600' },
  catSubtitle: { fontSize: 11, marginTop: 2 },
  budgetRight: { alignItems: 'flex-end' },
  spentText: { fontSize: 15, fontWeight: '700' },
  budgetText: { fontSize: 11, marginTop: 2 },

  emptyState: { alignItems: 'center', paddingVertical: 48 },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: 16, marginBottom: 20 },
  emptyBtn: { borderRadius: 16, paddingHorizontal: 24, paddingVertical: 12 },
  emptyBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalSheet: {
    borderTopLeftRadius: 28, borderTopRightRadius: 28,
    padding: 24, paddingBottom: 40,
  },
  modalHandle: { width: 40, height: 5, borderRadius: 3, backgroundColor: '#ddd', alignSelf: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: '800', marginBottom: 20 },
  mLabel: { fontSize: 13, fontWeight: '600', marginBottom: 10 },
  mCatOption: {
    alignItems: 'center', gap: 6, padding: 12, borderRadius: 14,
    borderWidth: 2, marginRight: 10, minWidth: 70,
  },
  mCatText: { fontSize: 11, fontWeight: '600' },
  mAmountBox: {
    flexDirection: 'row', alignItems: 'center',
    borderRadius: 16, padding: 16, marginBottom: 24,
  },
  mCurrency: { fontSize: 24, fontWeight: '700', marginRight: 8 },
  mAmountInput: { fontSize: 28, fontWeight: '800', flex: 1 },
  mBtnRow: { flexDirection: 'row', gap: 12 },
  mCancelBtn: {
    flex: 1, borderRadius: 16, padding: 16, alignItems: 'center',
    borderWidth: 1,
  },
  mCancelText: { fontSize: 15, fontWeight: '600' },
  mSaveBtn: { borderRadius: 16, padding: 16, alignItems: 'center' },
  mSaveText: { fontSize: 15, fontWeight: '700', color: '#fff' },
});

export default BudgetScreen;
