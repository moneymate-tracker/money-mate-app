import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getCategoryById } from '../data/dummyData';
import { useTheme } from '../theme/ThemeContext';

const ExpenseItem = ({ expense, onEdit, onDelete, showActions = false }) => {
  const { isDarkMode, colors, text, textMuted, border, primaryText, iconBg } = useTheme();
  const category = getCategoryById(expense.categoryId);
  if (!category) return null;

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const bgStyle = { backgroundColor: isDarkMode ? colors.dark[700] : category.bg };
  const iconColor = isDarkMode ? colors.primary[300] : category.color;

  return (
    <View style={[styles.container, { borderBottomColor: border }]}>
      {/* Category Icon */}
      <View style={[styles.iconBox, bgStyle]}>
        <Ionicons name={category.icon} size={20} color={iconColor} />
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={[styles.description, { color: text }]} numberOfLines={1}>
          {expense.description}
        </Text>
        <View style={styles.meta}>
          <View style={[styles.catTag, bgStyle]}>
            <Text style={[styles.catText, { color: iconColor }]}>{category.name}</Text>
          </View>
          <Text style={[styles.date, { color: textMuted }]}>{formatDate(expense.date)}</Text>
        </View>
      </View>

      {/* Amount + Actions */}
      <View style={styles.right}>
        <Text style={[styles.amount, { color: text }]}>-${expense.amount.toFixed(2)}</Text>
        {showActions && (
          <View style={styles.actions}>
            {onEdit && (
              <TouchableOpacity onPress={() => onEdit(expense)} style={[styles.actionBtn, { backgroundColor: iconBg }]}>
                <Ionicons name="pencil" size={14} color={primaryText} />
              </TouchableOpacity>
            )}
            {onDelete && (
              <TouchableOpacity onPress={() => onDelete(expense.id)} style={[styles.actionBtn, { backgroundColor: isDarkMode ? colors.dark[700] : '#FFE8E8' }]}>
                <Ionicons name="trash" size={14} color="#FF6B6B" />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  info: { flex: 1 },
  description: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  catTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
  },
  catText: { fontSize: 10, fontWeight: '600' },
  date: { fontSize: 11 },
  right: { alignItems: 'flex-end' },
  amount: { fontSize: 15, fontWeight: '700' },
  actions: { flexDirection: 'row', gap: 6, marginTop: 4 },
  actionBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ExpenseItem;
