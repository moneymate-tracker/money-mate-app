import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  TextInput, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ExpenseItem from '../components/ExpenseItem';
import {
  EXPENSES, CATEGORIES, getExpensesByMonth,
} from '../data/dummyData';

const ExpenseListScreen = () => {
  const insets = useSafeAreaInsets();
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
  const monthLabels = ['All', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>All Expenses</Text>
        <View style={styles.totalBadge}>
          <Text style={styles.totalText}>${totalFiltered.toFixed(2)}</Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color="#999" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search expenses..."
          placeholderTextColor="#bbb"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={18} color="#bbb" />
          </TouchableOpacity>
        )}
      </View>

      {/* Month Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContent}
      >
        {months.map((m, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.filterChip, month === m && styles.filterChipActive]}
            onPress={() => setMonth(m)}
          >
            <Text style={[styles.filterChipText, month === m && styles.filterChipTextActive]}>
              {monthLabels[i]}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContent}
      >
        <TouchableOpacity
          style={[styles.catChip, !selectedCategory && styles.catChipActive]}
          onPress={() => setSelectedCategory(null)}
        >
          <Text style={[styles.catChipText, !selectedCategory && styles.catChipTextActive]}>All</Text>
        </TouchableOpacity>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.catChip,
              selectedCategory === cat.id && { backgroundColor: cat.color, borderColor: cat.color },
            ]}
            onPress={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
          >
            <Ionicons
              name={cat.icon}
              size={13}
              color={selectedCategory === cat.id ? '#fff' : cat.color}
              style={{ marginRight: 4 }}
            />
            <Text
              style={[
                styles.catChipText,
                selectedCategory === cat.id && styles.catChipTextActive,
              ]}
            >
              {cat.name.split(' ')[0]}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results Count */}
      <View style={styles.countRow}>
        <Text style={styles.countText}>{filteredExpenses.length} transactions</Text>
      </View>

      {/* Expense List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 80 }]}
      >
        {filteredExpenses.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyTitle}>No expenses found</Text>
            <Text style={styles.emptySubtitle}>Try adjusting your filters</Text>
          </View>
        ) : (
          <View style={styles.card}>
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
  container: { flex: 1, backgroundColor: '#F8F9FF' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 24, paddingTop: 16, paddingBottom: 12,
  },
  pageTitle: { fontSize: 28, fontWeight: '800', color: '#1a1a2e' },
  totalBadge: {
    backgroundColor: '#FF6B6B', borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 6,
  },
  totalText: { color: '#fff', fontWeight: '700', fontSize: 14 },

  searchBox: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 16, marginHorizontal: 16, marginBottom: 8,
    paddingHorizontal: 14, paddingVertical: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
  },
  searchInput: { flex: 1, fontSize: 14, color: '#1a1a2e' },

  filterScroll: { marginBottom: 4 },
  filterContent: { paddingHorizontal: 16, gap: 8, paddingVertical: 4 },
  filterChip: {
    paddingHorizontal: 14, paddingVertical: 7,
    borderRadius: 20, backgroundColor: '#fff',
    borderWidth: 1, borderColor: '#eee',
  },
  filterChipActive: { backgroundColor: '#6C63FF', borderColor: '#6C63FF' },
  filterChipText: { fontSize: 12, fontWeight: '600', color: '#777' },
  filterChipTextActive: { color: '#fff' },

  catChip: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 12, paddingVertical: 7,
    borderRadius: 20, backgroundColor: '#fff',
    borderWidth: 1, borderColor: '#eee',
  },
  catChipActive: { backgroundColor: '#6C63FF', borderColor: '#6C63FF' },
  catChipText: { fontSize: 12, fontWeight: '600', color: '#777' },
  catChipTextActive: { color: '#fff' },

  countRow: { paddingHorizontal: 16, paddingBottom: 8, paddingTop: 4 },
  countText: { fontSize: 13, color: '#999' },

  listContent: { paddingHorizontal: 16 },
  card: {
    backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 16, paddingTop: 4,
    shadowColor: '#6C63FF', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07, shadowRadius: 12, elevation: 4,
  },

  emptyState: { alignItems: 'center', paddingVertical: 64 },
  emptyEmoji: { fontSize: 48, marginBottom: 16 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#333', marginBottom: 6 },
  emptySubtitle: { fontSize: 14, color: '#999' },
});

export default ExpenseListScreen;
