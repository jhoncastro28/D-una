export const MOCK_EVENTS = [
  // ── Eventos pasados (referencia) ────────────────────────────────────────
  {
    id: '1', dateISO: '2026-05-19',
    title: 'Festival de Teatro Internacional',
    category: 'conciertos', date: '19 de mayo', time: '8:00PM',
    location: 'Plaza de Bolívar', municipality: 'Tunja',
    description: 'El Festival Internacional de Teatro llega a Tunja con las mejores obras de compañías locales e internacionales. Tres días de magia en el corazón de Boyacá.',
    lat: 5.5354, lng: -73.3675,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Tunja_-_Plaza_de_Bol%C3%ADvar_y_Catedral.jpg/1280px-Tunja_-_Plaza_de_Bol%C3%ADvar_y_Catedral.jpg',
  },
  {
    id: '2', dateISO: '2026-05-22',
    title: 'Noche de Jazz en San Lázaro',
    category: 'conciertos', date: '22 de mayo', time: '7:00PM',
    location: 'Barrio San Lázaro', municipality: 'Tunja',
    description: 'Una noche especial de jazz en vivo en el histórico barrio San Lázaro de Tunja.',
    lat: 5.5408, lng: -73.3612,
    image: 'https://picsum.photos/seed/jazz-san-lazaro/800/450',
  },
  {
    id: '3', dateISO: '2026-05-25',
    title: 'Muestra de Folclor Boyacense',
    category: 'eventosculturales', date: '25 de mayo', time: '3:00PM',
    location: 'Parque El Bosque', municipality: 'Tunja',
    description: 'Grupos de danza folclórica de todo Boyacá se reúnen para una gran muestra de nuestra identidad cultural.',
    lat: 5.5290, lng: -73.3740,
    image: 'https://picsum.photos/seed/folclor-boyaca/800/450',
  },
  {
    id: '7', dateISO: '2026-05-29',
    title: 'Concierto de Marimba y Chirimía',
    category: 'conciertos', date: '29 de mayo', time: '6:00PM',
    location: 'Teatro Sugamuxi', municipality: 'Sogamoso',
    description: 'Una noche de marimba y chirimía del Pacífico colombiano que llega a Boyacá. Artistas de talla nacional en un concierto único.',
    lat: 5.7158, lng: -72.9311,
    image: 'https://picsum.photos/seed/marimba-chirimia/800/450',
  },
  {
    id: '8', dateISO: '2026-05-30',
    title: 'Taller de Fotografía Urbana',
    category: 'talleres', date: '30 de mayo', time: '9:00AM',
    location: 'Centro Cultural Duitama', municipality: 'Duitama',
    description: 'Aprende las técnicas de fotografía callejera y urbana con profesionales locales. Cupos limitados, incluye salida fotográfica por la ciudad.',
    lat: 5.8273, lng: -73.0268,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Duitama_Boyaca_Colombia.jpg/1280px-Duitama_Boyaca_Colombia.jpg',
  },

  // ── Junio 1 (hoy) ───────────────────────────────────────────────────────
  {
    id: '4', dateISO: '2026-06-01',
    title: 'Feria del Libro Boyacense 2026',
    category: 'ferias', date: '1 de junio', time: '10:00AM',
    location: 'Centro Cultural', municipality: 'Duitama',
    description: 'La feria del libro más importante del departamento con escritores locales y talleres de escritura creativa.',
    lat: 5.8273, lng: -73.0250,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Duitama_Boyaca_Colombia.jpg/1280px-Duitama_Boyaca_Colombia.jpg',
  },
  {
    id: '9', dateISO: '2026-06-01',
    title: 'Noches de Cine en la Plaza Mayor',
    category: 'eventosculturales', date: '1 de junio', time: '7:30PM',
    location: 'Plaza Mayor', municipality: 'Villa de Leyva',
    description: 'Cine bajo las estrellas en la plaza más hermosa de Colombia. Proyección de películas colombianas con entrada libre.',
    lat: 5.6352, lng: -73.5243,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Plaza_Mayor_Villa_de_Leyva.JPG/1280px-Plaza_Mayor_Villa_de_Leyva.JPG',
  },

  // ── Junio 2 ─────────────────────────────────────────────────────────────
  {
    id: '10', dateISO: '2026-06-02',
    title: 'Workshop Gastronomía Boyacense',
    category: 'talleres', date: '2 de junio', time: '10:00AM',
    location: 'Termas de Paipa', municipality: 'Paipa',
    description: 'Aprende a preparar los platos tradicionales de Boyacá: cocido boyacense, puchero, mazamorra, chicha artesanal y más. Chef invitados.',
    lat: 5.7806, lng: -73.1142,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Municipio_de_Paipa%2C_Boyac%C3%A1.jpg/1280px-Municipio_de_Paipa%2C_Boyac%C3%A1.jpg',
  },
  {
    id: '11', dateISO: '2026-06-02',
    title: 'Concierto Música Andina Colombiana',
    category: 'conciertos', date: '2 de junio', time: '6:00PM',
    location: 'Auditorio Luis Enrique Pérez', municipality: 'Tunja',
    description: 'Una velada de bambucos, torbellinos y pasillos con los mejores grupos de música andina del país.',
    lat: 5.5380, lng: -73.3640,
    image: 'https://picsum.photos/seed/andina-tunja/800/450',
  },

  // ── Junio 3 ─────────────────────────────────────────────────────────────
  {
    id: '12', dateISO: '2026-06-03',
    title: 'Muestra de Teatro Universitario',
    category: 'conciertos', date: '3 de junio', time: '5:00PM',
    location: 'Teatro Patria UPTC', municipality: 'Tunja',
    description: 'Los mejores grupos de teatro de la Universidad Pedagógica presentan sus obras de fin de semestre. Entrada libre.',
    lat: 5.5340, lng: -73.3678,
    image: 'https://picsum.photos/seed/teatro-uptc/800/450',
  },
  {
    id: '13', dateISO: '2026-06-03',
    title: 'Feria de Artesanías del Altiplano',
    category: 'ferias', date: '3 de junio', time: '8:00AM',
    location: 'Parque Boyacá', municipality: 'Duitama',
    description: 'Más de 80 artesanos de Boyacá exhiben y venden tejidos, cerámica, tallas en madera, joyería y gastronomía local.',
    lat: 5.8280, lng: -73.0285,
    image: 'https://picsum.photos/seed/artesanias-duitama/800/450',
  },

  // ── Junio 4 ─────────────────────────────────────────────────────────────
  {
    id: '14', dateISO: '2026-06-04',
    title: 'Conferencia: Historia Colonial de Boyacá',
    category: 'conferencias', date: '4 de junio', time: '9:00AM',
    location: 'Casa Museo Luis Alberto Acuña', municipality: 'Villa de Leyva',
    description: 'El historiador Carlos Jara presenta su nueva investigación sobre la arquitectura colonial y los asentamientos muiscas en el altiplano boyacense.',
    lat: 5.6360, lng: -73.5230,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Plaza_Mayor_Villa_de_Leyva.JPG/1280px-Plaza_Mayor_Villa_de_Leyva.JPG',
  },

  // ── Junio 5 ─────────────────────────────────────────────────────────────
  {
    id: '5', dateISO: '2026-06-05',
    title: 'Conferencia Arte Rupestre Boyacá',
    category: 'conferencias', date: '5 de junio', time: '9:00AM',
    location: 'Museo El Fósil', municipality: 'Villa de Leyva',
    description: 'Conferencia única sobre el arte rupestre de Boyacá y su relación con las culturas prehispánicas de la región.',
    lat: 5.6352, lng: -73.5243,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Plaza_Mayor_Villa_de_Leyva.JPG/1280px-Plaza_Mayor_Villa_de_Leyva.JPG',
  },
  {
    id: '15', dateISO: '2026-06-05',
    title: 'Torneo de Voleibol Lago Sochagota',
    category: 'deportivos', date: '5 de junio', time: '8:00AM',
    location: 'Lago Sochagota', municipality: 'Paipa',
    description: 'Torneo intermunicipios de voleibol playa a orillas del Lago Sochagota. Inscripciones abiertas para equipos de toda la región.',
    lat: 5.7820, lng: -73.1100,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Municipio_de_Paipa%2C_Boyac%C3%A1.jpg/1280px-Municipio_de_Paipa%2C_Boyac%C3%A1.jpg',
  },
  {
    id: '16', dateISO: '2026-06-05',
    title: 'Festival de Danza Folclórica',
    category: 'eventosculturales', date: '5 de junio', time: '3:00PM',
    location: 'Plaza de Bolívar', municipality: 'Tunja',
    description: 'Más de 20 grupos de danza de Boyacá se presentan en la plaza central con trajes típicos y música en vivo.',
    lat: 5.5354, lng: -73.3675,
    image: 'https://picsum.photos/seed/danza-boyaca/800/450',
  },

  // ── Junio 6 ─────────────────────────────────────────────────────────────
  {
    id: '17', dateISO: '2026-06-06',
    title: 'Exposición Arte Contemporáneo Boyacense',
    category: 'eventosculturales', date: '6 de junio', time: '10:00AM',
    location: 'Galería Rafael Núñez', municipality: 'Tunja',
    description: 'Inauguración de la exposición colectiva de 15 artistas plásticos boyacenses. Pinturas, esculturas e instalaciones que dialogan con el territorio.',
    lat: 5.5360, lng: -73.3665,
    image: 'https://picsum.photos/seed/arte-contemporaneo/800/450',
  },

  // ── Junio 7 ─────────────────────────────────────────────────────────────
  {
    id: '18', dateISO: '2026-06-07',
    title: 'Festival Gastronómico Andino',
    category: 'fiestas', date: '7 de junio', time: '11:00AM',
    location: 'Parque Central', municipality: 'Chiquinquirá',
    description: 'El mejor festival gastronómico de la región central de Boyacá. Platos típicos, concurso de cocina y shows musicales.',
    lat: 5.6151, lng: -73.8189,
    image: 'https://picsum.photos/seed/festival-gastronomico/800/450',
  },
  {
    id: '19', dateISO: '2026-06-07',
    title: 'Noches de Jazz en la Plaza',
    category: 'conciertos', date: '7 de junio', time: '8:00PM',
    location: 'Plaza de Bolívar', municipality: 'Tunja',
    description: 'Regresa la serie de conciertos de jazz a cielo abierto en el corazón de Tunja. Entrada libre hasta completar aforo.',
    lat: 5.5354, lng: -73.3675,
    image: 'https://picsum.photos/seed/jazz-plaza-tunja/800/450',
  },

  // ── Junio 8 ─────────────────────────────────────────────────────────────
  {
    id: '20', dateISO: '2026-06-08',
    title: 'Carrera de Montaña Serranía de la Rusia',
    category: 'deportivos', date: '8 de junio', time: '6:00AM',
    location: 'Parque Natural Serranía de la Rusia', municipality: 'Duitama',
    description: 'Carrera de montaña de 21 km por los senderos de la Serranía de la Rusia. Categorías para todos los niveles. Inscripción previa obligatoria.',
    lat: 5.8320, lng: -73.0400,
    image: 'https://picsum.photos/seed/montana-rusia/800/450',
  },

  // ── Junio 9 ─────────────────────────────────────────────────────────────
  {
    id: '21', dateISO: '2026-06-09',
    title: 'Mercado de Diseñadores Locales',
    category: 'ferias', date: '9 de junio', time: '9:00AM',
    location: 'Plaza Mayor', municipality: 'Villa de Leyva',
    description: 'El mercado de moda y diseño más esperado del año. Más de 50 diseñadores de Boyacá y Colombia presentan sus colecciones.',
    lat: 5.6352, lng: -73.5243,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Plaza_Mayor_Villa_de_Leyva.JPG/1280px-Plaza_Mayor_Villa_de_Leyva.JPG',
  },
  {
    id: '22', dateISO: '2026-06-09',
    title: 'Taller de Cerámica Muisca',
    category: 'talleres', date: '9 de junio', time: '10:00AM',
    location: 'Centro Comunitario Sugamuxi', municipality: 'Sogamoso',
    description: 'Aprende las técnicas ancestrales de cerámica muisca con maestros artesanos de Ráquira. 4 horas de trabajo con arcilla.',
    lat: 5.7158, lng: -72.9311,
    image: 'https://picsum.photos/seed/ceramica-muisca/800/450',
  },

  // ── Junio 10 ────────────────────────────────────────────────────────────
  {
    id: '6', dateISO: '2026-06-10',
    title: 'Festival Gastronómico de Paipa',
    category: 'fiestas', date: '10 de junio', time: '12:00PM',
    location: 'Parque Central', municipality: 'Paipa',
    description: 'Los mejores sabores de la cocina boyacense en un solo lugar. Cocido boyacense, masato, chicha y más.',
    lat: 5.7806, lng: -73.1142,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Municipio_de_Paipa%2C_Boyac%C3%A1.jpg/1280px-Municipio_de_Paipa%2C_Boyac%C3%A1.jpg',
  },
  {
    id: '23', dateISO: '2026-06-10',
    title: 'Feria de las Flores de Boyacá',
    category: 'ferias', date: '10 de junio', time: '8:00AM',
    location: 'Parque Pinzón', municipality: 'Tunja',
    description: 'La feria de flores más grande del departamento con cientos de variedades cultivadas en Boyacá. Exposición y venta de plantas.',
    lat: 5.5330, lng: -73.3690,
    image: 'https://picsum.photos/seed/feria-flores/800/450',
  },

  // ── Junio 11 ────────────────────────────────────────────────────────────
  {
    id: '24', dateISO: '2026-06-11',
    title: 'Ciclo de Cine Colombiano',
    category: 'eventosculturales', date: '11 de junio', time: '6:00PM',
    location: 'Cineclub UPTC', municipality: 'Tunja',
    description: 'Tres películas colombianas estrenadas en 2025, seguidas de conversatorio con los directores. Entrada libre con inscripción previa.',
    lat: 5.5340, lng: -73.3678,
    image: 'https://picsum.photos/seed/cine-colombiano/800/450',
  },

  // ── Junio 12 ────────────────────────────────────────────────────────────
  {
    id: '25', dateISO: '2026-06-12',
    title: 'Taller de Escritura Creativa',
    category: 'talleres', date: '12 de junio', time: '9:00AM',
    location: 'Biblioteca Municipal', municipality: 'Villa de Leyva',
    description: 'Taller intensivo de escritura de cuentos cortos con la escritora Ana Milena Ríos. Dirigido a mayores de 16 años.',
    lat: 5.6355, lng: -73.5240,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Plaza_Mayor_Villa_de_Leyva.JPG/1280px-Plaza_Mayor_Villa_de_Leyva.JPG',
  },

  // ── Junio 13 ────────────────────────────────────────────────────────────
  {
    id: '26', dateISO: '2026-06-13',
    title: 'Fiesta de la Virgen de Chiquinquirá',
    category: 'fiestas', date: '13 de junio', time: '10:00AM',
    location: 'Basílica Menor', municipality: 'Chiquinquirá',
    description: 'Celebración religiosa y cultural en honor a la patrona de Colombia. Procesión, música, danzas tradicionales y feria popular.',
    lat: 5.6151, lng: -73.8189,
    image: 'https://picsum.photos/seed/chiquinquira-virgen/800/450',
  },

  // ── Junio 14 ────────────────────────────────────────────────────────────
  {
    id: '27', dateISO: '2026-06-14',
    title: 'Maratón Cultural Boyacá 2026',
    category: 'deportivos', date: '14 de junio', time: '7:00AM',
    location: 'Parque Santander', municipality: 'Tunja',
    description: '5K y 10K con estaciones culturales en el recorrido: música, danza y gastronomía boyacense. Premiación para los primeros 3 lugares.',
    lat: 5.5340, lng: -73.3670,
    image: 'https://picsum.photos/seed/maraton-boyaca/800/450',
  },
  {
    id: '28', dateISO: '2026-06-14',
    title: 'Festival de Cometas de Monguí',
    category: 'otros', date: '14 de junio', time: '10:00AM',
    location: 'Páramo de Ocetá', municipality: 'Monguí',
    description: 'El festival de cometas más alto del mundo, a 3.400 msnm en el Páramo de Ocetá. Evento familiar con concurso de cometas artesanales.',
    lat: 5.7308, lng: -72.8397,
    image: 'https://picsum.photos/seed/cometas-mongui/800/450',
  },

  // ── Junio 20 ────────────────────────────────────────────────────────────
  {
    id: '29', dateISO: '2026-06-20',
    title: 'Día de la Música Boyacense',
    category: 'conciertos', date: '20 de junio', time: '4:00PM',
    location: 'Coliseo Mayor Duitama', municipality: 'Duitama',
    description: 'Gran concierto en homenaje a los compositores boyacenses. Más de 30 artistas en escena con repertorio de bambucos y torbellinos.',
    lat: 5.8273, lng: -73.0268,
    image: 'https://picsum.photos/seed/musica-boyacense/800/450',
  },

  // ── Junio 25 ────────────────────────────────────────────────────────────
  {
    id: '30', dateISO: '2026-06-25',
    title: 'Festival de Teatro al Aire Libre',
    category: 'conciertos', date: '25 de junio', time: '5:00PM',
    location: 'Plaza Mayor', municipality: 'Villa de Leyva',
    description: '4 días de teatro callejero y espectáculos en la Plaza Mayor de Villa de Leyva con compañías nacionales e internacionales.',
    lat: 5.6352, lng: -73.5243,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Plaza_Mayor_Villa_de_Leyva.JPG/1280px-Plaza_Mayor_Villa_de_Leyva.JPG',
  },

  // ── Junio 28 ────────────────────────────────────────────────────────────
  {
    id: '31', dateISO: '2026-06-28',
    title: 'Noche de Gala Filarmónica de Boyacá',
    category: 'conciertos', date: '28 de junio', time: '7:00PM',
    location: 'Teatro Suárez', municipality: 'Tunja',
    description: 'La Orquesta Filarmónica de Boyacá presenta su concierto de temporada con obras de Beethoven, Brahms y compositores colombianos.',
    lat: 5.5354, lng: -73.3665,
    image: 'https://picsum.photos/seed/filarmonica-boyaca/800/450',
  },

  // ── Julio ────────────────────────────────────────────────────────────────
  {
    id: '32', dateISO: '2026-07-04',
    title: 'Feria de los Sabores del Campo',
    category: 'ferias', date: '4 de julio', time: '9:00AM',
    location: 'Parque Principal', municipality: 'Chiquinquirá',
    description: 'Productores campesinos de Boyacá traen directamente sus cosechas, quesos, arepas y productos artesanales al parque central.',
    lat: 5.6151, lng: -73.8189,
    image: 'https://picsum.photos/seed/sabores-campo/800/450',
  },
  {
    id: '33', dateISO: '2026-07-12',
    title: 'Festival Boyacá Vive 2026',
    category: 'fiestas', date: '12 de julio', time: '2:00PM',
    location: 'Campo deportivo La Fuente', municipality: 'Tunja',
    description: 'El festival más grande del año en Boyacá con más de 20 artistas nacionales e internacionales, food trucks, arte y actividades para toda la familia.',
    lat: 5.5295, lng: -73.3720,
    image: 'https://picsum.photos/seed/boyaca-vive-2026/800/450',
  },
];

// Coordenadas por municipio para mini-mapa y eventos creados
export const MUNICIPALITY_REGIONS: Record<string, { latitude: number; longitude: number; latitudeDelta: number; longitudeDelta: number }> = {
  'Tunja':          { latitude: 5.5354, longitude: -73.3678, latitudeDelta: 0.12, longitudeDelta: 0.12 },
  'Duitama':        { latitude: 5.8273, longitude: -73.0268, latitudeDelta: 0.12, longitudeDelta: 0.12 },
  'Sogamoso':       { latitude: 5.7158, longitude: -72.9311, latitudeDelta: 0.12, longitudeDelta: 0.12 },
  'Villa de Leyva': { latitude: 5.6352, longitude: -73.5243, latitudeDelta: 0.12, longitudeDelta: 0.12 },
  'Paipa':          { latitude: 5.7806, longitude: -73.1142, latitudeDelta: 0.12, longitudeDelta: 0.12 },
  'Chiquinquirá':   { latitude: 5.6151, longitude: -73.8189, latitudeDelta: 0.12, longitudeDelta: 0.12 },
  'Monguí':         { latitude: 5.7308, longitude: -72.8397, latitudeDelta: 0.12, longitudeDelta: 0.12 },
  'Moniquirá':      { latitude: 5.8786, longitude: -73.5714, latitudeDelta: 0.12, longitudeDelta: 0.12 },
  'Nobsa':          { latitude: 5.7668, longitude: -72.9453, latitudeDelta: 0.12, longitudeDelta: 0.12 },
  'Tibasosa':       { latitude: 5.7550, longitude: -73.0009, latitudeDelta: 0.12, longitudeDelta: 0.12 },
  'Ráquira':        { latitude: 5.5348, longitude: -73.6474, latitudeDelta: 0.12, longitudeDelta: 0.12 },
};

// Vista de Colombia entera
export const COLOMBIA_REGION = {
  latitude: 4.5709, longitude: -74.2973,
  latitudeDelta: 11.0, longitudeDelta: 11.0,
};

// Vista del departamento de Boyacá completo
export const BOYACA_REGION = {
  latitude: 5.4545, longitude: -73.3620,
  latitudeDelta: 4.2, longitudeDelta: 4.2,
};

// Vista de Tunja ciudad
export const TUNJA_REGION = {
  latitude: 5.5354, longitude: -73.3678,
  latitudeDelta: 0.12, longitudeDelta: 0.12,
};
