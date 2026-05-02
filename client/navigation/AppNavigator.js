import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Screens
import HomeScreen from '../screens/HomeScreen';
import ExpensesScreen from '../screens/ExpensesScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import BudgetScreen from '../screens/BudgetScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ExpenseListScreen from '../screens/ExpenseListScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import HelpFAQScreen from '../screens/HelpFAQScreen';
import ContactSupportScreen from '../screens/ContactSupportScreen';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

import { useTheme } from '../theme/ThemeContext';

// ─── Custom FAB Tab Button ─────────────────────────────────────────────────
const AddTabButton = ({ onPress }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={styles.fabWrapper}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <LinearGradient
        colors={[colors.primary[500], colors.primary[700]]}
        style={styles.fab}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </LinearGradient>
    </TouchableOpacity>
  );
};

// ─── Bottom Tab Navigator ──────────────────────────────────────────────────
const TabNavigator = () => {
  const { isDarkMode, colors, card } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.primary[500],
        tabBarInactiveTintColor: isDarkMode ? colors.dark[600] : '#C4C4D4',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginBottom: 4,
        },
        tabBarStyle: {
          height: 72,
          paddingTop: 8,
          backgroundColor: card,
          borderTopWidth: 0,
          elevation: 20,
          shadowColor: isDarkMode ? '#000' : colors.primary[500],
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.10,
          shadowRadius: 20,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          position: 'absolute',
        },
        tabBarIcon: ({ focused, color, size }) => {
          const icons = {
            Home: focused ? 'home' : 'home-outline',
            Expenses: focused ? 'wallet' : 'wallet-outline',
            Add: 'add',
            Budget: focused ? 'pie-chart' : 'pie-chart-outline',
            Analytics: focused ? 'bar-chart' : 'bar-chart-outline',
            Profile: focused ? 'person' : 'person-outline',
          };
          return <Ionicons name={icons[route.name]} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="Expenses"
        component={ExpensesScreen}
        options={{ tabBarLabel: 'Expenses' }}
      />
      <Tab.Screen
        name="Add"
        component={AddExpenseScreen}
        options={{
          tabBarLabel: '',
          tabBarButton: (props) => <AddTabButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Budget"
        component={BudgetScreen}
        options={{ tabBarLabel: 'Budget' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

// ─── Root Stack Navigator ─────────────────────────────────────────────────
const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainTabs" component={TabNavigator} />
    <Stack.Screen
      name="AddExpense"
      component={AddExpenseScreen}
      options={{ presentation: 'modal' }}
    />
    <Stack.Screen
      name="ExpenseList"
      component={ExpenseListScreen}
    />
    <Stack.Screen
      name="Analytics"
      component={AnalyticsScreen}
    />
    <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
    <Stack.Screen name="HelpFAQ" component={HelpFAQScreen} />
    <Stack.Screen name="ContactSupport" component={ContactSupportScreen} />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  fabWrapper: {
    top: -24,
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
});

export default AppNavigator;
