import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BarChart, PieChart } from 'react-native-gifted-charts';
import MonthSelector from '../components/MonthSelector';
import {
  getExpensesByCategoryAndMonth,
  getTotalExpensesByMonth,
  getIncomeByMonth,
  getBudgetsByMonth,
  MONTHLY_SPENDING,
} from '../data/dummyData';

const { width } = Dimensions.get('window');
const CHART_WIDTH = width - 32;

const AnalyticsScreen = () => {
  const insets = useSafeAreaInsets();
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

  const categoryData = getExpensesByCategoryAndMonth(month, year);
  const totalExpense = getTotalExpensesByMonth(month, year);
  const totalIncome = getIncomeByMonth(month, year);
  const budgets = getBudgetsByMonth(month, year);
  const totalBudget = budgets.reduce((acc, b) => acc + b.budget, 0);

  // Pie chart data
  const pieData = categoryData.map((cat) => ({
    value: cat.total,
    color: cat.color,
    text: cat.name.split(' ')[0],
  }));

  // Bar chart data (last 6 months spending)
  const barData = MONTHLY_SPENDING.map((m) => ({
    value: m.spent || 0,
    label: m.month,
    frontColor: '#6C63FF',
  }));

  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;
  const budgetUsage = totalBudget > 0 ? (totalExpense / totalBudget) * 100 : 0;

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Analytics</Text>
        <Text style={styles.pageSubtitle}>Insights & trends</Text>
      </View>

      <View style={styles.content}>
        <MonthSelector month={month} year={year} onPrev={handlePrev} onNext={handleNext} />

        {/* KPI Cards */}
        <View style={styles.kpiRow}>
          <View style={[styles.kpiCard, { backgroundColor: '#6C63FF' }]}>
            <Text style={styles.kpiLabel}>Savings Rate</Text>
            <Text style={styles.kpiValue}>{savingsRate.toFixed(0)}%</Text>
            <Text style={styles.kpiSub}>{savingsRate > 20 ? '🎉 Great!' : 'Keep going!'}</Text>
          </View>
          <View style={[styles.kpiCard, { backgroundColor: '#f97316' }]}>
            <Text style={styles.kpiLabel}>Budget Used</Text>
            <Text style={styles.kpiValue}>{budgetUsage.toFixed(0)}%</Text>
            <Text style={styles.kpiSub}>{budgetUsage < 80 ? '✅ On track' : '⚠️ Watch out'}</Text>
          </View>
        </View>

        {/* Spending vs Budget */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Spent vs Budget</Text>
          <View style={styles.svbRow}>
            <View style={styles.svbItem}>
              <View style={[styles.svbDot, { backgroundColor: '#6C63FF' }]} />
              <Text style={styles.svbLabel}>Spent</Text>
              <Text style={styles.svbValue}>${totalExpense.toFixed(2)}</Text>
            </View>
            <View style={styles.svbItem}>
              <View style={[styles.svbDot, { backgroundColor: '#4ADE80' }]} />
              <Text style={styles.svbLabel}>Budget</Text>
              <Text style={styles.svbValue}>${totalBudget.toFixed(2)}</Text>
            </View>
            <View style={styles.svbItem}>
              <View style={[styles.svbDot, { backgroundColor: '#f97316' }]} />
              <Text style={styles.svbLabel}>Income</Text>
              <Text style={styles.svbValue}>${totalIncome.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Pie Chart */}
        {pieData.length > 0 ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Category Breakdown</Text>
            <PieChart
              data={pieData}
              donut
              radius={90}
              innerRadius={55}
              centerLabelComponent={() => (
                <Text style={{ fontSize: 13, color: '#555', fontWeight: '600', textAlign: 'center' }}>
                  Breakdown
                </Text>
              )}
            />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
              {pieData.map((item, i) => (
                <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: item.color }} />
                  <Text style={{ fontSize: 11, color: '#555' }}>{item.text}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <View style={[styles.card, styles.emptyCard]}>
            <Text style={styles.emptyEmoji}>📊</Text>
            <Text style={styles.emptyText}>No data for pie chart</Text>
          </View>
        )}

        {/* Bar Chart */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Monthly Spending</Text>
          <BarChart
            data={barData}
            width={CHART_WIDTH - 32}
            height={180}
            barWidth={28}
            spacing={14}
            noOfSections={4}
            barBorderRadius={6}
            frontColor="#6C63FF"
            yAxisTextStyle={{ color: '#888', fontSize: 10 }}
            xAxisLabelTextStyle={{ color: '#888', fontSize: 10 }}
            hideRules={false}
            showValuesAsTopLabel
            topLabelTextStyle={{ color: '#6C63FF', fontSize: 9, fontWeight: '600' }}
            isAnimated
          />
        </View>

        {/* Top Spending Categories */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Top Categories</Text>
          {categoryData.slice(0, 4).map((cat, i) => (
            <View key={cat.id} style={[styles.topCatRow, i < 3 && styles.topCatBorder]}>
              <View style={styles.topCatLeft}>
                <Text style={styles.rankText}>{i + 1}</Text>
                <View style={[styles.catDot, { backgroundColor: cat.color }]} />
                <Text style={styles.catName}>{cat.name}</Text>
              </View>
              <Text style={[styles.catAmount, { color: cat.color }]}>${cat.total.toFixed(2)}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FF' },
  pageHeader: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 8 },
  pageTitle: { fontSize: 28, fontWeight: '800', color: '#1a1a2e' },
  pageSubtitle: { fontSize: 14, color: '#999', marginTop: 2 },
  content: { paddingHorizontal: 16, paddingTop: 16 },

  kpiRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  kpiCard: {
    flex: 1, borderRadius: 20, padding: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12, shadowRadius: 8, elevation: 5,
  },
  kpiLabel: { fontSize: 12, color: 'rgba(255,255,255,0.75)', marginBottom: 6 },
  kpiValue: { fontSize: 32, fontWeight: '800', color: '#fff', marginBottom: 4 },
  kpiSub: { fontSize: 12, color: 'rgba(255,255,255,0.8)' },

  card: {
    backgroundColor: '#fff', borderRadius: 20, padding: 16, marginBottom: 16,
    shadowColor: '#6C63FF', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07, shadowRadius: 12, elevation: 4,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#1a1a2e', marginBottom: 16 },

  svbRow: { flexDirection: 'row', justifyContent: 'space-around' },
  svbItem: { alignItems: 'center', gap: 6 },
  svbDot: { width: 12, height: 12, borderRadius: 6 },
  svbLabel: { fontSize: 12, color: '#999' },
  svbValue: { fontSize: 16, fontWeight: '700', color: '#1a1a2e' },

  topCatRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 12,
  },
  topCatBorder: { borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.04)' },
  topCatLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  rankText: { fontSize: 13, fontWeight: '700', color: '#999', width: 16 },
  catDot: { width: 10, height: 10, borderRadius: 5 },
  catName: { fontSize: 14, fontWeight: '500', color: '#333' },
  catAmount: { fontSize: 15, fontWeight: '700' },

  emptyCard: { alignItems: 'center', paddingVertical: 32 },
  emptyEmoji: { fontSize: 40, marginBottom: 8 },
  emptyText: { fontSize: 14, color: '#999' },
});

export default AnalyticsScreen;
