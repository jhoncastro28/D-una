import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar,
  ScrollView, Image, ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C, BOYACA_MUNICIPALITIES, CREATOR_CATEGORIES } from '../../constants';
import { Icons } from '../../constants/icons';
import { MOCK_EVENTS } from '../../constants/mockData';
import BottomNav from '../../components/BottomNav';
import { useAuth } from '../../context/AuthContext';

const CATEGORY_IMG: Record<string, any> = {
  conciertos:        Icons.catConciertos,
  talleres:          Icons.catTalleres,
  ferias:            Icons.catFerias,
  conferencias:      Icons.catConferencias,
  eventosculturales: Icons.catEventos,
  fiestas:           Icons.catFiestas,
  deportivos:        Icons.catDeportivos,
  otros:             Icons.catOtros,
};
const CATEGORY_COLORS: Record<string, string> = {
  conciertos: C.pink, talleres: C.teal, ferias: '#f59e0b',
  conferencias: C.purple, eventosculturales: '#3b82f6',
  fiestas: '#ec4899', deportivos: '#22c55e', otros: C.gray,
};

function EventThumb({ ev }: { ev: any }) {
  const [failed, setFailed] = useState(false);
  const catImg   = CATEGORY_IMG[ev.category];
  const catColor = CATEGORY_COLORS[ev.category] ?? C.purple;
  if (ev.image && !failed)
    return <Image source={{ uri: ev.image }} style={styles.thumb} resizeMode="cover" onError={() => setFailed(true)} />;
  if (catImg) return <Image source={catImg} style={styles.thumb} resizeMode="cover" />;
  return <View style={[styles.thumb, { backgroundColor: catColor }]} />;
}

export default function FeedFilterScreen({ navigation }: any) {
  const { user, userEvents } = useAuth();
  const [municipality, setMunicipality] = useState('');
  const [category, setCategory]         = useState('');
  const [openMuni, setOpenMuni]         = useState(false);
  const [openCat, setOpenCat]           = useState(false);

  const initials = user
    ? user.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
    : '?';

  const allEvents = useMemo(() => [...MOCK_EVENTS, ...userEvents], [userEvents]);

  const filtered = allEvents.filter(ev => {
    const matchM = !municipality || ev.municipality === municipality;
    const matchC = !category || ev.category === category;
    return matchM && matchC;
  });

  const selectedCatLabel = CREATOR_CATEGORIES.find(c => c.id === category)?.label ?? 'Categoría';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.purple} />
      <ImageBackground source={Icons.patternPurple} style={StyleSheet.absoluteFill} resizeMode="cover" pointerEvents="none" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filtro de Feed</Text>
      </View>

      {/* Filtros */}
      <View style={styles.filters}>
        {/* Municipio */}
        <TouchableOpacity style={styles.filterBtn} onPress={() => { setOpenMuni(o => !o); setOpenCat(false); }}>
          <Text style={[styles.filterText, !municipality && styles.filterPlaceholder]}>
            {municipality || 'Municipio'}
          </Text>
          <Ionicons name={openMuni ? 'chevron-up' : 'chevron-down'} size={18} color={C.purple} />
        </TouchableOpacity>
        {openMuni && (
          <View style={styles.dropdown}>
            <ScrollView style={{ maxHeight: 160 }} nestedScrollEnabled>
              <TouchableOpacity style={styles.dropItem} onPress={() => { setMunicipality(''); setOpenMuni(false); }}>
                <Text style={[styles.dropText, !municipality && styles.dropActive]}>Todos los municipios</Text>
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

        {/* Categoría */}
        <TouchableOpacity style={styles.filterBtn} onPress={() => { setOpenCat(o => !o); setOpenMuni(false); }}>
          <Text style={[styles.filterText, !category && styles.filterPlaceholder]}>
            {category ? selectedCatLabel : 'Categoría'}
          </Text>
          <Ionicons name={openCat ? 'chevron-up' : 'chevron-down'} size={18} color={C.purple} />
        </TouchableOpacity>
        {openCat && (
          <View style={styles.dropdown}>
            <ScrollView style={{ maxHeight: 200 }} nestedScrollEnabled>
              <TouchableOpacity style={styles.dropItem} onPress={() => { setCategory(''); setOpenCat(false); }}>
                <Text style={[styles.dropText, !category && styles.dropActive]}>Todas las categorías</Text>
              </TouchableOpacity>
              {CREATOR_CATEGORIES.map(cat => (
                <TouchableOpacity
                  key={cat.id}
                  style={styles.dropItem}
                  onPress={() => { setCategory(cat.id); setOpenCat(false); }}
                >
                  <Text style={[styles.dropText, category === cat.id && styles.dropActive]}>{cat.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
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
            <EventThumb ev={ev} />
            <View style={styles.cardInfo}>
              <Text style={styles.cardTime}>{ev.time}</Text>
              <Text style={styles.cardLocation}>{ev.location} · {ev.municipality}</Text>
              <Text style={styles.cardTitle} numberOfLines={1}>{ev.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <View style={{ height: 12 }} />
      </ScrollView>

      <BottomNav
        active="home"
        onHome={() => navigation.navigate('Feed')}
        onMessages={() => navigation.navigate('Messages')}
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
  avatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: C.white, marginRight: 14,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: C.purple, fontFamily: 'Poppins_800ExtraBold', fontSize: 15 },
  headerTitle: { color: C.white, fontFamily: 'Poppins_800ExtraBold', fontSize: 18 },
  filters: { paddingHorizontal: 20, marginBottom: 6 },
  filterBtn: {
    backgroundColor: C.white,
    borderWidth: 2, borderColor: C.pink,
    borderRadius: 30,
    paddingHorizontal: 20, paddingVertical: 13,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
