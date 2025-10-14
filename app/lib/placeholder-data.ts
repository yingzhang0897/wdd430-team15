import { v4 as uuidv4 } from 'uuid';

function getRandomId() {
  return uuidv4();
}

// Demo users - each with different data
const users = [
  {
    user_id: 'b7f3d4e5-6789-4012-b345-6789abcdef01',
    name: 'John Smith',
    email: 'user@nextmail.com',
    password: '123456', // will be hashed in seeding
  },
  // Add more users for testing different accounts
  {
    user_id: 'a1b2c3d4-5678-9012-3456-789abcdef123',
    name: 'Maria Garcia',
    email: 'maria@example.com',
    password: '123456',
  },
  {
    user_id: 'c4d5e6f7-8901-2345-6789-abcdef123456',
    name: 'David Johnson',
    email: 'david@example.com', 
    password: '123456',
  }
];

const sellers = [
  {
    seller_id: getRandomId(),
    name: 'Luna’s Handcrafts',
    image_url: '/images/seller1.jpg',
    bio: 'Creating timeless handmade jewelry from natural gemstones.',
    story: 'Luna started crafting at 16, inspired by her grandmother’s designs. Every piece is unique and eco-friendly.'
  },
  {
    seller_id: getRandomId(),
    name: 'Oak Grove Studio',
    image_url: '/images/seller2.png',
    bio: 'Minimalist woodcraft.',
    story: 'Oak grove studio was founded by two friends who have zeal for woodworking traditions.'
  },
  {
    seller_id: getRandomId(),
    name: 'Willow Textiles',
    image_url: '/images/seller3.png',
    bio: 'Handwoven fabrics and eco-friendly dyes.',
    story: 'Willow’s founder learned weaving from her mother and now creates sustainable textiles for modern homes.'
  },
  {
    seller_id: getRandomId(),
    name: 'Evergreen Leatherworks',
    image_url: '/images/seller4.png',
    bio: 'Premium handcrafted leather goods.',
    story: 'Evergreen specializes in timeless leather bags and wallets with a focus on durability and style.'
  },
  {
    seller_id: getRandomId(),
    name: 'Sunrise Pottery',
    image_url: '/images/seller5.png',
    bio: 'Bright ceramic pieces inspired by morning skies.',
    story: 'Sunrise Pottery was born from a passion for functional art that makes everyday moments special.'
  }
];

const products = [
  // Luna’s Handcrafts
  {
    product_id: getRandomId(),
    seller_id: sellers[0].seller_id,
    name: 'Elegant Athena Ring Setting',
    description: 'Accent diamonds with low profile hidden halo setting',
    price: 45.0,
    stock: 10,
    category: 'Jewelry',
    image_url: '/images/jewlery1.png',
  },
  {
    product_id: getRandomId(),
    seller_id: sellers[0].seller_id,
    name: 'Heart Bezel Necklace Setting',
    description:
      'This necklace setting fits a heart shape to up 5.9mm gemstone with solid 14k gold cable chain',
    price: 25.0,
    stock: 15,
    category: 'Jewelry',
    image_url: '/images/jewlery2.png'
  },

  // Oak Grove Studio
  {
    product_id: getRandomId(),
    seller_id: sellers[1].seller_id,
    name: 'TimberCopter',
    description: 'Recall your happy memory of childhood',
    price: 30.0,
    stock: 8,
    category: 'Woodcraft',
    image_url: '/images/woodcraft1.png'
  },
  {
    product_id: getRandomId(),
    seller_id: sellers[1].seller_id,
    name: 'Timber Truckie',
    description:
      'With its rolling wheels and cheerful charm, it’s ready to carry imagination anywhere.',
    price: 40.0,
    stock: 12,
    category: 'Woodcraft',
    image_url: '/images/woodcraft2.png'
  },

  // Willow Textiles
  {
    product_id: getRandomId(),
    seller_id: sellers[2].seller_id,
    name: 'Willowtime Tea Party',
    description:
      'Handwoven with care, each piece carring the natural warmth of willow branches.',
    price: 35.0,
    stock: 20,
    category: 'Textiles',
    image_url: '/images/willow1.png'
  },
  {
    product_id: getRandomId(),
    seller_id: sellers[2].seller_id,
    name: 'Decorative Willow Containers',
    description:'Organic weave brings rustic warmth to any room while keeping things beautifully tidy.',
    price: 28.0,
    stock: 18,
    category: 'Textiles',
    image_url: '/images/willow2.png',
  },

  // Evergreen Leatherworks
  {
    product_id: getRandomId(),
    seller_id: sellers[3].seller_id,
    name: 'Luxury Leather Handbag',
    description: 'Fine leather with delicate cat design.',
    price: 80.0,
    stock: 14,
    category: 'Leather',
    image_url: '/images/leather1.png'
  },
  {
    product_id: getRandomId(),
    seller_id: sellers[3].seller_id,
    name: 'Cute Leather Keychain',
    description: 'Cute leather keychain for daily use.',
    price: 20.0,
    stock: 6,
    category: 'Leather',
    image_url: '/images/leather2.png'
  },

  // Sunrise Pottery
  {
    product_id: getRandomId(),
    seller_id: sellers[4].seller_id,
    name: 'Ancient Liquor Container',
    description: 'The creativity lies in its unique ivory design.',
    price: 55.0,
    stock: 10,
    category: 'Pottery',
    image_url: '/images/pottery1.png'
  },
  {
    product_id: getRandomId(),
    seller_id: sellers[4].seller_id,
    name: 'Impressionist Vase',
    description: 'Hand-painted pottery vase with impressionist style.',
    price: 22.0,
    stock: 25,
    category: 'Pottery',
    image_url: '/images/pottery2.png',
  }
];

const reviews = [
  {
    review_id: getRandomId(),
    product_id: products[0].product_id,
    user_id: users[0].user_id,
    rating: 5,
    comment: "Absolutely stunning craftsmanship! Love this piece."
  }
];

// Sample orders data
const orders = [
  {
    order_id: getRandomId(),
    user_id: users[0].user_id,
    status: 'delivered',
    total_amount: 45.0,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
  },
  {
    order_id: getRandomId(),
    user_id: users[0].user_id,
    status: 'shipped', 
    total_amount: 30.0,
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 1 week ago
  },
  {
    order_id: getRandomId(),
    user_id: users[0].user_id,
    status: 'processing',
    total_amount: 95.0,
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) // 2 weeks ago
  }
];

// Sample order items
const orderItems = [
  {
    order_item_id: getRandomId(),
    order_id: orders[0].order_id,
    product_id: products[0].product_id, // Elegant Athena Ring
    quantity: 1,
    price: 45.0
  },
  {
    order_item_id: getRandomId(),
    order_id: orders[1].order_id,
    product_id: products[2].product_id, // TimberCopter
    quantity: 1,
    price: 30.0
  },
  {
    order_item_id: getRandomId(),
    order_id: orders[2].order_id,
    product_id: products[1].product_id, // Heart Bezel Necklace
    quantity: 1,
    price: 25.0
  },
  {
    order_item_id: getRandomId(),
    order_id: orders[2].order_id,
    product_id: products[6].product_id, // Luxury Leather Handbag
    quantity: 1,
    price: 80.0
  }
];

// Sample favorites
const favorites = [
  {
    favorite_id: getRandomId(),
    user_id: users[0].user_id,
    product_id: products[1].product_id, // Heart Bezel Necklace
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 1 week ago
  },
  {
    favorite_id: getRandomId(),
    user_id: users[0].user_id,
    product_id: products[4].product_id, // Willowtime Tea Party
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) // 10 days ago
  },
  {
    favorite_id: getRandomId(),
    user_id: users[0].user_id,
    product_id: products[8].product_id, // Ancient Liquor Container
    created_at: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000) // 3 weeks ago
  }
];

export { users, sellers, products, reviews, orders, orderItems, favorites };