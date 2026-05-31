import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar,
  ScrollView, TextInput,
} from 'react-native';
import { C, BOYACA_MUNICIPALITIES } from '../../constants';
import { MOCK_EVENTS } from '../../constants/mockData';
import BottomNav from '../../components/BottomNav';

const THUMB_COLORS = [C.teal, C.pink, C.purple + 'AA', C.teal + 'BB', C.pink + 'BB', C.purple + '77'];

export default function FeedFilterScreen({ navigation }: any) {
  const [municipality, setMunicipality] = useState('');
  const [category, setCategory] = useState('');
  const [openMuni, setOpenMuni] = useState(false);

  const filtered = MOCK_EVENTS.filter(ev => {
    const matchM = !municipality || ev.municipality === municipality;
    const matchC = !category || ev.category.includes(category.toLowerCase());
    return matchM && matchC;
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.purple} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View style={styles.avatar} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filtro de Feed</Text>
      </View>

      {/* Filtros */}
      <View style={styles.filters}>
        <TouchableOpacity style={styles.filterInput} onPress={() => setOpenMuni(!openMuni)}>
          <Text style={[styles.filterText, !municipality && styles.filterPlaceholder]}>
            {municipality || 'Municipio'}
          </Text>
        </TouchableOpacity>

        {openMuni && (
          <View style={styles.dropdown}>
            <ScrollView style={{ maxHeight: 160 }}>
              <TouchableOpacity style={styles.dropItem} onPress={() => { setMunicipality(''); setOpenMuni(false); }}>
                <Text style={styles.dropText}>Todos los municipios</Text>
              </TouchableOpacity>
              {BOYACA_MUNICIPALITIES.map(m => (
                <TouchableOpacity
                  key={m}
                  style={styles.dropItem}
                  onPress={() => { setMunicipality(m); setOpenMuni(false); }}
                >
                  <Text style={[styles.dropText, municipality === m && styles.dropActive]}>{m}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <TextInput
          style={styles.filterInput}
          value={category}
          onChangeText={setCategory}
          placeholder="Categoría"
          placeholderTextColor="rgba(110,16,247,0.45)"
          returnKeyType="search"
        />
      </View>

      {/* Lista */}
      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {filtered.length === 0 && (
          <Text style={styles.empty}>No hay eventos para estos filtros</Text>
        )}
        {filtered.map((ev, i) => (
          <TouchableOpacity
            key={ev.id}
            style={styles.card}
            onPress={() => navigation.navigate('EventDetail', { event: ev })}
          >
            <View style={[styles.thumb, { backgroundColor: THUMB_COLORS[i % THUMB_COLORS.length] }]} />
            <View style={styles.cardInfo}>
              <Text style={styles.cardTime}>{ev.time}</Text>
              <Text style={styles.cardLocation}>{ev.location}</Text>
              <Text style={styles.cardTitle} numberOfLines={1}>{ev.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <View style={{ height: 12 }} />
      </ScrollView>

      <BottomNav
        active="explore"
        onHome={() => navigation.navigate('Feed')}
        onExplore={() => {}}
        onMenu={() => navigation.navigate('Profile')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.purple },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 52, paddingBottom: 18,
  },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: C.white, marginRight: 14 },
  headerTitle: { color: C.white, fontFamily: 'Poppins_800ExtraBold', fontSize: 18 },
  filters: { paddingHorizontal: 20, marginBottom: 6 },
  filterInput: {
    backgroundColor: C.white,
    borderWidth: 2, borderColor: C.pink,
    borderRadius: 30,
    paddingHorizontal: 20, paddingVertical: 13,
    marginBottom: 10,
    fontSize: 15,
    color: C.textDark,
    fontFamily: 'Poppins_400Regular',
  },
  filterText: { fontSize: 15, color: C.textDark, fontFamily: 'Poppins_400Regular' },
  filterPlaceholder: { color: 'rgba(110,16,247,0.45)' },
  dropdown: {
    backgroundColor: C.white, borderRadius: 14,
    borderWidth: 1.5, borderColor: C.pink,
    marginBottom: 8, overflow: 'hidden',
  },
  dropItem: {
    paddingHorizontal: 20, paddingVertical: 11,
    borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
  },
  dropText: { fontSize: 14, color: C.textDark },
  dropActive: { color: C.purple, fontFamily: 'Poppins_700Bold' },
  list: { paddingHorizontal: 20 },
  empty: { color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginTop: 40, fontSize: 14 },
  card: {
    flexDirection: 'row', backgroundColor: C.white,
    borderRadius: 16, marginBottom: 12, overflow: 'hidden', elevation: 2,
  },
  thumb: { width: 80, height: 80 },
  cardInfo: { flex: 1, padding: 14, justifyContent: 'center' },
  cardTime: { color: C.textDark, fontFamily: 'Poppins_800ExtraBold', fontSize: 14 },
  cardLocation: { color: C.gray, fontSize: 12, marginTop: 2 },
  cardTitle: { color: C.gray, fontSize: 11, marginTop: 4 },
});
