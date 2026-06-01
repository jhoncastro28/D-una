import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../constants';
import { Icons } from '../constants/icons';

interface Props {
  active: 'home' | 'messages' | 'menu';
  onHome: () => void;
  onMessages: () => void;
  onMenu: () => void;
}

export default function BottomNav({ active, onHome, onMessages, onMenu }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.pill}>
        {/* Home */}
        <TouchableOpacity style={styles.btn} onPress={onHome}>
          <Image
            source={Icons.home}
            style={[styles.icon, active !== 'home' && styles.iconInactive]}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Mensajes */}
        <TouchableOpacity style={styles.btn} onPress={onMessages}>
          <View style={[styles.msgCircle, active === 'messages' && styles.msgCircleActive]}>
            <Ionicons
              name="chatbubble-ellipses"
              size={19}
              color={active === 'messages' ? C.white : C.purple}
            />
          </View>
        </TouchableOpacity>

        {/* Menu / Perfil */}
        <TouchableOpacity style={styles.btn} onPress={onMenu}>
          <View style={[styles.avatarCircle, active === 'menu' && styles.avatarActive]}>
            <Ionicons
              name="person"
              size={18}
              color={active === 'menu' ? C.white : C.purple}
            />
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
    gap: 28,
  },
  btn: { alignItems: 'center', justifyContent: 'center', padding: 4 },
  icon: { width: 30, height: 30 },
  iconInactive: { opacity: 0.35 },

  msgCircle: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: C.grayLight,
    alignItems: 'center', justifyContent: 'center',
  },
  msgCircleActive: { backgroundColor: C.teal },

  avatarCircle: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: C.grayLight,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarActive: { backgroundColor: C.purple },
});
