import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar,
  Dimensions, ScrollView, TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { C } from '../../constants';
import DunaLogo from '../../components/DunaLogo';

const { height } = Dimensions.get('window');

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: C.purple }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor={C.purple} />

      {/* Cabecera morada con logo */}
      <View style={styles.top}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>{'<'}</Text>
        </TouchableOpacity>
        <DunaLogo size="large" showTagline />
      </View>

      {/* Tarjeta blanca */}
      <ScrollView
        contentContainerStyle={styles.card}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        <Text style={styles.title}>Inicia sesión</Text>

        {/* Email */}
        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="correo@ejemplo.com"
          placeholderTextColor="rgba(110,16,247,0.4)"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password */}
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
          placeholderTextColor="rgba(110,16,247,0.4)"
          secureTextEntry
        />

        <TouchableOpacity style={styles.forgot}>
          <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        {/* Redes sociales — visual */}
        <View style={styles.socialRow}>
          <SocialBtn>
            <AntDesign name="google" size={22} color="#DB4437" />
          </SocialBtn>
          <SocialBtn>
            <AntDesign name="apple1" size={22} color="#000" />
          </SocialBtn>
          <SocialBtn>
            <FontAwesome name="facebook" size={22} color="#1877F2" />
          </SocialBtn>
        </View>

        <TouchableOpacity
          style={styles.nextRow}
          onPress={() => navigation.navigate('Location')}
        >
          <Text style={styles.nextText}>Siguiente</Text>
          <Text style={styles.nextArrow}> ›</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function SocialBtn({ children }: { children: React.ReactNode }) {
  return <View style={styles.social}>{children}</View>;
}

const styles = StyleSheet.create({
  top: {
    height: height * 0.42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: { position: 'absolute', top: 52, left: 24 },
  backText: { color: C.white, fontSize: 28, fontFamily: 'Poppins_700Bold' },

  card: {
    backgroundColor: C.white,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 28,
    paddingTop: 30,
    paddingBottom: 48,
    flexGrow: 1,
  },
  title: {
    color: C.purple,
    fontSize: 22,
    fontFamily: 'Poppins_800ExtraBold',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    color: C.textDark,
    fontSize: 13,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 7,
  },
  input: {
    borderWidth: 1.5,
    borderColor: C.pink,
    borderRadius: 30,
    paddingHorizontal: 18,
    paddingVertical: 13,
    fontSize: 15,
    color: C.textDark,
    marginBottom: 16,
    fontFamily: 'Poppins_400Regular',
    backgroundColor: C.white,
  },
  forgot: { alignSelf: 'flex-end', marginBottom: 24, marginTop: -6 },
  forgotText: { color: C.purple, fontSize: 13, fontFamily: 'Poppins_600SemiBold' },

  socialRow: { flexDirection: 'row', justifyContent: 'center', gap: 18, marginBottom: 32 },
  social: {
    width: 52, height: 52, borderRadius: 26,
    borderWidth: 1.5, borderColor: '#e0e0e0',
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: C.white,
    elevation: 2,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08, shadowRadius: 3,
  },

  nextRow: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' },
  nextText: { color: C.purple, fontSize: 17, fontFamily: 'Poppins_800ExtraBold' },
  nextArrow: { color: C.purple, fontSize: 28, fontFamily: 'Poppins_700Bold' },
});
