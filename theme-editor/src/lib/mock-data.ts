import type {
  ShopifyProduct, ShopifyCollection, ShopifyCart, ShopifyShop,
  ShopifyRoutes, ShopifyRequest, ShopifyLinklist, ShopifyGlobals,
  ShopifyVariant, ShopifyImage,
} from '@/types/shopify';

function mockImage(name: string, w = 600, h = 800): ShopifyImage {
  return {
    src: `https://placehold.co/${w}x${h}/B8860B/fff?text=${encodeURIComponent(name)}`,
    alt: name,
    width: w,
    height: h,
  };
}

function mockVariant(product: { id: number; title: string; price: number }): ShopifyVariant {
  return {
    id: product.id * 100 + 1,
    title: 'Default Title',
    price: product.price,
    compare_at_price: null,
    available: true,
    sku: `DA-${product.id}`,
    weight: 1500,
    weight_unit: 'g',
    featured_image: null,
  };
}

const PRODUCTS_DATA = [
  { id: 1, title: 'Ganesh Murti', handle: 'ganesh-murti', type: 'Brass Murti', price: 4900, tags: ['deity:Ganesh', 'chakra:Root', 'element:Earth'], tagline: 'Remover of Obstacles', mantra: 'Om Gam Ganapataye Namaha' },
  { id: 2, title: 'Shiva Nataraja', handle: 'shiva-nataraja', type: 'Brass Murti', price: 7900, tags: ['deity:Shiva', 'chakra:Third Eye', 'element:Fire'], tagline: 'Cosmic Dancer', mantra: 'Om Namah Shivaya' },
  { id: 3, title: 'Krishna Playing Flute', handle: 'krishna-flute', type: 'Brass Murti', price: 5900, tags: ['deity:Krishna', 'chakra:Heart', 'element:Air'], tagline: 'Divine Melody', mantra: 'Hare Krishna Hare Krishna' },
  { id: 4, title: 'Lakshmi Devi', handle: 'lakshmi-devi', type: 'Brass Murti', price: 6500, tags: ['deity:Lakshmi', 'chakra:Solar Plexus', 'element:Water'], tagline: 'Goddess of Abundance', mantra: 'Om Shreem Mahalakshmiyei Namaha' },
  { id: 5, title: 'Hanuman Ji', handle: 'hanuman-ji', type: 'Brass Murti', price: 5500, tags: ['deity:Hanuman', 'chakra:Root', 'element:Air'], tagline: 'Embodiment of Devotion', mantra: 'Om Hanumate Namaha' },
  { id: 6, title: 'Saraswati Devi', handle: 'saraswati-devi', type: 'Brass Murti', price: 6200, tags: ['deity:Saraswati', 'chakra:Throat', 'element:Water'], tagline: 'Goddess of Wisdom', mantra: 'Om Aim Saraswatyai Namaha' },
  { id: 7, title: 'Buddha Meditation', handle: 'buddha-meditation', type: 'Brass Murti', price: 4500, tags: ['deity:Buddha', 'chakra:Crown', 'element:Ether'], tagline: 'Path to Enlightenment', mantra: 'Om Mani Padme Hum' },
  { id: 8, title: 'Durga Maa', handle: 'durga-maa', type: 'Brass Murti', price: 8500, tags: ['deity:Durga', 'chakra:Solar Plexus', 'element:Fire'], tagline: 'Divine Feminine Power', mantra: 'Om Dum Durgayei Namaha' },
];

export function createMockProducts(): ShopifyProduct[] {
  return PRODUCTS_DATA.map((d) => {
    const img = mockImage(d.title);
    const variant = mockVariant(d);
    return {
      id: d.id,
      title: d.title,
      handle: d.handle,
      description: `Handcrafted solid brass ${d.title} from Haridwar. ${d.tagline}.`,
      type: d.type,
      vendor: 'Divine Arts',
      url: `/products/${d.handle}`,
      featured_image: img,
      images: [img, mockImage(`${d.title} Side`, 600, 800), mockImage(`${d.title} Back`, 600, 800)],
      variants: [variant],
      tags: d.tags,
      price: d.price,
      price_min: d.price,
      price_max: d.price,
      compare_at_price: null,
      available: true,
      metafields: {
        custom: {
          tagline: d.tagline,
          mantra: d.mantra,
          height: '12 inches',
          length_breadth: '6 x 4 inches',
          weight_grams: '1500',
          finish: 'Antique Gold',
          vastu_direction: 'East',
          vastu_description: 'Place facing east for optimal energy flow.',
          chakra_name: d.tags.find(t => t.startsWith('chakra:'))?.split(':')[1] || '',
          chakra_description: 'Activates and balances the associated chakra energy.',
          element_name: d.tags.find(t => t.startsWith('element:'))?.split(':')[1] || '',
          element_description: 'Connected to the elemental energy of the universe.',
          long_description: `This exquisite ${d.title} is handcrafted by master artisans in Haridwar using traditional lost-wax casting techniques. Each piece is made from 100% solid brass and finished with care.`,
        },
      },
      first_available_variant: variant,
    };
  });
}

export function createMockShop(): ShopifyShop {
  return {
    name: 'Divine Arts',
    url: 'https://divinearts.store',
    description: 'Sacred brass murtis handcrafted in Haridwar.',
    email: 'namaste@divinearts.store',
    money_format: '${{amount}}',
    currency: 'USD',
    locale: 'en',
  };
}

export function createMockCollection(products?: ShopifyProduct[]): ShopifyCollection {
  const p = products || createMockProducts();
  return {
    id: 1,
    title: 'Sacred Forms',
    handle: 'all',
    description: 'Our complete collection of handcrafted brass murtis from Haridwar.',
    url: '/collections/all',
    image: mockImage('Sacred Forms', 1200, 600),
    products: p,
    products_count: p.length,
    all_tags: [...new Set(p.flatMap(pr => pr.tags))],
  };
}

export function createMockCart(): ShopifyCart {
  return {
    item_count: 2,
    total_price: 10800,
    items: [
      {
        id: 101, title: 'Ganesh Murti', variant_title: 'Default Title',
        quantity: 1, price: 4900, line_price: 4900,
        image: 'https://placehold.co/100x100/B8860B/fff?text=Ganesh',
        url: '/products/ganesh-murti', handle: 'ganesh-murti',
      },
      {
        id: 201, title: 'Krishna Playing Flute', variant_title: 'Default Title',
        quantity: 1, price: 5900, line_price: 5900,
        image: 'https://placehold.co/100x100/B8860B/fff?text=Krishna',
        url: '/products/krishna-flute', handle: 'krishna-flute',
      },
    ],
    currency: 'USD',
  };
}

export function createMockRoutes(): ShopifyRoutes {
  return {
    root_url: '/',
    account_url: '/account',
    account_login_url: '/account/login',
    account_logout_url: '/account/logout',
    account_register_url: '/account/register',
    collections_url: '/collections',
    cart_url: '/cart',
    search_url: '/search',
  };
}

export function createMockLinklists(): Record<string, ShopifyLinklist> {
  return {
    'main-menu': {
      title: 'Main Menu',
      handle: 'main-menu',
      links: [
        { title: 'Home', url: '/', active: true, links: [] },
        { title: 'Collection', url: '/collections/all', active: false, links: [] },
        { title: 'Guide', url: '/pages/guide', active: false, links: [] },
        { title: 'About', url: '/pages/about', active: false, links: [] },
        { title: 'Contact', url: '/pages/contact', active: false, links: [] },
      ],
    },
    'footer-quick': {
      title: 'Quick Links',
      handle: 'footer-quick',
      links: [
        { title: 'Collection', url: '/collections/all', active: false, links: [] },
        { title: 'About Us', url: '/pages/about', active: false, links: [] },
        { title: 'Contact', url: '/pages/contact', active: false, links: [] },
      ],
    },
    'footer-help': {
      title: 'Help',
      handle: 'footer-help',
      links: [
        { title: 'Shipping', url: '/pages/shipping', active: false, links: [] },
        { title: 'Returns', url: '/pages/returns', active: false, links: [] },
        { title: 'FAQ', url: '/pages/faq', active: false, links: [] },
      ],
    },
    'footer-legal': {
      title: 'Legal',
      handle: 'footer-legal',
      links: [
        { title: 'Privacy Policy', url: '/pages/privacy', active: false, links: [] },
        { title: 'Terms of Service', url: '/pages/terms', active: false, links: [] },
      ],
    },
  };
}

export function createMockRequest(): ShopifyRequest {
  return {
    locale: { iso_code: 'en', endpoint_prefix: '' },
    page_type: 'index',
  };
}

export function createMockGlobals(settings: Record<string, unknown>): ShopifyGlobals {
  const products = createMockProducts();
  const collection = createMockCollection(products);
  return {
    shop: createMockShop(),
    cart: createMockCart(),
    routes: createMockRoutes(),
    request: createMockRequest(),
    linklists: createMockLinklists(),
    collections: { all: collection, 'sacred-forms': collection },
    settings,
    page_title: 'Divine Arts',
    page_description: 'Sacred brass murtis handcrafted in Haridwar.',
    canonical_url: 'https://divinearts.store',
    content_for_header: '',
  };
}
