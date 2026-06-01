import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar,
  ScrollView, Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../../constants';
import { Icons } from '../../constants/icons';
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
  conciertos:        C.pink,
  talleres:          C.teal,
  ferias:            '#f59e0b',
  conferencias:      C.purple,
  eventosculturales: '#3b82f6',
  fiestas:           '#ec4899',
  deportivos:        '#22c55e',
  otros:             C.gray,
};

export default function EventDetailScreen({ navigation, route }: any) {
  const event = route?.params?.event;
  const { user, isSaved, toggleSaved } = useAuth();
  const [imgFailed, setImgFailed] = React.useState(false);

  if (!event) {
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, marginBottom: 20 }}>
          Evento no encontrado
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backCircle}>
          <Ionicons name="arrow-back" size={20} color={C.purple} />
        </TouchableOpacity>
      </View>
    );
  }

  const saved    = isSaved(event.id);
  const greeting = user ? user.name.split(' ')[0] : 'viajero';
  const catImg   = CATEGORY_IMG[event.category];
  const catColor = CATEGORY_COLORS[event.category] ?? C.purple;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.purple} />
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <Image source={Icons.patternPurple} style={StyleSheet.absoluteFill} resizeMode="cover" />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <View style={styles.backCircle}>
            <Ionicons name="arrow-back" size={20} color={C.purple} />
          </View>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.greeting}>Hola, {greeting}</Text>
          <Text style={styles.dateText}>{event?.date ?? 'Próximamente'}</Text>
        </View>
        {user && (
          <TouchableOpacity onPress={() => toggleSaved(event.id)} style={styles.heartBtn}>
            <Ionicons
              name={saved ? 'heart' : 'heart-outline'}
              size={26}
              color={saved ? C.pink : C.white}
            />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Imagen del evento — carga URL real, fallback a ícono de categoría */}
        {event?.image && !imgFailed
          ? <Image
              source={{ uri: event.image }}
              style={styles.eventImage}
              resizeMode="cover"
              onError={() => setImgFailed(true)}
            />
          : catImg
            ? <Image source={catImg} style={styles.eventImage} resizeMode="cover" />
            : <View style={[styles.eventImage, { backgroundColor: catColor }]} />
        }

        {/* Categoría badge */}
        {event?.category && (
          <View style={[styles.catBadge, { backgroundColor: catColor }]}>
            <Text style={styles.catBadgeText}>
              {event.category.replace('eventosculturales', 'Cultural')}
            </Text>
          </View>
        )}

        {/* Info principal */}
        <Text style={styles.title}>{event?.title ?? 'Título del evento'}</Text>

        <View style={styles.metaRow}>
          <Ionicons name="calendar-outline" size={15} color="rgba(255,255,255,0.7)" style={{ marginRight: 6 }} />
          <Text style={styles.meta}>{event?.date ?? '—'}</Text>
          <View style={styles.metaDot} />
          <Ionicons name="time-outline" size={15} color="rgba(255,255,255,0.7)" style={{ marginRight: 6 }} />
          <Text style={styles.meta}>{event?.time ?? '—'}</Text>
        </View>

        <View style={styles.metaRow}>
          <Ionicons name="location-outline" size={15} color="rgba(255,255,255,0.7)" style={{ marginRight: 6 }} />
          <Text style={styles.meta}>
            {event?.location ?? '—'}  ·  {event?.municipality ?? '—'}
          </Text>
        </View>

        <Text style={styles.desc}>
          {event?.description ?? 'Descripción del evento próximamente disponible.'}
        </Text>

        {/* Card adicional */}
        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>Información adicional</Text>
          <Text style={styles.infoCardText}>
            Recuerda llegar 15 minutos antes del evento para hacer check-in.
          </Text>
          <Text style={styles.infoCardText}>Entrada libre al público general.</Text>
        </View>

        {/* Botón Me interesa */}
        {user && (
          <TouchableOpacity
            style={[styles.interesaBtn, saved && styles.interesaBtnActive]}
            onPress={() => toggleSaved(event.id)}
          >
            <Ionicons
              name={saved ? 'heart' : 'heart-outline'}
              size={20}
              color={saved ? C.white : C.pink}
              style={{ marginRight: 8 }}
            />
            <Text style={[styles.interesaBtnText, saved && styles.interesaBtnTextActive]}>
              {saved ? '¡Me interesa!' : 'Me interesa'}
            </Text>
          </TouchableOpacity>
        )}

        {/* Ver en mapa */}
        <TouchableOpacity
          style={styles.mapBtn}
          onPress={() => navigation.navigate('MapScreen')}
        >
          <Ionicons name="map-outline" size={17} color={C.purple} style={{ marginRight: 8 }} />
          <Text style={styles.mapBtnText}>Ver en el mapa</Text>
        </TouchableOpacity>

        <View style={{ height: 20 }} />
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
    paddingHorizontal: 20, paddingTop: 52, paddingBottom: 16,
  },
  backBtn: { marginRight: 12 },
  backCircle: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: C.white,
    alignItems: 'center', justifyContent: 'center',
  },
  headerCenter: { flex: 1 },
  greeting: { color: C.white, fontFamily: 'Poppins_800ExtraBold', fontSize: 15 },
  dateText: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
  heartBtn: { padding: 4 },
  scroll: { paddingHorizontal: 20, paddingBottom: 12 },
  eventImage: {
    width: '100%', height: 200,
    borderRadius: 20, marginBottom: 14,
  },
  catBadge: {
    alignSelf: 'flex-start', borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 5,
    marginBottom: 12,
  },
  catBadgeText: {
    color: C.white, fontSize: 11,
    fontFamily: 'Poppins_700Bold',
    textTransform: 'capitalize',
  },
  title: {
    color: C.white, fontSize: 22,
    fontFamily: 'Poppins_900Black', marginBottom: 10,
  },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  meta: { color: 'rgba(255,255,255,0.8)', fontSize: 13 },
  metaDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.4)', marginHorizontal: 8 },
  desc: {
    color: 'rgba(255,255,255,0.75)', fontSize: 13,
    lineHeight: 21, marginTop: 8, marginBottom: 18,
  },
  infoCard: {
    backgroundColor: C.white, borderRadius: 18, padding: 18, marginBottom: 14,
  },
  infoCardTitle: { color: C.purple, fontFamily: 'Poppins_800ExtraBold', fontSize: 14, marginBottom: 8 },
  infoCardText: { color: C.gray, fontSize: 13, lineHeight: 20, marginBottom: 4 },

  interesaBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: C.white,
    borderRadius: 30, paddingVertical: 15,
    marginBottom: 10,
    borderWidth: 2, borderColor: C.pink,
  },
  interesaBtnActive: { backgroundColor: C.pink, borderColor: C.pink },
  interesaBtnText: { color: C.pink, fontFamily: 'Poppins_800ExtraBold', fontSize: 16 },
  interesaBtnTextActive: { color: C.white },

  mapBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: C.white, borderRadius: 30, paddingVertical: 13,
    borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.3)',
  },
  mapBtnText: { color: C.purple, fontFamily: 'Poppins_600SemiBold', fontSize: 14 },
});
