import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar,
  ScrollView, Alert, ActivityIndicator, RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../../constants';
import { useAuth, CreatorRegistration, RegistrationStatus } from '../../context/AuthContext';
import DunaLogo from '../../components/DunaLogo';

const STATUS_COLORS: Record<RegistrationStatus, string> = {
  pending:  '#f59e0b',
  approved: C.teal,
  rejected: C.pink,
};

const STATUS_LABELS: Record<RegistrationStatus, string> = {
  pending:  'Pendiente',
  approved: 'Aprobado',
  rejected: 'Rechazado',
};

export default function AdminDashboardScreen({ navigation }: any) {
  const { user, logout, getCreatorRegistrations, approveCreator, rejectCreator } = useAuth();
  const [registrations, setRegistrations] = useState<CreatorRegistration[]>([]);
  const [loading, setLoading]             = useState(true);
  const [refreshing, setRefreshing]       = useState(false);
  const [filter, setFilter]               = useState<RegistrationStatus | 'all'>('pending');

  // Guard: solo admin puede estar aquí
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigation.replace('Onboarding');
    }
  }, [user]);

  const load = useCallback(async () => {
    const data = await getCreatorRegistrations();
    data.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
    setRegistrations(data);
  }, [getCreatorRegistrations]);

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, [load]);

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  const handleApprove = (reg: CreatorRegistration) => {
    Alert.alert(
      'Aprobar cuenta',
      `¿Aprobar la cuenta de ${reg.name} (${reg.brand})?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Aprobar',
          onPress: async () => {
            await approveCreator(reg.id);
            await load();
          },
        },
      ],
    );
  };

  const handleReject = (reg: CreatorRegistration) => {
    Alert.alert(
      'Rechazar solicitud',
      `¿Rechazar la solicitud de ${reg.name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Rechazar',
          style: 'destructive',
          onPress: async () => {
            await rejectCreator(reg.id);
            await load();
          },
        },
      ],
    );
  };

  const handleLogout = () => {
    Alert.alert('Cerrar sesión', '¿Salir del panel admin?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Salir', style: 'destructive', onPress: async () => { await logout(); navigation.replace('Onboarding'); } },
    ]);
  };

  const filtered = filter === 'all'
    ? registrations
    : registrations.filter(r => r.status === filter);

  const counts = {
    all:      registrations.length,
    pending:  registrations.filter(r => r.status === 'pending').length,
    approved: registrations.filter(r => r.status === 'approved').length,
    rejected: registrations.filter(r => r.status === 'rejected').length,
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.purple} />

      {/* Header */}
      <View style={styles.header}>
        <DunaLogo size="small" />
        <View style={styles.headerRight}>
          <Text style={styles.adminLabel}>Admin Panel</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
            <Ionicons name="log-out-outline" size={22} color={C.white} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <StatChip label="Total" value={counts.all} color={C.white} onPress={() => setFilter('all')} active={filter === 'all'} />
        <StatChip label="Pendientes" value={counts.pending} color={STATUS_COLORS.pending} onPress={() => setFilter('pending')} active={filter === 'pending'} />
        <StatChip label="Aprobados" value={counts.approved} color={STATUS_COLORS.approved} onPress={() => setFilter('approved')} active={filter === 'approved'} />
        <StatChip label="Rechazados" value={counts.rejected} color={STATUS_COLORS.rejected} onPress={() => setFilter('rejected')} active={filter === 'rejected'} />
      </View>

      {loading ? (
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" color={C.white} />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={C.white} />}
        >
          {filtered.length === 0 && (
            <Text style={styles.empty}>No hay solicitudes {filter !== 'all' ? STATUS_LABELS[filter as RegistrationStatus].toLowerCase() + 's' : ''}</Text>
          )}
          {filtered.map(reg => (
            <View key={reg.id} style={styles.card}>
              <View style={styles.cardTop}>
                <View style={styles.badgesRow}>
                  <View style={[styles.typeBadge, reg.type === 'creador' ? styles.typeBadgeCreador : styles.typeBadgePublico]}>
                    <Ionicons
                      name={reg.type === 'creador' ? 'star-outline' : 'person-outline'}
                      size={10}
                      color={reg.type === 'creador' ? C.purple : C.teal}
                      style={{ marginRight: 3 }}
                    />
                    <Text style={[styles.typeBadgeText, { color: reg.type === 'creador' ? C.purple : C.teal }]}>
                      {reg.type === 'creador' ? 'Creador' : 'Público'}
                    </Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: STATUS_COLORS[reg.status] + '20', borderColor: STATUS_COLORS[reg.status] }]}>
                    <Text style={[styles.statusText, { color: STATUS_COLORS[reg.status] }]}>
                      {STATUS_LABELS[reg.status]}
                    </Text>
                  </View>
                </View>
                <Text style={styles.cardDate}>
                  {new Date(reg.submittedAt).toLocaleDateString('es-CO')}
                </Text>
              </View>

              <Text style={styles.cardName}>{reg.name}</Text>
              {!!reg.brand && <Text style={styles.cardBrand}>{reg.brand}</Text>}

              <View style={styles.cardMeta}>
                <Ionicons name="location-outline" size={13} color={C.gray} />
                <Text style={styles.cardMetaText}>{reg.municipality || '—'}</Text>
                <View style={styles.metaDot} />
                <Ionicons name="mail-outline" size={13} color={C.gray} />
                <Text style={styles.cardMetaText}>{reg.email}</Text>
              </View>

              {reg.orgTypes.length > 0 && (
                <View style={styles.tagsRow}>
                  {reg.orgTypes.map(t => (
                    <View key={t} style={styles.tag}>
                      <Text style={styles.tagText}>{t}</Text>
                    </View>
                  ))}
                </View>
              )}

              {reg.categories.length > 0 && (
                <Text style={styles.catText}>
                  Categorías: {reg.categories.join(', ')}
                </Text>
              )}

              {reg.phone || reg.instagram ? (
                <View style={styles.contactRow}>
                  {!!reg.phone && (
                    <View style={styles.contactItem}>
                      <Ionicons name="call-outline" size={13} color={C.purple} />
                      <Text style={styles.contactText}>{reg.phone}</Text>
                    </View>
                  )}
                  {!!reg.instagram && (
                    <View style={styles.contactItem}>
                      <Ionicons name="logo-instagram" size={13} color={C.purple} />
                      <Text style={styles.contactText}>{reg.instagram}</Text>
                    </View>
                  )}
                </View>
              ) : null}

              {reg.status === 'pending' && (
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={[styles.actionBtn, styles.approveBtn]}
                    onPress={() => handleApprove(reg)}
                  >
                    <Ionicons name="checkmark-circle-outline" size={16} color={C.white} style={{ marginRight: 6 }} />
                    <Text style={styles.approveBtnText}>Aprobar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionBtn, styles.rejectBtn]}
                    onPress={() => handleReject(reg)}
                  >
                    <Ionicons name="close-circle-outline" size={16} color={C.pink} style={{ marginRight: 6 }} />
                    <Text style={styles.rejectBtnText}>Rechazar</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
          <View style={{ height: 30 }} />
        </ScrollView>
      )}
    </View>
  );
}

function StatChip({ label, value, color, onPress, active }: {
  label: string; value: number; color: string;
  onPress: () => void; active: boolean;
}) {
  return (
    <TouchableOpacity
      style={[styles.statChip, active && { backgroundColor: 'rgba(255,255,255,0.2)' }]}
      onPress={onPress}
    >
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.purple },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 52, paddingBottom: 16,
  },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  adminLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12, fontFamily: 'Poppins_600SemiBold' },
  logoutBtn: { padding: 4 },

  statsRow: {
    flexDirection: 'row', justifyContent: 'space-around',
    paddingHorizontal: 12, paddingBottom: 16,
  },
  statChip: {
    alignItems: 'center', paddingHorizontal: 10, paddingVertical: 8,
    borderRadius: 12, minWidth: 72,
  },
  statValue: { fontSize: 20, fontFamily: 'Poppins_800ExtraBold' },
  statLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 10, fontFamily: 'Poppins_600SemiBold', marginTop: 2 },

  loadingWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  list: { paddingHorizontal: 16 },
  empty: { color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginTop: 40, fontSize: 14 },

  card: {
    backgroundColor: C.white, borderRadius: 18,
    padding: 16, marginBottom: 12, elevation: 2,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  badgesRow: { flexDirection: 'row', gap: 6, alignItems: 'center' },
  typeBadge: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1.5, borderRadius: 20,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  typeBadgeCreador: { backgroundColor: C.purple + '12', borderColor: C.purple + '60' },
  typeBadgePublico: { backgroundColor: C.teal + '12', borderColor: C.teal + '60' },
  typeBadgeText: { fontSize: 10, fontFamily: 'Poppins_700Bold' },
  statusBadge: {
    borderWidth: 1.5, borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 3,
  },
  statusText: { fontSize: 11, fontFamily: 'Poppins_700Bold' },
  cardDate: { color: C.gray, fontSize: 11 },

  cardName: { color: C.textDark, fontFamily: 'Poppins_800ExtraBold', fontSize: 15, marginBottom: 2 },
  cardBrand: { color: C.purple, fontFamily: 'Poppins_600SemiBold', fontSize: 13, marginBottom: 8 },

  cardMeta: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 4, marginBottom: 8 },
  cardMetaText: { color: C.gray, fontSize: 12 },
  metaDot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: C.gray },

  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 6 },
  tag: {
    backgroundColor: C.purple + '15', borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 3,
  },
  tagText: { color: C.purple, fontSize: 11, fontFamily: 'Poppins_600SemiBold' },

  catText: { color: C.gray, fontSize: 11, marginBottom: 8 },

  contactRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 8 },
  contactItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  contactText: { color: C.purple, fontSize: 12 },

  actions: { flexDirection: 'row', gap: 10, marginTop: 12 },
  actionBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    borderRadius: 20, paddingVertical: 10,
  },
  approveBtn: { backgroundColor: C.teal },
  approveBtnText: { color: C.white, fontFamily: 'Poppins_700Bold', fontSize: 13 },
  rejectBtn: { borderWidth: 1.5, borderColor: C.pink },
  rejectBtnText: { color: C.pink, fontFamily: 'Poppins_700Bold', fontSize: 13 },
});
