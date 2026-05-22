export interface Property {
  id: string;
  name: string;
  location: string;
  city: string;
  priceNumeric: number; // in rupees
  priceFormatted: string;
  type: 'Apartment' | 'Villa' | 'House' | 'Penthouse' | 'Townhouse';
  sqft: number;
  beds: number;
  baths: number;
  imageUrl: string;
  description: string;
  amenities: string[];
}

export const PROPERTIES: Property[] = [
  {
    id: '1',
    name: 'Prestige Willow Heights',
    location: 'Whitefield, Bengaluru',
    city: 'Bengaluru',
    priceNumeric: 12500000, // 1.25 Cr
    priceFormatted: '₹1.25 Cr',
    type: 'Apartment',
    sqft: 1450,
    beds: 3,
    baths: 2,
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
    description: 'A masterpiece of contemporary architecture situated in the heart of Bengaluru\'s tech corridor. prestige Willow Heights offers an unparalleled lifestyle with modern amenities, smart-home integration, and state-of-the-art clubhouses.',
    amenities: ['24/7 Security', 'Infinity Pool', 'Gymnasium', 'Power Backup', 'Srinagar Park Facing', 'Smart Locks']
  },
  {
    id: '2',
    name: 'Sobha Cedar Ridge',
    location: 'Gachibowli, Hyderabad',
    city: 'Hyderabad',
    priceNumeric: 15800000, // 1.58 Cr
    priceFormatted: '₹1.58 Cr',
    type: 'Apartment',
    sqft: 1620,
    beds: 3,
    baths: 2,
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800',
    description: 'Thoughtfully designed high-rise apartment spaces offering spectacular skyline views of Gachibowli. Enjoy robust concrete structure, abundant natural ventilation, and premium imported marble flooring.',
    amenities: ['Spacious Balcony', 'High-speed Elevators', 'Clubhouse', 'Yoga Deck', 'Central Gas Line', 'Intercom']
  },
  {
    id: '3',
    name: 'Lodha Oakwood Tower',
    location: 'Lower Parel, Mumbai',
    city: 'Mumbai',
    priceNumeric: 42500000, // 4.25 Cr
    priceFormatted: '₹4.25 Cr',
    type: 'Penthouse',
    sqft: 2100,
    beds: 4,
    baths: 3,
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800',
    description: 'An elite penthouse that defines sky-high luxury living. Spanning across a prime segment of Lower Parel, this property boasts double-height ceilings, a private terrace-top jacuzzi, and floor-to-ceiling double glazed glass windows.',
    amenities: ['Private Jacuzzi', 'Concierge Service', 'Valet Parking', 'VRV Air Conditioning', 'Sky Lounge', 'Wine Cellar']
  },
  {
    id: '4',
    name: 'Azure Villa',
    location: 'Candolim, Goa',
    city: 'Goa',
    priceNumeric: 68500000, // 6.85 Cr
    priceFormatted: '₹6.85 Cr',
    type: 'Villa',
    sqft: 4200,
    beds: 5,
    baths: 4,
    imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800',
    description: 'A breath-taking sea-facing pool villa in Goa. Melding modern minimalist Portuguese facets with high-glass contemporary architecture, Azure Villa provides absolute privacy, private shoreline access, and lush palm landscaping.',
    amenities: ['Private Beach Access', 'Infinity Pool', 'Staff Quarters', 'Solar Panel Array', 'BBQ Grill Area', 'Landscaped Lawn']
  },
  {
    id: '5',
    name: 'Pinegrove Retreat',
    location: 'Kasauli, Himachal Pradesh',
    city: 'Himachal Pradesh',
    priceNumeric: 31500000, // 3.15 Cr
    priceFormatted: '₹3.15 Cr',
    type: 'House',
    sqft: 2800,
    beds: 4,
    baths: 3,
    imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800',
    description: 'A tranquil mountain cottage crafted with premium cedar wood and natural mountain basalt stone. Set against the silent pine woods of Kasauli, it features dual cozy fireplaces and glass-walled viewing bays.',
    amenities: ['Fireplace', 'Glass Sunroom', 'Attic Study', 'Rainwater Harvesting', 'Organic Kitchen Garden', 'Perimeter Fence']
  },
  {
    id: '6',
    name: 'Linden Court',
    location: 'Koregaon Park, Pune',
    city: 'Pune',
    priceNumeric: 9800000, // 98.00 L
    priceFormatted: '₹98.00 L',
    type: 'Townhouse',
    sqft: 1250,
    beds: 2,
    baths: 2,
    imageUrl: 'https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?auto=format&fit=crop&q=80&w=800',
    description: 'A sophisticated townhouse in the tree-lined lanes of Koregaon Park. Linden Court merges European-inspired brick-paved exteriors with highly functional modern interiors, ideal for premium city life.',
    amenities: ['Private Gated Entrance', 'Rooftop Terrace Space', 'Automated Security System', 'Italian Modular Kitchen', 'EV Charger']
  },
  {
    id: '7',
    name: 'DLF Skyline Residences',
    location: 'Golf Course Road, Gurugram',
    city: 'Gurugram',
    priceNumeric: 28500000, // 2.85 Cr
    priceFormatted: '₹2.85 Cr',
    type: 'Apartment',
    sqft: 1850,
    beds: 3,
    baths: 2,
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    description: 'Prime luxury residences situated directly along Gurugram\'s elite highway strip. DLF Skyline offers direct access to the golf green, world-class smart elevators, and a multi-tiered clubhouse infrastructure.',
    amenities: ['Golf Course Views', 'Semi-Olympic Indoor Pool', 'Squash Courts', '24/7 Concierge', 'Central Gas System', 'Double Glazed Windows']
  },
  {
    id: '8',
    name: 'Marble Estate',
    location: 'Jubilee Hills, Hyderabad',
    city: 'Hyderabad',
    priceNumeric: 95000000, // 9.50 Cr
    priceFormatted: '₹9.50 Cr',
    type: 'Villa',
    sqft: 6200,
    beds: 6,
    baths: 5,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
    description: 'An architectural tour de force exhibiting pristine Greek and Italian marble construction. Standing high in Jubilee Hills, this colossal estate boasts an indoor home theater, fully smart control setups, and manicured zen lawns.',
    amenities: ['Manicured Zen Lawn', 'Private Cinema Hall', 'Home Automation', 'Fitted Wine Cellar', 'Elevator', 'Basement Parking (4 Cars)']
  },
  {
    id: '9',
    name: 'Harbor Lofts',
    location: 'Bandra West, Mumbai',
    city: 'Mumbai',
    priceNumeric: 22500000, // 2.25 Cr
    priceFormatted: '₹2.25 Cr',
    type: 'Apartment',
    sqft: 1350,
    beds: 2,
    baths: 2,
    imageUrl: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&q=80&w=800',
    description: 'Chic sea-breeze lofts situated right off the Bandra Promenade. Featuring an open-plan kitchen layout, modern concrete flooring finish, and grand balcony overlooks that catch the famous Mumbai sunset.',
    amenities: ['Sea View Balcony', 'High Ceilings', 'Security Lounge', 'Modular Fitting Wardrobes', 'Premium Bathroom Fittings']
  },
  {
    id: '10',
    name: 'Maple Grove House',
    location: 'Sarjapur, Bengaluru',
    city: 'Bengaluru',
    priceNumeric: 18900000, // 1.89 Cr
    priceFormatted: '₹1.89 Cr',
    type: 'House',
    sqft: 2400,
    beds: 4,
    baths: 3,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    description: 'An eco-engineered house featuring premium teak cladding and thermal-insulated concrete walls. Embedded in a serene, security-monitored community in Sarjapur, it is perfect for a quiet, eco-friendly lifestyle.',
    amenities: ['Rainwater Harvesting', 'Solar Geyser System', 'Covered Carpark', 'Private Backyard', 'Wooden Floors']
  },
  {
    id: '11',
    name: 'Cobalt Tower 14B',
    location: 'BKC, Mumbai',
    city: 'Mumbai',
    priceNumeric: 56500000, // 5.65 Cr
    priceFormatted: '₹5.65 Cr',
    type: 'Penthouse',
    sqft: 2200,
    beds: 3,
    baths: 3,
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800',
    description: 'A lavish luxury apartment towering above the business district of Bandra Kurla Complex. Enjoy panoramic metropolitan vistas, dedicated express elevator, and bespoke Italian fittings throughout.',
    amenities: ['Exclusive Elevator Entry', 'Metro Overlook Balcony', 'Gym & Spa Membership', 'Dedicated Server Room', '24/7 Security Cover']
  },
  {
    id: '12',
    name: 'Ashford Row',
    location: 'Indiranagar, Bengaluru',
    city: 'Bengaluru',
    priceNumeric: 14500000, // 1.45 Cr
    priceFormatted: '₹1.45 Cr',
    type: 'Townhouse',
    sqft: 1600,
    beds: 3,
    baths: 2,
    imageUrl: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&q=80&w=800',
    description: 'A rare mid-century designed townhouse located in Bengaluru\'s most active, boutique cafe-filled district. Ashford Row balances vibrant outdoor accessibility with quiet, brick-insulated private courtyard relaxation.',
    amenities: ['Private Courtyard Garden', 'Fitted Solar Power', 'Stained Glass Bay Windows', 'Modular Pantry', 'Underground Storage']
  }
];

export const CITIES = Array.from(new Set(PROPERTIES.map(p => p.city))).sort();
export const PROPERTY_TYPES = ['Any', 'Apartment', 'Villa', 'House', 'Penthouse', 'Townhouse'];
export const PRICE_RANGES = [
  { label: 'Any Price', min: 0, max: Infinity },
  { label: 'Under ₹1.5 Cr', min: 0, max: 15000000 },
  { label: '₹1.5 Cr - ₹3.0 Cr', min: 15000000, max: 30000000 },
  { label: '₹3.0 Cr - ₹6.0 Cr', min: 30000000, max: 60000000 },
  { label: 'Above ₹6.0 Cr', min: 60000000, max: Infinity }
];
