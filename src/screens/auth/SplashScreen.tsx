import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar, Dimensions } from 'react-native';
import { C } from '../../constants';
import DunaLogo from '../../components/DunaLogo';

const { width } = Dimensions.get('window');

export default function SplashScreen({ navigation }: any) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 2300,
      useNativeDriver: false,
    }).start(() => navigation.replace('Onboarding'));
  }, []);

  const barWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width * 0.55],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.purple} />
      <View style={styles.center}>
        <DunaLogo size="large" />
      </View>
      <View style={styles.bottom}>
        <Text style={styles.subText}>¿A dónde quieres ir hoy?</Text>
        <View style={styles.track}>
          <Animated.View style={[styles.fill, { width: barWidth }]} />
        </View>
        <Text style={styles.brand}>D'una</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.purple },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  bottom: { alignItems: 'center', paddingBottom: 56 },
  subText: { color: 'rgba(255,255,255,0.75)', fontSize: 13, marginBottom: 16 },
  track: {
    width: width * 0.55, height: 5,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 3, overflow: 'hidden', marginBottom: 18,
  },
  fill: { height: 5, backgroundColor: C.pink, borderRadius: 3 },
  brand: { color: C.white, fontSize: 20, fontFamily: 'Poppins_800ExtraBold', letterSpacing: 2 },
});
