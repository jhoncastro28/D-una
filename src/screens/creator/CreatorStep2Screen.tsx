import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar,
  ScrollView, Image, Dimensions,
} from 'react-native';
import { C, CREATOR_CATEGORIES } from '../../constants';
import { Icons } from '../../constants/icons';
import { useAuth } from '../../context/AuthContext';

const { width: SCREEN_W } = Dimensions.get('window');
const CARD_PADDING = 24;
const CARD_GAP = 12;
const CARD_W = (SCREEN_W - CARD_PADDING * 2 - CARD_GAP) / 2;
const CARD_H = CARD_W * 0.75;

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
  const { updateCreatorFormData } = useAuth();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) =>
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const handleNext = () => {
    updateCreatorFormData({ categories: selected });
    navigation.navigate('CreatorStep3');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.purple} />

      <View style={styles.purpleTop}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.stepLabel}>Paso 2 de 4</Text>
      </View>

      <ScrollView contentContainerStyle={styles.card}>
        <Text style={styles.title}>¿Que tipo de eventos{'\n'}organizas?</Text>
        <Text style={styles.sub}>Puedes elegir varios</Text>

        <View style={styles.grid}>
          {CREATOR_CATEGORIES.map(cat => {
            const active = selected.includes(cat.id);
            const imgSource = CATEGORY_IMAGES[cat.recurso];
            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.catBtn, active && styles.catBtnActive]}
                onPress={() => toggle(cat.id)}
                activeOpacity={0.85}
              >
                <Image
                  source={imgSource}
                  style={styles.catImg}
                  resizeMode="cover"
                />
                <View style={styles.catLabelRow}>
                  <Text style={styles.catLabel} numberOfLines={1}>{cat.label}</Text>
                  {active && (
                    <View style={styles.checkCircle}>
                      <Text style={styles.checkMark}>✓</Text>
                    </View>
                  )}
                </View>
                {active && <View style={styles.activeOverlay} />}
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity style={styles.nextRow} onPress={handleNext}>
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
    paddingHorizontal: CARD_PADDING, paddingTop: 32, paddingBottom: 50,
  },
  title: { color: C.purple, fontSize: 22, fontFamily: 'Poppins_900Black', marginBottom: 6 },
  sub: { color: C.gray, fontSize: 13, marginBottom: 22 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CARD_GAP,
    marginBottom: 28,
  },
  catBtn: {
    width: CARD_W,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: C.grayLight,
  },
  catBtnActive: { borderColor: C.pink },
  catImg: {
    width: CARD_W,
    height: CARD_H,
  },
  catLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: C.white,
  },
  catLabel: {
    color: C.textDark,
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    flex: 1,
  },
  checkCircle: {
    width: 20, height: 20, borderRadius: 10,
    backgroundColor: C.pink,
    alignItems: 'center', justifyContent: 'center',
    marginLeft: 4,
  },
  checkMark: { color: C.white, fontSize: 11, fontFamily: 'Poppins_900Black' },
  activeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,0,124,0.08)',
  },
  nextRow: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' },
  nextText: { color: C.purple, fontSize: 17, fontFamily: 'Poppins_800ExtraBold' },
  nextArrow: { color: C.purple, fontSize: 28, fontFamily: 'Poppins_700Bold' },
});
