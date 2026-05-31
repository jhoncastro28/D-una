import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar, Image,
  Dimensions,
} from 'react-native';
import { C } from '../../constants';
import { Icons } from '../../constants/icons';

export default function RegistrationPendingScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={C.patternBg} />
      <Pattern />
      <View style={styles.content}>
        <Image
          source={Icons.faceHappy}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.title}>¡Registro recibido!</Text>
        <Text style={styles.body}>
          Estamos recibiendo tu información.{'\n'}
          Te notificaremos por correo cuando tu cuenta sea aprobada
        </Text>

        {/* Demo: mostrar ambos resultados */}
        <TouchableOpacity
          style={styles.btnTeal}
          onPress={() => navigation.navigate('AccountApproved')}
        >
          <Text style={styles.btnTealText}>Ver cuenta aprobada (demo)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => navigation.navigate('AccountRejected')}
        >
          <Text style={styles.btnOutlineText}>Ver cuenta rechazada (demo)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.goHome}
          onPress={() => navigation.navigate('Onboarding')}
        >
          <Text style={styles.goHomeText}>Ir al inicio</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Pattern() {
  const items = Array(30).fill(0);
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {items.map((_, i) => (
        <Text
          key={i}
          style={[
            styles.patternItem,
            {
              top: (i % 6) * (Dimensions.get('window').height / 5),
              left: Math.floor(i / 6) * (Dimensions.get('window').width / 5),
              transform: [{ rotate: `${(i * 37) % 360}deg` }],
            },
          ]}
        >
          D'
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.patternBg, alignItems: 'center', justifyContent: 'center' },
  patternItem: {
    position: 'absolute',
    color: 'rgba(110,16,247,0.06)',
    fontSize: 28,
    fontFamily: 'Poppins_900Black',
  },
  content: { alignItems: 'center', paddingHorizontal: 32, zIndex: 1 },
  icon: { width: 120, height: 120, marginBottom: 24 },
  title: { color: C.teal, fontSize: 28, fontFamily: 'Poppins_900Black', textAlign: 'center', marginBottom: 14 },
  body: { color: C.gray, fontSize: 14, textAlign: 'center', lineHeight: 22, marginBottom: 36 },
  btnTeal: {
    backgroundColor: C.teal,
    borderRadius: 30, paddingVertical: 15,
    paddingHorizontal: 32, width: '100%',
    alignItems: 'center', marginBottom: 12,
  },
  btnTealText: { color: C.white, fontFamily: 'Poppins_800ExtraBold', fontSize: 15 },
  btnOutline: {
    borderWidth: 2, borderColor: C.teal,
    borderRadius: 30, paddingVertical: 14,
    paddingHorizontal: 32, width: '100%',
    alignItems: 'center', marginBottom: 12,
  },
  btnOutlineText: { color: C.teal, fontFamily: 'Poppins_800ExtraBold', fontSize: 15 },
  goHome: { paddingVertical: 12 },
  goHomeText: { color: C.gray, fontSize: 14, textDecorationLine: 'underline' },
});
