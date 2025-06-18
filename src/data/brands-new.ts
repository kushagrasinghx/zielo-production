import type { Brand } from './types';

export const brands: Brand[] = [
  {
    name: "EverEm Skincare",
    description: "EverEm Skincare offers premium, natural skincare products for all skin types.",
    rating: 4.8,
    categories: ["Beauty", "Skincare"],
    activeCampaigns: 3,
    imageUrl: "https://example.com/logo-everem.png",
    logo: "https://example.com/logo-everem.png",
    brandStory: "Born from a passion for natural beauty.",
    brandVoice: "Professional and nurturing.",
    targetAudience: "Skincare enthusiasts aged 25-45",
    campaigns: [
      {
        id: 1,
        title: "Product Demo for New Moisturizer",
        type: "Instagram Reel",
        category: "Product Gifting",
        niche: "Beauty",
        rating: 4.7,
        description: "Create a demo of our new moisturizer.",
        deadline: "8/15/2023",
        creatorsNeeded: 5,
        requirements: ["Use #EverEmGlow", "Tag @everem"],
        guidelines: ["Show before/after", "Explain benefits"],
        coins: 250
      },
      {
        id: 2,
        title: "Night Cream Routine",
        type: "TikTok Video",
        category: "Product Gifting",
        niche: "Beauty",
        rating: 4.6,
        description: "Highlight your night skincare routine using our cream.",
        deadline: "8/20/2023",
        creatorsNeeded: 4,
        requirements: ["Use #EverEmNights", "Tag @everem"],
        guidelines: ["Mention skin type", "Include product close-up"],
        coins: 230
      },
      {
        id: 3,
        title: "Skincare Shelfie",
        type: "Instagram Post",
        category: "Product Gifting",
        niche: "Beauty",
        rating: 4.5,
        description: "Post your skincare shelf featuring EverEm products.",
        deadline: "8/25/2023",
        creatorsNeeded: 3,
        requirements: ["Use #EverEmRoutine", "Tag @everem"],
        guidelines: ["Good lighting", "Highlight packaging"],
        coins: 200
      }
    ],
    ugcPortfolio: [
      {
        id: 1,
        creator: "@beauty_guru",
        likes: "2.5K",
        comments: "120",
        type: "image",
        thumbnail: "/api/placeholder/300/400",
        gradient: "from-pink-400 to-rose-500"
      }
    ]
  },
  {
    name: "GlowMore",
    description: "GlowMore provides eco-friendly makeup products for conscious beauty lovers.",
    rating: 4.5,
    categories: ["Beauty", "Makeup"],
    activeCampaigns: 2,
    imageUrl: undefined,
    logo: "https://example.com/logo-glowmore.png",
    brandStory: "Making beauty sustainable.",
    brandVoice: "Eco-conscious and trendy.",
    targetAudience: "Environmentally conscious beauty enthusiasts",
    campaigns: [
      {
        id: 1,
        title: "Eco-Friendly Makeup Tutorial",
        type: "YouTube Video",
        category: "Paid Campaign",
        niche: "Beauty",
        rating: 4.6,
        description: "Create a tutorial using our products.",
        deadline: "8/18/2023",
        creatorsNeeded: 3,
        requirements: ["Use #GlowMoreEco", "Tag @glowmore"],
        guidelines: ["Show application", "Highlight eco-features"],
        coins: 300
      },
      {
        id: 2,
        title: "Makeup Bag Essentials",
        type: "Instagram Reel",
        category: "Product Gifting",
        niche: "Beauty",
        rating: 4.4,
        description: "Share what's in your makeup bag featuring GlowMore.",
        deadline: "8/22/2023",
        creatorsNeeded: 4,
        requirements: ["Use #GlowEssentials", "Tag @glowmore"],
        guidelines: ["Natural light", "Show product usage"],
        coins: 220
      }
    ],
    ugcPortfolio: [
      {
        id: 1,
        creator: "@eco_beauty",
        likes: "1.8K",
        comments: "95",
        type: "image",
        thumbnail: "/api/placeholder/300/400",
        gradient: "from-green-400 to-emerald-500"
      }
    ]
  },
  {
    name: "TrailTrek",
    description: "TrailTrek offers top-tier hiking and outdoor gear for adventurers.",
    rating: 4.7,
    categories: ["Outdoors", "Gear"],
    activeCampaigns: 2,
    imageUrl: "https://example.com/logo-trailtrek.png",
    logo: "https://example.com/logo-trailtrek.png",
    brandStory: "Empowering explorers since 2010.",
    brandVoice: "Bold and adventurous.",
    targetAudience: "Outdoor enthusiasts, hikers, and campers",
    campaigns: [
      {
        id: 1,
        title: "Weekend Hike with TrailTrek Gear",
        type: "Instagram Carousel",
        category: "Product Gifting",
        niche: "Outdoors",
        rating: 4.6,
        description: "Share your weekend hike using our gear.",
        deadline: "8/30/2023",
        creatorsNeeded: 4,
        requirements: ["Use #TrailTrekAdventure", "Tag @trailtrek"],
        guidelines: ["Show landscape and gear in use"],
        coins: 260
      },
      {
        id: 2,
        title: "Gear Unboxing and Review",
        type: "YouTube Video",
        category: "Paid Campaign",
        niche: "Outdoors",
        rating: 4.8,
        description: "Unbox and review a TrailTrek tent or backpack.",
        deadline: "9/02/2023",
        creatorsNeeded: 2,
        requirements: ["Use #TrekGearReview", "Tag @trailtrek"],
        guidelines: ["Talk about build quality and features"],
        coins: 400
      }
    ],
    ugcPortfolio: [
      {
        id: 1,
        creator: "@outdoor_lex",
        likes: "3.1K",
        comments: "210",
        type: "image",
        thumbnail: "/api/placeholder/300/400",
        gradient: "from-blue-500 to-indigo-600"
      }
    ]
  },
  {
    name: "TechNest",
    description: "TechNest designs sleek, smart accessories for everyday tech users.",
    rating: 4.4,
    categories: ["Technology", "Gadgets"],
    activeCampaigns: 3,
    imageUrl: undefined,
    logo: "https://example.com/logo-technest.png",
    brandStory: "Smart accessories for smarter lives.",
    brandVoice: "Modern and efficient.",
    targetAudience: "Young tech-savvy adults, 18-35",
    campaigns: [
      {
        id: 1,
        title: "Daily Life with TechNest Gadgets",
        type: "Instagram Reel",
        category: "Paid Campaign",
        niche: "Tech",
        rating: 4.5,
        description: "Show how TechNest gadgets help in daily life.",
        deadline: "9/10/2023",
        creatorsNeeded: 3,
        requirements: ["Use #TechNestLife", "Tag @technest"],
        guidelines: ["Show real-world usage"],
        coins: 300
      },
      {
        id: 2,
        title: "Charging Dock Setup",
        type: "TikTok Video",
        category: "Product Gifting",
        niche: "Tech",
        rating: 4.4,
        description: "Create a clean desk setup using our charging dock.",
        deadline: "9/15/2023",
        creatorsNeeded: 4,
        requirements: ["Use #DeskGoalsWithTechNest", "Tag @technest"],
        guidelines: ["Include before/after shots"],
        coins: 240
      },
      {
        id: 3,
        title: "TechNest Accessory Haul",
        type: "YouTube Short",
        category: "Product Gifting",
        niche: "Tech",
        rating: 4.3,
        description: "Quickly showcase multiple TechNest products.",
        deadline: "9/20/2023",
        creatorsNeeded: 5,
        requirements: ["Use #TechNestHaul", "Tag @technest"],
        guidelines: ["Keep it under 60s"],
        coins: 220
      }
    ],
    ugcPortfolio: [
      {
        id: 1,
        creator: "@gadgetgeek",
        likes: "2.7K",
        comments: "180",
        type: "image",
        thumbnail: "/api/placeholder/300/400",
        gradient: "from-slate-600 to-gray-800"
      }
    ]
  },
  {
    name: "FitFuel",
    description: "FitFuel makes high-protein, clean-label snacks for fitness lovers.",
    rating: 4.6,
    categories: ["Health", "Food"],
    activeCampaigns: 2,
    imageUrl: undefined,
    logo: "https://example.com/logo-fitfuel.png",
    brandStory: "Fuel your goals naturally.",
    brandVoice: "Energetic and motivating.",
    targetAudience: "Fitness freaks and wellness enthusiasts",
    campaigns: [
      {
        id: 1,
        title: "Post-Workout Snack Review",
        type: "Instagram Story",
        category: "Product Gifting",
        niche: "Fitness",
        rating: 4.5,
        description: "Share a post-workout review of our bars.",
        deadline: "8/28/2023",
        creatorsNeeded: 4,
        requirements: ["Use #RefuelWithFitFuel", "Tag @fitfuel"],
        guidelines: ["Mention taste and texture"],
        coins: 180
      },
      {
        id: 2,
        title: "Healthy Snack Haul",
        type: "TikTok",
        category: "Product Gifting",
        niche: "Food",
        rating: 4.6,
        description: "Show your healthy pantry with FitFuel snacks.",
        deadline: "9/01/2023",
        creatorsNeeded: 3,
        requirements: ["Use #CleanSnacking", "Tag @fitfuel"],
        guidelines: ["Emphasize clean labels"],
        coins: 210
      }
    ],
    ugcPortfolio: [
      {
        id: 1,
        creator: "@fitwithria",
        likes: "2.1K",
        comments: "110",
        type: "image",
        thumbnail: "/api/placeholder/300/400",
        gradient: "from-orange-400 to-amber-500"
      }
    ]
  },
  {
    name: "HomeHues",
    description: "HomeHues curates elegant, minimal home decor pieces.",
    rating: 4.3,
    categories: ["Home", "Lifestyle"],
    activeCampaigns: 1,
    imageUrl: undefined,
    logo: "https://example.com/logo-homehues.png",
    brandStory: "Elevate every corner of your home.",
    brandVoice: "Soothing and refined.",
    targetAudience: "Interior lovers and home stylists",
    campaigns: [
      {
        id: 1,
        title: "Cozy Corners with HomeHues",
        type: "Instagram Reel",
        category: "Product Gifting",
        niche: "Lifestyle",
        rating: 4.3,
        description: "Design and film a cozy corner in your home with our decor.",
        deadline: "9/03/2023",
        creatorsNeeded: 3,
        requirements: ["Use #MyHomeHues", "Tag @homehues"],
        guidelines: ["Emphasize ambiance and lighting"],
        coins: 210
      }
    ],
    ugcPortfolio: [
      {
        id: 1,
        creator: "@homedreamz",
        likes: "1.9K",
        comments: "80",
        type: "image",
        thumbnail: "/api/placeholder/300/400",
        gradient: "from-yellow-200 to-amber-300"
      }
    ]
  },
  {
    name: "PetPal",
    description: "PetPal offers fun, nutritious pet food and toys for your furry friends.",
    rating: 4.9,
    categories: ["Pets", "Lifestyle"],
    activeCampaigns: 2,
    imageUrl: "https://example.com/logo-petpal.png",
    logo: "https://example.com/logo-petpal.png",
    brandStory: "Because your pet deserves the best.",
    brandVoice: "Playful and loving.",
    targetAudience: "Pet parents across all age groups",
    campaigns: [
      {
        id: 1,
        title: "Pet Snack Time",
        type: "Instagram Story",
        category: "Product Gifting",
        niche: "Pets",
        rating: 4.8,
        description: "Show your pet enjoying PetPal treats.",
        deadline: "9/06/2023",
        creatorsNeeded: 4,
        requirements: ["Use #PetSnackJoy", "Tag @petpal"],
        guidelines: ["Include pet reaction", "Use natural light"],
        coins: 190
      },
      {
        id: 2,
        title: "Toys for Happy Pets",
        type: "TikTok Video",
        category: "Product Gifting",
        niche: "Pets",
        rating: 4.9,
        description: "Film your pet playing with a PetPal toy.",
        deadline: "9/10/2023",
        creatorsNeeded: 3,
        requirements: ["Use #PlayWithPetPal", "Tag @petpal"],
        guidelines: ["Show interaction and fun moments"],
        coins: 220
      }
    ],
    ugcPortfolio: [
      {
        id: 1,
        creator: "@petlove_jenny",
        likes: "3.4K",
        comments: "290",
        type: "image",
        thumbnail: "/api/placeholder/300/400",
        gradient: "from-pink-300 to-red-400"
      }
    ]
  },
  {
    name: "LuxeAura",
    description: "LuxeAura offers luxury fragrances made with ethically sourced ingredients.",
    rating: 4.9,
    categories: ["Luxury", "Fragrance", "Beauty"],
    activeCampaigns: 5,
    imageUrl: "https://example.com/logo-luxeaura.png",
    logo: "https://example.com/logo-luxeaura.png",
    brandStory: "Crafting luxury fragrances with ethical excellence.",
    brandVoice: "Elegant and sophisticated.",
    targetAudience: "Luxury fragrance enthusiasts",
    campaigns: [
      {
        id: 1,
        title: "Fragrance Experience",
        type: "Instagram Reel",
        category: "Product Gifting",
        niche: "Luxury",
        rating: 4.8,
        description: "Share your experience with our signature scent.",
        deadline: "9/10/2023",
        creatorsNeeded: 4,
        requirements: ["Use #LuxeAuraMoment", "Tag @luxeaura"],
        guidelines: ["Elegant presentation", "Describe scent notes"],
        coins: 400
      },
      {
        id: 2,
        title: "Luxury Unboxing",
        type: "TikTok",
        category: "Product Gifting",
        niche: "Luxury",
        rating: 4.7,
        description: "Unbox LuxeAura's latest scent release.",
        deadline: "9/15/2023",
        creatorsNeeded: 3,
        requirements: ["Use #LuxeUnbox", "Tag @luxeaura"],
        guidelines: ["Show product details & packaging"],
        coins: 380
      },
      {
        id: 3,
        title: "First Impressions Video",
        type: "YouTube Short",
        category: "Paid Campaign",
        niche: "Beauty",
        rating: 4.6,
        description: "Share your first impressions of LuxeAura.",
        deadline: "9/20/2023",
        creatorsNeeded: 5,
        requirements: ["Use #AuraImpressions", "Tag @luxeaura"],
        guidelines: ["Describe top, mid, base notes"],
        coins: 360
      },
      {
        id: 4,
        title: "Evening Routine Scent",
        type: "Instagram Story",
        category: "Product Gifting",
        niche: "Luxury",
        rating: 4.7,
        description: "Feature LuxeAura in your nighttime ritual.",
        deadline: "9/25/2023",
        creatorsNeeded: 4,
        requirements: ["Use #LuxeNight", "Tag @luxeaura"],
        guidelines: ["Soft lighting & mood"],
        coins: 350
      },
      {
        id: 5,
        title: "Gift Set Giveaway",
        type: "Instagram Post",
        category: "Paid Campaign",
        niche: "Luxury",
        rating: 4.9,
        description: "Promote our gift set with a follower giveaway.",
        deadline: "9/30/2023",
        creatorsNeeded: 2,
        requirements: ["Use #LuxeGiveaway", "Tag @luxeaura"],
        guidelines: ["Include rules & prize details"],
        coins: 420
      }
    ],
    ugcPortfolio: [
      {
        id: 1,
        creator: "@luxury_life",
        likes: "4.1K",
        comments: "234",
        type: "image",
        thumbnail: "/api/placeholder/300/400",
        gradient: "from-amber-400 to-yellow-500"
      }
    ]
  },
  {
    name: "PlayPixel",
    description: "PlayPixel creates innovative tech toys and learning kits for kids.",
    rating: 4.4,
    categories: ["Kids", "Tech", "Learning"],
    activeCampaigns: 2,
    imageUrl: undefined,
    logo: "https://example.com/logo-playpixel.png",
    brandStory: "Making learning fun through technology.",
    brandVoice: "Playful and educational.",
    targetAudience: "Parents of tech-savvy kids",
    campaigns: [
      {
        id: 1,
        title: "Learning Through Play",
        type: "TikTok Video",
        category: "Product Gifting",
        niche: "Education",
        rating: 4.5,
        description: "Show how kids learn with our products.",
        deadline: "9/15/2023",
        creatorsNeeded: 3,
        requirements: ["Use #PlayPixelLearn", "Tag @playpixel"],
        guidelines: ["Show child engagement", "Highlight learning aspects"],
        coins: 250
      },
      {
        id: 2,
        title: "Family Fun Unboxing",
        type: "Instagram Reel",
        category: "Product Gifting",
        niche: "Education",
        rating: 4.6,
        description: "Unbox PlayPixel kits with your child.",
        deadline: "9/20/2023",
        creatorsNeeded: 4,
        requirements: ["Use #PlayPixelFun", "Tag @playpixel"],
        guidelines: ["Show interaction & reactions"],
        coins: 280
      }
    ],
    ugcPortfolio: [
      {
        id: 1,
        creator: "@parent_tech",
        likes: "1.9K",
        comments: "78",
        type: "image",
        thumbnail: "/api/placeholder/300/400",
        gradient: "from-purple-400 to-pink-500"
      }
    ]
  },
  {
    name: "RunWild",
    description: "RunWild makes lightweight and durable running shoes for athletes.",
    rating: 4.1,
    categories: ["Sports", "Footwear"],
    activeCampaigns: 1,
    imageUrl: "https://example.com/logo-runwild.png",
    logo: "https://example.com/logo-runwild.png",
    brandStory: "Engineered for runners, by runners.",
    brandVoice: "Dynamic and performance-focused.",
    targetAudience: "Serious runners and athletes",
    campaigns: [
      {
        id: 1,
        title: "Running Performance",
        type: "Instagram Reel",
        category: "Purchase & Reimburse",
        niche: "Sports",
        rating: 4.3,
        description: "Test our shoes in your running routine.",
        deadline: "9/20/2023",
        creatorsNeeded: 5,
        requirements: ["Use #RunWild", "Tag @runwild"],
        guidelines: ["Show running form", "Test durability"],
        coins: 280
      }
    ],
    ugcPortfolio: [
      {
        id: 1,
        creator: "@runner_pro",
        likes: "2.4K",
        comments: "92",
        type: "image",
        thumbnail: "/api/placeholder/300/400",
        gradient: "from-red-400 to-orange-500"
      }
    ]
  },
  {
    name: "BrewCraft",
    description: "BrewCraft is dedicated to artisanal coffee and sustainable sourcing.",
    rating: 4.8,
    categories: ["Food & Drink", "Coffee"],
    activeCampaigns: 2,
    imageUrl: undefined,
    logo: "https://example.com/logo-brewcraft.png",
    brandStory: "Crafting the perfect cup with sustainable practices.",
    brandVoice: "Artisanal and passionate.",
    targetAudience: "Coffee enthusiasts and connoisseurs",
    campaigns: [
      {
        id: 1,
        title: "Coffee Brewing Guide",
        type: "YouTube Video",
        category: "Paid Campaign",
        niche: "Food",
        rating: 4.7,
        description: "Create a brewing tutorial with our products.",
        deadline: "9/25/2023",
        creatorsNeeded: 2,
        requirements: ["Use #BrewCraft", "Tag @brewcraft"],
        guidelines: ["Show brewing process", "Explain techniques"],
        coins: 320
      },
      {
        id: 2,
        title: "Morning Coffee Routine",
        type: "Instagram Story",
        category: "Product Gifting",
        niche: "Food",
        rating: 4.6,
        description: "Feature BrewCraft coffee in your morning routine.",
        deadline: "9/30/2023",
        creatorsNeeded: 3,
        requirements: ["Use #BrewCraftMornings", "Tag @brewcraft"],
        guidelines: ["Highlight aroma & taste"],
        coins: 300
      }
    ],
    ugcPortfolio: [
      {
        id: 1,
        creator: "@coffee_expert",
        likes: "3.5K",
        comments: "145",
        type: "image",
        thumbnail: "/api/placeholder/300/400",
        gradient: "from-amber-400 to-brown-500"
      }
    ]
  }    
];
