import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../../constants';
import { Icons } from '../../constants/icons';

export default function RegistrationPendingScreen({ navigation }: any) {
  return (
    <ImageBackground source={Icons.patternWhite} style={styles.container} resizeMode="cover">
      <StatusBar barStyle="dark-content" backgroundColor={C.patternBg} />
      <View style={styles.content}>
        <Image source={Icons.faceHappy} style={styles.icon} resizeMode="contain" />
        <Text style={styles.title}>¡Registro recibido!</Text>
        <Text style={styles.body}>
          Estamos revisando tu información.{'\n'}
          Te notificaremos por correo cuando tu cuenta sea aprobada.
        </Text>

        <View style={styles.infoBox}>
          <Ionicons name="time-outline" size={20} color={C.teal} style={{ marginRight: 8 }} />
          <Text style={styles.infoText}>Tiempo de revisión: 1-2 días hábiles</Text>
        </View>

        <TouchableOpacity style={styles.btn} onPress={() => navigation.replace('Onboarding')}>
          <Text style={styles.btnText}>Ir al inicio</Text>
        </TouchableOpacity>

        <Text style={styles.hint}>
          Una vez aprobada, podrás iniciar sesión{'\n'}con tu correo y contraseña.
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.patternBg, alignItems: 'center', justifyContent: 'center' },
  content: { alignItems: 'center', paddingHorizontal: 32, zIndex: 1 },
  icon: { width: 110, height: 110, marginBottom: 20 },
  title: { color: C.teal, fontSize: 26, fontFamily: 'Poppins_900Black', textAlign: 'center', marginBottom: 12 },
  body: { color: C.gray, fontSize: 14, textAlign: 'center', lineHeight: 22, marginBottom: 28 },
  infoBox: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.white, borderRadius: 16,
    padding: 14, marginBottom: 28, width: '100%',
    borderWidth: 1.5, borderColor: C.teal + '40',
  },
  infoText: { color: C.textDark, fontSize: 13, fontFamily: 'Poppins_600SemiBold', flex: 1 },
  btn: {
    backgroundColor: C.teal, borderRadius: 30,
    paddingVertical: 15, paddingHorizontal: 60,
    alignItems: 'center', marginBottom: 20,
  },
  btnText: { color: C.white, fontFamily: 'Poppins_800ExtraBold', fontSize: 16 },
  hint: { color: C.gray, fontSize: 12, textAlign: 'center', lineHeight: 18 },
});
