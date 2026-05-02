import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getCategoryById } from '../data/dummyData';

const CategoryBadge = ({ categoryId, size = 'md', showLabel = true }) => {
  const category = getCategoryById(categoryId);
  if (!category) return null;

  const dim = size === 'sm' ? 32 : size === 'lg' ? 52 : 42;
  const iconSize = size === 'sm' ? 14 : size === 'lg' ? 24 : 18;
  const fontSize = size === 'sm' ? 10 : size === 'lg' ? 14 : 12;

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.iconBox,
          { width: dim, height: dim, borderRadius: dim / 2, backgroundColor: category.bg },
        ]}
      >
        <Ionicons name={category.icon} size={iconSize} color={category.color} />
      </View>
      {showLabel && (
        <Text style={[styles.label, { fontSize }]} numberOfLines={1}>
          {category.name}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    gap: 4,
  },
  iconBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#555',
    fontWeight: '500',
    maxWidth: 64,
    textAlign: 'center',
  },
});

export default CategoryBadge;
