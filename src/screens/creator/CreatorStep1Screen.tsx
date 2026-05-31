import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar,
  ScrollView, TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import { C, ORG_TYPES, BOYACA_MUNICIPALITIES } from '../../constants';
import { useAuth } from '../../context/AuthContext';

export default function CreatorStep1Screen({ navigation }: any) {
  const { updateCreatorFormData } = useAuth();

  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [name, setName]             = useState('');
  const [brand, setBrand]           = useState('');
  const [municipality, setMunicipality] = useState('');
  const [orgType, setOrgType]       = useState<string[]>([]);
  const [openMuni, setOpenMuni]     = useState(false);

  const handleNext = () => {
    updateCreatorFormData({ email, password, name, brand, municipality, orgTypes: orgType });
    navigation.navigate('CreatorStep2');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor={C.purple} />

      <View style={styles.purpleTop}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.stepLabel}>Paso 1 de 4</Text>
      </View>

      <ScrollView contentContainerStyle={styles.card} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Información básica{'\n'}de creador</Text>
        <Text style={styles.sub}>Cuéntanos quién eres.</Text>

        <Label>Correo electrónico</Label>
        <Field value={email} onChange={setEmail} placeholder="tu@correo.com"
          keyboardType="email-address" autoCapitalize="none" />

        <Label>Contraseña</Label>
        <Field value={password} onChange={setPassword} placeholder="Mínimo 6 caracteres" secureTextEntry />

        <View style={styles.divider} />

        <Label>Nombre Completo</Label>
        <Field value={name} onChange={setName} placeholder="Ej: Nicolás Parra" />

        <Label>Nombre Marca / Proyecto / Empresa</Label>
        <Field value={brand} onChange={setBrand} placeholder="Ej: Estudio Sonoro" />

        <Label>Municipio en Boyacá</Label>
        <TouchableOpacity style={styles.picker} onPress={() => setOpenMuni(!openMuni)}>
          <Text style={[styles.pickerText, !municipality && styles.placeholder]}>
            {municipality || 'Selecciona tu municipio'}
          </Text>
          <Text style={styles.pickerArrow}>▼</Text>
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

        <Label>Tipo de organizador</Label>
        <View style={styles.typeGrid}>
          {ORG_TYPES.map(t => (
            <TouchableOpacity
              key={t}
              style={[styles.typeBtn, orgType.includes(t) && styles.typeBtnActive]}
              onPress={() => setOrgType(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])}
            >
              <Text style={[styles.typeText, orgType.includes(t) && styles.typeTextActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.nextRow} onPress={handleNext}>
          <Text style={styles.nextText}>Siguiente</Text>
          <Text style={styles.nextArrow}> ›</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <Text style={styles.label}>{children}</Text>;
}
function Field({ value, onChange, placeholder, keyboardType, autoCapitalize, secureTextEntry }: any) {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      placeholderTextColor="rgba(110,16,247,0.35)"
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      secureTextEntry={secureTextEntry}
      autoCorrect={false}
    />
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
  sub: { color: C.gray, fontSize: 13, marginBottom: 22 },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 16 },
  label: { color: C.textDark, fontSize: 13, fontFamily: 'Poppins_600SemiBold', marginBottom: 8 },
  input: {
    borderWidth: 1.5, borderColor: C.pink, borderRadius: 30,
    paddingHorizontal: 18, paddingVertical: 13,
    fontSize: 14, color: C.textDark, marginBottom: 16,
    fontFamily: 'Poppins_400Regular',
  },
  picker: {
    borderWidth: 1.5, borderColor: C.pink, borderRadius: 30,
    paddingHorizontal: 18, paddingVertical: 13, marginBottom: 4,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  pickerText: { fontSize: 14, color: C.textDark },
  placeholder: { color: 'rgba(110,16,247,0.35)' },
  pickerArrow: { color: C.purple, fontSize: 13 },
  dropdown: {
    borderWidth: 1.5, borderColor: C.pink, borderRadius: 16,
    backgroundColor: C.white, marginBottom: 16, overflow: 'hidden',
  },
  dropItem: {
    paddingHorizontal: 18, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
  },
  dropText: { fontSize: 14, color: C.textDark },
  dropActive: { color: C.purple, fontFamily: 'Poppins_700Bold' },
  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 28 },
  typeBtn: {
    paddingHorizontal: 18, paddingVertical: 10,
    borderRadius: 20, borderWidth: 1.5, borderColor: C.purple,
  },
  typeBtnActive: { backgroundColor: C.purple },
  typeText: { color: C.purple, fontFamily: 'Poppins_600SemiBold', fontSize: 13 },
  typeTextActive: { color: C.white },
  nextRow: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' },
  nextText: { color: C.purple, fontSize: 17, fontFamily: 'Poppins_800ExtraBold' },
  nextArrow: { color: C.purple, fontSize: 28, fontFamily: 'Poppins_700Bold' },
});
