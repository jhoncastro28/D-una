import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar,
  ScrollView, Dimensions, Image, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C, BOYACA_MUNICIPALITIES } from '../../constants';
import { Icons } from '../../constants/icons';
import DunaLogo from '../../components/DunaLogo';

const { height, width } = Dimensions.get('window');
const MAP_SIZE = width - 80;

export default function LocationScreen({ navigation }: any) {
  const [municipality, setMunicipality] = useState('');
  const [open, setOpen] = useState(false);

  const handleContinue = () => {
    if (!municipality) {
      Alert.alert('Selecciona tu municipio', 'Elige el municipio de Boyacá donde te encuentras.');
      return;
    }
    navigation.navigate('RegisterPublic', { municipality });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.purple} />
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <Image source={Icons.patternPurple} style={StyleSheet.absoluteFill} resizeMode="cover" />
      </View>

      {/* Purple top — logo abajo-izquierda */}
      <View style={styles.top}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <Image source={Icons.arrowBack} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>
        <DunaLogo size="medium" />
      </View>

      {/* White card */}
      <View style={styles.card}>
        <Text style={styles.question}>¿En qué municipio te encuentras?</Text>

        {/* Mapa + pin / etiqueta */}
        <View style={styles.mapContainer}>
          {!municipality && (
            <Image
              source={Icons.locationPin}
              style={styles.pinAbove}
              resizeMode="contain"
            />
          )}
          <Image
            source={Icons.mapaBoyaca}
            style={{ width: MAP_SIZE, height: MAP_SIZE * 0.9 }}
            resizeMode="contain"
          />
          {!!municipality && (
            <View style={styles.muniLabel}>
              <Ionicons name="location" size={14} color={C.pink} />
              <Text style={styles.muniLabelText}>{municipality}</Text>
            </View>
          )}
        </View>

        {/* Selector de municipio */}
        <TouchableOpacity style={styles.picker} onPress={() => setOpen(o => !o)}>
          <Text style={[styles.pickerText, !municipality && styles.placeholder]}>
            {municipality || 'Municipio'}
          </Text>
          <View style={styles.pickerArrow}>
            <Ionicons name="chevron-forward" size={18} color={C.white} />
          </View>
        </TouchableOpacity>

        {open && (
          <View style={styles.dropdown}>
            <ScrollView style={{ maxHeight: 200 }} keyboardShouldPersistTaps="handled" nestedScrollEnabled>
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

        <TouchableOpacity style={styles.discoverRow} onPress={handleContinue}>
          <Text style={[styles.discoverText, !municipality && styles.discoverDisabled]}>
            Descubre D'una
          </Text>
          <Ionicons
            name="chevron-forward"
            size={22}
            color={municipality ? C.purple : C.gray}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.purple },

  top: {
    height: height * 0.22,
    justifyContent: 'flex-end',
    paddingLeft: 24,
    paddingBottom: 18,
  },
  back: { position: 'absolute', top: 52, left: 24 },
  backIcon: { width: 28, height: 28 },

  card: {
    flex: 1,
    backgroundColor: C.white,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 32,
  },
  question: {
    color: C.textDark, fontSize: 15,
    fontFamily: 'Poppins_700Bold',
    textAlign: 'center', marginBottom: 8,
  },

  mapContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  pinAbove: {
    width: 56, height: 56,
    marginBottom: 2,
  },
  muniLabel: {
    flexDirection: 'row', alignItems: 'center',
    marginTop: 8,
    backgroundColor: C.white, borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 4,
    elevation: 3,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12, shadowRadius: 4,
  },
  muniLabelText: {
    color: C.pink, fontFamily: 'Poppins_700Bold',
    fontSize: 13, marginLeft: 4,
  },

  picker: {
    borderWidth: 1.5, borderColor: C.purple, borderRadius: 30,
    paddingHorizontal: 20, paddingVertical: 14,
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 8,
    backgroundColor: C.purple,
  },
  pickerText: { fontSize: 15, color: C.white, fontFamily: 'Poppins_400Regular' },
  placeholder: { color: 'rgba(255,255,255,0.55)' },
  pickerArrow: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },

  dropdown: {
    borderWidth: 1.5, borderColor: C.purple, borderRadius: 16,
    backgroundColor: C.white, marginBottom: 12, overflow: 'hidden',
  },
  dropItem: {
    paddingHorizontal: 20, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
  },
  dropText: { fontSize: 14, color: C.textDark, fontFamily: 'Poppins_400Regular' },
  dropActive: { color: C.purple, fontFamily: 'Poppins_700Bold' },

  discoverRow: {
    flexDirection: 'row', justifyContent: 'flex-end',
    alignItems: 'center', marginTop: 10,
  },
  discoverText: {
    color: C.purple, fontSize: 16,
    fontFamily: 'Poppins_800ExtraBold', marginRight: 4,
  },
  discoverDisabled: { color: C.gray },
});
