import React, { useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeContext';

const TYPE_CONFIG = {
  success: { icon: 'checkmark-circle', colors: ['#22c55e', '#16a34a'], bg: 'rgba(34,197,94,0.12)' },
  error:   { icon: 'close-circle',     colors: ['#ef4444', '#dc2626'], bg: 'rgba(239,68,68,0.12)' },
  warning: { icon: 'warning',           colors: ['#f59e0b', '#d97706'], bg: 'rgba(245,158,11,0.12)' },
  info:    { icon: 'information-circle',colors: ['#6C63FF', '#5b52e8'], bg: 'rgba(108,99,255,0.12)' },
  confirm: { icon: 'help-circle',       colors: ['#6C63FF', '#5b52e8'], bg: 'rgba(108,99,255,0.12)' },
};

export default function AppModal({
  visible,
  type = 'info',
  title,
  message,
  confirmText = 'OK',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
}) {
  const { card, text, textMuted, isDarkMode, colors, border } = useTheme();
  const scaleAnim  = useRef(new Animated.Value(0.88)).current;
  const alphaAnim  = useRef(new Animated.Value(0)).current;

  const cfg = TYPE_CONFIG[type] || TYPE_CONFIG.info;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, { toValue: 1, tension: 68, friction: 8, useNativeDriver: true }),
        Animated.timing(alphaAnim,  { toValue: 1, duration: 180, useNativeDriver: true }),
      ]).start();
    } else {
      scaleAnim.setValue(0.88);
      alphaAnim.setValue(0);
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="none" statusBarTranslucent>
      <Animated.View style={[styles.overlay, { opacity: alphaAnim }]}>
        <Animated.View style={[styles.card, { backgroundColor: card, transform: [{ scale: scaleAnim }] }]}>

          {/* Colored top accent strip */}
          <LinearGradient colors={cfg.colors} style={styles.topStrip} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />

          {/* Icon bubble */}
          <View style={[styles.iconWrap, { backgroundColor: cfg.bg }]}>
            <LinearGradient colors={cfg.colors} style={styles.iconGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
              <Ionicons name={cfg.icon} size={30} color="#fff" />
            </LinearGradient>
          </View>

          {/* Title */}
          <Text style={[styles.title, { color: text }]}>{title}</Text>

          {/* Message */}
          {!!message && <Text style={[styles.message, { color: textMuted }]}>{message}</Text>}

          {/* Divider */}
          <View style={[styles.divider, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)' }]} />

          {/* Buttons */}
          <View style={[styles.btnRow, type === 'confirm' && styles.btnRowDouble]}>
            {type === 'confirm' && (
              <TouchableOpacity
                style={[styles.cancelBtn, { borderColor: border, backgroundColor: isDarkMode ? colors.dark[700] : '#f0f0f6' }]}
                onPress={onCancel}
                activeOpacity={0.75}
              >
                <Text style={[styles.cancelText, { color: textMuted }]}>{cancelText}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.confirmBtnWrap, type === 'confirm' && { flex: 1 }]}
              onPress={onConfirm}
              activeOpacity={0.8}
            >
              <LinearGradient colors={cfg.colors} style={styles.confirmGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                <Text style={styles.confirmText}>{confirmText}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.58)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 28,
  },
  card: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 24,
    overflow: 'hidden',
    alignItems: 'center',
    paddingBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.22,
    shadowRadius: 28,
    elevation: 18,
  },
  topStrip: { width: '100%', height: 4 },
  iconWrap: {
    width: 76, height: 76, borderRadius: 38,
    alignItems: 'center', justifyContent: 'center',
    marginTop: 28, marginBottom: 16,
  },
  iconGradient: {
    width: 56, height: 56, borderRadius: 28,
    alignItems: 'center', justifyContent: 'center',
  },
  title: {
    fontSize: 19, fontWeight: '700',
    textAlign: 'center', letterSpacing: 0.2,
    paddingHorizontal: 24,
  },
  message: {
    fontSize: 14, textAlign: 'center',
    lineHeight: 22, marginTop: 10,
    paddingHorizontal: 24,
  },
  divider: { width: '100%', height: 1, marginTop: 24, marginBottom: 20 },
  btnRow: { width: '100%', paddingHorizontal: 24 },
  btnRowDouble: { flexDirection: 'row', gap: 12 },
  cancelBtn: {
    flex: 1, height: 50, borderRadius: 14,
    borderWidth: 1.5, justifyContent: 'center', alignItems: 'center',
  },
  cancelText: { fontSize: 15, fontWeight: '600' },
  confirmBtnWrap: { borderRadius: 14, overflow: 'hidden' },
  confirmGradient: { height: 50, justifyContent: 'center', alignItems: 'center' },
  confirmText: { color: '#fff', fontSize: 15, fontWeight: '700', letterSpacing: 0.3 },
});
