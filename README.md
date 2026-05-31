# D'una

Plataforma móvil para descubrir y publicar eventos culturales en Boyacá, Colombia. Conecta a asistentes con organizadores locales en un mismo espacio.

---

## Tecnología

| Librería | Versión | Uso |
|---|---|---|
| React Native + Expo | SDK 54 | Base de la app |
| React Navigation (Stack) | v7 | Manejo de pantallas |
| react-native-svg | 15.12.1 | Mapa SVG de Boyacá |
| react-native-maps | 1.20.1 | Mapa completo con eventos |
| AsyncStorage | 2.2.0 | Persistencia local de sesión |
| @expo/vector-icons (Ionicons) | v15 | Íconos de UI |
| Poppins (expo-google-fonts) | — | Tipografía principal |

Compatible con Android e iOS.

---

## Requisitos

- Node.js 18 o superior
- npm 9 o superior
- App **Expo Go** instalada en el celular (Play Store / App Store)
- Celular y computador en la **misma red Wi-Fi**

---

## Instalación y ejecución

```bash
# Dentro de la carpeta D-una
npm install --legacy-peer-deps

npx expo start
```

Escanea el código QR con Expo Go (Android) o con la cámara del iPhone.

---

## Cuentas de prueba

| Rol | Cómo acceder |
|---|---|
| **Admin** | Email: `admin@duna.com` / Contraseña: `admin123` |
| **Público** | Registrarse desde Onboarding → Crear cuenta → Público |
| **Creador** | Registrarse desde Onboarding → Crear cuenta → Creador (requiere aprobación del admin) |

---

## Flujos de la aplicación

### Inicio (sesión persistente)

Al abrir la app el Splash detecta si hay sesión activa:
- Sin sesión → Onboarding
- Sesión pública o creador aprobado → Feed
- Sesión admin → Panel de administración

### Usuario público

```
Onboarding → Inicia sesión  →  Feed
           → Crear cuenta  →  RegisterPublic (nombre, email, contraseña, municipio) → Feed
```

Desde el feed puede explorar eventos por fecha, ver el mapa SVG de su municipio con los eventos marcados, filtrar por municipio y categoría, y guardar eventos favoritos con "Me interesa".

### Registro como Creador

```
Onboarding → Crear cuenta → Creador →
  Paso 1: Email, contraseña, nombre, marca, municipio, tipo de organizador
  Paso 2: Categorías de eventos que organiza
  Paso 3: Aceptación de normas y seguridad
  Paso 4: Datos de contacto → Enviar solicitud → Pantalla "Registro recibido"
```

La cuenta queda en estado **pendiente** hasta que el admin la apruebe. El creador puede iniciar sesión con sus credenciales; mientras esté pendiente verá la pantalla de espera.

### Panel de administrador

```
Login (admin@duna.com / admin123) → AdminDashboard
```

- Lista todas las solicitudes de creadores
- Filtro por estado: Todos / Pendientes / Aprobados / Rechazados
- Botones para Aprobar o Rechazar cada solicitud
- Al aprobar se crea automáticamente la cuenta con rol `creador`
- Pull-to-refresh para recargar solicitudes

### Navegación principal (BottomNav)

| Botón | Ícono | Destino |
|---|---|---|
| Izquierdo | Casa | Feed |
| Centro | Triángulo (navegar) | MapScreen (Google Maps) |
| Derecho | Persona | Perfil |

---

## Estructura del proyecto

```
D-una/
├── src/
│   ├── components/
│   │   ├── BottomNav.tsx        Barra de navegación inferior
│   │   ├── BoyacaMapSVG.tsx     Mapa SVG del departamento de Boyacá
│   │   ├── DunaLogo.tsx         Logo reutilizable (3 tamaños)
│   │   └── PurpleInput.tsx      Input para fondos morados
│   ├── constants/
│   │   ├── colors.ts            Paleta de colores (C)
│   │   ├── fonts.ts             Familias Poppins (F)
│   │   ├── icons.ts             Imports de assets (íconos + patrones)
│   │   ├── index.ts             Municipios, categorías, tipos de org
│   │   └── mockData.ts          6 eventos de ejemplo con coordenadas reales
│   ├── context/
│   │   └── AuthContext.tsx      Sesiones, registro, favoritos, aprobación creadores
│   ├── navigation/
│   │   └── AppNavigator.tsx     Stack Navigator con todas las rutas
│   └── screens/
│       ├── admin/
│       │   └── AdminDashboardScreen.tsx
│       ├── auth/
│       │   ├── SplashScreen.tsx
│       │   ├── OnboardingScreen.tsx
│       │   ├── LoginScreen.tsx
│       │   ├── RegisterPublicScreen.tsx
│       │   ├── AccountTypeScreen.tsx
│       │   ├── LocationScreen.tsx
│       │   └── LoadingScreen.tsx
│       ├── user/
│       │   ├── FeedScreen.tsx
│       │   ├── MapScreen.tsx
│       │   ├── EventDetailScreen.tsx
│       │   ├── FeedFilterScreen.tsx
│       │   └── ProfileScreen.tsx
│       └── creator/
│           ├── CreatorStep1Screen.tsx   Email, contraseña, info básica
│           ├── CreatorStep2Screen.tsx   Categorías (grid SVG)
│           ├── CreatorStep3Screen.tsx   Confianza y seguridad
│           ├── CreatorStep4Screen.tsx   Contacto + enviar solicitud
│           ├── RegistrationPendingScreen.tsx
│           ├── AccountApprovedScreen.tsx
│           └── AccountRejectedScreen.tsx
├── assets/
│   ├── flat/                    Íconos PNG (categorías, perfiles, UI)
│   ├── patron_purple.png        Fondo morado con patrón D'una
│   ├── patron_white.png         Fondo blanco con patrón D'una
│   └── patron_banner.png        Banner rosa horizontal "D'una"
└── App.tsx                      Raíz: carga fuentes + AuthProvider
```

---

## Paleta de colores

| Token | Valor | Uso |
|---|---|---|
| `C.purple` | `#6e10f7` | Color principal, fondos, botones |
| `C.pink` | `#ff007c` | Acentos, CTAs, mapa SVG |
| `C.teal` | `#3ad4cc` | Confirmaciones, aprobaciones |
| `C.white` | `#FFFFFF` | Tarjetas, textos sobre morado |
| `C.textDark` | `#1a1a2e` | Textos sobre fondo blanco |
| `C.patternBg` | `#f0e8ff` | Fondo de pantallas de confirmación |

---

## Datos locales

Todo corre de forma local. No hay backend externo. Los datos se almacenan en:

| Clave AsyncStorage | Contenido |
|---|---|
| `@duna_session` | ID y rol del usuario activo |
| `@duna_users` | Base de datos de usuarios (email, contraseña, rol, municipio, favoritos) |
| `@duna_creator_registrations` | Solicitudes de creadores con estado pending/approved/rejected |

Para agregar eventos reales, edita `src/constants/mockData.ts`. Cada evento admite `title`, `category`, `date`, `time`, `location`, `municipality`, `description`, y coordenadas `lat`/`lng`.

---
