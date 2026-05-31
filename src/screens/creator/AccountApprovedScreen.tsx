import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, Dimensions,
} from 'react-native';
import { C } from '../../constants';
import { Icons } from '../../constants/icons';

export default function AccountApprovedScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={C.patternBg} />
      <Pattern />
      <View style={styles.content}>
        <Image
          source={Icons.verified}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.title}>¡Cuenta aprobada!</Text>
        <Text style={styles.body}>
          Ya puedes publicar tus eventos y empezar a conecta con tu comunidad.
        </Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Feed')}
        >
          <Text style={styles.btnText}>¡Vamos!</Text>
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
  btn: {
    backgroundColor: C.teal,
    borderRadius: 30, paddingVertical: 15,
    paddingHorizontal: 60, alignItems: 'center',
  },
  btnText: { color: C.white, fontFamily: 'Poppins_800ExtraBold', fontSize: 16 },
});
