import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  StatusBar, Image, ImageBackground, Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../../constants';
import { Icons } from '../../constants/icons';
import { MOCK_EVENTS, WEEK_DAYS } from '../../constants/mockData';
import BottomNav from '../../components/BottomNav';
import BoyacaMapSVG, { MapPin } from '../../components/BoyacaMapSVG';
import { useAuth } from '../../context/AuthContext';

const { width } = Dimensions.get('window');

const TODAY = new Date();
const MONTHS_ES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
const todayLabel = `${TODAY.getDate()} de ${MONTHS_ES[TODAY.getMonth()]}`;

const CATEGORY_IMG: Record<string, any> = {
  conciertos:       Icons.catConciertos,
  talleres:         Icons.catTalleres,
  ferias:           Icons.catFerias,
  conferencias:     Icons.catConferencias,
  eventosculturales:Icons.catEventos,
  fiestas:          Icons.catFiestas,
  deportivos:       Icons.catDeportivos,
  otros:            Icons.catOtros,
};

const CATEGORY_COLORS: Record<string, string> = {
  conciertos:        C.pink,
  talleres:          C.teal,
  ferias:            '#f59e0b',
  conferencias:      C.purple,
  eventosculturales: '#3b82f6',
  fiestas:           '#ec4899',
  deportivos:        '#22c55e',
  otros:             C.gray,
};

export default function FeedScreen({ navigation }: any) {
  const { user, isSaved } = useAuth();
  const [activeDay, setActiveDay] = useState(0);

  const greeting   = user ? user.name.split(' ')[0] : 'viajero';
  const municipality = user?.municipality ?? 'Tunja';
  const initials = user ? user.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() : '?';

  const localEvents = useMemo(
    () => MOCK_EVENTS.filter(e => e.municipality === municipality),
    [municipality],
  );

  // Build map pins for the SVG
  const mapPins: MapPin[] = useMemo(() =>
    localEvents.slice(0, 4).map((ev, i) => ({
      id: ev.id,
      lat: ev.lat,
      lng: ev.lng,
      label: ev.location,
      sublabel: ev.category.replace('eventosculturales', 'Cultural'),
      side: i % 2 === 0 ? 'right' : 'left',
    })),
    [localEvents],
  );

  const mapW = width - 68;  // inside card (20 margin each side + 14 padding each side)

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.purple} />

      {/* Background pattern on the purple top section */}
      <ImageBackground
        source={Icons.patternPurple}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        pointerEvents="none"
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.greeting}>Hola, {greeting}</Text>
            <Text style={styles.dateText}>Hoy es {todayLabel}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('FeedFilter')}>
            <Ionicons name="search" size={26} color={C.white} />
          </TouchableOpacity>
        </View>

        <Text style={styles.mainTitle}>¿Qué plan estás{'\n'}buscando hoy?</Text>

        {/* D'una banner (Patron 3) */}
        <View style={styles.bannerWrap}>
          <Image source={Icons.patternBanner} style={styles.bannerImg} resizeMode="cover" />
        </View>

        {/* Carrusel de días */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dayRow}>
          {WEEK_DAYS.map((d, i) => (
            <TouchableOpacity
              key={`day-${d.day}`}
              style={[styles.dayBtn, i === activeDay && styles.dayBtnActive]}
              onPress={() => setActiveDay(i)}
            >
              <Text style={[styles.dayLabel, i === activeDay && styles.dayLabelActive]}>{d.day}</Text>
              <Text style={[styles.dayNum, i === activeDay && styles.dayNumActive]}>{d.num}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.nearText}>Estos son los eventos que{'\n'}tenemos cerca de ti!</Text>

        {/* Mapa SVG Boyacá */}
        <View style={styles.mapCard}>
          <Text style={styles.mapCity}>{municipality}</Text>
          <View style={[styles.mapBg, { height: mapW * 0.85 }]}>
            <BoyacaMapSVG
              width={mapW}
              height={mapW * 0.85}
              fillColor="rgba(148,80,240,0.6)"
              bgColor="transparent"
              strokeColor="rgba(200,140,255,0.8)"
              showPins={mapPins.length > 0}
              pins={mapPins}
            />
          </View>
          <TouchableOpacity
            style={styles.mapFullBtn}
            onPress={() => navigation.navigate('MapScreen')}
          >
            <Ionicons name="map-outline" size={13} color={C.purple} style={{ marginRight: 4 }} />
            <Text style={styles.mapFullBtnText}>Ver mapa completo</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de eventos */}
        {MOCK_EVENTS.map(ev => {
          const catImg = CATEGORY_IMG[ev.category];
          const catColor = CATEGORY_COLORS[ev.category] ?? C.purple;
          return (
            <TouchableOpacity
              key={ev.id}
              style={styles.eventCard}
              onPress={() => navigation.navigate('EventDetail', { event: ev })}
            >
              {catImg
                ? <Image source={catImg} style={styles.eventThumb} resizeMode="cover" />
                : <View style={[styles.eventThumb, { backgroundColor: catColor }]} />
              }
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle} numberOfLines={1}>{ev.title}</Text>
                <Text style={styles.eventMeta}>{ev.date}  ·  {ev.time}</Text>
                <Text style={styles.eventMeta}>{ev.location} · {ev.municipality}</Text>
              </View>
              {isSaved(ev.id) && (
                <View style={styles.savedBadge}>
                  <Ionicons name="heart" size={14} color={C.pink} />
                </View>
              )}
            </TouchableOpacity>
          );
        })}

        <View style={{ height: 20 }} />
      </ScrollView>

      <BottomNav
        active="home"
        onHome={() => {}}
        onMap={() => navigation.navigate('MapScreen')}
        onMenu={() => navigation.navigate('Profile')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.purple },
  scroll: { paddingBottom: 8 },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 52, paddingBottom: 16,
  },
  avatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: C.white, marginRight: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: C.purple, fontFamily: 'Poppins_800ExtraBold', fontSize: 15 },
  headerCenter: { flex: 1 },
  greeting: { color: C.white, fontFamily: 'Poppins_800ExtraBold', fontSize: 15 },
  dateText: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
  mainTitle: {
    color: C.white, fontSize: 26, fontFamily: 'Poppins_900Black',
    paddingHorizontal: 20, lineHeight: 34, marginBottom: 14,
  },
  bannerWrap: {
    marginHorizontal: 20, borderRadius: 10,
    overflow: 'hidden', marginBottom: 16, height: 44,
  },
  bannerImg: { width: '100%', height: 44 },
  dayRow: { paddingHorizontal: 20, paddingBottom: 16, gap: 8 },
  dayBtn: {
    alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10,
    borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.15)', minWidth: 52,
  },
  dayBtnActive: { backgroundColor: C.white },
  dayLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 10, fontFamily: 'Poppins_600SemiBold' },
  dayLabelActive: { color: C.purple },
  dayNum: { color: C.white, fontSize: 18, fontFamily: 'Poppins_800ExtraBold' },
  dayNumActive: { color: C.purple },
  nearText: {
    color: 'rgba(255,255,255,0.85)', fontSize: 13,
    paddingHorizontal: 20, marginBottom: 14, lineHeight: 20,
  },
  mapCard: {
    backgroundColor: C.white, marginHorizontal: 20,
    borderRadius: 18, padding: 14, marginBottom: 16,
  },
  mapCity: { color: C.pink, fontSize: 18, fontFamily: 'Poppins_900Black', marginBottom: 10 },
  mapBg: {
    borderRadius: 14, overflow: 'hidden',
    backgroundColor: '#2d0080',
    alignItems: 'center', justifyContent: 'center',
  },
  mapFullBtn: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'flex-end', marginTop: 8,
  },
  mapFullBtnText: { color: C.purple, fontSize: 11, fontFamily: 'Poppins_600SemiBold' },
  eventCard: {
    flexDirection: 'row', backgroundColor: C.white,
    marginHorizontal: 20, borderRadius: 16, marginBottom: 12,
    overflow: 'hidden', elevation: 2, alignItems: 'center',
  },
  eventThumb: { width: 90, height: 90 },
  eventInfo: { flex: 1, padding: 12 },
  eventTitle: { color: C.textDark, fontFamily: 'Poppins_800ExtraBold', fontSize: 13, marginBottom: 4 },
  eventMeta: { color: C.gray, fontSize: 11, marginBottom: 2 },
  savedBadge: { paddingRight: 14 },
});
