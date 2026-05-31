import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, ImageBackground,
} from 'react-native';
import { C } from '../../constants';
import { Icons } from '../../constants/icons';

export default function AccountApprovedScreen({ navigation }: any) {
  return (
    <ImageBackground source={Icons.patternWhite} style={styles.container} resizeMode="cover">
      <StatusBar barStyle="dark-content" backgroundColor={C.patternBg} />
      <View style={styles.content}>
        <Image source={Icons.verified} style={styles.icon} resizeMode="contain" />
        <Text style={styles.title}>¡Cuenta aprobada!</Text>
        <Text style={styles.body}>
          Ya puedes publicar tus eventos y empezar a conectar con tu comunidad.
        </Text>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.replace('Feed')}>
          <Text style={styles.btnText}>¡Vamos!</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.patternBg, alignItems: 'center', justifyContent: 'center' },
  content: { alignItems: 'center', paddingHorizontal: 32, zIndex: 1 },
  icon: { width: 120, height: 120, marginBottom: 24 },
  title: { color: C.teal, fontSize: 28, fontFamily: 'Poppins_900Black', textAlign: 'center', marginBottom: 14 },
  body: { color: C.gray, fontSize: 14, textAlign: 'center', lineHeight: 22, marginBottom: 36 },
  btn: {
    backgroundColor: C.teal, borderRadius: 30,
    paddingVertical: 15, paddingHorizontal: 60, alignItems: 'center',
  },
  btnText: { color: C.white, fontFamily: 'Poppins_800ExtraBold', fontSize: 16 },
});
