export const MOCK_EVENTS = [
  {
    id: '1',
    title: 'Festival de Teatro',
    category: 'conciertos',
    date: '19 de mayo',
    time: '8:00PM',
    location: 'Plaza de Bolívar',
    municipality: 'Tunja',
    description: 'El Festival Internacional de Teatro llega a Tunja con las mejores obras de compañías locales e internacionales. Tres días de magia en el corazón de Boyacá.',
    lat: 5.5354, lng: -73.3675,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Tunja_-_Plaza_de_Bol%C3%ADvar_y_Catedral.jpg/1280px-Tunja_-_Plaza_de_Bol%C3%ADvar_y_Catedral.jpg',
  },
  {
    id: '2',
    title: 'Noche de Jazz en San Lázaro',
    category: 'conciertos',
    date: '22 de mayo',
    time: '7:00PM',
    location: 'San Lázaro',
    municipality: 'Tunja',
    description: 'Una noche especial de jazz en vivo en el histórico barrio San Lázaro de Tunja.',
    lat: 5.5408, lng: -73.3612,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Tunja_Boyac%C3%A1_Colombia.jpg/1280px-Tunja_Boyac%C3%A1_Colombia.jpg',
  },
  {
    id: '3',
    title: 'Muestra de Folclor Boyacense',
    category: 'eventosculturales',
    date: '25 de mayo',
    time: '3:00PM',
    location: 'El Bosque',
    municipality: 'Tunja',
    description: 'Grupos de danza folclórica de todo Boyacá se reúnen para una gran muestra de nuestra identidad cultural.',
    lat: 5.5290, lng: -73.3740,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Boyac%C3%A1_department_in_Colombia.svg/800px-Boyac%C3%A1_department_in_Colombia.svg.png',
  },
  {
    id: '4',
    title: 'Feria del Libro Boyacense',
    category: 'ferias',
    date: '1 de junio',
    time: '10:00AM',
    location: 'Centro Cultural',
    municipality: 'Duitama',
    description: 'La feria del libro más importante del departamento con escritores locales y talleres de escritura creativa.',
    lat: 5.8273, lng: -73.0268,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Duitama_Boyaca_Colombia.jpg/1280px-Duitama_Boyaca_Colombia.jpg',
  },
  {
    id: '5',
    title: 'Conferencia Arte Rupestre',
    category: 'conferencias',
    date: '5 de junio',
    time: '9:00AM',
    location: 'Museo El Fósil',
    municipality: 'Villa de Leyva',
    description: 'Conferencia única sobre el arte rupestre de Boyacá y su relación con las culturas prehispánicas de la región.',
    lat: 5.6352, lng: -73.5243,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Plaza_Mayor_Villa_de_Leyva.JPG/1280px-Plaza_Mayor_Villa_de_Leyva.JPG',
  },
  {
    id: '6',
    title: 'Festival Gastronómico de Paipa',
    category: 'fiestas',
    date: '10 de junio',
    time: '12:00PM',
    location: 'Parque Central',
    municipality: 'Paipa',
    description: 'Los mejores sabores de la cocina boyacense en un solo lugar. Cocido boyacense, masato, chicha y más.',
    lat: 5.7806, lng: -73.1142,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Municipio_de_Paipa%2C_Boyac%C3%A1.jpg/1280px-Municipio_de_Paipa%2C_Boyac%C3%A1.jpg',
  },
];

export const WEEK_DAYS = [
  { day: 'LUN', num: 6 },
  { day: 'MAR', num: 7 },
  { day: 'MIÉ', num: 8 },
  { day: 'JUE', num: 9 },
  { day: 'VIE', num: 10 },
  { day: 'SÁB', num: 11 },
];

// Vista amplia de Colombia (para pantalla de selección de municipio)
export const COLOMBIA_REGION = {
  latitude: 4.5709,
  longitude: -74.2973,
  latitudeDelta: 11.0,
  longitudeDelta: 11.0,
};

// Coordenadas reales del departamento de Boyacá
export const BOYACA_REGION = {
  latitude: 5.4545,
  longitude: -73.3620,
  latitudeDelta: 4.2,
  longitudeDelta: 4.2,
};

// Coordenadas reales de Tunja
export const TUNJA_REGION = {
  latitude: 5.5354,
  longitude: -73.3678,
  latitudeDelta: 0.12,
  longitudeDelta: 0.12,
};

// Regiones por municipio para el mini-mapa del feed
export const MUNICIPALITY_REGIONS: Record<string, typeof TUNJA_REGION> = {
  'Tunja':        { latitude: 5.5354, longitude: -73.3678, latitudeDelta: 0.12, longitudeDelta: 0.12 },
  'Duitama':      { latitude: 5.8273, longitude: -73.0268, latitudeDelta: 0.12, longitudeDelta: 0.12 },
  'Sogamoso':     { latitude: 5.7158, longitude: -72.9311, latitudeDelta: 0.12, longitudeDelta: 0.12 },
  'Villa de Leyva': { latitude: 5.6352, longitude: -73.5243, latitudeDelta: 0.12, longitudeDelta: 0.12 },
  'Paipa':        { latitude: 5.7806, longitude: -73.1142, latitudeDelta: 0.12, longitudeDelta: 0.12 },
  'Chiquinquirá': { latitude: 5.6151, longitude: -73.8189, latitudeDelta: 0.12, longitudeDelta: 0.12 },
  'Monguí':       { latitude: 5.7308, longitude: -72.8397, latitudeDelta: 0.12, longitudeDelta: 0.12 },
};
