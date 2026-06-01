import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Alert, ImageBackground, Image,
} from 'react-native';
import { C } from '../../constants';
import { Icons } from '../../constants/icons';
import { useAuth } from '../../context/AuthContext';

const ITEMS = [
  { id: 'normas',    text: "Acepto las normas de la comunidad de D'una",        link: 'Ver normas' },
  { id: 'reembolso', text: 'Tengo políticas de reembolso o cancelación claras.', link: '' },
  { id: 'seguridad', text: 'Garantizo la seguridad básica de los asistentes en mis eventos', link: '' },
];

const NORMAS_URL = 'https://duna.app/normas-comunidad';

export default function CreatorStep3Screen({ navigation }: any) {
  const { updateCreatorFormData } = useAuth();
  const [checked, setChecked] = useState<string[]>([]);

  const allChecked = checked.length === ITEMS.length;

  const toggle = (id: string) =>
    setChecked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const handleVerNormas = () => {
    Alert.alert(
      "Normas de la comunidad D'una",
      "• Publica solo eventos reales y verificables.\n• No compartas información falsa o engañosa.\n• Garantiza la seguridad de los asistentes.\n• Respeta las políticas de cancelación y reembolso.\n• Mantén un trato respetuoso con la comunidad.\n\nEl incumplimiento puede resultar en la suspensión de tu cuenta.",
      [{ text: 'Entendido', style: 'default' }]
    );
  };

  const handleNext = () => {
    if (!allChecked) {
      Alert.alert(
        'Debes aceptar todo',
        'Para continuar debes marcar las tres casillas de confianza y seguridad.',
        [{ text: 'OK' }]
      );
      return;
    }
    updateCreatorFormData({ termsAccepted: true });
    navigation.navigate('CreatorStep4');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.purple} />
      <ImageBackground source={Icons.patternPurple} style={styles.pattern} resizeMode="cover" pointerEvents="none" />

      <View style={styles.purpleTop}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <Image source={Icons.arrowBack} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.stepLabel}>Paso 3 de 4</Text>
      </View>

      <ScrollView contentContainerStyle={styles.card}>
        <Text style={styles.title}>Confianza y seguridad</Text>
        <Text style={styles.sub}>Para construir una comunidad segura para todos.</Text>

        {ITEMS.map(item => {
          const active = checked.includes(item.id);
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.item, active && styles.itemActive]}
              onPress={() => toggle(item.id)}
              activeOpacity={0.85}
            >
              <View style={[styles.checkbox, active && styles.checkboxActive]}>
                {active && <Text style={styles.checkIcon}>✓</Text>}
              </View>
              <View style={styles.itemText}>
                <Text style={styles.itemLabel}>{item.text}</Text>
                {!!item.link && (
                  <TouchableOpacity onPress={handleVerNormas}>
                    <Text style={styles.itemLink}>{item.link}</Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          style={[styles.nextRow, !allChecked && styles.nextRowDisabled]}
          onPress={handleNext}
        >
          <Text style={[styles.nextText, !allChecked && styles.nextTextDisabled]}>Siguiente</Text>
          <Text style={[styles.nextArrow, !allChecked && styles.nextTextDisabled]}> ›</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.purple },
  pattern: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  purpleTop: { height: 90, justifyContent: 'flex-end', paddingBottom: 10, paddingHorizontal: 24 },
  back: { position: 'absolute', top: 52, left: 24 },
  backIcon: { width: 28, height: 28 },
  stepLabel: {
    color: 'rgba(255,255,255,0.6)', fontSize: 12,
    textAlign: 'right', fontFamily: 'Poppins_600SemiBold',
  },
  card: {
    backgroundColor: C.white, borderTopLeftRadius: 36, borderTopRightRadius: 36,
    paddingHorizontal: 28, paddingTop: 32, paddingBottom: 50,
  },
  title: { color: C.purple, fontSize: 22, fontFamily: 'Poppins_900Black', marginBottom: 6 },
  sub: { color: C.gray, fontSize: 13, marginBottom: 24 },
  item: {
    flexDirection: 'row', alignItems: 'flex-start',
    backgroundColor: C.purple, borderRadius: 16, padding: 16, marginBottom: 12,
  },
  itemActive: { backgroundColor: C.purple },
  checkbox: {
    width: 22, height: 22, borderRadius: 6, borderWidth: 2,
    borderColor: C.white, marginRight: 14, marginTop: 1,
    alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent',
  },
  checkboxActive: { backgroundColor: C.pink, borderColor: C.pink },
  checkIcon: { color: C.white, fontSize: 12, fontFamily: 'Poppins_900Black' },
  itemText: { flex: 1 },
  itemLabel: { color: C.white, fontSize: 13, lineHeight: 20 },
  itemLink: { color: C.teal, fontSize: 13, fontFamily: 'Poppins_700Bold', marginTop: 3, textDecorationLine: 'underline' },
  nextRow: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 12 },
  nextRowDisabled: { opacity: 0.35 },
  nextText: { color: C.purple, fontSize: 17, fontFamily: 'Poppins_800ExtraBold' },
  nextTextDisabled: { color: C.gray },
  nextArrow: { color: C.purple, fontSize: 28, fontFamily: 'Poppins_700Bold' },
});
