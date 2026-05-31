import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, Dimensions,
} from 'react-native';
import { C } from '../../constants';
import { Icons } from '../../constants/icons';

export default function AccountRejectedScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={C.patternBg} />
      <Pattern />
      <View style={styles.content}>
        <Image
          source={Icons.faceSurprised}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.title}>Necesitamos más{'\n'}información</Text>
        <Text style={styles.body}>
          No pudimos aprobar tu cuenta. Actualiza la información solicitada para continuar
        </Text>
        <TouchableOpacity style={styles.btnPurple}>
          <Text style={styles.btnPurpleText}>Te enviamos detalles por correo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnTeal}
          onPress={() => navigation.navigate('Onboarding')}
        >
          <Text style={styles.btnTealText}>Ir al inicio</Text>
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
  title: { color: C.teal, fontSize: 26, fontFamily: 'Poppins_900Black', textAlign: 'center', marginBottom: 14 },
  body: { color: C.gray, fontSize: 14, textAlign: 'center', lineHeight: 22, marginBottom: 32 },
  btnPurple: {
    backgroundColor: C.purple,
    borderRadius: 30, paddingVertical: 15,
    paddingHorizontal: 32, width: '100%',
    alignItems: 'center', marginBottom: 12,
  },
  btnPurpleText: { color: C.white, fontFamily: 'Poppins_800ExtraBold', fontSize: 14 },
  btnTeal: {
    backgroundColor: C.teal,
    borderRadius: 30, paddingVertical: 15,
    paddingHorizontal: 32, width: '100%', alignItems: 'center',
  },
  btnTealText: { color: C.white, fontFamily: 'Poppins_800ExtraBold', fontSize: 15 },
});
