import React, { useState } from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { C } from '../constants';

interface Props extends TextInputProps {
  placeholder: string;
}

// Usado en pantallas con fondo MORADO — fondo semitransparente, texto blanco
export default function PurpleInput({ placeholder, style, ...rest }: Props) {
  const [focused, setFocused] = useState(false);
  return (
    <TextInput
      style={[styles.input, focused && styles.focused, style]}
      placeholder={placeholder}
      placeholderTextColor="rgba(255,255,255,0.5)"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1.5,
    borderColor: C.pink,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 14,
    color: C.white,
    fontSize: 15,
    marginBottom: 14,
    fontFamily: 'Poppins_400Regular',
  },
  focused: {
    borderColor: C.white,
    backgroundColor: 'rgba(255,255,255,0.28)',
  },
});
