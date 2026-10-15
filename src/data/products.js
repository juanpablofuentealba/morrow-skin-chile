// Catálogo de Morrow Skin Chile — precios en CLP (pesos chilenos)
// Las imágenes se cargan desde Unsplash (requieren internet).

export const money = (amount) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(amount)

export const imageUrl = (id, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

export const normalizeText = (text) =>
  text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es')

export const FREE_SHIPPING_THRESHOLD = 30000 // envío gratis desde $30.000 CLP

export const products = [
  {
    id: 1,
    slug: 'limpiador-leche-de-nube',
    name: 'Limpiador Leche de Nube',
    detail: 'Limpieza suave para cada día',
    category: 'Limpieza',
    price: 15990,
    tag: 'FAVORITO',
    image: 'photo-1608248543803-ba4f8c70ae0b',
    tone: 'sage',
    description:
      'Una limpieza cremosa y suave que remueve impurezas sin resecar. Ideal para la piel diaria, mañana y noche.',
  },
  {
    id: 2,
    slug: 'serum-punto-de-rocio',
    name: 'Sérum Punto de Rocío',
    detail: 'Dos gotas para devolverle frescura a tu piel',
    category: 'Tratamiento',
    price: 25990,
    tag: 'RECIÉN LLEGADO',
    image: 'photo-1601049541289-9b1b7bbbfe19',
    tone: 'pink',
    description:
      'Sérum ligero con ácido hialurónico que hidrata en profundidad y devuelve luminosidad. Fórmula fresca de rápida absorción.',
  },
  {
    id: 3,
    slug: 'crema-facial-luz-de-dia',
    name: 'Crema Facial Luz de Día',
    detail: 'Hidratación reconfortante que dura',
    category: 'Hidratación',
    price: 21990,
    tag: '',
    image: 'photo-1556229010-6c3f2c9ca5f8',
    tone: 'yellow',
    description:
      'Hidratación diaria que deja la piel suave y confortable durante todo el día. Textura ligera sin sensación grasa.',
  },
  {
    id: 4,
    slug: 'protector-solar-acabado-natural',
    name: 'Protector Solar Acabado Natural FPS 30',
    detail: 'Protección diaria, sin complicaciones',
    category: 'Protección',
    price: 19990,
    tag: 'ESENCIAL DIARIO',
    image: 'photo-1556228720-195a672e8a03',
    tone: 'blue',
    description:
      'Protector solar de toque natural que protege a diario sin dejar residuo blanco. Uso diario, incluso bajo nubes.',
  },
  {
    id: 5,
    slug: 'tonico-brisa-de-manana',
    name: 'Tónico Brisa de Mañana',
    detail: 'Refresca y equilibra al despertar',
    category: 'Limpieza',
    price: 14990,
    tag: '',
    image: 'photo-1612817288484-6f916006741a',
    tone: 'sage',
    description:
      'Tónico suave que equilibra el pH y deja una sensación fresca. Perfecto para comenzar la rutina.',
  },
  {
    id: 6,
    slug: 'contorno-de-ojos-mirada-descansada',
    name: 'Contorno de Ojos Mirada Descansada',
    detail: 'Reduce la hinchazón y unifica',
    category: 'Tratamiento',
    price: 22990,
    tag: 'BESTSELLER',
    image: 'photo-1616394584738-fc6e612e71b9',
    tone: 'pink',
    description:
      'Contorno iluminador que descongestiona y suaviza la mirada. Apta para pieles sensibles.',
  },
  {
    id: 7,
    slug: 'aceite-rostro-oro-tranquilo',
    name: 'Aceite de Rostro Oro Tranquilo',
    detail: 'Nutrición profunda en pocas gotas',
    category: 'Hidratación',
    price: 27990,
    tag: '',
    image: 'photo-1620916566398-39f1143ab7be',
    tone: 'yellow',
    description:
      'Aceite nutritivo de rápida absorción que sella la hidratación. Unto fino ideal para pieles secas.',
  },
  {
    id: 8,
    slug: 'balsamo-labial-sombra-calida',
    name: 'Bálsamo Labial Sombra Cálida',
    detail: 'Hidratación de labios con color',
    category: 'Protección',
    price: 12990,
    tag: 'NUEVO',
    image: 'photo-1631730359585-38a4935cbec4',
    tone: 'blue',
    description:
      'Bálsamo que hidrata y aporta un toque de color natural. Cómodo y nutritivo para el uso diario.',
  },
]

export const categories = ['Todo', 'Limpieza', 'Tratamiento', 'Hidratación', 'Protección']

export const getProductBySlug = (slug) => products.find((p) => p.slug === slug)