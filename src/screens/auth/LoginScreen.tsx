import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar,
  Dimensions, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { C } from '../../constants';
import DunaLogo from '../../components/DunaLogo';
import PurpleInput from '../../components/PurpleInput';

const { height } = Dimensions.get('window');

export default function LoginScreen({ navigation, route }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNext = () => navigation.navigate('Location');

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: C.purple }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor={C.purple} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">

        {/* Purple top */}
        <View style={styles.top}>
          <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>{'<'}</Text>
          </TouchableOpacity>
          <DunaLogo size="large" showTagline />
        </View>

        {/* White card */}
        <View style={styles.card}>
          <Text style={styles.title}>Inicia sesión</Text>

          <PurpleInput
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <PurpleInput
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.forgot}>
            <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          {/* Social icons — solo visual */}
          <View style={styles.socialRow}>
            <SocialBtn letter="G" color="#DB4437" />
            <SocialBtn letter="" color="#000" isApple />
            <SocialBtn letter="f" color="#1877F2" />
          </View>

          <TouchableOpacity style={styles.nextRow} onPress={handleNext}>
            <Text style={styles.nextText}>Siguiente</Text>
            <Text style={styles.nextArrow}> ›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function SocialBtn({ letter, color, isApple }: any) {
  return (
    <View style={[styles.social, { borderColor: color }]}>
      <Text style={[styles.socialLetter, { color }]}>{isApple ? '⌘' : letter}</Text>
    </View>
  );
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
    paddingTop: 32,
    paddingBottom: 40,
    flexGrow: 1,
  },
  title: {
    color: C.purple,
    fontSize: 22,
    fontFamily: 'Poppins_800ExtraBold',
    marginBottom: 22,
    textAlign: 'center',
  },
  forgot: { alignSelf: 'flex-end', marginTop: -6, marginBottom: 24 },
  forgotText: { color: C.purple, fontSize: 13, fontFamily: 'Poppins_600SemiBold' },
  socialRow: { flexDirection: 'row', justifyContent: 'center', gap: 16, marginBottom: 30 },
  social: {
    width: 48, height: 48, borderRadius: 24,
    borderWidth: 2, alignItems: 'center', justifyContent: 'center',
  },
  socialLetter: { fontSize: 20, fontFamily: 'Poppins_700Bold' },
  nextRow: {
    flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center',
  },
  nextText: { color: C.purple, fontSize: 17, fontFamily: 'Poppins_800ExtraBold' },
  nextArrow: { color: C.purple, fontSize: 28, fontFamily: 'Poppins_700Bold' },
});
