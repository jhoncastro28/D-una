/**
 * Wrapper de Text con Poppins aplicado automáticamente.
 * Uso: <T w="bold" size={16} color="#fff">texto</T>
 */
import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { F } from '../constants/fonts';

type Weight = 'regular' | 'semibold' | 'bold' | 'extrabold' | 'black';

interface Props extends TextProps {
  w?: Weight;
  size?: number;
  color?: string;
  center?: boolean;
  children: React.ReactNode;
}

const FAMILY: Record<Weight, string> = {
  regular:   F.regular,
  semibold:  F.semibold,
  bold:      F.bold,
  extrabold: F.extrabold,
  black:     F.black,
};

export default function T({ w = 'regular', size, color, center, style, children, ...rest }: Props) {
  return (
    <Text
      style={[
        { fontFamily: FAMILY[w], fontSize: size, color, textAlign: center ? 'center' : undefined },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}
