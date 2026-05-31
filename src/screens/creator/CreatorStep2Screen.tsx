import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar,
  ScrollView, Image,
} from 'react-native';
import { C, CREATOR_CATEGORIES } from '../../constants';
import { Icons } from '../../constants/icons';

const CATEGORY_IMAGES: Record<number, any> = {
  92: Icons.catDeportivos,
  93: Icons.catFiestas,
  94: Icons.catConferencias,
  95: Icons.catOtros,
  96: Icons.catTalleres,
  97: Icons.catConciertos,
  98: Icons.catFerias,
  99: Icons.catEventos,
};

export default function CreatorStep2Screen({ navigation }: any) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) =>
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.purple} />

      <View style={styles.purpleTop}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>{'<'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.card}>
        <Text style={styles.title}>¿Que tipo de eventos{'\n'}organizas?</Text>
        <Text style={styles.sub}>Puedes elegir varios</Text>

        <View style={styles.grid}>
          {CREATOR_CATEGORIES.map(cat => {
            const active = selected.includes(cat.id);
            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.catBtn, active && styles.catBtnActive]}
                onPress={() => toggle(cat.id)}
              >
                <Image
                  source={CATEGORY_IMAGES[cat.recurso]}
                  style={styles.catImg}
                  resizeMode="cover"
                />
                {active && (
                  <View style={styles.activeOverlay}>
                    <Text style={styles.checkmark}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.nextRow}
          onPress={() => navigation.navigate('CreatorStep3')}
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
  purpleTop: { height: 90 },
  back: { position: 'absolute', top: 52, left: 24 },
  backText: { color: C.white, fontSize: 28, fontFamily: 'Poppins_700Bold' },
  card: {
    backgroundColor: C.white,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 50,
  },
  title: { color: C.purple, fontSize: 22, fontFamily: 'Poppins_900Black', marginBottom: 6 },
  sub: { color: C.gray, fontSize: 13, marginBottom: 22 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  catBtn: {
    width: '47%',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  catBtnActive: { borderColor: C.pink },
  catImg: { width: '100%', aspectRatio: 1.2 },
  activeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,0,124,0.25)',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    padding: 8,
  },
  checkmark: { color: C.white, fontSize: 18, fontFamily: 'Poppins_900Black' },
  nextRow: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' },
  nextText: { color: C.purple, fontSize: 17, fontFamily: 'Poppins_800ExtraBold' },
  nextArrow: { color: C.purple, fontSize: 28, fontFamily: 'Poppins_700Bold' },
});
