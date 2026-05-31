import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  StatusBar, Image, Dimensions,
} from 'react-native';
import { C } from '../../constants';
import { Icons } from '../../constants/icons';
import { MOCK_EVENTS, WEEK_DAYS } from '../../constants/mockData';
import BottomNav from '../../components/BottomNav';

const { width } = Dimensions.get('window');
const TODAY_INDEX = 1; // MAR 7

export default function FeedScreen({ navigation }: any) {
  const [activeDay, setActiveDay] = useState(TODAY_INDEX);
  const tunjEvents = MOCK_EVENTS.filter(e => e.municipality === 'Tunja');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.purple} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatar} />
          <View style={styles.headerCenter}>
            <Text style={styles.greeting}>Hola, Nicolás</Text>
            <Text style={styles.dateText}>Hoy es 19 mayo</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('FeedFilter')}>
            <Image
              source={Icons.search}
              style={styles.searchIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={styles.mainTitle}>¿Qué plan estás{'\n'}buscando hoy?</Text>

        {/* D'una pink banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerText}>D'una</Text>
        </View>

        {/* Day carousel */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dayRow}
        >
          {WEEK_DAYS.map((d, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.dayBtn, i === activeDay && styles.dayBtnActive]}
              onPress={() => setActiveDay(i)}
            >
              <Text style={[styles.dayLabel, i === activeDay && styles.dayLabelActive]}>
                {d.day}
              </Text>
              <Text style={[styles.dayNum, i === activeDay && styles.dayNumActive]}>
                {d.num}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.nearText}>Estos son los eventos que{'\n'}tenemos cerca de ti!</Text>

        {/* Mini mapa de Tunja */}
        <View style={styles.mapCard}>
          <Text style={styles.mapCity}>Tunja</Text>
          <View style={styles.mapArea}>
            <View style={styles.tunjaSilhouette} />
            {tunjEvents.map(ev => (
              <TouchableOpacity
                key={ev.id}
                style={[styles.mapDot, {
                  left: ev.mapX * (width - 80),
                  top: ev.mapY * 110,
                }]}
                onPress={() => navigation.navigate('EventDetail', { event: ev })}
              >
                <View style={styles.dot} />
                <Text style={styles.dotLabel}>{ev.location}{'\n'}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Lista de eventos */}
        {MOCK_EVENTS.map(ev => (
          <TouchableOpacity
            key={ev.id}
            style={styles.eventCard}
            onPress={() => navigation.navigate('EventDetail', { event: ev })}
          >
            <View style={styles.eventImageBox} />
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle} numberOfLines={1}>{ev.title}</Text>
              <Text style={styles.eventMeta}>{ev.date}    {ev.time}</Text>
              <Text style={styles.eventMeta}>{ev.location}; {ev.municipality}</Text>
              <Text style={styles.eventDesc} numberOfLines={1}>
                {ev.description.slice(0, 60)}...
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 20 }} />
      </ScrollView>

      <BottomNav
        active="home"
        onHome={() => {}}
        onExplore={() => navigation.navigate('FeedFilter')}
        onMenu={() => navigation.navigate('FeedFilter')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.purple },
  scroll: { paddingBottom: 8 },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 16,
  },
  avatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: C.white, marginRight: 12,
  },
  headerCenter: { flex: 1 },
  greeting: { color: C.white, fontFamily: 'Poppins_800ExtraBold', fontSize: 15 },
  dateText: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
  searchIcon: { width: 32, height: 32 },

  // Title
  mainTitle: {
    color: C.white,
    fontSize: 26,
    fontFamily: 'Poppins_900Black',
    paddingHorizontal: 20,
    lineHeight: 34,
    marginBottom: 14,
  },

  // Banner
  banner: {
    backgroundColor: C.pink,
    marginHorizontal: 20,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  bannerText: { color: C.white, fontFamily: 'Poppins_900Black', fontSize: 20, letterSpacing: 2 },

  // Days
  dayRow: { paddingHorizontal: 20, paddingBottom: 16, gap: 8 },
  dayBtn: {
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    minWidth: 52,
  },
  dayBtnActive: { backgroundColor: C.white },
  dayLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 10, fontFamily: 'Poppins_600SemiBold' },
  dayLabelActive: { color: C.purple },
  dayNum: { color: C.white, fontSize: 18, fontFamily: 'Poppins_800ExtraBold' },
  dayNumActive: { color: C.purple },

  nearText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    paddingHorizontal: 20,
    marginBottom: 14,
    lineHeight: 20,
  },

  // Mini mapa
  mapCard: {
    backgroundColor: C.white,
    marginHorizontal: 20,
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  mapCity: { color: C.pink, fontSize: 18, fontFamily: 'Poppins_900Black', marginBottom: 8 },
  mapArea: { height: 140, position: 'relative' },
  tunjaSilhouette: {
    position: 'absolute',
    left: '15%', top: '10%',
    width: '70%', height: '75%',
    backgroundColor: C.pink,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 80,
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 30,
    opacity: 0.2,
    transform: [{ rotate: '-5deg' }],
  },
  mapDot: { position: 'absolute', alignItems: 'center' },
  dot: {
    width: 10, height: 10, borderRadius: 5,
    backgroundColor: C.pink, borderWidth: 2, borderColor: C.white,
  },
  dotLabel: {
    fontSize: 8, color: C.purple, fontFamily: 'Poppins_700Bold',
    marginTop: 2, textAlign: 'center',
  },

  // Event cards
  eventCard: {
    flexDirection: 'row',
    backgroundColor: C.white,
    marginHorizontal: 20,
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  eventImageBox: { width: 90, height: 90, backgroundColor: C.purple + '40' },
  eventInfo: { flex: 1, padding: 12 },
  eventTitle: { color: C.textDark, fontFamily: 'Poppins_800ExtraBold', fontSize: 13, marginBottom: 4 },
  eventMeta: { color: C.gray, fontSize: 11, marginBottom: 2 },
  eventDesc: { color: C.gray, fontSize: 11, marginTop: 4 },
});
