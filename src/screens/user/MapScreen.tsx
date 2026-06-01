import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, ImageBackground, Platform,
} from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../../constants';
import { MOCK_EVENTS, BOYACA_REGION } from '../../constants/mockData';
import BottomNav from '../../components/BottomNav';
import { Icons } from '../../constants/icons';
import { useAuth } from '../../context/AuthContext';

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

export default function MapScreen({ navigation }: any) {
  const { isSaved, userEvents } = useAuth();
  const [selected, setSelected] = useState<string | null>(null);
  const allEvents = [...MOCK_EVENTS, ...userEvents];
  const selectedEvent = allEvents.find(e => e.id === selected);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.purple} />
      <ImageBackground source={Icons.patternPurple} style={styles.headerPattern} resizeMode="cover" pointerEvents="none" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Image source={Icons.arrowBack} style={{ width: 26, height: 26 }} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Eventos en Boyacá</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Google Maps */}
      <View style={styles.mapWrap}>
        <MapView
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
          style={styles.map}
          initialRegion={BOYACA_REGION}
        >
          {allEvents.map(ev => (
            <Marker
              key={ev.id}
              coordinate={{ latitude: ev.lat, longitude: ev.lng }}
              pinColor={isSaved(ev.id) ? C.teal : (CATEGORY_COLORS[ev.category] ?? C.pink)}
              onPress={() => setSelected(ev.id)}
            >
              <Callout onPress={() => navigation.navigate('EventDetail', { event: ev })}>
                <View style={styles.callout}>
                  <Text style={styles.calloutTitle}>{ev.title}</Text>
                  <Text style={styles.calloutMeta}>{ev.location} · {ev.time}</Text>
                  <Text style={styles.calloutLink}>Ver detalle →</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      </View>

      {/* Bottom card for selected event */}
      {selectedEvent && (
        <TouchableOpacity
          style={styles.eventCard}
          onPress={() => navigation.navigate('EventDetail', { event: selectedEvent })}
        >
          <View style={[styles.catDot, { backgroundColor: CATEGORY_COLORS[selectedEvent.category] ?? C.pink }]} />
          <View style={styles.eventInfo}>
            <Text style={styles.eventTitle} numberOfLines={1}>{selectedEvent.title}</Text>
            <Text style={styles.eventMeta}>{selectedEvent.date}  ·  {selectedEvent.time}</Text>
            <Text style={styles.eventMeta}>{selectedEvent.location} · {selectedEvent.municipality}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={C.purple} />
        </TouchableOpacity>
      )}

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
  headerPattern: { position: 'absolute', top: 0, left: 0, right: 0, height: 120 },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingTop: 52, paddingBottom: 12,
  },
  backBtn: { padding: 4, marginRight: 8 },
  headerTitle: { flex: 1, color: C.white, fontFamily: 'Poppins_800ExtraBold', fontSize: 17, textAlign: 'center' },
  mapWrap: { flex: 1 },
  map: { flex: 1 },
  callout: { padding: 8, minWidth: 160, maxWidth: 220 },
  calloutTitle: { color: C.purple, fontFamily: 'Poppins_700Bold', fontSize: 13, marginBottom: 4 },
  calloutMeta: { color: C.gray, fontSize: 11 },
  calloutLink: { color: C.teal, fontSize: 11, fontFamily: 'Poppins_600SemiBold', marginTop: 4 },
  eventCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.white, margin: 16, borderRadius: 16,
    padding: 14, elevation: 4,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12, shadowRadius: 6,
  },
  catDot: { width: 12, height: 12, borderRadius: 6, marginRight: 12 },
  eventInfo: { flex: 1 },
  eventTitle: { color: C.textDark, fontFamily: 'Poppins_800ExtraBold', fontSize: 14, marginBottom: 2 },
  eventMeta: { color: C.gray, fontSize: 11 },
});
