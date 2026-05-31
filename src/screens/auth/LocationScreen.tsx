import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar,
  ScrollView, Dimensions,
} from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { C, BOYACA_MUNICIPALITIES } from '../../constants';
import { BOYACA_REGION, MOCK_EVENTS } from '../../constants/mockData';
import DunaLogo from '../../components/DunaLogo';

const { height } = Dimensions.get('window');

export default function LocationScreen({ navigation }: any) {
  const [municipality, setMunicipality] = useState('');
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.purple} />

      <View style={styles.top}>
        <DunaLogo size="large" />
      </View>

      <View style={styles.card}>
        <Text style={styles.question}>¿En qué municipio te encuentras?</Text>

        {/* Mapa real de Boyacá */}
        <View style={styles.mapWrap}>
          <MapView
            provider={PROVIDER_DEFAULT}
            style={styles.map}
            initialRegion={BOYACA_REGION}
            scrollEnabled={false}
            zoomEnabled={false}
            rotateEnabled={false}
            pitchEnabled={false}
          >
            {MOCK_EVENTS.map(ev => (
              <Marker
                key={ev.id}
                coordinate={{ latitude: ev.lat, longitude: ev.lng }}
                pinColor={C.pink}
              />
            ))}
          </MapView>
        </View>

        {/* Selector de municipio */}
        <TouchableOpacity style={styles.picker} onPress={() => setOpen(!open)}>
          <Text style={[styles.pickerText, !municipality && styles.placeholder]}>
            {municipality || 'Municipio'}
          </Text>
          <Text style={styles.pickerArrow}>›</Text>
        </TouchableOpacity>

        {open && (
          <View style={styles.dropdown}>
            <ScrollView style={{ maxHeight: 200 }} keyboardShouldPersistTaps="handled">
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
    height: height * 0.28,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    color: C.textDark,
    fontSize: 15,
    fontFamily: 'Poppins_700Bold',
    textAlign: 'center',
    marginBottom: 14,
  },
  mapWrap: {
    height: 160,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: C.purple + '30',
  },
  map: { flex: 1 },
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
  pickerText: { fontSize: 15, color: C.textDark, fontFamily: 'Poppins_400Regular' },
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
    paddingHorizontal: 20, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
  },
  dropText: { fontSize: 14, color: C.textDark, fontFamily: 'Poppins_400Regular' },
  dropActive: { color: C.purple, fontFamily: 'Poppins_700Bold' },
  discoverRow: {
    flexDirection: 'row', justifyContent: 'flex-end',
    alignItems: 'center', marginTop: 10,
  },
  discoverText: { color: C.purple, fontSize: 16, fontFamily: 'Poppins_800ExtraBold' },
  discoverArrow: { color: C.purple, fontSize: 26, fontFamily: 'Poppins_700Bold' },
});
