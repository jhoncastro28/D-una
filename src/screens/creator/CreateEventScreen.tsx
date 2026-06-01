import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar,
  ScrollView, TextInput, KeyboardAvoidingView, Platform,
  Alert, ActivityIndicator, Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { C, BOYACA_MUNICIPALITIES } from '../../constants';
import { useAuth } from '../../context/AuthContext';
import { MUNICIPALITY_REGIONS, BOYACA_REGION } from '../../constants/mockData';

const CATEGORIES = [
  { key: 'conciertos',        label: 'Conciertos' },
  { key: 'talleres',          label: 'Talleres' },
  { key: 'ferias',            label: 'Ferias' },
  { key: 'conferencias',      label: 'Conferencias' },
  { key: 'eventosculturales', label: 'Cultural' },
  { key: 'fiestas',           label: 'Fiestas' },
  { key: 'deportivos',        label: 'Deportivos' },
  { key: 'otros',             label: 'Otros' },
];

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

export default function CreateEventScreen({ navigation }: any) {
  const { createEvent, user } = useAuth();

  const [title, setTitle]           = useState('');
  const [category, setCategory]     = useState('');
  const [date, setDate]             = useState('');
  const [time, setTime]             = useState('');
  const [location, setLocation]     = useState('');
  const [municipality, setMunicipality] = useState(user?.municipality ?? '');
  const [description, setDescription]  = useState('');
  const [image, setImage]           = useState<string | null>(null);
  const [openMuni, setOpenMuni]     = useState(false);
  const [loading, setLoading]       = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso requerido', 'Necesitamos acceso a tu galería para agregar una imagen al evento.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) { Alert.alert('Campo requerido', 'Ingresa el nombre del evento.'); return; }
    if (!category)     { Alert.alert('Campo requerido', 'Selecciona una categoría.'); return; }
    if (!date.trim())  { Alert.alert('Campo requerido', 'Ingresa la fecha del evento.'); return; }
    if (!time.trim())  { Alert.alert('Campo requerido', 'Ingresa la hora del evento.'); return; }
    if (!location.trim()) { Alert.alert('Campo requerido', 'Ingresa el lugar del evento.'); return; }
    if (!municipality) { Alert.alert('Campo requerido', 'Selecciona el municipio.'); return; }

    const region = MUNICIPALITY_REGIONS[municipality] ?? BOYACA_REGION;

    setLoading(true);
    try {
      await createEvent({
        title: title.trim(),
        category,
        date: date.trim(),
        time: time.trim(),
        location: location.trim(),
        municipality,
        description: description.trim(),
        lat: region.latitude,
        lng: region.longitude,
        image: image ?? undefined,
      });
      Alert.alert('¡Evento creado!', 'Tu evento ya está visible en el feed.', [
        { text: 'Ver feed', onPress: () => navigation.replace('Feed') },
      ]);
    } catch {
      Alert.alert('Error', 'No se pudo crear el evento. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor={C.purple} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={C.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Crear evento</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Imagen del evento */}
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {image
            ? <Image source={{ uri: image }} style={styles.imagePreview} resizeMode="cover" />
            : (
              <View style={styles.imagePlaceholder}>
                <Ionicons name="camera-outline" size={36} color="rgba(255,255,255,0.6)" />
                <Text style={styles.imagePlaceholderText}>Toca para agregar{'\n'}una foto del evento</Text>
              </View>
            )
          }
          {image && (
            <TouchableOpacity style={styles.changeImgBtn} onPress={pickImage}>
              <Ionicons name="pencil" size={14} color={C.white} />
            </TouchableOpacity>
          )}
        </TouchableOpacity>

        <View style={styles.form}>
          {/* Nombre */}
          <Label>Nombre del evento *</Label>
          <Input
            value={title}
            onChange={setTitle}
            placeholder="Ej: Festival de Jazz en Tunja"
          />

          {/* Categoría */}
          <Label>Categoría *</Label>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.catRow}
          >
            {CATEGORIES.map(cat => {
              const active = category === cat.key;
              const color = CATEGORY_COLORS[cat.key];
              return (
                <TouchableOpacity
                  key={cat.key}
                  style={[styles.catChip, active && { backgroundColor: color, borderColor: color }]}
                  onPress={() => setCategory(cat.key)}
                >
                  <Text style={[styles.catChipText, active && styles.catChipTextActive]}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Fecha */}
          <Label>Fecha *</Label>
          <Input
            value={date}
            onChange={setDate}
            placeholder="Ej: 25 de julio"
          />

          {/* Hora */}
          <Label>Hora *</Label>
          <Input
            value={time}
            onChange={setTime}
            placeholder="Ej: 6:00PM"
          />

          {/* Lugar */}
          <Label>Lugar / Sede *</Label>
          <Input
            value={location}
            onChange={setLocation}
            placeholder="Ej: Plaza de Bolívar"
          />

          {/* Municipio */}
          <Label>Municipio *</Label>
          <TouchableOpacity style={styles.picker} onPress={() => setOpenMuni(o => !o)}>
            <Text style={[styles.pickerText, !municipality && styles.placeholder]}>
              {municipality || 'Selecciona el municipio'}
            </Text>
            <Ionicons name={openMuni ? 'chevron-up' : 'chevron-down'} size={16} color={C.purple} />
          </TouchableOpacity>
          {openMuni && (
            <View style={styles.dropdown}>
              <ScrollView style={{ maxHeight: 180 }} nestedScrollEnabled>
                {BOYACA_MUNICIPALITIES.map(m => (
                  <TouchableOpacity
                    key={m}
                    style={styles.dropItem}
                    onPress={() => { setMunicipality(m); setOpenMuni(false); }}
                  >
                    <Text style={[styles.dropText, municipality === m && styles.dropActive]}>{m}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Descripción */}
          <Label>Descripción</Label>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Cuéntale a la gente de qué se trata el evento..."
            placeholderTextColor="rgba(110,16,247,0.35)"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          {/* Botón publicar */}
          <TouchableOpacity
            style={[styles.submitBtn, loading && { opacity: 0.7 }]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading
              ? <ActivityIndicator color={C.white} />
              : <>
                  <Ionicons name="checkmark-circle-outline" size={20} color={C.white} style={{ marginRight: 8 }} />
                  <Text style={styles.submitBtnText}>Publicar evento</Text>
                </>
            }
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <Text style={styles.label}>{children}</Text>;
}

function Input({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      placeholderTextColor="rgba(110,16,247,0.35)"
      autoCorrect={false}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.purple },

  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingTop: 52, paddingBottom: 16,
  },
  backBtn: { padding: 4 },
  headerTitle: {
    flex: 1, color: C.white,
    fontFamily: 'Poppins_800ExtraBold', fontSize: 17, textAlign: 'center',
  },

  scroll: { paddingBottom: 40 },

  /* Imagen */
  imagePicker: {
    height: 200, backgroundColor: 'rgba(255,255,255,0.12)',
    marginHorizontal: 20, marginBottom: 20, borderRadius: 20,
    overflow: 'hidden',
  },
  imagePreview: { width: '100%', height: '100%' },
  imagePlaceholder: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 },
  imagePlaceholderText: { color: 'rgba(255,255,255,0.55)', fontSize: 13, textAlign: 'center', lineHeight: 20 },
  changeImgBtn: {
    position: 'absolute', bottom: 12, right: 12,
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center', justifyContent: 'center',
  },

  /* Formulario */
  form: {
    backgroundColor: C.white,
    borderTopLeftRadius: 30, borderTopRightRadius: 30,
    paddingHorizontal: 24, paddingTop: 28, paddingBottom: 20,
  },
  label: {
    color: C.textDark, fontSize: 13,
    fontFamily: 'Poppins_600SemiBold', marginBottom: 8,
  },
  input: {
    borderWidth: 1.5, borderColor: '#e0d0ff', borderRadius: 30,
    paddingHorizontal: 18, paddingVertical: 13,
    fontSize: 14, color: C.textDark, marginBottom: 18,
    fontFamily: 'Poppins_400Regular', backgroundColor: C.white,
  },
  textArea: {
    borderRadius: 18, height: 110,
    paddingTop: 14, textAlignVertical: 'top',
  },

  /* Categoría chips */
  catRow: { paddingBottom: 18, gap: 8 },
  catChip: {
    paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: 20, borderWidth: 1.5, borderColor: '#ddd',
    backgroundColor: C.white,
  },
  catChipText: { color: C.gray, fontSize: 12, fontFamily: 'Poppins_600SemiBold' },
  catChipTextActive: { color: C.white },

  /* Picker municipio */
  picker: {
    borderWidth: 1.5, borderColor: '#e0d0ff', borderRadius: 30,
    paddingHorizontal: 18, paddingVertical: 13, marginBottom: 6,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: C.white,
  },
  pickerText: { fontSize: 14, color: C.textDark, fontFamily: 'Poppins_400Regular' },
  placeholder: { color: 'rgba(110,16,247,0.35)' },
  dropdown: {
    borderWidth: 1.5, borderColor: '#e0d0ff', borderRadius: 16,
    backgroundColor: C.white, marginBottom: 18, overflow: 'hidden',
  },
  dropItem: {
    paddingHorizontal: 18, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
  },
  dropText: { fontSize: 14, color: C.textDark },
  dropActive: { color: C.purple, fontFamily: 'Poppins_700Bold' },

  /* Submit */
  submitBtn: {
    backgroundColor: C.purple, borderRadius: 30,
    paddingVertical: 15, alignItems: 'center',
    flexDirection: 'row', justifyContent: 'center',
    marginTop: 8,
  },
  submitBtnText: { color: C.white, fontSize: 16, fontFamily: 'Poppins_800ExtraBold' },
});
