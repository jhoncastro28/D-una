import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView,
} from 'react-native';
import { C } from '../../constants';

const ITEMS = [
  { id: 'normas',    text: "Acepto las normas de la comunidad de D'una",        link: 'Ver normas' },
  { id: 'reembolso', text: 'Tengo políticas de reembolso o cancelación claras.', link: '' },
  { id: 'seguridad', text: 'Garantizo la seguridad básica de los asistentes en mis eventos', link: '' },
];

export default function CreatorStep3Screen({ navigation }: any) {
  const [checked, setChecked] = useState<string[]>([]);

  const toggle = (id: string) =>
    setChecked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.purple} />

      <View style={styles.purpleTop}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.stepLabel}>Paso 3 de 4</Text>
      </View>

      <ScrollView contentContainerStyle={styles.card}>
        <Text style={styles.title}>Confianza y seguridad</Text>
        <Text style={styles.sub}>Para construir una comunidad segura para todos.</Text>

        {ITEMS.map(item => (
          <TouchableOpacity
            key={item.id}
            style={[styles.item, checked.includes(item.id) && styles.itemActive]}
            onPress={() => toggle(item.id)}
          >
            <View style={[styles.checkbox, checked.includes(item.id) && styles.checkboxActive]}>
              {checked.includes(item.id) && <Text style={styles.checkIcon}>✓</Text>}
            </View>
            <View style={styles.itemText}>
              <Text style={styles.itemLabel}>{item.text}</Text>
              {!!item.link && <Text style={styles.itemLink}>{item.link}</Text>}
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.nextRow}
          onPress={() => navigation.navigate('CreatorStep4')}
        >
          <Text style={styles.nextText}>Siguiente</Text>
          <Text style={styles.nextArrow}> ›</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.purple },
  purpleTop: { height: 90, justifyContent: 'flex-end', paddingBottom: 10, paddingHorizontal: 24 },
  back: { position: 'absolute', top: 52, left: 24 },
  backText: { color: C.white, fontSize: 28, fontFamily: 'Poppins_700Bold' },
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
  nextText: { color: C.purple, fontSize: 17, fontFamily: 'Poppins_800ExtraBold' },
  nextArrow: { color: C.purple, fontSize: 28, fontFamily: 'Poppins_700Bold' },
});
