import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { C } from '../constants';
import { Icons } from '../constants/icons';

interface Props {
  size?: 'small' | 'medium' | 'large';
  showTagline?: boolean;
  iconOnly?: boolean;
}

export default function DunaLogo({ size = 'medium', showTagline = false, iconOnly = false }: Props) {
  const wordmarkH = size === 'large' ? 64 : size === 'medium' ? 48 : 32;
  const wordmarkW = wordmarkH * 4.2;
  const iconH     = size === 'large' ? 72 : size === 'medium' ? 54 : 36;
  const iconW     = iconH;

  return (
    <View style={styles.wrap}>
      {showTagline && <Text style={styles.tagline}>Si hay plan es</Text>}
      {iconOnly ? (
        <Image source={Icons.logoIcon} style={{ width: iconW, height: iconH }} resizeMode="contain" />
      ) : (
        <Image source={Icons.logoWordmark} style={{ width: wordmarkW, height: wordmarkH }} resizeMode="contain" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center' },
  tagline: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
    letterSpacing: 1,
    marginBottom: 6,
  },
});
