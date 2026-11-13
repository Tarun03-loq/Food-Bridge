// AI Food Analysis and Repurposing Engine for FoodBridge

export const FOOD_DATABASE = {
  // South Indian & Common Indian Foods
  idly: {
    category: "Steamed Rice & Lentils",
    shelfLifeHours: 8,
    repurposeIdeas: [
      {
        name: "Idly Upma / Kaima Idly",
        recipe: "Crumble leftover cold idlies into coarse bits, temper in hot ghee with mustard seeds, curry leaves, onions, green chillies, and golden turmeric.",
        image: "/images/food/idly-upma.jpg",
        badge: "Savory Upma Breakfast"
      },
      {
        name: "Fried Chilli Idly Bites",
        recipe: "Cut cold firm idlies into cubes, crisp fry in oil until golden, and toss in wok with capsicum, onions, and spicy schezwan chilli sauce.",
        image: "/images/food/chilli-idli.jpg",
        badge: "Crispy Evening Starter"
      },
      {
        name: "Curd Idly (Dahi Idli)",
        recipe: "Dip refrigerated idlies into fresh beaten spiced curd, garnished with roasted mustard, grated ginger, and sweet pomegranate seeds.",
        image: "/images/food/curd-idli.jpg",
        badge: "Cooling Digestible Meal"
      }
    ],
    recommendedReceiverType: "Elderly Care & Children Shelter (Soft, easily digestible, low spice)"
  },
  dosa: {
    category: "Fermented Crepes",
    shelfLifeHours: 5,
    repurposeIdeas: [
      {
        name: "Crispy Dosa Strips / Podi Chips",
        recipe: "Slice plain dosas into thin strips, crisp toast on tawa with generous ghee and spicy gunpowder podi for crunchy tea crisps.",
        image: "/images/food/dosa-chips.jpg",
        badge: "Golden Roasted Crisps"
      },
      {
        name: "Dosa Masala Roll-ups",
        recipe: "Spread spiced potato masala or coconut-coriander chutney, roll firmly into pinwheels, and toast on hot buttered griddle.",
        image: "/images/food/dosa-roll.jpg",
        badge: "Rolled Masala Snack"
      }
    ],
    recommendedReceiverType: "Immediate Distribution Centres / Community Feeding (Requires consumption within few hours)"
  },
  biryani: {
    category: "Spiced Rice with Gravy/Meat",
    shelfLifeHours: 7,
    repurposeIdeas: [
      {
        name: "Biryani Arancini / Crispy Rice Croquettes",
        recipe: "Roll cold biryani into bite-sized balls with paneer/cheese center, roll in breadcrumbs and shallow fry until super crunchy.",
        image: "/images/food/biryani-croquettes.jpg",
        badge: "Crispy Party Appetizer"
      },
      {
        name: "Biryani Tawa Pulao",
        recipe: "Reheat aromatic biryani on a flat tawa with diced ripe tomatoes, green peas, fresh coriander, and a dollop of butter.",
        image: "/images/food/tawa-pulao.jpg",
        badge: "Quick Street Style Dinner"
      }
    ],
    recommendedReceiverType: "High-Capacity Youth Shelters & Night Shelters (High calorie and popular demand)"
  },
  rice: {
    category: "Cooked Grain",
    shelfLifeHours: 10,
    repurposeIdeas: [
      {
        name: "Lemon Rice (Chitranna)",
        recipe: "Temper fluffy cooked rice with crunchy roasted peanuts, mustard seeds, curry leaves, green chillies, turmeric, and fresh lemon juice.",
        image: "/images/food/lemon-rice.jpg",
        badge: "Tangy South Indian Rice"
      },
      {
        name: "Classic Veg Fried Rice",
        recipe: "Toss chilled rice in hot wok on high heat with spring onions, shredded carrots, capsicum, soy sauce, and cracked black pepper.",
        image: "/images/food/fried-rice.jpg",
        badge: "Wok-Tossed Dinner"
      },
      {
        name: "Curd Rice (Thayir Sadam)",
        recipe: "Combine cooled soft rice with fresh creamy curd, milk, chopped cucumber, and temper with mustard seeds, ginger, and curry leaves.",
        image: "/images/food/curd-idli.jpg",
        badge: "Soothing Gut-Friendly Meal"
      }
    ],
    recommendedReceiverType: "General Relief Centers & Day Care Feeding Programs"
  },
  chapati: {
    category: "Flatbread",
    shelfLifeHours: 14,
    repurposeIdeas: [
      {
        name: "Chapati Noodles (Kothu Parotta style)",
        recipe: "Cut chapatis into thin noodle ribbons; stir fry on high heat with shredded cabbage, bell peppers, onions, soy sauce, and garam masala.",
        image: "/images/food/chapati-noodles.jpg",
        badge: "Spiced Street Style Noodles"
      },
      {
        name: "Chapati Laddu / Sweet Churma",
        recipe: "Coarsely blitz dried chapatis with pure jaggery, crushed cardamom, and melted ghee to roll into nutritious energy balls.",
        image: "/images/food/chapati-laddu.jpg",
        badge: "Traditional Sweet Laddu"
      },
      {
        name: "Frankie / Veg Kathi Rolls",
        recipe: "Reheat chapatis with a layer of butter, fill with sautéed spiced paneer or vegetables, mint chutney, and roll tightly.",
        image: "/images/food/kathi-roll.jpg",
        badge: "Portable Lunch Wrap"
      }
    ],
    recommendedReceiverType: "All NGOs & Mobile Relief Food Vans (Easy to pack and distribute dry)"
  },
  roti: {
    category: "Flatbread",
    shelfLifeHours: 14,
    repurposeIdeas: [
      {
        name: "Kothu Roti Stir-Fry",
        recipe: "Chop rotis into bite-sized pieces and stir fry vigorously with diced onions, tomatoes, curry leaves, and fragrant spices.",
        image: "/images/food/chapati-noodles.jpg",
        badge: "Hearty Spiced Dinner"
      },
      {
        name: "Roti Nachos / Baked Crisps",
        recipe: "Slice rotis into triangles, bake or shallow fry with chaat masala, and serve with fresh tomato salsa or mint yogurt dip.",
        image: "/images/food/dosa-chips.jpg",
        badge: "Crunchy Finger Snack"
      }
    ],
    recommendedReceiverType: "All Relief Foundations & Street Distribution Vans"
  },
  dal: {
    category: "Lentil Curry",
    shelfLifeHours: 6,
    repurposeIdeas: [
      {
        name: "Crispy Dal Parathas",
        recipe: "Knead leftover thick spiced dal directly into whole wheat flour with ajwain and kasuri methi to roll golden layered parathas.",
        image: "/images/food/kathi-roll.jpg",
        badge: "Protein-Rich Flatbread"
      },
      {
        name: "Comforting Dal Khichdi",
        recipe: "Simmer remaining dal with soaked rice, cumin seeds, a pinch of asafoetida, and generous ghee for warm soothing khichdi.",
        image: "/images/food/dal-khichdi.jpg",
        badge: "Warm Healing Bowl"
      }
    ],
    recommendedReceiverType: "Children Homes & Community Kitchens"
  },
  sambar: {
    category: "Lentil & Vegetable Stew",
    shelfLifeHours: 7,
    repurposeIdeas: [
      {
        name: "Karnataka Bisi Bele Bath",
        recipe: "Boil leftover vegetable sambar with cooked rice, vegetables, ghee, and roasted Karnataka spices for authentic Bisi Bele Bath.",
        image: "/images/food/tawa-pulao.jpg",
        badge: "Rich Royal Rice"
      },
      {
        name: "Sambar Vada Bowl",
        recipe: "Soak crispy golden medu vadas in hot simmering sambar garnished with finely chopped raw onions and coriander.",
        image: "/images/food/sambar-vada.jpg",
        badge: "Classic Sambar Vada"
      }
    ],
    recommendedReceiverType: "Community Kitchens & Orphanages"
  },
  curry: {
    category: "Gravy & Vegetables",
    shelfLifeHours: 8,
    repurposeIdeas: [
      {
        name: "Curry Toasties & Sandwiches",
        recipe: "Reduce curry until thick, spread generously inside buttered bread slices, and grill until crispy golden brown.",
        image: "/images/food/curry-toastie.jpg",
        badge: "Grilled Spiced Sandwich"
      },
      {
        name: "Tawa Curry Pulao",
        recipe: "Mix thick vegetable curry on high heat with fresh steamed rice, mint leaves, and a dash of lemon juice for aromatic pulao.",
        image: "/images/food/tawa-pulao.jpg",
        badge: "Flavorful Rice Bowl"
      }
    ],
    recommendedReceiverType: "Local Relief Centers & Homeless Shelters"
  },
  bread: {
    category: "Bakery Item",
    shelfLifeHours: 48,
    repurposeIdeas: [
      {
        name: "Spiced Bread Upma / Poha",
        recipe: "Cut bread slices into cubes and sauté with crunchy peanuts, diced onions, tomatoes, mustard seeds, and curry leaves.",
        image: "/images/food/idly-upma.jpg",
        badge: "Quick 10-Min Breakfast"
      },
      {
        name: "Shahi Tukda (Royal Bread Pudding)",
        recipe: "Pan-fry bread triangles in pure ghee, soak in warm cardamom syrup, and top with rich thickened rabri and chopped pistachios.",
        image: "/images/food/chapati-laddu.jpg",
        badge: "Festive Sweet Dessert"
      }
    ],
    recommendedReceiverType: "Morning Breakfast Relief & Children Shelters"
  },
  pasta: {
    category: "Cooked Pasta / Noodles",
    shelfLifeHours: 8,
    repurposeIdeas: [
      {
        name: "Cheesy Baked Pasta Frittata",
        recipe: "Toss pasta with seasoned beaten eggs, oregano, and cheese, then bake or pan-sear until golden and fluffy.",
        image: "/images/food/pasta-bake.jpg",
        badge: "Italian Golden Bake"
      },
      {
        name: "Hearty Pasta Minestrone Soup",
        recipe: "Simmer pasta in tomato-herb vegetable broth with carrots, green beans, and kidney beans.",
        image: "/images/food/minestrone-soup.jpg",
        badge: "Warm Comforting Soup"
      }
    ],
    recommendedReceiverType: "Youth Centers & Day Care Shelters"
  }
};

/**
 * Perform AI Food Quality, Shelf Life & Recipient Matching
 */
export const analyzeFoodWithAI = ({ foodVariety, quantity, manufactureDate, ngos = [] }) => {
  if (!foodVariety || !foodVariety.trim()) {
    return null;
  }

  const query = foodVariety.toLowerCase().trim();
  
  // Find closest matching food key
  let matchedKey = Object.keys(FOOD_DATABASE).find(k => query.includes(k) || k.includes(query));
  
  // Generic fallback if not directly matched
  const foodData = matchedKey ? FOOD_DATABASE[matchedKey] : {
    category: "Cooked / Prepared Meal",
    shelfLifeHours: 6,
    repurposeIdeas: [
      {
        name: "Savory Stir-Fry or Hot Pan Sauté",
        recipe: "Reheat thoroughly above 75°C with fresh herbs, garlic, onions, and seasoning to revitalize texture and flavour.",
        image: "/images/food/stir-fry.jpg",
        badge: "Quick High-Heat Stir Fry"
      },
      {
        name: "Savory Wrap / Stuffed Rolls",
        recipe: "Roll into whole wheat wraps or tortillas with crisp cucumbers, tomatoes, and mint chutney.",
        image: "/images/food/kathi-roll.jpg",
        badge: "Fresh Meal Wrap"
      }
    ],
    recommendedReceiverType: "Nearby Community Shelters & Food Banks"
  };

  // 1. Calculate Safe Expiry Window from Manufacture / Prep Date
  const prepTime = manufactureDate ? new Date(manufactureDate).getTime() : Date.now();
  const safeUntilMs = prepTime + (foodData.shelfLifeHours * 3600000);
  const safeUntilDate = new Date(safeUntilMs);
  
  const now = Date.now();
  const hoursRemaining = Math.max(0, (safeUntilMs - now) / 3600000);
  const isExpiringSoon = hoursRemaining <= 2 && hoursRemaining > 0;
  const isExpired = hoursRemaining <= 0;

  // 2. Select Best Suitable Receiver from NGO list
  let bestNgo = null;
  let suitabilityReason = "";

  if (ngos && ngos.length > 0) {
    const qtyNumber = parseInt(quantity) || 30;
    
    if (qtyNumber >= 80) {
      bestNgo = ngos.find(n => n.name.includes("Annapoorna") || n.capacity.includes("1,200")) || ngos[1] || ngos[0];
      suitabilityReason = `High-capacity facility (${bestNgo.capacity}) equipped with industrial hot-holding and large beneficiary reach for bulk volume (${quantity}).`;
    } else if (query.includes("idly") || query.includes("dosa") || query.includes("dal")) {
      bestNgo = ngos.find(n => n.name.includes("Hope") || n.name.includes("Robin Hood")) || ngos[0];
      suitabilityReason = `Specializes in prompt dispatch to children & elderly care shelters within 30-45 mins of dispatch. Ideal for fresh ${foodVariety}.`;
    } else if (hoursRemaining < 3) {
      bestNgo = ngos.find(n => n.name.includes("Robin Hood") || n.name.includes("East")) || ngos[2] || ngos[0];
      suitabilityReason = `Fastest volunteer mobile response team on stand-by with rapid collection vehicles in Central/East Bangalore.`;
    } else {
      bestNgo = ngos[0];
      suitabilityReason = `Verified partner with cold-chain storage and direct daily community distribution.`;
    }
  }

  return {
    foodVariety: foodVariety.trim(),
    category: foodData.category,
    shelfLifeHours: foodData.shelfLifeHours,
    safeUntilDate: safeUntilDate.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short"
    }),
    safeUntilIso: safeUntilDate.toISOString().slice(0, 16),
    hoursRemaining: hoursRemaining.toFixed(1),
    statusNotice: isExpired
      ? "⛔ Past optimal food safe consumption period. Redirecting to Eco-Farm Biogas/Compost is recommended."
      : isExpiringSoon
        ? "⚠️ Urgent Distribution Window: Under 2 hours remaining! Priority pickup requested."
        : "✅ Optimal Freshness: Safe for distribution and community feeding.",
    repurposeIdeas: foodData.repurposeIdeas,
    bestReceiver: bestNgo,
    suitabilityReason: suitabilityReason,
    aiRecommendationSummary: `Based on biochemical food safety guidelines for ${foodVariety}, consumption is recommended within ${foodData.shelfLifeHours} hours of preparation when kept covered.`
  };
};

/**
 * AI Eco-Farm Expired Organic Resource Transformation Engine
 * Analyzes expired food batches and prescribes precise upcycling paths:
 * 1. Biogas & Clean Methane Energy Generation
 * 2. Rich Microbial Vermicompost / Aerobic Soil Enrichment
 * 3. Liquid Bio-Fertilizer (Jeevamrutha / Soil Inoculants)
 */
export const analyzeEcoResourceWithAI = ({ item, foodQuery = "" }) => {
  const query = (foodQuery || item?.foodVariety || item?.quantity || "").toLowerCase();

  // Determine organic characteristics
  let isCarbHeavy = query.includes("rice") || query.includes("dosa") || query.includes("idly") || query.includes("bread") || query.includes("pasta") || query.includes("chapati") || query.includes("roti");
  let isProteinHeavy = query.includes("dal") || query.includes("sambar") || query.includes("curry") || query.includes("biryani");
  
  // Numerical estimate of quantity
  const qtyNum = parseInt(item?.quantity) || 40;

  // Estimates based on biomass conversion metrics
  const biogasM3 = (qtyNum * 0.22).toFixed(1); // ~0.22 m3 biogas per kg food waste
  const lpgEquivalentKg = (qtyNum * 0.09).toFixed(1); // ~0.45 kg LPG per m3 biogas
  const compostYieldKg = (qtyNum * 0.45).toFixed(1); // ~45% dry compost yield
  const liquidFertilizerLitres = (qtyNum * 1.5).toFixed(1); // Anaerobic digestate slurry / liquid fertilizer

  return {
    biomassType: isCarbHeavy ? "High-Starch Carbohydrate Organic Waste" : isProteinHeavy ? "Nitrogen-Rich Cooked Protein & Lentil Waste" : "Mixed Kitchen Organic Biomass",
    quantity: item?.quantity || `${qtyNum} kg`,
    metrics: {
      biogasM3: `${biogasM3} m³`,
      lpgEquivalentKg: `${lpgEquivalentKg} kg`,
      compostYieldKg: `${compostYieldKg} kg`,
      liquidFertilizerLitres: `${liquidFertilizerLitres} L`
    },
    transformationProducts: [
      {
        name: "Biogas Renewable Fuel & Clean Methane",
        type: "Renewable Clean Bio-Energy",
        image: "/images/eco/biogas.jpg",
        badge: "Clean Fuel Output",
        yieldEstimate: `${biogasM3} m³ Biogas (approx. ${lpgEquivalentKg} kg LPG fuel)`,
        process: "Anaerobic Digestion (Biodigester Tank)",
        details: isCarbHeavy 
          ? "Starch-rich cooked biomass rapidly ferments in anaerobic biodigesters, delivering high methane yield (55-65% CH4) ideal for farm kitchen stoves, heating, and small generators."
          : "Cooked organic slurry feeds continuous anaerobic bacteria colonies, generating clean, soot-free cooking biogas within 12-24 hours."
      },
      {
        name: "Aerobic Vermicompost & Soil Conditioner",
        type: "Organic Humus & Soil Conditioner",
        image: "/images/eco/compost.jpg",
        badge: "Soil Carbon & Humus",
        yieldEstimate: `${compostYieldKg} kg High-Grade Organic Compost`,
        process: "Layered Aerobic Windrow or Earthworm Pit",
        details: "Mix 1 part food waste with 2 parts dry brown leaves, coco-peat, or sawdust (maintaining a 30:1 C:N ratio). Cures into odor-free, pathogen-free dark humus in 30-45 days."
      },
      {
        name: "Liquid Bio-Fertilizer (Digestate Slurry)",
        type: "Concentrated NPK Plant Nutrient",
        image: "/images/eco/fertilizer.jpg",
        badge: "Direct Liquid Foliar Feed",
        yieldEstimate: `${liquidFertilizerLitres} L Mineralized Plant Tonic`,
        process: "Liquid Fraction Extraction & Fermentation",
        details: "Dilute mineral-rich anaerobic digestate leachate 1:10 with water for foliar spraying or drip fertigation. Rich in bio-available Nitrogen, Potassium, and active soil microbes."
      }
    ],
    safeHandlingAdvisory: "Ensure no plastic wrappers, metal cutlery, or non-biodegradable containers enter the digester or compost heaps. Add a sprinkle of rock dust or neem cake to neutralize acidity."
  };
};
