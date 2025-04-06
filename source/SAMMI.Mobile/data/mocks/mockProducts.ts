import { Product } from '@/domain/entities/Product';

export const mockProducts: Product[] = [
  // Skincare products
  {
    id: 'sk001',
    name: 'Hydrating Facial Cleanser',
    brand: 'Glow Essentials',
    price: 24.99,
    description: 'A gentle, hydrating cleanser that removes makeup and impurities without stripping the skin of its natural moisture.',
    ingredients: 'Water, Glycerin, Sodium Hyaluronate, Ceramide NP, Niacinamide, Panthenol, Allantoin',
    howToUse: 'Apply to damp skin, massage gently, and rinse thoroughly with warm water. Use morning and evening.',
    imageUrls: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1570194065650-d99fb4ee0d03?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    rating: 4.7,
    reviewCount: 128,
    categoryId: 'skincare',
    tags: ['cleanser', 'hydrating', 'sensitive skin'],
    isNew: true,
    stockQuantity: 50
  },
  {
    id: 'sk002',
    name: 'Vitamin C Brightening Serum',
    brand: 'Glow Essentials',
    price: 38.99,
    description: 'A powerful serum that brightens skin tone, reduces dark spots, and boosts collagen production for a more radiant complexion.',
    ingredients: 'Water, Ascorbic Acid (Vitamin C), Ferulic Acid, Vitamin E, Hyaluronic Acid, Glycerin',
    howToUse: 'Apply 3-4 drops to clean, dry skin in the morning before moisturizer and sunscreen.',
    imageUrls: [
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    rating: 4.9,
    reviewCount: 256,
    categoryId: 'skincare',
    tags: ['serum', 'brightening', 'vitamin c'],
    isBestSeller: true,
    stockQuantity: 35
  },
  {
    id: 'sk003',
    name: 'Hyaluronic Acid Moisture Boost',
    brand: 'Hydra Beauty',
    price: 42.00,
    originalPrice: 52.00,
    description: 'An intensive hydrating serum with multiple weights of hyaluronic acid to deeply hydrate all layers of the skin.',
    ingredients: 'Water, Sodium Hyaluronate, Glycerin, Panthenol, Niacinamide, Ceramides',
    howToUse: 'Apply to damp skin after cleansing. Follow with moisturizer to lock in hydration.',
    imageUrls: [
      'https://images.unsplash.com/photo-1611930022073-84a47d27e4e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1611930021592-a8cfd5319ceb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    rating: 4.8,
    reviewCount: 189,
    categoryId: 'skincare',
    tags: ['serum', 'hydrating', 'hyaluronic acid'],
    isOnSale: true,
    stockQuantity: 42
  },
  {
    id: 'sk004',
    name: 'Nourishing Night Cream',
    brand: 'Hydra Beauty',
    price: 48.00,
    description: 'A rich, nourishing night cream that repairs and rejuvenates skin while you sleep for a refreshed complexion by morning.',
    ingredients: 'Shea Butter, Ceramides, Peptides, Niacinamide, Squalane, Evening Primrose Oil',
    howToUse: 'Apply a small amount to clean skin before bed. Gently massage until absorbed.',
    imageUrls: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1598452963314-b09f397a5c48?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    rating: 4.6,
    reviewCount: 142,
    categoryId: 'skincare',
    tags: ['moisturizer', 'night cream', 'anti-aging'],
    stockQuantity: 28
  },
  
  // Makeup products
  {
    id: 'mk001',
    name: 'Luminous Silk Foundation',
    brand: 'Luxe Cosmetics',
    price: 52.00,
    description: 'A lightweight, buildable foundation that gives a natural, luminous finish while evening out skin tone.',
    ingredients: 'Water, Cyclopentasiloxane, Glycerin, Isododecane, Alcohol, Titanium Dioxide',
    howToUse: 'Apply with fingers, brush, or sponge. Build coverage as needed.',
    imageUrls: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1503236823255-94609f598e71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    rating: 4.8,
    reviewCount: 312,
    categoryId: 'makeup',
    tags: ['foundation', 'medium coverage', 'luminous'],
    isBestSeller: true,
    stockQuantity: 45
  },
  {
    id: 'mk002',
    name: 'Velvet Matte Lipstick',
    brand: 'Luxe Cosmetics',
    price: 28.00,
    description: "A long-wearing, comfortable matte lipstick that doesn't dry out lips and provides intense color payoff.",
    ingredients: 'Isododecane, Dimethicone, Silica, Hydrogenated Polyisobutene, Disteardimonium Hectorite',
    howToUse: 'Apply directly to lips. For precise application, use a lip brush.',
    imageUrls: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1503236823255-94609f598e71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    rating: 4.7,
    reviewCount: 256,
    categoryId: 'makeup',
    tags: ['lipstick', 'matte', 'long-wearing'],
    stockQuantity: 60
  },
  {
    id: 'mk003',
    name: 'Precision Liquid Eyeliner',
    brand: 'Eye Artistry',
    price: 22.00,
    description: 'A waterproof, smudge-proof liquid eyeliner with a precision tip for creating perfect lines and wings.',
    ingredients: 'Water, Acrylates Copolymer, Carbon Black, Butylene Glycol, Laureth-21',
    howToUse: 'Start from the inner corner and draw along the lash line. For a wing, extend the line upward at the outer corner.',
    imageUrls: [
      'https://images.unsplash.com/photo-1631214503851-a17e9f97f35c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1599733589046-833caccbbd03?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    rating: 4.6,
    reviewCount: 198,
    categoryId: 'makeup',
    tags: ['eyeliner', 'waterproof', 'precision'],
    isNew: true,
    stockQuantity: 38
  },
  {
    id: 'mk004',
    name: 'Volumizing Mascara',
    brand: 'Eye Artistry',
    price: 26.00,
    originalPrice: 32.00,
    description: 'A volumizing mascara that builds dramatic lashes without clumping or flaking.',
    ingredients: 'Water, Beeswax, Paraffin, Glyceryl Stearate, Acacia Senegal Gum, Butylene Glycol',
    howToUse: 'Apply from root to tip with a zigzag motion. Build additional coats for more volume.',
    imageUrls: [
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1591360236480-4ed861025fa1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    rating: 4.5,
    reviewCount: 176,
    categoryId: 'makeup',
    tags: ['mascara', 'volumizing', 'lengthening'],
    isOnSale: true,
    stockQuantity: 25
  },
  
  // Hair care products
  {
    id: 'hc001',
    name: 'Repair & Restore Shampoo',
    brand: 'Botanical Hair',
    price: 32.00,
    description: 'A nourishing shampoo that repairs damaged hair and restores shine and strength.',
    ingredients: 'Water, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Glycerin, Panthenol, Biotin, Hydrolyzed Keratin',
    howToUse: 'Apply to wet hair, massage into scalp, and rinse thoroughly. Follow with conditioner.',
    imageUrls: [
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1522337094846-8a818192de1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    rating: 4.7,
    reviewCount: 145,
    categoryId: 'haircare',
    tags: ['shampoo', 'repair', 'damaged hair'],
    stockQuantity: 40
  },
  {
    id: 'hc002',
    name: 'Hydrating Hair Mask',
    brand: 'Botanical Hair',
    price: 36.00,
    description: 'An intensive treatment mask that deeply hydrates and nourishes dry, damaged hair.',
    ingredients: 'Water, Cetearyl Alcohol, Behentrimonium Chloride, Argan Oil, Shea Butter, Hydrolyzed Keratin',
    howToUse: 'Apply to clean, damp hair from mid-lengths to ends. Leave for 5-10 minutes, then rinse thoroughly.',
    imageUrls: [
      'https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    rating: 4.9,
    reviewCount: 208,
    categoryId: 'haircare',
    tags: ['hair mask', 'treatment', 'hydrating'],
    isBestSeller: true,
    stockQuantity: 32
  },
  
  // Fragrance products
  {
    id: 'fr001',
    name: 'Blooming Rose Eau de Parfum',
    brand: 'Scent Collection',
    price: 85.00,
    description: 'A romantic floral fragrance with notes of rose, peony, and vanilla for an elegant, feminine scent.',
    ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua (Water), Benzyl Salicylate, Linalool',
    howToUse: 'Spray onto pulse points: wrists, neck, and behind ears.',
    imageUrls: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1588405748880-b434f2d0e3a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    rating: 4.8,
    reviewCount: 176,
    categoryId: 'fragrance',
    tags: ['perfume', 'floral', 'feminine'],
    isNew: true,
    stockQuantity: 20
  },
  {
    id: 'fr002',
    name: 'Citrus Woods Cologne',
    brand: 'Scent Collection',
    price: 78.00,
    originalPrice: 92.00,
    description: 'A fresh, invigorating fragrance with notes of bergamot, cedar, and amber for a modern, sophisticated scent.',
    ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool',
    howToUse: 'Spray onto pulse points: wrists, neck, and chest.',
    imageUrls: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    rating: 4.7,
    reviewCount: 142,
    categoryId: 'fragrance',
    tags: ['cologne', 'citrus', 'woody'],
    isOnSale: true,
    stockQuantity: 15
  },
  
  // Body care products
  {
    id: 'bc001',
    name: 'Coconut Sugar Body Scrub',
    brand: 'Pure Body',
    price: 28.00,
    description: 'A gentle exfoliating scrub with coconut oil and sugar to smooth and soften skin.',
    ingredients: 'Sucrose, Cocos Nucifera (Coconut) Oil, Caprylic/Capric Triglyceride, Fragrance',
    howToUse: 'Apply to damp skin in circular motions, then rinse thoroughly. Use 2-3 times per week.',
    imageUrls: [
      'https://images.unsplash.com/photo-1570194065650-d99fb4ee0d03?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    rating: 4.6,
    reviewCount: 128,
    categoryId: 'bodycare',
    tags: ['scrub', 'exfoliating', 'coconut'],
    stockQuantity: 38
  },
  {
    id: 'bc002',
    name: 'Shea Butter Body Lotion',
    brand: 'Pure Body',
    price: 26.00,
    description: 'A rich, nourishing body lotion with shea butter and vitamin E to deeply moisturize and soften skin.',
    ingredients: 'Water, Butyrospermum Parkii (Shea) Butter, Glycerin, Cetearyl Alcohol, Tocopheryl Acetate',
    howToUse: 'Apply to clean, dry skin and massage until absorbed. Use daily for best results.',
    imageUrls: [
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1570194065650-d99fb4ee0d03?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    rating: 4.8,
    reviewCount: 156,
    categoryId: 'bodycare',
    tags: ['lotion', 'moisturizing', 'shea butter'],
    isBestSeller: true,
    stockQuantity: 45
  },
  
  // Tools & Accessories
  {
    id: 'ta001',
    name: 'Professional Makeup Brush Set',
    brand: 'Beauty Tools',
    price: 65.00,
    originalPrice: 85.00,
    description: 'A complete set of 12 professional-quality makeup brushes for face and eyes with synthetic bristles.',
    howToUse: 'Use different brushes for different makeup applications. Clean regularly with brush cleanser.',
    imageUrls: [
      'https://images.unsplash.com/photo-1526758097130-bab247274f58?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1515688594390-b649af70d282?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    rating: 4.9,
    reviewCount: 218,
    categoryId: 'tools',
    tags: ['brushes', 'makeup tools', 'professional'],
    isOnSale: true,
    stockQuantity: 25
  },
  {
    id: 'ta002',
    name: 'Jade Facial Roller',
    brand: 'Beauty Tools',
    price: 28.00,
    description: 'A dual-ended jade facial roller that helps reduce puffiness, improve circulation, and enhance product absorption.',
    howToUse: 'Use on clean skin with serum or oil. Roll in upward and outward motions. Store in refrigerator for extra cooling effect.',
    imageUrls: [
      'https://images.unsplash.com/photo-1628602040839-6d9b2c5b9ebd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    rating: 4.7,
    reviewCount: 132,
    categoryId: 'tools',
    tags: ['facial roller', 'jade', 'massage'],
    isNew: true,
    stockQuantity: 30
  }
];