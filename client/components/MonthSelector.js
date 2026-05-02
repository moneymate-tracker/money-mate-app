import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MONTH_NAMES } from '../data/dummyData';
import { useTheme } from '../theme/ThemeContext';

const MonthSelector = ({ month, year, onPrev, onNext }) => {
  const { colors, card, text, textMuted, iconBg, isDarkMode } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? colors.dark[800] : colors.primary[50] }]}>
      <TouchableOpacity onPress={onPrev} style={[styles.btn, { backgroundColor: card, shadowColor: isDarkMode ? '#000' : colors.primary[500] }]} activeOpacity={0.7}>
        <Ionicons name="chevron-back" size={20} color={colors.primary[500]} />
      </TouchableOpacity>
      <View style={styles.center}>
        <Text style={[styles.month, { color: text }]}>{MONTH_NAMES[month - 1]}</Text>
        <Text style={[styles.year, { color: textMuted }]}>{year}</Text>
      </View>
      <TouchableOpacity onPress={onNext} style={[styles.btn, { backgroundColor: card, shadowColor: isDarkMode ? '#000' : colors.primary[500] }]} activeOpacity={0.7}>
        <Ionicons name="chevron-forward" size={20} color={colors.primary[500]} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginBottom: 16,
  },
  btn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  center: { alignItems: 'center' },
  month: { fontSize: 16, fontWeight: '700' },
  year: { fontSize: 12, marginTop: 1 },
});

export default MonthSelector;
