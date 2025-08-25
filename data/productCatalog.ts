export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  specifications: {
    [key: string]: string;
  };
  rating: number;
  reviews: number;
  image: string;
  availability: 'in-stock' | 'limited' | 'out-of-stock';
  tags: string[];
}

export const PRODUCT_CATALOG: Product[] = [
  {
    id: 'laptop-001',
    name: 'MacBook Air M3',
    category: 'Laptops',
    price: 1299,
    description: 'Ultralight laptop with exceptional battery life and powerful M3 chip',
    specifications: {
      processor: 'Apple M3 Chip',
      memory: '16GB Unified Memory',
      storage: '512GB SSD',
      display: '13.6-inch Liquid Retina',
      battery: 'Up to 18 hours',
      weight: '2.7 lbs'
    },
    rating: 4.8,
    reviews: 2847,
    image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg',
    availability: 'in-stock',
    tags: ['lightweight', 'long-battery', 'premium', 'portable', 'travel']
  },
  {
    id: 'laptop-002',
    name: 'Dell XPS 13 Plus',
    category: 'Laptops',
    price: 1199,
    description: 'Premium ultrabook with stunning InfinityEdge display',
    specifications: {
      processor: 'Intel Core i7-1360P',
      memory: '16GB LPDDR5',
      storage: '512GB PCIe SSD',
      display: '13.4-inch OLED touch',
      battery: 'Up to 12 hours',
      weight: '2.73 lbs'
    },
    rating: 4.6,
    reviews: 1923,
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg',
    availability: 'in-stock',
    tags: ['premium', 'oled', 'touchscreen', 'business', 'compact']
  },
  {
    id: 'laptop-003',
    name: 'ASUS ROG Zephyrus G14',
    category: 'Laptops',
    price: 1599,
    description: 'High-performance gaming laptop with AMD Ryzen processor',
    specifications: {
      processor: 'AMD Ryzen 9 7940HS',
      memory: '32GB DDR5',
      storage: '1TB PCIe SSD',
      display: '14-inch QHD 165Hz',
      battery: 'Up to 10 hours',
      weight: '3.64 lbs',
      graphics: 'NVIDIA RTX 4060'
    },
    rating: 4.7,
    reviews: 1456,
    image: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg',
    availability: 'in-stock',
    tags: ['gaming', 'high-performance', 'rgb', 'amd', 'dedicated-graphics']
  },
  {
    id: 'phone-001',
    name: 'iPhone 15 Pro',
    category: 'Smartphones',
    price: 999,
    description: 'Pro camera system with titanium design and A17 Pro chip',
    specifications: {
      processor: 'A17 Pro Chip',
      memory: '8GB RAM',
      storage: '256GB',
      display: '6.1-inch Super Retina XDR',
      battery: 'Up to 23 hours video',
      camera: '48MP Main + 12MP Ultra Wide + 12MP Telephoto',
      material: 'Titanium'
    },
    rating: 4.9,
    reviews: 5234,
    image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg',
    availability: 'in-stock',
    tags: ['premium', 'camera', 'titanium', 'pro', '5g']
  },
  {
    id: 'phone-002',
    name: 'Samsung Galaxy S24 Ultra',
    category: 'Smartphones',
    price: 1199,
    description: 'Ultimate productivity phone with S Pen and advanced AI features',
    specifications: {
      processor: 'Snapdragon 8 Gen 3',
      memory: '12GB RAM',
      storage: '512GB',
      display: '6.8-inch Dynamic AMOLED 2X',
      battery: '5000mAh',
      camera: '200MP Main + 50MP Periscope + 12MP Ultra Wide + 10MP Telephoto',
      extras: 'S Pen included'
    },
    rating: 4.7,
    reviews: 3891,
    image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg',
    availability: 'in-stock',
    tags: ['s-pen', 'productivity', 'large-screen', 'camera', 'android']
  },
  {
    id: 'tablet-001',
    name: 'iPad Pro 12.9"',
    category: 'Tablets',
    price: 1099,
    description: 'Professional tablet with M2 chip and Liquid Retina XDR display',
    specifications: {
      processor: 'Apple M2 Chip',
      memory: '16GB RAM',
      storage: '512GB',
      display: '12.9-inch Liquid Retina XDR',
      battery: 'Up to 10 hours',
      camera: '12MP Wide + 10MP Ultra Wide',
      connectivity: 'Wi-Fi 6E + 5G'
    },
    rating: 4.8,
    reviews: 2156,
    image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg',
    availability: 'in-stock',
    tags: ['professional', 'large-screen', 'apple-pencil', 'creative', 'productivity']
  },
  {
    id: 'headphones-001',
    name: 'Sony WH-1000XM5',
    category: 'Audio',
    price: 399,
    description: 'Industry-leading noise canceling wireless headphones',
    specifications: {
      type: 'Over-ear wireless',
      battery: 'Up to 30 hours',
      features: 'Active Noise Canceling',
      connectivity: 'Bluetooth 5.2',
      weight: '8.8 oz',
      drivers: '30mm'
    },
    rating: 4.9,
    reviews: 8934,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
    availability: 'in-stock',
    tags: ['noise-canceling', 'wireless', 'premium', 'travel', 'long-battery']
  },
  {
    id: 'watch-001',
    name: 'Apple Watch Series 9',
    category: 'Wearables',
    price: 429,
    description: 'Advanced health and fitness tracking with powerful apps',
    specifications: {
      processor: 'S9 SiP',
      display: '45mm Retina LTPO OLED',
      battery: 'Up to 18 hours',
      connectivity: 'GPS + Cellular',
      health: 'ECG, Blood Oxygen, Temperature',
      water: '50m water resistant'
    },
    rating: 4.7,
    reviews: 4521,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
    availability: 'in-stock',
    tags: ['health', 'fitness', 'smartwatch', 'apple', 'cellular']
  },
  {
    id: 'monitor-001',
    name: 'Dell UltraSharp 27" 4K',
    category: 'Monitors',
    price: 649,
    description: 'Professional 4K monitor with exceptional color accuracy',
    specifications: {
      size: '27-inch',
      resolution: '3840 x 2160 (4K)',
      panel: 'IPS Black technology',
      refresh: '60Hz',
      connectivity: 'USB-C, HDMI, DisplayPort',
      adjustability: 'Height, tilt, swivel, pivot'
    },
    rating: 4.6,
    reviews: 1847,
    image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg',
    availability: 'in-stock',
    tags: ['4k', 'professional', 'color-accurate', 'usb-c', 'adjustable']
  },
  {
    id: 'camera-001',
    name: 'Sony A7 IV',
    category: 'Cameras',
    price: 2499,
    description: 'Full-frame mirrorless camera with advanced hybrid autofocus',
    specifications: {
      sensor: '33MP Full-Frame CMOS',
      video: '4K 60p recording',
      autofocus: '759-point AF system',
      viewfinder: '3.69M-dot OLED EVF',
      battery: '530 shots per charge',
      weight: '1.43 lbs'
    },
    rating: 4.8,
    reviews: 967,
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
    availability: 'in-stock',
    tags: ['full-frame', 'mirrorless', 'professional', '4k-video', 'photography']
  }
];