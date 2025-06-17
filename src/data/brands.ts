// src/data/brands.ts

export interface Brand {
  name: string;
  description: string;
  rating: number;
  categories: string[];
  activeCampaigns: number;
  imageUrl?: string;
}

export const brands: Brand[] = [
  {
    name: "EverEm Skincare",
    description: "EverEm Skincare blends botanical ingredients with science-backed formulas to deliver radiant, healthy skin.",
    rating: 4.5,
    categories: ["Fashion", "Beauty", "Skincare"],
    activeCampaigns: 1,
    imageUrl: undefined,
  },
  {
    name: "GlowMore",
    description: "GlowMore offers eco-friendly makeup essentials for the conscious consumer.",
    rating: 4.8,
    categories: ["Beauty", "Makeup"],
    activeCampaigns: 3,
    imageUrl: "https://example.com/logo-glowmore.png",
  },
  {
    name: "TrailTrek",
    description: "TrailTrek designs high-performance outdoor gear for adventurers and explorers.",
    rating: 4.2,
    categories: ["Adventure", "Sports", "Outdoors"],
    activeCampaigns: 2,
    imageUrl: undefined,
  },
  {
    name: "TechNest",
    description: "TechNest delivers cutting-edge smart gadgets for modern living.",
    rating: 4.7,
    categories: ["Tech", "Gadgets"],
    activeCampaigns: 4,
    imageUrl: "https://example.com/logo-technest.png",
  },
  {
    name: "FitFuel",
    description: "FitFuel offers healthy snacks and supplements to fuel your fitness journey.",
    rating: 4.3,
    categories: ["Health", "Fitness", "Nutrition"],
    activeCampaigns: 2,
    imageUrl: undefined,
  },
  {
    name: "UrbanRitual",
    description: "UrbanRitual curates premium grooming products for the modern man.",
    rating: 4.0,
    categories: ["Grooming", "Men's Care"],
    activeCampaigns: 1,
    imageUrl: "https://example.com/logo-urbanritual.png",
  },
  {
    name: "GreenLeaf Living",
    description: "GreenLeaf promotes sustainable living with eco-friendly home products.",
    rating: 4.6,
    categories: ["Sustainability", "Home"],
    activeCampaigns: 3,
    imageUrl: undefined,
  },
  {
    name: "LuxeAura",
    description: "LuxeAura offers luxury fragrances made with ethically sourced ingredients.",
    rating: 4.9,
    categories: ["Luxury", "Fragrance", "Beauty"],
    activeCampaigns: 5,
    imageUrl: "https://example.com/logo-luxeaura.png",
  },
  {
    name: "PlayPixel",
    description: "PlayPixel creates innovative tech toys and learning kits for kids.",
    rating: 4.4,
    categories: ["Kids", "Tech", "Learning"],
    activeCampaigns: 2,
    imageUrl: undefined,
  },
  {
    name: "RunWild",
    description: "RunWild makes lightweight and durable running shoes for athletes.",
    rating: 4.1,
    categories: ["Sports", "Footwear"],
    activeCampaigns: 1,
    imageUrl: "https://example.com/logo-runwild.png",
  },
  {
    name: "BrewCraft",
    description: "BrewCraft is dedicated to artisanal coffee and sustainable sourcing.",
    rating: 4.8,
    categories: ["Food & Drink", "Coffee"],
    activeCampaigns: 2,
    imageUrl: undefined,
  },
  {
    name: "PetPal",
    description: "PetPal delivers premium pet products and wellness items for furry friends.",
    rating: 4.5,
    categories: ["Pets", "Wellness"],
    activeCampaigns: 3,
    imageUrl: "https://example.com/logo-petpal.png",
  },
];
