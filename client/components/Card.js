import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = ({ children, style, variant = 'default' }) => {
  return (
    <View style={[styles.card, styles[variant], style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginVertical: 6,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  default: {
    backgroundColor: '#FFFFFF',
  },
  dark: {
    backgroundColor: '#1a1a2e',
  },
  ghost: {
    backgroundColor: 'rgba(108, 99, 255, 0.06)',
    shadowOpacity: 0,
    elevation: 0,
    borderWidth: 1,
    borderColor: 'rgba(108, 99, 255, 0.1)',
  },
});

export default Card;
