import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar, Image,
  ScrollView, TextInput, KeyboardAvoidingView, Platform,
  Alert, ActivityIndicator, ImageBackground,
} from 'react-native';
import { C, BOYACA_MUNICIPALITIES } from '../../constants';
import { Icons } from '../../constants/icons';
import DunaLogo from '../../components/DunaLogo';
import { useAuth } from '../../context/AuthContext';

export default function RegisterPublicScreen({ navigation, route }: any) {
  const { registerPublico } = useAuth();
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [municipality, setMunicipality] = useState<string>(route?.params?.municipality ?? '');
  const [openMuni, setOpenMuni] = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password || !municipality) {
      Alert.alert('Campos requeridos', 'Por favor completa todos los campos.');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Contraseñas distintas', 'Las contraseñas no coinciden.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Contraseña muy corta', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    setLoading(true);
    try {
      await registerPublico(name.trim(), email.trim(), password, municipality);
      navigation.replace('RegistrationPending');
    } catch (err: any) {
      if (err.message === 'EMAIL_EXISTS') {
        Alert.alert('Correo ya registrado', 'Ya existe una solicitud o cuenta con ese correo.');
      } else {
        Alert.alert('Error', 'No se pudo enviar la solicitud. Intenta de nuevo.');
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
        <DunaLogo size="medium" />
      </View>

      <ScrollView
        contentContainerStyle={styles.card}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        <Text style={styles.title}>Crear cuenta</Text>
        <Text style={styles.sub}>Acceso público a D'una</Text>

        <Label>Nombre completo</Label>
        <Input value={name} onChange={setName} placeholder="Ej: Laura Gómez" />

        <Label>Correo electrónico</Label>
        <Input
          value={email} onChange={setEmail}
          placeholder="correo@ejemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Label>Contraseña</Label>
        <Input value={password} onChange={setPassword} placeholder="Mínimo 6 caracteres" secureTextEntry />

        <Label>Confirmar contraseña</Label>
        <Input value={confirm} onChange={setConfirm} placeholder="Repite tu contraseña" secureTextEntry />

        <Label>Municipio en Boyacá</Label>
        <TouchableOpacity style={styles.picker} onPress={() => setOpenMuni(o => !o)}>
          <Text style={[styles.pickerText, !municipality && styles.placeholder]}>
            {municipality || 'Selecciona tu municipio'}
          </Text>
          <Text style={styles.pickerArrow}>▼</Text>
        </TouchableOpacity>
        {openMuni && (
          <View style={styles.dropdown}>
            <ScrollView style={{ maxHeight: 180 }} nestedScrollEnabled>
              {BOYACA_MUNICIPALITIES.map(m => (
                <TouchableOpacity
                  key={m}
                  style={styles.dropItem}
                  onPress={() => { setMunicipality(m); setOpenMuni(false); }}
                >
                  <Text style={[styles.dropText, municipality === m && styles.dropActive]}>{m}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <TouchableOpacity
          style={[styles.btn, loading && { opacity: 0.7 }]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading
            ? <ActivityIndicator color={C.white} />
            : <Text style={styles.btnText}>Crear cuenta ›</Text>
          }
        </TouchableOpacity>

        <View style={styles.loginRow}>
          <Text style={styles.loginHint}>¿Ya tienes cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <Text style={styles.label}>{children}</Text>;
}
function Input({ value, onChange, placeholder, keyboardType, autoCapitalize, secureTextEntry }: any) {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      placeholderTextColor="rgba(110,16,247,0.4)"
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize ?? 'words'}
      secureTextEntry={secureTextEntry}
      autoCorrect={false}
    />
  );
}

const styles = StyleSheet.create({
  top: {
    height: 140,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  back: { position: 'absolute', top: 52, left: 24 },
  backIcon: { width: 28, height: 28 },
  card: {
    backgroundColor: C.white,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 28,
    paddingTop: 30,
    paddingBottom: 50,
  },
  title: { color: C.purple, fontSize: 22, fontFamily: 'Poppins_800ExtraBold', marginBottom: 4, textAlign: 'center' },
  sub: { color: C.gray, fontSize: 13, textAlign: 'center', marginBottom: 24 },
  label: { color: C.textDark, fontSize: 13, fontFamily: 'Poppins_600SemiBold', marginBottom: 7 },
  input: {
    borderWidth: 1.5, borderColor: C.pink, borderRadius: 30,
    paddingHorizontal: 18, paddingVertical: 13,
    fontSize: 14, color: C.textDark, marginBottom: 16,
    fontFamily: 'Poppins_400Regular', backgroundColor: C.white,
  },
  picker: {
    borderWidth: 1.5, borderColor: C.pink, borderRadius: 30,
    paddingHorizontal: 18, paddingVertical: 13, marginBottom: 4,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  pickerText: { fontSize: 14, color: C.textDark },
  placeholder: { color: 'rgba(110,16,247,0.4)' },
  pickerArrow: { color: C.purple, fontSize: 13 },
  dropdown: {
    borderWidth: 1.5, borderColor: C.pink, borderRadius: 16,
    backgroundColor: C.white, marginBottom: 16, overflow: 'hidden',
  },
  dropItem: {
    paddingHorizontal: 18, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
  },
  dropText: { fontSize: 14, color: C.textDark },
  dropActive: { color: C.purple, fontFamily: 'Poppins_700Bold' },
  btn: {
    backgroundColor: C.purple, borderRadius: 30,
    paddingVertical: 15, alignItems: 'center', marginTop: 12, marginBottom: 20,
  },
  btnText: { color: C.white, fontSize: 16, fontFamily: 'Poppins_800ExtraBold' },
  loginRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  loginHint: { color: C.gray, fontSize: 13 },
  loginLink: { color: C.purple, fontSize: 13, fontFamily: 'Poppins_700Bold', textDecorationLine: 'underline' },
});
