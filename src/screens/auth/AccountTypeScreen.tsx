import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, ImageBackground,
} from 'react-native';
import { C } from '../../constants';
import { Icons } from '../../constants/icons';
import DunaLogo from '../../components/DunaLogo';

export default function AccountTypeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.purple} />
      <ImageBackground source={Icons.patternPurple} style={StyleSheet.absoluteFill} resizeMode="cover" pointerEvents="none" />

      <View style={styles.top}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <Image source={Icons.arrowBack} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>
        <DunaLogo size="large" />
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>¿Como quieres{'\n'}usar D'una?</Text>
        <Text style={styles.sub}>Elige el tipo de cuenta que mejor te describa</Text>

        {/* Público → registro directo */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('RegisterPublic')}
        >
          <Image source={Icons.profilePublic} style={styles.optIcon} resizeMode="contain" />
          <View style={styles.optInfo}>
            <Text style={styles.optTitle}>Público</Text>
            <Text style={styles.optDesc}>Descubre y asiste a eventos.</Text>
          </View>
          <View style={styles.arrow}>
            <Text style={styles.arrowText}>›</Text>
          </View>
        </TouchableOpacity>

        {/* Creador → flujo de registro creador */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('CreatorStep1')}
        >
          <Image source={Icons.profileCreator} style={styles.optIcon} resizeMode="contain" />
          <View style={styles.optInfo}>
            <Text style={styles.optTitle}>Creador</Text>
            <Text style={styles.optDesc}>Organiza y publica tus eventos</Text>
          </View>
          <View style={styles.arrow}>
            <Text style={styles.arrowText}>›</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.loginRow}>
          <Text style={styles.loginHint}>¿Ya tienes cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.purple },
  top: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 48 },
  back: { position: 'absolute', top: 52, left: 24 },
  backIcon: { width: 28, height: 28 },
  card: {
    backgroundColor: C.white,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 28,
    paddingTop: 32,
    paddingBottom: 50,
  },
  title: { color: C.purple, fontSize: 24, fontFamily: 'Poppins_900Black', marginBottom: 6 },
  sub: { color: C.gray, fontSize: 13, marginBottom: 28 },
  option: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.purple, borderRadius: 20,
    padding: 16, marginBottom: 14,
  },
  optIcon: { width: 52, height: 52, marginRight: 14 },
  optInfo: { flex: 1 },
  optTitle: { color: C.white, fontFamily: 'Poppins_800ExtraBold', fontSize: 17 },
  optDesc: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 3 },
  arrow: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: C.white, alignItems: 'center', justifyContent: 'center',
  },
  arrowText: { color: C.purple, fontSize: 22, fontFamily: 'Poppins_700Bold' },
  loginRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 16 },
  loginHint: { color: C.gray, fontSize: 13 },
  loginLink: { color: C.purple, fontSize: 13, fontFamily: 'Poppins_700Bold', textDecorationLine: 'underline' },
});
