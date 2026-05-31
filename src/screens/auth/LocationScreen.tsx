import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar,
  Image, Dimensions, ScrollView,
} from 'react-native';
import { C, BOYACA_MUNICIPALITIES } from '../../constants';
import { Icons } from '../../constants/icons';
import DunaLogo from '../../components/DunaLogo';

const { height, width } = Dimensions.get('window');

export default function LocationScreen({ navigation }: any) {
  const [municipality, setMunicipality] = useState('');
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.purple} />

      {/* Purple top */}
      <View style={styles.top}>
        <DunaLogo size="large" />
      </View>

      {/* White card */}
      <View style={styles.card}>
        <Text style={styles.question}>¿En qué municipio te encuentras?</Text>

        {/* Mapa Boyacá simulado */}
        <View style={styles.mapArea}>
          <Image
            source={Icons.location}
            style={styles.pin}
            resizeMode="contain"
          />
          <View style={styles.boyacaShape} />
        </View>

        {/* Picker */}
        <TouchableOpacity style={styles.picker} onPress={() => setOpen(!open)}>
          <Text style={[styles.pickerText, !municipality && styles.placeholder]}>
            {municipality || 'Municipio'}
          </Text>
          <Text style={styles.pickerArrow}>›</Text>
        </TouchableOpacity>

        {open && (
          <View style={styles.dropdown}>
            <ScrollView style={{ maxHeight: 200 }}>
              {BOYACA_MUNICIPALITIES.map(m => (
                <TouchableOpacity
                  key={m}
                  style={styles.dropItem}
                  onPress={() => { setMunicipality(m); setOpen(false); }}
                >
                  <Text style={[styles.dropText, municipality === m && styles.dropActive]}>{m}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <TouchableOpacity
          style={styles.discoverRow}
          onPress={() => navigation.navigate('Loading')}
        >
          <Text style={styles.discoverText}>Descubre D'una</Text>
          <Text style={styles.discoverArrow}> ›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.purple },
  top: {
    height: height * 0.35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    backgroundColor: C.white,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 28,
    paddingTop: 28,
    paddingBottom: 36,
  },
  question: {
    color: C.textDark,
    fontSize: 15,
    fontFamily: 'Poppins_700Bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  mapArea: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  pin: { width: 40, height: 50, position: 'absolute', top: 10, zIndex: 2 },
  boyacaShape: {
    width: width * 0.55,
    height: 120,
    backgroundColor: C.pink,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 40,
    opacity: 0.85,
    transform: [{ rotate: '-10deg' }],
  },
  picker: {
    borderWidth: 1.5,
    borderColor: C.purple,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  pickerText: { fontSize: 15, color: C.textDark },
  placeholder: { color: C.gray },
  pickerArrow: { fontSize: 22, color: C.purple, fontFamily: 'Poppins_700Bold' },
  dropdown: {
    borderWidth: 1.5,
    borderColor: C.purple,
    borderRadius: 16,
    backgroundColor: C.white,
    marginBottom: 12,
    overflow: 'hidden',
  },
  dropItem: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropText: { fontSize: 14, color: C.textDark },
  dropActive: { color: C.purple, fontFamily: 'Poppins_700Bold' },
  discoverRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 16,
  },
  discoverText: { color: C.purple, fontSize: 16, fontFamily: 'Poppins_800ExtraBold' },
  discoverArrow: { color: C.purple, fontSize: 26, fontFamily: 'Poppins_700Bold' },
});
