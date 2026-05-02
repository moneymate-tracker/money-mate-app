import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BarChart } from 'react-native-gifted-charts';
import ExpenseItem from '../components/ExpenseItem';
import { useTheme } from '../theme/ThemeContext';
import {
  USER_PROFILE, EXPENSES, MONTHLY_SPENDING,
  getExpensesByMonth, getTotalExpensesByMonth, getIncomeByMonth,
} from '../data/dummyData';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { isDarkMode, colors, background, card, text, textMuted, primaryText, border } = useTheme();
  const [hidden, setHidden] = useState(false);

  const currentMonth = 4;
  const currentYear = 2024;
  const totalIncome = getIncomeByMonth(currentMonth, currentYear);
  const totalExpenses = getTotalExpensesByMonth(currentMonth, currentYear);
  const balance = totalIncome - totalExpenses + USER_PROFILE.totalSavings;
  const recentExpenses = getExpensesByMonth(currentMonth, currentYear).slice(0, 5);

  const chartData = MONTHLY_SPENDING.slice(0, 4).map((m) => ({
    value: m.spent,
    label: m.month,
    frontColor: 'rgba(255,255,255,0.9)',
  }));

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: background }]}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <LinearGradient
        colors={[colors.primary[500], colors.primary[700]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: insets.top + 16 }]}
      >
        {/* Top Row */}
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Good morning 👋</Text>
            <Text style={styles.userName}>{USER_PROFILE.name}</Text>
          </View>
          <TouchableOpacity style={styles.avatarBtn}>
            <LinearGradient colors={[colors.primary[300], colors.primary[400]]} style={styles.avatar}>
              <Text style={styles.avatarText}>
                {USER_PROFILE.name.split(' ').map((n) => n[0]).join('')}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View style={[styles.balanceCard, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <TouchableOpacity onPress={() => setHidden(!hidden)}>
              <Ionicons name={hidden ? 'eye-off' : 'eye'} size={18} color="rgba(255,255,255,0.7)" />
            </TouchableOpacity>
          </View>
          <Text style={styles.balanceAmount}>
            {hidden ? '••••••' : `$${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          </Text>

          {/* Income / Expense row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                <Ionicons name="arrow-down" size={14} color="#fff" />
              </View>
              <View>
                <Text style={styles.statLabel}>Income</Text>
                <Text style={styles.statAmount}>${totalIncome.toLocaleString()}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                <Ionicons name="arrow-up" size={14} color="#fff" />
              </View>
              <View>
                <Text style={styles.statLabel}>Expenses</Text>
                <Text style={styles.statAmount}>${totalExpenses.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bar Chart */}
        <Text style={styles.chartTitle}>Monthly Overview</Text>
        <BarChart
          data={chartData}
          width={width - 48}
          height={140}
          barWidth={28}
          spacing={18}
          noOfSections={3}
          barBorderRadius={6}
          frontColor="rgba(255,255,255,0.9)"
          yAxisTextStyle={{ color: 'rgba(255,255,255,0.7)', fontSize: 10 }}
          xAxisLabelTextStyle={{ color: 'rgba(255,255,255,0.7)', fontSize: 10 }}
          hideRules
          hideYAxisText
          showValuesAsTopLabel
          topLabelTextStyle={{ color: '#fff', fontSize: 10, fontWeight: '600' }}
          isAnimated
        />
      </LinearGradient>

      {/* Quick Actions */}
      <View style={[styles.quickActions, { backgroundColor: card, shadowColor: isDarkMode ? '#000' : colors.primary[500] }]}>
        {[
          { icon: 'add-circle', label: 'Add', color: colors.primary[500], screen: 'AddExpense' },
          { icon: 'list', label: 'List', color: colors.primary[600], screen: 'ExpenseList' },
          { icon: 'pie-chart', label: 'Analytics', color: colors.primary[400], screen: 'Analytics' },
          { icon: 'wallet', label: 'Budget', color: colors.primary[700], screen: 'Budget' },
        ].map((action) => (
          <TouchableOpacity
            key={action.label}
            style={styles.actionBtn}
            onPress={() => navigation.navigate(action.screen)}
            activeOpacity={0.8}
          >
            <View style={[styles.actionIcon, { backgroundColor: action.color + '18' }]}>
              <Ionicons name={action.icon} size={22} color={action.color} />
            </View>
            <Text style={[styles.actionLabel, { color: textMuted }]}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Recent Transactions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: text }]}>Recent Transactions</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ExpenseList')}>
            <Text style={[styles.seeAll, { color: primaryText }]}>See all</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.card, { backgroundColor: card, shadowColor: isDarkMode ? '#000' : colors.primary[500] }]}>
          {recentExpenses.map((expense) => (
            <ExpenseItem key={expense.id} expense={expense} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 24, paddingBottom: 32 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  greeting: { fontSize: 13, color: 'rgba(255,255,255,0.75)', marginBottom: 2 },
  userName: { fontSize: 20, fontWeight: '700', color: '#fff' },
  avatarBtn: {},
  avatar: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontWeight: '800', fontSize: 15 },

  balanceCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  balanceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  balanceLabel: { fontSize: 13, color: 'rgba(255,255,255,0.8)' },
  balanceAmount: { fontSize: 36, fontWeight: '800', color: '#fff', marginBottom: 20, letterSpacing: -1 },
  statsRow: { flexDirection: 'row', alignItems: 'center' },
  statItem: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  statIcon: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  statLabel: { fontSize: 11, color: 'rgba(255,255,255,0.7)', marginBottom: 2 },
  statAmount: { fontSize: 15, fontWeight: '700', color: '#fff' },
  divider: { width: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.2)', marginHorizontal: 16 },

  chartTitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', fontWeight: '600', marginBottom: 8 },

  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginHorizontal: 16,
    borderRadius: 20,
    marginTop: -20,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  actionBtn: { alignItems: 'center', gap: 8 },
  actionIcon: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  actionLabel: { fontSize: 11, fontWeight: '500' },

  section: { paddingHorizontal: 16, marginTop: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  seeAll: { fontSize: 13, fontWeight: '600' },
  card: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 4,
  },
});

export default HomeScreen;
