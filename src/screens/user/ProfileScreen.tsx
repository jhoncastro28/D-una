import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar,
  ScrollView, Switch, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../../constants';
import BottomNav from '../../components/BottomNav';
import { MOCK_EVENTS } from '../../constants/mockData';
import DunaLogo from '../../components/DunaLogo';
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen({ navigation }: any) {
  const { user, logout, isSaved } = useAuth();
  const [notif, setNotif] = React.useState(true);

  const initials = user
    ? user.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
    : '??';

  const savedEvents = MOCK_EVENTS.filter(ev => isSaved(ev.id));

  const MONTHS_ES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  const now = new Date();
  const joinedLabel = `Miembro desde ${MONTHS_ES[now.getMonth()]} ${now.getFullYear()}`;

  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro que quieres salir?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Salir',
          style: 'destructive',
          onPress: async () => {
            await logout();
            navigation.replace('Onboarding');
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.purple} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>{'<'}</Text>
        </TouchableOpacity>
        <DunaLogo size="small" />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Avatar y datos */}
        <View style={styles.profileSection}>
          <View style={styles.bigAvatar}>
            <Text style={styles.avatarInitials}>{initials}</Text>
          </View>
          <Text style={styles.name}>{user?.name ?? '—'}</Text>
          <Text style={styles.municipality}>📍 {user?.municipality ?? '—'}, Boyacá</Text>
          <Text style={styles.joined}>{joinedLabel}</Text>
          {user?.role === 'creador' && user.brand && (
            <View style={styles.creatorBadge}>
              <Ionicons name="star" size={12} color={C.white} style={{ marginRight: 4 }} />
              <Text style={styles.creatorBadgeText}>{user.brand}</Text>
            </View>
          )}
        </View>

        {/* Estadísticas */}
        <View style={styles.statsRow}>
          <StatBox label="Eventos vistos" value={String(savedEvents.length + 3)} />
          <StatBox label="Guardados" value={String(savedEvents.length)} />
          <StatBox label="Municipio" value={user?.municipality ?? '—'} small />
        </View>

        {/* Eventos guardados */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Eventos guardados</Text>
          {savedEvents.length === 0 ? (
            <Text style={styles.emptyText}>Aún no tienes eventos guardados</Text>
          ) : (
            savedEvents.map(ev => (
              <TouchableOpacity
                key={ev.id}
                style={styles.savedCard}
                onPress={() => navigation.navigate('EventDetail', { event: ev })}
              >
                <View style={[styles.savedDot, { backgroundColor: C.pink }]} />
                <View style={styles.savedInfo}>
                  <Text style={styles.savedTitle} numberOfLines={1}>{ev.title}</Text>
                  <Text style={styles.savedMeta}>{ev.date} · {ev.municipality}</Text>
                </View>
                <Text style={styles.savedArrow}>›</Text>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Configuración */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configuración</Text>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Notificaciones de eventos</Text>
            <Switch
              value={notif}
              onValueChange={setNotif}
              trackColor={{ false: C.gray, true: C.teal }}
              thumbColor={C.white}
            />
          </View>

          <TouchableOpacity style={styles.settingRow}>
            <Text style={styles.settingLabel}>Municipio preferido</Text>
            <Text style={styles.settingValue}>{user?.municipality ?? '—'} ›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingRow}>
            <Text style={styles.settingLabel}>Categorías de interés</Text>
            <Text style={styles.settingValue}>Editar ›</Text>
          </TouchableOpacity>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Cuenta</Text>
            <Text style={styles.settingValue}>
              {user?.role === 'creador' ? 'Creador ✓' : 'Público'}
            </Text>
          </View>
        </View>

        {/* Cerrar sesión */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={18} color={C.white} style={{ marginRight: 8 }} />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>

        <View style={{ height: 20 }} />
      </ScrollView>

      <BottomNav
        active="menu"
        onHome={() => navigation.navigate('Feed')}
        onMessages={() => navigation.navigate('Messages')}
        onMenu={() => {}}
      />
    </View>
  );
}

function StatBox({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <View style={styles.statBox}>
      <Text style={[styles.statValue, small && styles.statValueSmall]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.purple },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingTop: 52, paddingBottom: 16, paddingHorizontal: 24,
  },
  back: { position: 'absolute', left: 24, top: 52 },
  backText: { color: C.white, fontSize: 28, fontFamily: 'Poppins_700Bold' },
  scroll: { paddingBottom: 8 },

  profileSection: { alignItems: 'center', paddingVertical: 24 },
  bigAvatar: {
    width: 84, height: 84, borderRadius: 42,
    backgroundColor: C.white, alignItems: 'center', justifyContent: 'center',
    marginBottom: 12, borderWidth: 3, borderColor: C.pink,
  },
  avatarInitials: { color: C.purple, fontSize: 28, fontFamily: 'Poppins_800ExtraBold' },
  name: { color: C.white, fontSize: 20, fontFamily: 'Poppins_800ExtraBold', marginBottom: 4 },
  municipality: { color: 'rgba(255,255,255,0.75)', fontSize: 13, marginBottom: 4 },
  joined: { color: 'rgba(255,255,255,0.5)', fontSize: 12, marginBottom: 8 },
  creatorBadge: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.teal, borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 4,
  },
  creatorBadgeText: { color: C.white, fontSize: 12, fontFamily: 'Poppins_600SemiBold' },

  statsRow: {
    flexDirection: 'row', justifyContent: 'space-around',
    backgroundColor: 'rgba(255,255,255,0.12)',
    marginHorizontal: 20, borderRadius: 18, paddingVertical: 16, marginBottom: 16,
  },
  statBox: { alignItems: 'center' },
  statValue: { color: C.white, fontSize: 22, fontFamily: 'Poppins_800ExtraBold' },
  statValueSmall: { fontSize: 16 },
  statLabel: { color: 'rgba(255,255,255,0.65)', fontSize: 11, marginTop: 2 },

  section: {
    backgroundColor: C.white, marginHorizontal: 20,
    borderRadius: 18, padding: 18, marginBottom: 14,
  },
  sectionTitle: { color: C.purple, fontSize: 15, fontFamily: 'Poppins_800ExtraBold', marginBottom: 14 },
  emptyText: { color: C.gray, fontSize: 13, textAlign: 'center', paddingVertical: 8 },

  savedCard: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
  },
  savedDot: { width: 10, height: 10, borderRadius: 5, marginRight: 12 },
  savedInfo: { flex: 1 },
  savedTitle: { color: C.textDark, fontSize: 13, fontFamily: 'Poppins_700Bold' },
  savedMeta: { color: C.gray, fontSize: 11, marginTop: 2 },
  savedArrow: { color: C.purple, fontSize: 22 },

  settingRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
  },
  settingLabel: { color: C.textDark, fontSize: 14 },
  settingValue: { color: C.purple, fontSize: 13, fontFamily: 'Poppins_600SemiBold' },

  logoutBtn: {
    marginHorizontal: 20, borderRadius: 30,
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.4)',
    paddingVertical: 14, alignItems: 'center', marginBottom: 8,
    flexDirection: 'row', justifyContent: 'center',
  },
  logoutText: { color: C.white, fontFamily: 'Poppins_700Bold', fontSize: 15 },
});
