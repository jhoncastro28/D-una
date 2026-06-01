import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Role = 'publico' | 'creador' | 'admin';
export type RegistrationStatus = 'pending' | 'approved' | 'rejected';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  municipality: string;
  savedEvents: string[];
  brand?: string;
  registrationStatus?: RegistrationStatus;
}

export interface StoredUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: Role;
  municipality: string;
  savedEvents: string[];
  brand?: string;
  registrationStatus?: RegistrationStatus;
}

export interface CreatorRegistration {
  id: string;
  type: 'publico' | 'creador';
  email: string;
  password: string;
  name: string;
  brand: string;
  municipality: string;
  orgTypes: string[];
  categories: string[];
  instagram: string;
  contactEmail: string;
  phone: string;
  status: RegistrationStatus;
  submittedAt: string;
}

export interface DunaEvent {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  municipality: string;
  description: string;
  lat: number;
  lng: number;
  image?: string;
  creatorId: string;
  creatorName: string;
  createdAt: string;
}

export interface CreatorFormData {
  email?: string;
  password?: string;
  name?: string;
  brand?: string;
  municipality?: string;
  orgTypes?: string[];
  categories?: string[];
  instagram?: string;
  contactEmail?: string;
  phone?: string;
}

const ADMIN_EMAIL = 'admin@duna.com';
const ADMIN_PASSWORD = 'admin123';

const USERS_KEY = '@duna_users';
const SESSION_KEY = '@duna_session';
const REGISTRATIONS_KEY = '@duna_creator_registrations';
const EVENTS_KEY = '@duna_events';

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2, 9);

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  creatorFormData: CreatorFormData;
  userEvents: DunaEvent[];
  login: (email: string, password: string) => Promise<{ role: Role; registrationStatus?: RegistrationStatus }>;
  registerPublico: (name: string, email: string, password: string, municipality: string) => Promise<void>;
  logout: () => Promise<void>;
  toggleSaved: (eventId: string) => void;
  isSaved: (eventId: string) => boolean;
  updateCreatorFormData: (data: Partial<CreatorFormData>) => void;
  submitCreatorRegistration: () => Promise<void>;
  getCreatorRegistrations: () => Promise<CreatorRegistration[]>;
  approveCreator: (id: string) => Promise<void>;
  rejectCreator: (id: string) => Promise<void>;
  updateUser: (data: Partial<StoredUser>) => Promise<void>;
  createEvent: (data: Omit<DunaEvent, 'id' | 'creatorId' | 'creatorName' | 'createdAt'>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const adminUser: AuthUser = {
  id: 'admin',
  name: 'Admin D\'una',
  email: ADMIN_EMAIL,
  role: 'admin',
  municipality: 'Tunja',
  savedEvents: [],
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [creatorFormData, setCreatorFormData] = useState<CreatorFormData>({});
  const [userEvents, setUserEvents] = useState<DunaEvent[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const [sessionRaw, eventsRaw] = await Promise.all([
          AsyncStorage.getItem(SESSION_KEY),
          AsyncStorage.getItem(EVENTS_KEY),
        ]);
        if (eventsRaw) setUserEvents(JSON.parse(eventsRaw));
        if (!sessionRaw) { setLoading(false); return; }
        const session = JSON.parse(sessionRaw);
        if (session.role === 'admin') {
          setUser(adminUser);
        } else {
          const usersRaw = await AsyncStorage.getItem(USERS_KEY);
          const users: StoredUser[] = usersRaw ? JSON.parse(usersRaw) : [];
          const found = users.find(u => u.id === session.id);
          if (found) setUser(storedToAuth(found));
        }
      } catch (_) {}
      setLoading(false);
    })();
  }, []);

  const storedToAuth = (u: StoredUser): AuthUser => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    municipality: u.municipality,
    savedEvents: u.savedEvents,
    brand: u.brand,
    registrationStatus: u.registrationStatus,
  });

  const getUsers = async (): Promise<StoredUser[]> => {
    const raw = await AsyncStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  };

  const saveUsers = async (users: StoredUser[]) => {
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  const saveSession = async (u: AuthUser) => {
    setUser(u);
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify({ id: u.id, role: u.role }));
  };

  const login = async (email: string, password: string) => {
    const lowerEmail = email.toLowerCase().trim();

    if (lowerEmail === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      await saveSession(adminUser);
      return { role: 'admin' as Role };
    }

    const users = await getUsers();
    const found = users.find(u => u.email.toLowerCase() === lowerEmail && u.password === password);
    if (found) {
      const authUser = storedToAuth(found);
      await saveSession(authUser);
      return { role: found.role, registrationStatus: found.registrationStatus };
    }

    const regsRaw = await AsyncStorage.getItem(REGISTRATIONS_KEY);
    const regs: CreatorRegistration[] = regsRaw ? JSON.parse(regsRaw) : [];
    const reg = regs.find(r => r.email.toLowerCase() === lowerEmail && r.password === password);
    if (reg) {
      if (reg.status === 'pending') {
        throw new Error('PENDING');
      }
      if (reg.status === 'rejected') {
        throw new Error('REJECTED');
      }
      // Aprobado pero la cuenta no existe en @duna_users (recuperación de error parcial)
      if (reg.status === 'approved') {
        const usersForRecovery = await getUsers();
        const recoveredRole: Role = reg.type === 'publico' ? 'publico' : 'creador';
        const newUser: StoredUser = {
          id: generateId(),
          email: reg.email,
          password: reg.password,
          name: reg.name,
          role: recoveredRole,
          municipality: reg.municipality,
          savedEvents: [],
          brand: reg.brand,
          registrationStatus: 'approved',
        };
        await saveUsers([...usersForRecovery, newUser]);
        const authUser = storedToAuth(newUser);
        await saveSession(authUser);
        return { role: recoveredRole, registrationStatus: 'approved' as RegistrationStatus };
      }
    }

    throw new Error('INVALID_CREDENTIALS');
  };

  const registerPublico = async (name: string, email: string, password: string, municipality: string) => {
    const lowerEmail = email.toLowerCase().trim();

    // Verificar que el correo no exista ya en cuentas activas
    const users = await getUsers();
    if (users.find(u => u.email.toLowerCase() === lowerEmail)) {
      throw new Error('EMAIL_EXISTS');
    }

    // Verificar que no haya ya un registro pendiente/rechazado con ese correo
    const regsRaw = await AsyncStorage.getItem(REGISTRATIONS_KEY);
    const regs: CreatorRegistration[] = regsRaw ? JSON.parse(regsRaw) : [];
    if (regs.find(r => r.email.toLowerCase() === lowerEmail)) {
      throw new Error('EMAIL_EXISTS');
    }

    // Guardar como solicitud pendiente de aprobación (igual que creadores)
    const reg: CreatorRegistration = {
      id: generateId(),
      type: 'publico',
      email: lowerEmail,
      password,
      name: name.trim(),
      brand: '',
      municipality,
      orgTypes: [],
      categories: [],
      instagram: '',
      contactEmail: lowerEmail,
      phone: '',
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };
    await AsyncStorage.setItem(REGISTRATIONS_KEY, JSON.stringify([...regs, reg]));
    // No se crea sesión: el usuario debe esperar aprobación del admin
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem(SESSION_KEY);
  };

  const toggleSaved = async (eventId: string) => {
    if (!user) return;
    const saved = user.savedEvents.includes(eventId)
      ? user.savedEvents.filter(id => id !== eventId)
      : [...user.savedEvents, eventId];
    const updated = { ...user, savedEvents: saved };
    setUser(updated);
    if (user.role !== 'admin') {
      const users = await getUsers();
      const idx = users.findIndex(u => u.id === user.id);
      if (idx >= 0) {
        users[idx].savedEvents = saved;
        await saveUsers(users);
      }
    }
  };

  const isSaved = (eventId: string) => user?.savedEvents.includes(eventId) ?? false;

  const updateCreatorFormData = (data: Partial<CreatorFormData>) => {
    setCreatorFormData(prev => ({ ...prev, ...data }));
  };

  const submitCreatorRegistration = async () => {
    const d = creatorFormData;
    if (!d.email || !d.password || !d.name) throw new Error('INCOMPLETE_FORM');

    const regsRaw = await AsyncStorage.getItem(REGISTRATIONS_KEY);
    const regs: CreatorRegistration[] = regsRaw ? JSON.parse(regsRaw) : [];

    const lowerEmail = d.email.toLowerCase().trim();
    if (regs.find(r => r.email.toLowerCase() === lowerEmail)) {
      throw new Error('EMAIL_EXISTS');
    }
    const users = await getUsers();
    if (users.find(u => u.email.toLowerCase() === lowerEmail)) {
      throw new Error('EMAIL_EXISTS');
    }

    const reg: CreatorRegistration = {
      id: generateId(),
      type: 'creador',
      email: lowerEmail,
      password: d.password,
      name: d.name.trim(),
      brand: d.brand ?? '',
      municipality: d.municipality ?? '',
      orgTypes: d.orgTypes ?? [],
      categories: d.categories ?? [],
      instagram: d.instagram ?? '',
      contactEmail: d.contactEmail ?? lowerEmail,
      phone: d.phone ?? '',
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };
    await AsyncStorage.setItem(REGISTRATIONS_KEY, JSON.stringify([...regs, reg]));
    setCreatorFormData({});
  };

  const getCreatorRegistrations = async (): Promise<CreatorRegistration[]> => {
    const raw = await AsyncStorage.getItem(REGISTRATIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  };

  const approveCreator = async (id: string) => {
    const regsRaw = await AsyncStorage.getItem(REGISTRATIONS_KEY);
    const regs: CreatorRegistration[] = regsRaw ? JSON.parse(regsRaw) : [];
    const idx = regs.findIndex(r => r.id === id);
    if (idx < 0) return;
    regs[idx].status = 'approved';
    await AsyncStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(regs));

    const reg = regs[idx];
    const users = await getUsers();
    if (!users.find(u => u.email === reg.email)) {
      const newUser: StoredUser = {
        id: generateId(),
        email: reg.email,
        password: reg.password,
        name: reg.name,
        role: reg.type === 'publico' ? 'publico' : 'creador',
        municipality: reg.municipality,
        savedEvents: [],
        brand: reg.brand,
        registrationStatus: 'approved',
      };
      await saveUsers([...users, newUser]);
    }
  };

  const rejectCreator = async (id: string) => {
    const regsRaw = await AsyncStorage.getItem(REGISTRATIONS_KEY);
    const regs: CreatorRegistration[] = regsRaw ? JSON.parse(regsRaw) : [];
    const idx = regs.findIndex(r => r.id === id);
    if (idx < 0) return;
    regs[idx].status = 'rejected';
    await AsyncStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(regs));
  };

  const createEvent = async (data: Omit<DunaEvent, 'id' | 'creatorId' | 'creatorName' | 'createdAt'>) => {
    if (!user) throw new Error('NOT_LOGGED_IN');
    const newEvent: DunaEvent = {
      id: generateId(),
      ...data,
      creatorId: user.id,
      creatorName: user.name,
      createdAt: new Date().toISOString(),
    };
    const updated = [...userEvents, newEvent];
    setUserEvents(updated);
    await AsyncStorage.setItem(EVENTS_KEY, JSON.stringify(updated));
  };

  const updateUser = async (data: Partial<StoredUser>) => {
    if (!user) return;
    const users = await getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx >= 0) {
      users[idx] = { ...users[idx], ...data };
      await saveUsers(users);
      setUser(storedToAuth(users[idx]));
    }
  };

  return (
    <AuthContext.Provider value={{
      user, loading, creatorFormData, userEvents,
      login, registerPublico, logout,
      toggleSaved, isSaved,
      updateCreatorFormData, submitCreatorRegistration,
      getCreatorRegistrations, approveCreator, rejectCreator,
      updateUser, createEvent,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
