import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar, Image,
  Dimensions, ScrollView, TextInput, KeyboardAvoidingView,
  Platform, ActivityIndicator, Alert, ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../../constants';
import { Icons } from '../../constants/icons';
import DunaLogo from '../../components/DunaLogo';
import { useAuth } from '../../context/AuthContext';

const { height } = Dimensions.get('window');

export default function LoginScreen({ navigation }: any) {
  const { login } = useAuth();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Campos requeridos', 'Por favor ingresa tu correo y contraseña.');
      return;
    }
    setLoading(true);
    try {
      const result = await login(email.trim(), password);
      if (result.role === 'admin') {
        navigation.replace('AdminDashboard');
      } else if (result.role === 'creador') {
        navigation.replace('Feed');
      } else {
        navigation.replace('Feed');
      }
    } catch (err: any) {
      if (err.message === 'PENDING') {
        navigation.replace('RegistrationPending');
      } else if (err.message === 'REJECTED') {
        navigation.replace('AccountRejected');
      } else {
        Alert.alert(
          'Credenciales incorrectas',
          'El correo o contraseña no son válidos. Verifica tus datos.',
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: C.purple }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor={C.purple} />
      <ImageBackground source={Icons.patternPurple} style={StyleSheet.absoluteFill} resizeMode="cover" pointerEvents="none" />

      <View style={styles.top}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <Image source={Icons.arrowBack} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>
        <DunaLogo size="large" showTagline />
      </View>

      <ScrollView
        contentContainerStyle={styles.card}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        <Text style={styles.title}>Inicia sesión</Text>

        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="correo@ejemplo.com"
          placeholderTextColor="rgba(110,16,247,0.4)"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.label}>Contraseña</Text>
        <View style={styles.passWrap}>
          <TextInput
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            placeholderTextColor="rgba(110,16,247,0.4)"
            secureTextEntry={!showPass}
          />
          <TouchableOpacity onPress={() => setShowPass(p => !p)} style={styles.eyeBtn}>
            <Ionicons name={showPass ? 'eye-off-outline' : 'eye-outline'} size={20} color={C.gray} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.forgot}>
          <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        <View style={styles.socialRow}>
          <SocialBtn><Ionicons name="logo-google"   size={22} color="#DB4437" /></SocialBtn>
          <SocialBtn><Ionicons name="logo-apple"    size={24} color="#000" /></SocialBtn>
          <SocialBtn><Ionicons name="logo-facebook" size={22} color="#1877F2" /></SocialBtn>
        </View>

        <TouchableOpacity
          style={[styles.loginBtn, loading && { opacity: 0.7 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading
            ? <ActivityIndicator color={C.white} />
            : <Text style={styles.loginBtnText}>Siguiente ›</Text>
          }
        </TouchableOpacity>

        <View style={styles.registerRow}>
          <Text style={styles.registerHint}>¿No tienes cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('AccountType')}>
            <Text style={styles.registerLink}>Regístrate</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function SocialBtn({ children }: { children: React.ReactNode }) {
  return <View style={styles.social}>{children}</View>;
}

const styles = StyleSheet.create({
  top: {
    height: height * 0.38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: { position: 'absolute', top: 52, left: 24 },
  backIcon: { width: 28, height: 28 },

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
  label: { color: C.textDark, fontSize: 13, fontFamily: 'Poppins_600SemiBold', marginBottom: 7 },
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
  passWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: C.pink,
    borderRadius: 30,
    paddingRight: 14,
    marginBottom: 16,
    backgroundColor: C.white,
  },
  eyeBtn: { padding: 6 },
  forgot: { alignSelf: 'flex-end', marginBottom: 24, marginTop: -4 },
  forgotText: { color: C.purple, fontSize: 13, fontFamily: 'Poppins_600SemiBold' },

  socialRow: { flexDirection: 'row', justifyContent: 'center', gap: 18, marginBottom: 28 },
  social: {
    width: 52, height: 52, borderRadius: 26,
    borderWidth: 1.5, borderColor: '#e0e0e0',
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: C.white,
    elevation: 2,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08, shadowRadius: 3,
  },

  loginBtn: {
    backgroundColor: C.purple,
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginBtnText: { color: C.white, fontSize: 16, fontFamily: 'Poppins_800ExtraBold' },

  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  registerHint: { color: C.gray, fontSize: 13 },
  registerLink: { color: C.purple, fontSize: 13, fontFamily: 'Poppins_700Bold', textDecorationLine: 'underline' },

});
