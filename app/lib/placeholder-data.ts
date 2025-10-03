import { randomUUID } from "crypto";
// Demo users (buyers + sellers)
const users = [
  {
    user_id: randomUUID(),
    name: "Alice Johnson",
    email: "alice@example.com",
    password: "Alice123", // will be hashed in seeding
    role: "buyer",
  },
  {
    user_id: randomUUID(),
    name: "Luna Smith",
    email: "luna@example.com",
    password: "Luna456",
    role: "seller",
  },
  {
    user_id: randomUUID(),
    name: "Oliver Green",
    email: "oliver@example.com",
    password: "Oliver789",
    role: "seller",
  },
  {
    user_id: randomUUID(),
    name: "Willow Brown",
    email: "willow@example.com",
    password: "Willow321",
    role: "seller",
  },
  {
    user_id: randomUUID(),
    name: "Evelyn Stone",
    email: "evelyn@example.com",
    password: "Evelyn654",
    role: "seller",
  },
  {
    user_id: randomUUID(),
    name: "Samuel Clay",
    email: "samuel@example.com",
    password: "Samuel987",
    role: "seller",
  }
];

const sellers = [
  {
    seller_id: randomUUID(),
    user_id: users[1].user_id, // Luna’s user
    name: "Luna’s Handcrafts",
    image_url: "/images/seller1.jpg",
    bio: "Creating timeless handmade jewelry from natural gemstones.",
    story: "Luna started crafting at 16, inspired by her grandmother’s designs. Every piece is unique and eco-friendly."
  },
  {
    seller_id: randomUUID(),
    user_id: users[2].user_id, // Oliver’s user
    name: "Oak Grove Studio",
    image_url: "/images/seller2.png",
    bio: "Minimalist woodcraft.",
    story: "Oak Grove Studio was founded by two friends who have zeal for woodworking traditions."
  },
  {
    seller_id: randomUUID(),
    user_id: users[3].user_id, // Willow’s user
    name: "Willow Textiles",
    image_url: "/images/seller3.png",
    bio: "Handwoven fabrics and eco-friendly dyes.",
    story: "Willow’s founder learned weaving from her mother and now creates sustainable textiles for modern homes."
  },
  {
    seller_id: randomUUID(),
    user_id: users[4].user_id, // Evelyn’s user
    name: "Evergreen Leatherworks",
    image_url: "/images/seller4.png",
    bio: "Premium handcrafted leather goods.",
    story: "Evergreen specializes in timeless leather bags and wallets with a focus on durability and style."
  },
  {
    seller_id: randomUUID(),
    user_id: users[5].user_id, // Samuel’s user
    name: "Sunrise Pottery",
    image_url: "/images/seller5.png",
    bio: "Bright ceramic pieces inspired by morning skies.",
    story: "Sunrise Pottery was born from a passion for functional art that makes everyday moments special."
  }
];

// products stay the same, just reference updated sellers array
const products = [
  // Luna’s Handcrafts
  {
    product_id: randomUUID(),
    seller_id: sellers[0].seller_id,
    name: "Elegant Athena Ring Setting",
    description: "Accent diamonds with low profile hidden halo setting",
    price: 45.0,
    stock: 10,
    category: "Jewelry",
    image_url: "/images/jewlery1.png",
  },
  {
    product_id: randomUUID(),
    seller_id: sellers[0].seller_id,
    name: "Heart Bezel Necklace Setting",
    description:
      "This necklace setting fits a heart shape to up 5.9mm gemstone with solid 14k gold cable chain",
    price: 25.0,
    stock: 15,
    category: "Jewelry",
    image_url: "/images/jewlery2.png",
  },

  // Oak Grove Studio
  {
    product_id: randomUUID(),
    seller_id: sellers[1].seller_id,
    name: "TimberCopter",
    description: "Recall your happy memory of childhood",
    price: 30.0,
    stock: 8,
    category: "Woodcraft",
    image_url: "/images/woodcraft1.png"
  },
  {
    product_id: randomUUID(),
    seller_id: sellers[1].seller_id,
    name: "Timber Truckie",
    description:
      "With its rolling wheels and cheerful charm, it’s ready to carry imagination anywhere.",
    price: 40.0,
    stock: 12,
    category: "Woodcraft",
    image_url: "/images/woodcraft2.png"
  },

  // Willow Textiles
  {
    product_id: randomUUID(),
    seller_id: sellers[2].seller_id,
    name: "Willowtime Tea Party",
    description:
      "Handwoven with care, each piece carring the natural warmth of willow branches.",
    price: 35.0,
    stock: 20,
    category: "Textiles",
    image_url: "/images/willow1.png"
  },
  {
    product_id: randomUUID(),
    seller_id: sellers[2].seller_id,
    name: "Decorative Willow Containers",
    description:"Organic weave brings rustic warmth to any room while keeping things beautifully tidy.",
    price: 28.0,
    stock: 18,
    category: "Textiles",
    image_url: "/images/willow2.png",
  },

  // Evergreen Leatherworks
  {
    product_id: randomUUID(),
    seller_id: sellers[3].seller_id,
    name: "Luxury Leather Handbag",
    description: "Fine leather with delicate cat design.",
    price: 80.0,
    stock: 14,
    category: "Leather",
    image_url: "/images/leather1.png"
  },
  {
    product_id: randomUUID(),
    seller_id: sellers[3].seller_id,
    name: "Cute Leather Keychain",
    description: "Cute leather keychain for daily use.",
    price: 20.0,
    stock: 6,
    category: "Leather",
    image_url: "/images/leather2.png"
  },

  // Sunrise Pottery
  {
    product_id: randomUUID(),
    seller_id: sellers[4].seller_id,
    name: "Ancient Liquor Container",
    description: "The creativity lies in its unique ivory design.",
    price: 55.0,
    stock: 10,
    category: "Pottery",
    image_url: "/images/pottery1.png"
  },
  {
    product_id: randomUUID(),
    seller_id: sellers[4].seller_id,
    name: "Impressionist Vase",
    description: "Hand-painted pottery vase with impressionist style.",
    price: 22.0,
    stock: 25,
    category: "Pottery",
    image_url: "/images/pottery2.png",
  }
];

const reviews = [
  {
    review_id: randomUUID(),
    product_id: products[0].product_id,
    user_id: users[0].user_id, // Alice reviewed Luna’s product
    rating: 5,
    comment: "Absolutely stunning craftsmanship! Love this piece."
  }
];

export { users, sellers, products, reviews };
