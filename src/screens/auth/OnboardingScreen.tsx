import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar, Dimensions,
} from 'react-native';
import { C } from '../../constants';
import { F } from '../../constants/fonts';
import DunaLogo from '../../components/DunaLogo';

const { height } = Dimensions.get('window');

export default function OnboardingScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.purple} />

      {/* Purple top */}
      <View style={styles.top}>
        <DunaLogo size="large" showTagline />
      </View>

      {/* White card */}
      <View style={styles.card}>
        <Text style={styles.title}>Cuentanos, eres:</Text>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Login', { role: 'creador' })}
        >
          <Text style={styles.btnText}>Creador</Text>
        </TouchableOpacity>

        <Text style={styles.or}>o</Text>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Login', { role: 'publico' })}
        >
          <Text style={styles.btnText}>Público</Text>
        </TouchableOpacity>

        <View style={styles.registerRow}>
          <Text style={styles.registerHint}>¿No tienes cuenta aún?{'\n'}Créala es d'una</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AccountType')}>
            <Text style={styles.registerLink}>Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.purple },
  top: {
    height: height * 0.45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    backgroundColor: C.white,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 32,
    paddingTop: 36,
    paddingBottom: 40,
  },
  title: {
    color: C.purple,
    fontSize: 20,
    fontFamily: F.extrabold,
    textAlign: 'center',
    marginBottom: 24,
  },
  btn: {
    backgroundColor: C.purple,
    borderWidth: 2,
    borderColor: C.pink,
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnText: { color: C.white, fontFamily: F.extrabold, fontSize: 17 },
  or: {
    textAlign: 'center',
    color: C.gray,
    fontSize: 14,
    marginBottom: 10,
  },
  registerRow: { marginTop: 32, alignItems: 'center' },
  registerHint: { color: C.gray, fontSize: 13, textAlign: 'center', lineHeight: 20, marginBottom: 8 },
  registerLink: {
    color: C.purple,
    fontFamily: 'Poppins_700Bold',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});
