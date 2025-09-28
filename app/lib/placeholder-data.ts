import { randomUUID } from "crypto";

const sellers = [
  {
    "seller_id": randomUUID(),
    "name": "Luna’s Handcrafts",
    "image_url": "/images/seller1.png",
    "bio": "Creating timeless handmade jewelry from natural gemstones.",
    "story": "Luna started crafting at 16, inspired by her grandmother’s designs. Every piece is unique and eco-friendly."
  },
  {
    "seller_id": randomUUID(),
    "name": "Oak & Clay Studio",
    "image_url": "/images/seller2.png",
    "bio": "Minimalist ceramics and woodcraft.",
    "story": "Oak & Clay was founded by two friends blending pottery and woodworking traditions."
  }
];

const products = [
  {
    "product_id": randomUUID(),
    "seller_id": sellers[0].seller_id ,
    "name": "Rose Quartz Pendant",
    "description": "Hand-wrapped rose quartz pendant with silver wire.",
    "price": 45.00,
    "stock": 10,
    "category": "Jewelry",
    "image_url": "/images/jewlery1.png",
  },
  {
    "product_id":  randomUUID(),
    "seller_id": sellers[0].seller_id ,
    "name": "Gemstone Bracelet",
    "description": "Adjustable bracelet made with amethyst and moonstone beads.",
    "price": 25.00,
    "stock": 15,
    "category": "Jewelry",
    "image_url": "/images/jewlery2.png"
  },
  {
    "product_id": randomUUID(),
    "seller_id": sellers[1].seller_id ,
    "name": "Minimalist Clay Mug",
    "description": "Wheel-thrown ceramic mug with matte glaze finish.",
    "price": 30.00,
    "stock": 8,
    "category": "Ceramics",
    "image_url": "/images/ceramics1.png"
  }
]

export {sellers, products};