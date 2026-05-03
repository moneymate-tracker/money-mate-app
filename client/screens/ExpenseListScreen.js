import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  TextInput, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ExpenseItem from '../components/ExpenseItem';
import { useTheme } from '../theme/ThemeContext';
import {
  EXPENSES, CATEGORIES,
} from '../data/dummyData';

const ExpenseListScreen = () => {
  const insets = useSafeAreaInsets();
  const { colors, isDarkMode, background, card, text, textMuted, border } = useTheme();

  const [month, setMonth] = useState(null); // null = all months
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expenses, setExpenses] = useState(EXPENSES);

  // Filter logic
  const filteredExpenses = expenses.filter((e) => {
    const matchMonth = month ? e.month === month : true;
    const matchCat = selectedCategory ? e.categoryId === selectedCategory : true;
    const matchSearch = searchQuery
      ? e.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchMonth && matchCat && matchSearch;
  });

  const totalFiltered = filteredExpenses.reduce((a, e) => a + e.amount, 0);

  const handleDelete = (id) => {
    Alert.alert('Delete Expense', 'Are you sure you want to delete this expense?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setExpenses((prev) => prev.filter((e) => e.id !== id)),
      },
    ]);
  };

  const handleEdit = (expense) => {
    Alert.alert('Edit', `Edit "${expense.description}" — $${expense.amount.toFixed(2)}`);
  };

  const months = [null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const monthLabels = ['All Months', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.pageTitle, { color: text }]}>All Expenses</Text>
        <View style={styles.totalBadge}>
          <Text style={styles.totalText}>${totalFiltered.toFixed(2)}</Text>
        </View>
      </View>

      {/* Search */}
      <View style={[styles.searchBox, { backgroundColor: card, borderColor: border, shadowColor: isDarkMode ? '#000' : colors.primary[500] }]}>
        <Ionicons name="search" size={20} color={textMuted} style={{ marginRight: 8 }} />
        <TextInput
          style={[styles.searchInput, { color: text }]}
          placeholder="Search expenses..."
          placeholderTextColor={textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color={textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Filters Container */}
      <View style={styles.filtersContainer}>
        {/* Month Filter */}
        <View style={styles.filterSection}>
          <Text style={[styles.filterLabel, { color: textMuted }]}>Month</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterContent}
          >
            {months.map((m, i) => {
              const isActive = month === m;
              return (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.filterChip,
                    { backgroundColor: card, borderColor: border },
                    isActive && { backgroundColor: colors.primary[500], borderColor: colors.primary[500] }
                  ]}
                  onPress={() => setMonth(m)}
                  activeOpacity={0.8}
                >
                  <Text style={[
                    styles.filterChipText,
                    { color: textMuted },
                    isActive && styles.filterChipTextActive
                  ]}>
                    {monthLabels[i]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Category Filter */}
        <View style={styles.filterSection}>
          <Text style={[styles.filterLabel, { color: textMuted }]}>Category</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterContent}
          >
            <TouchableOpacity
              style={[
                styles.catChip,
                { backgroundColor: card, borderColor: border },
                !selectedCategory && { backgroundColor: colors.primary[500], borderColor: colors.primary[500] }
              ]}
              onPress={() => setSelectedCategory(null)}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.catChipText,
                { color: textMuted },
                !selectedCategory && styles.catChipTextActive
              ]}>
                All
              </Text>
            </TouchableOpacity>
            
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.catChip,
                    { backgroundColor: card, borderColor: border },
                    isActive && { backgroundColor: cat.color, borderColor: cat.color },
                  ]}
                  onPress={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
                  activeOpacity={0.8}
                >
                  <View style={[
                    styles.iconWrapper, 
                    { backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : cat.color + '15' }
                  ]}>
                    <Ionicons
                      name={cat.icon}
                      size={14}
                      color={isActive ? '#fff' : cat.color}
                    />
                  </View>
                  <Text
                    style={[
                      styles.catChipText,
                      { color: textMuted },
                      isActive && styles.catChipTextActive,
                    ]}
                  >
                    {cat.name.split(' ')[0]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>

      {/* Results Count */}
      <View style={styles.countRow}>
        <Text style={[styles.countText, { color: textMuted }]}>
          {filteredExpenses.length} {filteredExpenses.length === 1 ? 'transaction' : 'transactions'} found
        </Text>
      </View>

      {/* Expense List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 100 }]}
      >
        {filteredExpenses.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={64} color={border} style={{ marginBottom: 16 }} />
            <Text style={[styles.emptyTitle, { color: text }]}>No expenses found</Text>
            <Text style={[styles.emptySubtitle, { color: textMuted }]}>Try adjusting your filters</Text>
          </View>
        ) : (
          <View style={[styles.card, { backgroundColor: card, shadowColor: isDarkMode ? '#000' : colors.primary[500] }]}>
            {filteredExpenses.map((expense) => (
              <ExpenseItem
                key={expense.id}
                expense={expense}
                showActions
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 24, paddingTop: 16, paddingBottom: 16,
  },
  pageTitle: { fontSize: 28, fontWeight: '800' },
  totalBadge: {
    backgroundColor: '#FF6B6B', borderRadius: 20,
    paddingHorizontal: 16, paddingVertical: 8,
    shadowColor: '#FF6B6B', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  totalText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },

  searchBox: {
    flexDirection: 'row', alignItems: 'center',
    borderRadius: 20, marginHorizontal: 20, marginBottom: 16,
    paddingHorizontal: 16, paddingVertical: 14,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05, shadowRadius: 10, elevation: 2,
  },
  searchInput: { flex: 1, fontSize: 16, fontWeight: '500' },

  filtersContainer: {
    marginBottom: 16,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 24,
    marginBottom: 8,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  filterContent: { paddingHorizontal: 20, gap: 10 },
  
  filterChip: {
    paddingHorizontal: 18, paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
  },
  filterChipText: { fontSize: 14, fontWeight: '600' },
  filterChipTextActive: { color: '#fff' },

  catChip: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: 24,
    borderWidth: 1,
  },
  iconWrapper: {
    width: 24, height: 24, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
    marginRight: 8,
  },
  catChipText: { fontSize: 14, fontWeight: '600', paddingRight: 4 },
  catChipTextActive: { color: '#fff' },

  countRow: { paddingHorizontal: 24, paddingBottom: 12 },
  countText: { fontSize: 14, fontWeight: '500' },

  listContent: { paddingHorizontal: 20 },
  card: {
    borderRadius: 24, paddingHorizontal: 16, paddingTop: 8, paddingBottom: 8,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08, shadowRadius: 16, elevation: 5,
  },

  emptyState: { alignItems: 'center', paddingVertical: 80 },
  emptyTitle: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  emptySubtitle: { fontSize: 15 },
});

export default ExpenseListScreen;
