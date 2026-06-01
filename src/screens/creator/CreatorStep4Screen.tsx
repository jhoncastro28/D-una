import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar, Image,
  ScrollView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator, ImageBackground,
} from 'react-native';
import { C } from '../../constants';
import { Icons } from '../../constants/icons';
import PurpleInput from '../../components/PurpleInput';
import { useAuth } from '../../context/AuthContext';

export default function CreatorStep4Screen({ navigation }: any) {
  const { updateCreatorFormData, submitCreatorRegistration } = useAuth();
  const [instagram, setInstagram] = useState('');
  const [email, setEmail]         = useState('');
  const [phone, setPhone]         = useState('');
  const [loading, setLoading]     = useState(false);

  const handleSubmit = async () => {
    updateCreatorFormData({ instagram, contactEmail: email, phone });
    setLoading(true);
    try {
      await submitCreatorRegistration();
      navigation.replace('RegistrationPending');
    } catch (err: any) {
      if (err.message === 'EMAIL_EXISTS') {
        Alert.alert('Correo ya registrado', 'Ya existe una solicitud con ese correo.');
      } else if (err.message === 'INCOMPLETE_FORM') {
        Alert.alert('Datos incompletos', 'Por favor completa todos los pasos del registro.');
      } else {
        Alert.alert('Error', 'No se pudo enviar la solicitud. Intenta de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor={C.purple} />
      <ImageBackground source={Icons.patternPurple} style={styles.pattern} resizeMode="cover" pointerEvents="none" />

      <View style={styles.purpleTop}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <Image source={Icons.arrowBack} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.stepLabel}>Paso 4 de 4</Text>
      </View>

      <ScrollView contentContainerStyle={styles.card} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Datos de contacto</Text>
        <Text style={styles.sub}>Así los asistentes podrán encontrarte</Text>

        <Text style={styles.label}>Instagram o página web</Text>
        <PurpleInput
          placeholder="Ej: @username o link"
          value={instagram}
          onChangeText={setInstagram}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Correo de contacto</Text>
        <PurpleInput
          placeholder="Ej: ejemplo@correo.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Teléfono de contacto</Text>
        <PurpleInput
          placeholder="Ej: +57 300 000 0000"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Tu información estará segura con nosotros y no será publicada sin tu autorización
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.submitBtn, loading && { opacity: 0.7 }]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading
            ? <ActivityIndicator color={C.purple} />
            : <Text style={styles.submitBtnText}>Enviar solicitud ›</Text>
          }
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.purple },
  pattern: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  purpleTop: { height: 90, justifyContent: 'flex-end', paddingBottom: 10, paddingHorizontal: 24 },
  back: { position: 'absolute', top: 52, left: 24 },
  backIcon: { width: 28, height: 28 },
  stepLabel: {
    color: 'rgba(255,255,255,0.6)', fontSize: 12,
    textAlign: 'right', fontFamily: 'Poppins_600SemiBold',
  },
  card: { backgroundColor: C.purple, paddingHorizontal: 28, paddingTop: 16, paddingBottom: 50 },
  title: { color: C.white, fontSize: 22, fontFamily: 'Poppins_900Black', marginBottom: 6 },
  sub: { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 24 },
  label: { color: 'rgba(255,255,255,0.8)', fontSize: 13, fontFamily: 'Poppins_600SemiBold', marginBottom: 8 },
  infoBox: {
    backgroundColor: C.purple, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 16, padding: 16, marginBottom: 24, marginTop: 8,
  },
  infoText: { color: 'rgba(255,255,255,0.75)', fontSize: 13, lineHeight: 20, textAlign: 'center' },
  submitBtn: {
    backgroundColor: C.white, borderRadius: 30,
    paddingVertical: 15, alignItems: 'center',
  },
  submitBtnText: { color: C.purple, fontSize: 16, fontFamily: 'Poppins_800ExtraBold' },
});
