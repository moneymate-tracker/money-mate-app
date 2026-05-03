import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthStatus } from '../redux/slices/auth.slice';

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
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import RateAppScreen from '../screens/RateAppScreen';
import SecurityScreen from '../screens/SecurityScreen';

import { useTheme } from '../theme/ThemeContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
const AppNavigator = () => {
  const dispatch = useDispatch();
  const { user, accessToken, isFirstLaunch, loading } = useSelector((state) => state.auth);
  const { colors } = useTheme();

  // Check authentication status on app startup
  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  // Show loading screen while checking auth
  if (isFirstLaunch === null) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary[500]} />
      </View>
    );
  }

  // Navigation logic based on auth state
  // First time user → Welcome Screen
  // Returning user with token → MainTabs
  // Returning user without token (logged out) → Login Screen
  const initialRouteName =
    isFirstLaunch === true ? 'Welcome' :
    accessToken && user ? 'MainTabs' :
    'Login';

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={initialRouteName}
    >
      {/* Welcome & Auth Screens (only when not logged in) */}
      {!accessToken ? (
        <>
          {isFirstLaunch && <Stack.Screen name="Welcome" component={WelcomeScreen} />}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      ) : null}

      {/* Main App Screens (only when logged in) */}
      {accessToken && user ? (
        <>
          <Stack.Screen name="MainTabs" component={TabNavigator} />
          <Stack.Screen
            name="AddExpense"
            component={AddExpenseScreen}
            options={{ presentation: 'modal' }}
          />
          <Stack.Screen name="ExpenseList" component={ExpenseListScreen} />
          <Stack.Screen name="Analytics" component={AnalyticsScreen} />
        </>
      ) : null}

      {/* Shared Screens (always available) */}
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="HelpFAQ" component={HelpFAQScreen} />
      <Stack.Screen name="ContactSupport" component={ContactSupportScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="RateApp" component={RateAppScreen} />
      <Stack.Screen name="Security" component={SecurityScreen} />
    </Stack.Navigator>
  );
};

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppNavigator;
