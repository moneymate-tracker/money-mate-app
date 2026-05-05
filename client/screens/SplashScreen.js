import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StatusBar, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import Svg, { Circle, Rect } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
const SPLASH_MIN_MS = 2600;

export default function SplashScreen({ navigation }) {
  const { accessToken, user, isFirstLaunch } = useSelector(s => s.auth);

  const bgOpacity   = useRef(new Animated.Value(0)).current;
  const logoScale   = useRef(new Animated.Value(0.35)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textY       = useRef(new Animated.Value(24)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const tagOpacity  = useRef(new Animated.Value(0)).current;
  const dot1        = useRef(new Animated.Value(0.2)).current;
  const dot2        = useRef(new Animated.Value(0.2)).current;
  const dot3        = useRef(new Animated.Value(0.2)).current;

  const timerDone   = useRef(false);
  const authChecked = useRef(false);
  const navigated   = useRef(false);
  const tokenRef    = useRef(accessToken);
  const userRef     = useRef(user);

  useEffect(() => { tokenRef.current = accessToken; }, [accessToken]);
  useEffect(() => { userRef.current = user; }, [user]);

  const tryNavigate = () => {
    if (navigated.current || !timerDone.current || !authChecked.current) return;
    navigated.current = true;
    if (tokenRef.current && userRef.current) {
      navigation.replace('MainTabs');
    } else {
      navigation.replace('Login');
    }
  };

  useEffect(() => {
    if (isFirstLaunch !== null) {
      authChecked.current = true;
      tryNavigate();
    }
  }, [isFirstLaunch]);

  useEffect(() => {
    if (isFirstLaunch !== null) authChecked.current = true;

    Animated.sequence([
      Animated.timing(bgOpacity, { toValue: 1, duration: 350, useNativeDriver: true }),
      Animated.parallel([
        Animated.spring(logoScale, { toValue: 1, tension: 55, friction: 7, useNativeDriver: true }),
        Animated.timing(logoOpacity, { toValue: 1, duration: 480, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(textOpacity, { toValue: 1, duration: 380, useNativeDriver: true }),
        Animated.timing(textY, { toValue: 0, duration: 380, useNativeDriver: true }),
      ]),
      Animated.timing(tagOpacity, { toValue: 1, duration: 320, useNativeDriver: true }),
    ]).start();

    const dotPulse = Animated.loop(
      Animated.sequence([
        Animated.timing(dot1, { toValue: 1, duration: 260, useNativeDriver: true }),
        Animated.timing(dot2, { toValue: 1, duration: 260, useNativeDriver: true }),
        Animated.timing(dot3, { toValue: 1, duration: 260, useNativeDriver: true }),
        Animated.delay(120),
        Animated.parallel([
          Animated.timing(dot1, { toValue: 0.2, duration: 260, useNativeDriver: true }),
          Animated.timing(dot2, { toValue: 0.2, duration: 260, useNativeDriver: true }),
          Animated.timing(dot3, { toValue: 0.2, duration: 260, useNativeDriver: true }),
        ]),
        Animated.delay(80),
      ])
    );
    dotPulse.start();

    const timer = setTimeout(() => {
      timerDone.current = true;
      tryNavigate();
    }, SPLASH_MIN_MS);

    return () => {
      clearTimeout(timer);
      dotPulse.stop();
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#0c0720' }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <Animated.View style={{ flex: 1, opacity: bgOpacity }}>
        <LinearGradient
          colors={['#0c0720', '#180e3a', '#2d1b69']}
          locations={[0, 0.45, 1]}
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          {/* Decorative glows */}
          <View style={{
            position: 'absolute', top: height * 0.06, right: -70,
            width: 220, height: 220, borderRadius: 110,
            backgroundColor: 'rgba(108,99,255,0.10)',
          }} />
          <View style={{
            position: 'absolute', bottom: height * 0.14, left: -50,
            width: 180, height: 180, borderRadius: 90,
            backgroundColor: 'rgba(139,92,246,0.09)',
          }} />
          <View style={{
            position: 'absolute', top: height * 0.35, left: width * 0.7,
            width: 80, height: 80, borderRadius: 40,
            backgroundColor: 'rgba(167,139,250,0.07)',
          }} />

          {/* Logo card */}
          <Animated.View style={{
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
            marginBottom: 38,
          }}>
            <LinearGradient
              colors={['rgba(255,255,255,0.18)', 'rgba(255,255,255,0.06)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: 116, height: 116, borderRadius: 34,
                alignItems: 'center', justifyContent: 'center',
                borderWidth: 1.5,
                borderColor: 'rgba(255,255,255,0.15)',
              }}
            >
              <Svg width={62} height={62} viewBox="0 0 62 62" fill="none">
                {/* Wallet body */}
                <Rect x="6" y="17" width="50" height="33" rx="9" fill="white" opacity="0.95" />
                {/* Top strip */}
                <Rect x="6" y="17" width="50" height="11" rx="6" fill="rgba(108,99,255,0.22)" />
                {/* Coin pocket */}
                <Rect x="37" y="27" width="15" height="11" rx="5.5"
                  fill="rgba(108,99,255,0.10)"
                  stroke="rgba(108,99,255,0.38)"
                  strokeWidth="1.2" />
                {/* Coin */}
                <Circle cx="44.5" cy="32.5" r="3.2" fill="#6C63FF" />
                {/* Card lines */}
                <Rect x="13" y="36" width="17" height="2.5" rx="1.25" fill="rgba(108,99,255,0.28)" />
                <Rect x="13" y="41" width="11" height="2.5" rx="1.25" fill="rgba(108,99,255,0.18)" />
              </Svg>
            </LinearGradient>
          </Animated.View>

          {/* App name */}
          <Animated.Text style={{
            opacity: textOpacity,
            transform: [{ translateY: textY }],
            color: '#ffffff',
            fontSize: 40,
            fontWeight: '800',
            letterSpacing: 0.3,
            marginBottom: 12,
          }}>
            MoneyMate
          </Animated.Text>

          {/* Tagline */}
          <Animated.Text style={{
            opacity: tagOpacity,
            color: 'rgba(255,255,255,0.50)',
            fontSize: 15,
            fontWeight: '400',
            letterSpacing: 0.6,
          }}>
            Smart budgeting, simplified.
          </Animated.Text>

          {/* Loading dots */}
          <View style={{
            position: 'absolute',
            bottom: 58,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            {[dot1, dot2, dot3].map((dot, i) => (
              <Animated.View
                key={i}
                style={{
                  width: 7, height: 7, borderRadius: 3.5,
                  backgroundColor: '#a78bfa',
                  opacity: dot,
                  marginHorizontal: 4,
                }}
              />
            ))}
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
}
