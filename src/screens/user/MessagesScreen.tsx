import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar,
  FlatList, TextInput, KeyboardAvoidingView, Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { C } from '../../constants';
import BottomNav from '../../components/BottomNav';
import { useAuth } from '../../context/AuthContext';

const MESSAGES_KEY = '@duna_messages';

const MOCK_PROFILES = [
  { id: 'org1', name: 'Teatro Boyacá', brand: 'Artes Escénicas', municipality: 'Tunja', initials: 'TB' },
  { id: 'org2', name: 'Jazz Society Tunja', brand: 'Música en Vivo', municipality: 'Tunja', initials: 'JS' },
  { id: 'org3', name: 'Colectivo Folclor', brand: 'Danza Tradicional', municipality: 'Tunja', initials: 'CF' },
  { id: 'org4', name: 'Feria del Libro', brand: 'Literatura & Cultura', municipality: 'Duitama', initials: 'FL' },
  { id: 'org5', name: 'Museo El Fósil', brand: 'Patrimonio Rupestre', municipality: 'Villa de Leyva', initials: 'MF' },
  { id: 'org6', name: 'Gastronomía Paipa', brand: 'Sabores Boyacenses', municipality: 'Paipa', initials: 'GP' },
];

const AUTO_REPLIES = [
  '¡Hola! Estamos muy emocionados de verte en el evento.',
  'Gracias por tu mensaje. Nos alegra mucho tu interés.',
  '¡Claro que sí! Será un evento increíble, no te lo pierdas.',
  'Para más información también puedes encontrarnos en Instagram.',
  'El evento es de entrada libre. ¡Te esperamos con los brazos abiertos!',
  '¡Qué buena pregunta! Te confirmaremos los detalles pronto.',
];

const INITIAL_MESSAGES: Record<string, Message[]> = {
  org1: [
    {
      id: 'm1',
      senderId: 'org1',
      senderName: 'Teatro Boyacá',
      text: '¡Hola! Gracias por tu interés en el Festival de Teatro. ¿Tienes alguna pregunta sobre el evento?',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
  ],
  org5: [
    {
      id: 'm2',
      senderId: 'org5',
      senderName: 'Museo El Fósil',
      text: '¡Bienvenido! La conferencia sobre arte rupestre comienza a las 9AM. ¡No te la pierdas!',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
    },
  ],
};

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
}

interface Profile {
  id: string;
  name: string;
  brand: string;
  municipality: string;
  initials: string;
}

export default function MessagesScreen({ navigation }: any) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const listRef = useRef<FlatList>(null);

  const loadMessages = useCallback(async () => {
    const raw = await AsyncStorage.getItem(MESSAGES_KEY);
    if (raw) {
      setMessages(JSON.parse(raw));
    } else {
      setMessages(INITIAL_MESSAGES);
      await AsyncStorage.setItem(MESSAGES_KEY, JSON.stringify(INITIAL_MESSAGES));
    }
    setLoading(false);
  }, []);

  useEffect(() => { loadMessages(); }, [loadMessages]);

  useEffect(() => {
    if (selectedProfile) {
      setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }, [messages, selectedProfile]);

  const sendMessage = async (profileId: string, text: string) => {
    if (!text.trim() || !user) return;
    const newMsg: Message = {
      id: Date.now().toString(36),
      senderId: user.id,
      senderName: user.name,
      text: text.trim(),
      timestamp: new Date().toISOString(),
    };
    const updated = { ...messages, [profileId]: [...(messages[profileId] ?? []), newMsg] };
    setMessages(updated);
    await AsyncStorage.setItem(MESSAGES_KEY, JSON.stringify(updated));
    setInputText('');

    setTimeout(async () => {
      const profile = MOCK_PROFILES.find(p => p.id === profileId);
      if (!profile) return;
      const reply: Message = {
        id: Date.now().toString(36) + 'r',
        senderId: profileId,
        senderName: profile.name,
        text: AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)],
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => {
        const next = { ...prev, [profileId]: [...(prev[profileId] ?? []), reply] };
        AsyncStorage.setItem(MESSAGES_KEY, JSON.stringify(next));
        return next;
      });
    }, 1600);
  };

  const getLastMessage = (profileId: string) => {
    const msgs = messages[profileId];
    if (!msgs || msgs.length === 0) return 'Inicia una conversación...';
    return msgs[msgs.length - 1].text;
  };

  const getLastTime = (profileId: string) => {
    const msgs = messages[profileId];
    if (!msgs || msgs.length === 0) return '';
    return new Date(msgs[msgs.length - 1].timestamp)
      .toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
  };

  const hasMessages = (profileId: string) => (messages[profileId]?.length ?? 0) > 0;

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator color={C.white} size="large" />
      </View>
    );
  }

  /* ── VISTA CHAT ──────────────────────────────────────────── */
  if (selectedProfile) {
    const conv = messages[selectedProfile.id] ?? [];
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <StatusBar barStyle="light-content" backgroundColor={C.purple} />

        {/* Header chat */}
        <View style={styles.chatHeader}>
          <TouchableOpacity onPress={() => setSelectedProfile(null)} style={styles.chatBack}>
            <Ionicons name="arrow-back" size={22} color={C.white} />
          </TouchableOpacity>
          <View style={styles.chatAvatar}>
            <Text style={styles.chatAvatarText}>{selectedProfile.initials}</Text>
          </View>
          <View style={styles.chatHeaderInfo}>
            <Text style={styles.chatName}>{selectedProfile.name}</Text>
            <Text style={styles.chatBrand}>{selectedProfile.brand} · {selectedProfile.municipality}</Text>
          </View>
        </View>

        {/* Mensajes */}
        <FlatList
          ref={listRef}
          data={conv}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.chatList}
          ListEmptyComponent={
            <Text style={styles.emptyChat}>Sé el primero en escribir 👋</Text>
          }
          renderItem={({ item }) => {
            const isMe = item.senderId === user?.id;
            return (
              <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleThem]}>
                <Text style={[styles.bubbleText, isMe ? styles.bubbleTextMe : styles.bubbleTextThem]}>
                  {item.text}
                </Text>
                <Text style={[styles.bubbleTime, isMe ? styles.bubbleTimeMe : styles.bubbleTimeThem]}>
                  {new Date(item.timestamp).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
            );
          }}
        />

        {/* Input */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.chatInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Escribe un mensaje..."
            placeholderTextColor="rgba(255,255,255,0.4)"
            multiline
            maxLength={500}
            returnKeyType="send"
            onSubmitEditing={() => sendMessage(selectedProfile.id, inputText)}
          />
          <TouchableOpacity
            style={[styles.sendBtn, !inputText.trim() && styles.sendBtnDisabled]}
            onPress={() => sendMessage(selectedProfile.id, inputText)}
            disabled={!inputText.trim()}
          >
            <Ionicons name="send" size={18} color={C.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }

  /* ── LISTA DE CONVERSACIONES ─────────────────────────────── */
  const sorted = [
    ...MOCK_PROFILES.filter(p => hasMessages(p.id)),
    ...MOCK_PROFILES.filter(p => !hasMessages(p.id)),
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.purple} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={C.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mensajes</Text>
        <View style={{ width: 36 }} />
      </View>

      <FlatList
        data={sorted}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={<Text style={styles.empty}>No hay conversaciones aún</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.convRow} onPress={() => setSelectedProfile(item)}>
            <View style={styles.convAvatar}>
              <Text style={styles.convAvatarText}>{item.initials}</Text>
            </View>
            <View style={styles.convInfo}>
              <View style={styles.convTopRow}>
                <Text style={styles.convName}>{item.name}</Text>
                <Text style={styles.convTime}>{getLastTime(item.id)}</Text>
              </View>
              <Text style={styles.convBrand}>{item.brand} · {item.municipality}</Text>
              <Text style={styles.convLast} numberOfLines={1}>{getLastMessage(item.id)}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="rgba(255,255,255,0.3)" />
          </TouchableOpacity>
        )}
      />

      <BottomNav
        active="messages"
        onHome={() => navigation.navigate('Feed')}
        onMessages={() => {}}
        onMenu={() => navigation.navigate('Profile')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.purple },
  center: { alignItems: 'center', justifyContent: 'center' },

  /* Lista */
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingTop: 52, paddingBottom: 16,
  },
  backBtn: { padding: 4, marginRight: 8 },
  headerTitle: {
    flex: 1, color: C.white,
    fontFamily: 'Poppins_800ExtraBold', fontSize: 17, textAlign: 'center',
  },
  list: { paddingBottom: 8 },
  empty: { color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginTop: 40, fontSize: 14 },
  separator: { height: 1, backgroundColor: 'rgba(255,255,255,0.08)', marginLeft: 80 },

  convRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14,
  },
  convAvatar: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: C.white, alignItems: 'center', justifyContent: 'center',
    marginRight: 14,
  },
  convAvatarText: { color: C.purple, fontFamily: 'Poppins_800ExtraBold', fontSize: 16 },
  convInfo: { flex: 1 },
  convTopRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  convName: { color: C.white, fontFamily: 'Poppins_700Bold', fontSize: 14 },
  convTime: { color: 'rgba(255,255,255,0.45)', fontSize: 11 },
  convBrand: { color: C.teal, fontSize: 11, fontFamily: 'Poppins_600SemiBold', marginBottom: 2 },
  convLast: { color: 'rgba(255,255,255,0.55)', fontSize: 12 },

  /* Chat */
  chatHeader: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingTop: 52, paddingBottom: 16,
    borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.12)',
    gap: 12,
  },
  chatBack: { padding: 4 },
  chatAvatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: C.white, alignItems: 'center', justifyContent: 'center',
  },
  chatAvatarText: { color: C.purple, fontFamily: 'Poppins_800ExtraBold', fontSize: 14 },
  chatHeaderInfo: { flex: 1 },
  chatName: { color: C.white, fontFamily: 'Poppins_700Bold', fontSize: 15 },
  chatBrand: { color: 'rgba(255,255,255,0.6)', fontSize: 11 },

  chatList: { paddingHorizontal: 16, paddingVertical: 16, flexGrow: 1 },
  emptyChat: { color: 'rgba(255,255,255,0.45)', textAlign: 'center', marginTop: 60, fontSize: 13 },

  bubble: {
    maxWidth: '75%', borderRadius: 18, padding: 12, marginBottom: 8,
  },
  bubbleMe: {
    alignSelf: 'flex-end', backgroundColor: C.white, borderBottomRightRadius: 4,
  },
  bubbleThem: {
    alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.15)', borderBottomLeftRadius: 4,
  },
  bubbleText: { fontSize: 14, lineHeight: 20, fontFamily: 'Poppins_400Regular' },
  bubbleTextMe: { color: C.textDark },
  bubbleTextThem: { color: C.white },
  bubbleTime: { fontSize: 10, marginTop: 4 },
  bubbleTimeMe: { color: C.gray, textAlign: 'right' },
  bubbleTimeThem: { color: 'rgba(255,255,255,0.45)' },

  inputRow: {
    flexDirection: 'row', alignItems: 'flex-end',
    paddingHorizontal: 12, paddingVertical: 10,
    paddingBottom: Platform.OS === 'ios' ? 28 : 10,
    borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.12)',
    backgroundColor: 'rgba(0,0,0,0.15)',
    gap: 8,
  },
  chatInput: {
    flex: 1, backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 22, paddingHorizontal: 16, paddingVertical: 10,
    color: C.white, fontSize: 14, maxHeight: 100,
    fontFamily: 'Poppins_400Regular',
  },
  sendBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: C.teal, alignItems: 'center', justifyContent: 'center',
  },
  sendBtnDisabled: { opacity: 0.35 },
});
