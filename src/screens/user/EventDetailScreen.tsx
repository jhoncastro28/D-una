import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar,
  ScrollView, Image, Dimensions,
} from 'react-native';
import { C } from '../../constants';
import { Icons } from '../../constants/icons';
import BottomNav from '../../components/BottomNav';

const { width } = Dimensions.get('window');

export default function EventDetailScreen({ navigation, route }: any) {
  const event = route?.params?.event;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.purple} />

      {/* Header igual al Feed */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.avatarBtn}>
          <View style={styles.avatar} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.greeting}>Hola, Nicolás</Text>
          <Text style={styles.dateText}>Hoy es 19 mayo</Text>
        </View>
        <Image
          source={Icons.search}
          style={styles.searchIcon}
          resizeMode="contain"
        />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Imagen del evento (placeholder) */}
        <View style={styles.eventImage} />

        {/* Info principal */}
        <Text style={styles.title}>{event?.title ?? 'Título del evento'}</Text>

        <View style={styles.metaRow}>
          <Text style={styles.meta}>{event?.date ?? '19 de mayo'}</Text>
          <Text style={styles.metaSpace} />
          <Text style={styles.meta}>{event?.time ?? '8:00PM'}</Text>
        </View>

        <Text style={styles.meta}>
          {event?.location ?? 'Plaza de Bolívar'}; {event?.municipality ?? 'Tunja'}
        </Text>

        <Text style={styles.desc} numberOfLines={3}>
          {event?.description ?? 'Breve descripción...'}
        </Text>

        {/* Card adicional (más info) */}
        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>Información adicional</Text>
          <Text style={styles.infoCardText}>Recuerda llegar 15 minutos antes del evento para hacer check-in.</Text>
          <Text style={styles.infoCardText}>Entrada libre al público general.</Text>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      <BottomNav
        active="home"
        onHome={() => navigation.navigate('Feed')}
        onExplore={() => navigation.navigate('FeedFilter')}
        onMenu={() => navigation.navigate('FeedFilter')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.purple },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 16,
  },
  avatarBtn: { marginRight: 12 },
  avatar: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: C.white,
  },
  headerCenter: { flex: 1 },
  greeting: { color: C.white, fontFamily: 'Poppins_800ExtraBold', fontSize: 15 },
  dateText: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
  searchIcon: { width: 32, height: 32 },
  scroll: { paddingHorizontal: 20, paddingBottom: 12 },
  eventImage: {
    width: '100%',
    height: 180,
    backgroundColor: C.white,
    borderRadius: 18,
    marginBottom: 20,
  },
  title: {
    color: C.white,
    fontSize: 22,
    fontFamily: 'Poppins_900Black',
    marginBottom: 10,
  },
  metaRow: { flexDirection: 'row', marginBottom: 4 },
  meta: { color: 'rgba(255,255,255,0.8)', fontSize: 13 },
  metaSpace: { width: 24 },
  desc: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: C.white,
    borderRadius: 18,
    padding: 18,
    marginTop: 4,
  },
  infoCardTitle: { color: C.purple, fontFamily: 'Poppins_800ExtraBold', fontSize: 14, marginBottom: 8 },
  infoCardText: { color: C.gray, fontSize: 13, lineHeight: 20, marginBottom: 4 },
});
