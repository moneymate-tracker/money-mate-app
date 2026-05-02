import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

const ProgressBar = ({
  progress = 0,       // 0 to 1
  color = '#6C63FF',
  backgroundColor = '#EEE',
  height = 8,
  showPercent = false,
  label,
  leftLabel,
  rightLabel,
}) => {
  const animWidth = useRef(new Animated.Value(0)).current;
  const clampedProgress = Math.min(Math.max(progress, 0), 1);

  useEffect(() => {
    Animated.timing(animWidth, {
      toValue: clampedProgress,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [clampedProgress]);

  const barColor = clampedProgress > 0.9 ? '#FF6B6B' : color;

  return (
    <View style={styles.container}>
      {(label || showPercent) && (
        <View style={styles.header}>
          {label && <Text style={styles.label}>{label}</Text>}
          {showPercent && (
            <Text style={[styles.percent, { color: barColor }]}>
              {Math.round(clampedProgress * 100)}%
            </Text>
          )}
        </View>
      )}
      <View style={[styles.track, { height, backgroundColor, borderRadius: height / 2 }]}>
        <Animated.View
          style={[
            styles.fill,
            {
              height,
              borderRadius: height / 2,
              backgroundColor: barColor,
              width: animWidth.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
      {(leftLabel || rightLabel) && (
        <View style={styles.footer}>
          {leftLabel && <Text style={styles.footerLabel}>{leftLabel}</Text>}
          {rightLabel && <Text style={styles.footerLabel}>{rightLabel}</Text>}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%', marginVertical: 4 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  label: { fontSize: 13, color: '#555', fontWeight: '500' },
  percent: { fontSize: 13, fontWeight: '700' },
  track: { width: '100%', overflow: 'hidden' },
  fill: {},
  footer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  footerLabel: { fontSize: 11, color: '#999' },
});

export default ProgressBar;
