import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeContext';

export default function RateAppScreen() {
  const navigation = useNavigation();
  const { colors, isDarkMode, background, card, text, textMuted, border } = useTheme();

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert('Hold on!', 'Please select a star rating before submitting.');
      return;
    }
    Alert.alert('Thank you!', 'Your feedback has been submitted successfully.', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  const gradientColors = isDarkMode 
    ? [colors.dark[800], colors.dark[900]] 
    : [colors.primary[500], colors.primary[700]];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: background }]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
          {/* Header Section */}
          <LinearGradient
            colors={gradientColors}
            style={styles.headerGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <SafeAreaView>
              <View style={styles.headerTop}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                  <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Rate Our App</Text>
                <View style={{ width: 40 }} />
              </View>

              <View style={styles.headerContent}>
                <Ionicons name="star" size={60} color="#facc15" style={styles.headerIcon} />
                <Text style={styles.welcomeText}>Enjoying MoneyMate?</Text>
                <Text style={styles.subWelcomeText}>Your feedback helps us improve and provide a better experience.</Text>
              </View>
            </SafeAreaView>
          </LinearGradient>

          {/* Form Section */}
          <View style={styles.formContainer}>
            
            <View style={[styles.card, { backgroundColor: card, shadowColor: isDarkMode ? '#000' : colors.primary[500] }]}>
              <Text style={[styles.cardTitle, { color: text }]}>Tap to Rate</Text>
              
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity 
                    key={star} 
                    onPress={() => setRating(star)}
                    activeOpacity={0.7}
                  >
                    <Ionicons 
                      name={star <= rating ? "star" : "star-outline"} 
                      size={40} 
                      color={star <= rating ? "#facc15" : border} 
                      style={styles.starIcon}
                    />
                  </TouchableOpacity>
                ))}
              </View>
              
              <Text style={[styles.ratingText, { color: textMuted }]}>
                {rating === 0 && "Select a rating"}
                {rating === 1 && "Terrible 😞"}
                {rating === 2 && "Poor 😕"}
                {rating === 3 && "Okay 😐"}
                {rating === 4 && "Good 🙂"}
                {rating === 5 && "Excellent! 🤩"}
              </Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: text }]}>Leave a Review (Optional)</Text>
              <TextInput
                style={[styles.textArea, { backgroundColor: card, color: text, borderColor: border }]}
                placeholder="Tell us what you like or how we can improve..."
                placeholderTextColor={textMuted}
                value={feedback}
                onChangeText={setFeedback}
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity onPress={handleSubmit} activeOpacity={0.8} style={styles.buttonWrapper}>
              <LinearGradient 
                colors={[colors.primary[400], colors.primary[600]]} 
                style={styles.submitButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.submitButtonText}>Submit Feedback</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.maybeLaterBtn} onPress={() => navigation.goBack()}>
               <Text style={[styles.maybeLaterText, { color: textMuted }]}>Maybe Later</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 40 : 10,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  headerContent: {
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 30,
  },
  headerIcon: {
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subWelcomeText: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    lineHeight: 22,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 30,
  },
  card: {
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 16,
  },
  starIcon: {
    marginHorizontal: 4,
  },
  ratingText: {
    fontSize: 15,
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 4,
  },
  textArea: {
    height: 120,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
  },
  buttonWrapper: {
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  maybeLaterBtn: {
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 10,
  },
  maybeLaterText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
