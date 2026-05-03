import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Rect, Path } from 'react-native-svg';

const { height } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }) {
  return (
    <View className="flex-1 bg-slate-100">

      {/* Top SVG Illustration */}
      <View
        className="justify-center items-center"
        style={{ height: height * 0.55 }}
      >
        <Svg width={260} height={260} viewBox="0 0 200 200">

          {/* Background Circle */}
          <Circle cx="100" cy="100" r="90" fill="#ede9fe" />

          {/* Card */}
          <Rect x="40" y="60" width="120" height="80" rx="16" fill="#7c3aed" />

          {/* Chart Line */}
          <Path
            d="M60 110 L80 90 L100 105 L130 75"
            stroke="#fff"
            strokeWidth="3"
            fill="none"
          />

          {/* Coin */}
          <Circle cx="140" cy="50" r="12" fill="#facc15" />

          {/* Small dots */}
          <Circle cx="60" cy="50" r="5" fill="#a78bfa" />
          <Circle cx="80" cy="40" r="3" fill="#c4b5fd" />

        </Svg>
      </View>

      {/* Bottom Card */}
      <LinearGradient
        colors={['#7c3aed', '#4f46e5']}
        className="flex-1 rounded-t-[40px] px-7 justify-center"
      >
        <Text className="text-indigo-100 text-base mb-2">
          Manage your
        </Text>

        <Text className="text-white text-[36px] font-extrabold leading-[42px] mb-3">
          Money {"\n"}Smartly 💰
        </Text>

        <Text className="text-indigo-100 text-base mb-7">
          Track expenses, control your budget {"\n"}and grow your savings easily.
        </Text>

        <TouchableOpacity
          className="bg-white py-3.5 rounded-2xl items-center"
          onPress={() => navigation.navigate('Login')}
        >
          <Text className="text-indigo-600 text-base font-bold">
            Get Started
          </Text>
        </TouchableOpacity>

      </LinearGradient>

    </View>
  );
}