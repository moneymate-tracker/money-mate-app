import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, StyleSheet, Modal, FlatList,
} from 'react-native';
import AppModal from '../components/AppModal';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CATEGORIES, MONTH_NAMES } from '../data/dummyData';
import { useTheme } from '../theme/ThemeContext';

const AddExpenseScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { colors, background, card, text, textMuted, border, primaryText, isDarkMode } = useTheme();

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [catModalVisible, setCatModalVisible] = useState(false);
  const [isIncome, setIsIncome] = useState(false);
  const [modal, setModal] = useState({ visible: false });
  const hideModal = () => setModal(m => ({ ...m, visible: false }));

  const formatDisplayDate = (date) =>
    `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

  const handleSave = () => {
    if (!amount || isNaN(parseFloat(amount))) {
      setModal({ visible: true, type: 'warning', title: 'Invalid Amount', message: 'Please enter a valid numeric amount.' });
      return;
    }
    if (!selectedCategory) {
      setModal({ visible: true, type: 'warning', title: 'Category Required', message: 'Please choose a category for this transaction.' });
      return;
    }
    setModal({
      visible: true,
      type: 'success',
      title: 'Transaction Saved!',
      message: `${isIncome ? 'Income' : 'Expense'} of $${parseFloat(amount).toFixed(2)} has been recorded.`,
      onConfirmOverride: () => { hideModal(); navigation.goBack(); },
    });
  };

  const selectedCat = CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backBtn, { backgroundColor: card, shadowColor: isDarkMode ? '#000' : colors.primary[500] }]}>
            <Ionicons name="arrow-back" size={22} color={text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: text }]}>New Transaction</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Type Toggle */}
        <View style={[styles.typeToggle, { backgroundColor: isDarkMode ? colors.dark[800] : colors.primary[50] }]}>
          <TouchableOpacity
            style={[styles.typeBtn, !isIncome && { backgroundColor: colors.primary[500] }]}
            onPress={() => setIsIncome(false)}
          >
            <Text style={[styles.typeBtnText, { color: textMuted }, !isIncome && { color: colors.white }]}>Expense</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeBtn, isIncome && { backgroundColor: colors.primary[400] }]}
            onPress={() => setIsIncome(true)}
          >
            <Text style={[styles.typeBtnText, { color: textMuted }, isIncome && { color: colors.white }]}>Income</Text>
          </TouchableOpacity>
        </View>

        {/* Amount Input */}
        <LinearGradient
          colors={isIncome ? [colors.primary[400], colors.primary[500]] : [colors.primary[500], colors.primary[700]]}
          style={styles.amountContainer}
        >
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            placeholder="0.00"
            placeholderTextColor="rgba(255,255,255,0.5)"
            maxLength={10}
          />
        </LinearGradient>

        {/* Form */}
        <View style={styles.form}>

          {/* Category */}
          <Text style={[styles.label, { color: textMuted }]}>Category</Text>
          <TouchableOpacity
            style={[styles.selector, { backgroundColor: card, shadowColor: isDarkMode ? '#000' : colors.primary[500] }]}
            onPress={() => setCatModalVisible(true)}
            activeOpacity={0.8}
          >
            {selectedCat ? (
              <View style={styles.selectedCat}>
                <View style={[styles.catIcon, { backgroundColor: isDarkMode ? colors.dark[700] : selectedCat.bg }]}>
                  <Ionicons name={selectedCat.icon} size={18} color={isDarkMode ? colors.primary[300] : selectedCat.color} />
                </View>
                <Text style={[styles.selectorText, { color: text }]}>{selectedCat.name}</Text>
              </View>
            ) : (
              <Text style={styles.selectorPlaceholder}>Select a category</Text>
            )}
            <Ionicons name="chevron-down" size={18} color={textMuted} />
          </TouchableOpacity>

          {/* Date */}
          <Text style={[styles.label, { color: textMuted }]}>Date</Text>
          <View style={[styles.dateSelector, { backgroundColor: card, shadowColor: isDarkMode ? '#000' : colors.primary[500] }]}>
            <Ionicons name="calendar-outline" size={18} color={colors.primary[500]} style={{ marginRight: 10 }} />
            <Text style={[styles.selectorText, { color: text }]}>{formatDisplayDate(selectedDate)}</Text>
          </View>

          {/* Description */}
          <Text style={[styles.label, { color: textMuted }]}>Description</Text>
          <TextInput
            style={[styles.descInput, { backgroundColor: card, color: text, shadowColor: isDarkMode ? '#000' : colors.primary[500] }]}
            value={description}
            onChangeText={setDescription}
            placeholder="What was this for?"
            placeholderTextColor={isDarkMode ? colors.gray[600] : '#bbb'}
            multiline
            numberOfLines={3}
          />

          {/* Note */}
          <View style={[styles.noteBox, { backgroundColor: isDarkMode ? colors.dark[800] : colors.primary[50] }]}>
            <Ionicons name="information-circle-outline" size={16} color={primaryText} />
            <Text style={[styles.noteText, { color: primaryText }]}>This entry will be reflected in your analytics and budget tracker.</Text>
          </View>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={[styles.saveContainer, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity onPress={handleSave} activeOpacity={0.85}>
          <LinearGradient
            colors={isIncome ? [colors.primary[400], colors.primary[500]] : [colors.primary[500], colors.primary[700]]}
            style={[styles.saveBtn, { shadowColor: colors.primary[500] }]}
          >
            <Ionicons name="checkmark-circle" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.saveBtnText}>Save {isIncome ? 'Income' : 'Expense'}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Category Modal */}
      <Modal visible={catModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalSheet, { backgroundColor: card }]}>
            <View style={styles.modalHandle} />
            <Text style={[styles.modalTitle, { color: text }]}>Select Category</Text>
            <FlatList
              data={CATEGORIES}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={{ gap: 12 }}
              contentContainerStyle={{ gap: 12, paddingBottom: 20 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.catOption,
                    { backgroundColor: background },
                    selectedCategory === item.id && { borderColor: colors.primary[500], backgroundColor: isDarkMode ? colors.dark[700] : colors.primary[50] },
                  ]}
                  onPress={() => { setSelectedCategory(item.id); setCatModalVisible(false); }}
                >
                  <View style={[styles.catOptionIcon, { backgroundColor: isDarkMode ? colors.dark[700] : item.bg }]}>
                    <Ionicons name={item.icon} size={22} color={isDarkMode ? colors.primary[300] : item.color} />
                  </View>
                  <Text style={[styles.catOptionText, { color: text }]}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      <AppModal
        visible={modal.visible}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        onConfirm={modal.onConfirmOverride || hideModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 16,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07, shadowRadius: 8, elevation: 3,
  },
  headerTitle: { fontSize: 18, fontWeight: '700' },

  typeToggle: {
    flexDirection: 'row', marginHorizontal: 16, marginBottom: 16,
    borderRadius: 16, padding: 4,
  },
  typeBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 12 },
  typeBtnText: { fontSize: 14, fontWeight: '600' },

  amountContainer: {
    marginHorizontal: 16, borderRadius: 24, padding: 32,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    marginBottom: 24,
  },
  currencySymbol: { fontSize: 36, color: 'rgba(255,255,255,0.8)', fontWeight: '300', marginRight: 4 },
  amountInput: {
    fontSize: 56, fontWeight: '800', color: '#fff',
    minWidth: 100, textAlign: 'center',
  },

  form: { paddingHorizontal: 16, gap: 4 },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 8, marginTop: 12 },

  selector: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderRadius: 16, padding: 14,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
  },
  selectedCat: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  catIcon: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  selectorText: { fontSize: 15, fontWeight: '600' },
  selectorPlaceholder: { fontSize: 15, color: '#bbb' },

  dateSelector: {
    flexDirection: 'row', alignItems: 'center',
    borderRadius: 16, padding: 14,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
  },
  descInput: {
    borderRadius: 16, padding: 14,
    fontSize: 15, minHeight: 88, textAlignVertical: 'top',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
  },

  noteBox: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 8,
    borderRadius: 12, padding: 12, marginTop: 8,
  },
  noteText: { fontSize: 12, flex: 1, lineHeight: 18 },

  saveContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 16, paddingTop: 12 },
  saveBtn: {
    borderRadius: 18, paddingVertical: 18,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35, shadowRadius: 16, elevation: 8,
  },
  saveBtnText: { fontSize: 16, fontWeight: '700', color: '#fff' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalSheet: {
    borderTopLeftRadius: 28, borderTopRightRadius: 28,
    padding: 20, maxHeight: '75%',
  },
  modalHandle: { width: 40, height: 5, borderRadius: 3, backgroundColor: '#ddd', alignSelf: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16 },
  catOption: {
    flex: 1, alignItems: 'center',
    borderRadius: 16, padding: 16, gap: 8,
    borderWidth: 2, borderColor: 'transparent',
  },
  catOptionIcon: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  catOptionText: { fontSize: 12, fontWeight: '600', textAlign: 'center' },
});

export default AddExpenseScreen;
