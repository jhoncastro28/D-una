# D'una

Plataforma móvil para descubrir y publicar eventos culturales en Boyacá, Colombia. Conecta a asistentes con organizadores locales en un mismo espacio.

---

## Tecnología

- **React Native** con Expo SDK 52
- **Expo Go** para pruebas en dispositivo físico (sin necesidad de compilar)
- **React Navigation** para el manejo de pantallas
- **Poppins** como tipografía principal
- Compatible con Android e iOS

---

## Requisitos

- Node.js 18 o superior
- npm 9 o superior
- La app **Expo Go** instalada en el celular (disponible en Play Store y App Store)
- El celular y el computador deben estar en la **misma red Wi-Fi**

---

## Instalación

```bash
# Dentro de la carpeta D-una
npm install --legacy-peer-deps
```

## Ejecutar

```bash
npx expo start
```

Escanea el código QR con Expo Go (Android) o con la cámara del iPhone. La app abre automáticamente.

---

## Flujos de la aplicación

### Usuario público

Splash -> Onboarding -> Login -> Selección de municipio -> Feed principal

Desde el feed puedes explorar eventos por fecha, ver el mapa de Tunja con los eventos marcados, filtrar por municipio o categoría, y ver el detalle de cada evento.

### Registro como Creador

Onboarding -> "Regístrate" -> Tipo de cuenta -> Información básica -> Tipos de eventos -> Confianza y seguridad -> Datos de contacto -> Confirmación

El registro de creadores requiere nombre, nombre de marca o proyecto, municipio dentro de Boyacá y tipo de organizador. Al enviar, la cuenta queda en revisión.

---

## Estructura del proyecto

```
D-una/
├── src/
│   ├── components/       Componentes reutilizables (logo, navbar, inputs)
│   ├── constants/        Colores, fuentes, íconos, datos mock
│   ├── navigation/       Configuración de rutas
│   └── screens/
│       ├── auth/         Splash, Onboarding, Login, Ubicación, Loading, Tipo de cuenta
│       ├── user/         Feed, Detalle de evento, Filtros
│       └── creator/      Pasos de registro, Pendiente, Aprobado, Rechazado
├── assets/
│   └── flat/             Íconos y logos en rutas limpias (sin tildes ni espacios)
└── App.tsx
```

---

## Paleta de colores

| Nombre   | Valor     |
|----------|-----------|
| Morado   | `#6e10f7` |
| Teal     | `#3ad4cc` |
| Rosa     | `#ff007c` |

---

## Notas

- Este proyecto es un prototipo funcional para presentación universitaria. No está conectado a un backend real; los datos de eventos son simulados.
- El `.claude/` está en `.gitignore` y no se sube al repositorio.
