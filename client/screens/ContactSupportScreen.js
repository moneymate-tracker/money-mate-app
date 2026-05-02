import React, { useState } from 'react';
import { 
  View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Alert, KeyboardAvoidingView, Platform 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeContext';

const ContactSupportScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { colors, background, card, text, textMuted, border, primaryText, isDarkMode } = useTheme();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!name || !email || !message) {
      Alert.alert("Missing Fields", "Please fill out all fields before submitting.");
      return;
    }
    
    Alert.alert(
      "Message Sent", 
      "Thank you for contacting us! Our support team will get back to you shortly.",
      [{ text: "OK", onPress: () => navigation.goBack() }]
    );
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.container, { paddingTop: insets.top, backgroundColor: background }]}>
        <View style={[styles.header, { borderBottomColor: border }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: text }]}>Contact Support</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          
          <View style={[styles.infoCard, { backgroundColor: isDarkMode ? colors.dark[800] : colors.primary[50], borderColor: border }]}>
            <Ionicons name="chatbubbles-outline" size={32} color={primaryText} style={{ marginBottom: 12 }} />
            <Text style={[styles.infoTitle, { color: text }]}>We're here to help</Text>
            <Text style={[styles.infoText, { color: textMuted }]}>
              Have an issue or a question? Fill out the form below and we'll get back to you within 24 hours.
            </Text>
          </View>

          <View style={[styles.formCard, { backgroundColor: card, shadowColor: isDarkMode ? '#000' : colors.primary[500] }]}>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: textMuted }]}>Name</Text>
              <TextInput
                style={[styles.input, { backgroundColor: background, color: text, borderColor: border }]}
                placeholder="John Doe"
                placeholderTextColor={isDarkMode ? colors.gray[600] : '#bbb'}
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: textMuted }]}>Email</Text>
              <TextInput
                style={[styles.input, { backgroundColor: background, color: text, borderColor: border }]}
                placeholder="john@example.com"
                placeholderTextColor={isDarkMode ? colors.gray[600] : '#bbb'}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: textMuted }]}>Message</Text>
              <TextInput
                style={[styles.input, styles.textArea, { backgroundColor: background, color: text, borderColor: border }]}
                placeholder="How can we help you?"
                placeholderTextColor={isDarkMode ? colors.gray[600] : '#bbb'}
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                value={message}
                onChangeText={setMessage}
              />
            </View>

            <TouchableOpacity onPress={handleSubmit} activeOpacity={0.8} style={{ marginTop: 8 }}>
              <LinearGradient colors={[colors.primary[500], colors.primary[700]]} style={styles.submitBtn}>
                <Text style={styles.submitText}>Send Message</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  content: { padding: 16, paddingBottom: 40 },
  
  infoCard: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 24,
    alignItems: 'center',
    textAlign: 'center',
  },
  infoTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  infoText: { fontSize: 14, lineHeight: 22, textAlign: 'center' },

  formCard: {
    padding: 20,
    borderRadius: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 8, marginLeft: 4 },
  input: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
  },
  textArea: { minHeight: 120, paddingTop: 14 },
  
  submitBtn: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

export default ContactSupportScreen;
