import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar,
  ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { C } from '../../constants';
import PurpleInput from '../../components/PurpleInput';

export default function CreatorStep4Screen({ navigation }: any) {
  const [instagram, setInstagram] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor={C.purple} />

      <View style={styles.purpleTop}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>{'<'}</Text>
        </TouchableOpacity>
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

        <Text style={styles.label}>Correo electrónico</Text>
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
          style={styles.nextRow}
          onPress={() => navigation.navigate('RegistrationPending')}
        >
          <Text style={styles.nextText}>Siguiente</Text>
          <Text style={styles.nextArrow}> ›</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.purple },
  purpleTop: { height: 90 },
  back: { position: 'absolute', top: 52, left: 24 },
  backText: { color: C.white, fontSize: 28, fontFamily: 'Poppins_700Bold' },
  card: {
    backgroundColor: C.purple,
    paddingHorizontal: 28,
    paddingTop: 16,
    paddingBottom: 50,
  },
  title: { color: C.white, fontSize: 22, fontFamily: 'Poppins_900Black', marginBottom: 6 },
  sub: { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 24 },
  label: { color: 'rgba(255,255,255,0.8)', fontSize: 13, fontFamily: 'Poppins_600SemiBold', marginBottom: 8 },
  infoBox: {
    backgroundColor: C.purple,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    marginTop: 8,
  },
  infoText: { color: 'rgba(255,255,255,0.75)', fontSize: 13, lineHeight: 20, textAlign: 'center' },
  nextRow: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' },
  nextText: { color: C.white, fontSize: 17, fontFamily: 'Poppins_800ExtraBold' },
  nextArrow: { color: C.white, fontSize: 28, fontFamily: 'Poppins_700Bold' },
});
