import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { C } from '../constants';
import { Icons } from '../constants/icons';

interface Props {
  active: 'home' | 'explore' | 'menu';
  onHome: () => void;
  onExplore: () => void;
  onMenu: () => void;
}

export default function BottomNav({ active, onHome, onExplore, onMenu }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.pill}>
        <TouchableOpacity style={styles.btn} onPress={onHome}>
          <Image
            source={Icons.home}
            style={[styles.icon, active !== 'home' && styles.iconInactive]}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={onExplore}>
          <View style={[styles.arrowIcon, active === 'explore' && styles.arrowActive]}>
            <Text style={[styles.arrowText, active === 'explore' && styles.arrowTextActive]}>▷</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={onMenu}>
          <View style={styles.menuIcon}>
            {[0, 1, 2].map(i => (
              <View
                key={i}
                style={[styles.menuLine, active === 'menu' ? styles.menuLineActive : styles.menuLineInactive]}
              />
            ))}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 24,
    paddingTop: 10,
    backgroundColor: 'transparent',
  },
  pill: {
    flexDirection: 'row',
    backgroundColor: C.white,
    borderRadius: 40,
    paddingHorizontal: 28,
    paddingVertical: 10,
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    gap: 32,
  },
  btn: { alignItems: 'center', justifyContent: 'center', padding: 4 },
  icon: { width: 30, height: 30 },
  iconInactive: { opacity: 0.35 },
  arrowIcon: { padding: 4 },
  arrowActive: {},
  arrowText: { fontSize: 22, color: 'rgba(110,16,247,0.3)' },
  arrowTextActive: { color: C.pink },
  menuIcon: { gap: 4, padding: 4 },
  menuLine: { width: 24, height: 3, borderRadius: 2 },
  menuLineActive: { backgroundColor: C.pink },
  menuLineInactive: { backgroundColor: 'rgba(110,16,247,0.3)' },
});
