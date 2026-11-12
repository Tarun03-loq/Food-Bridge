// Mock and Real Database Store for FoodBridge
// Offers immediate out-of-the-box functioning with reactive listeners
// and also integrates directly with Firebase Firestore when keys exist!

export const INITIAL_USERS = [
  {
    id: "usr_supp_1",
    email: "greenpalace@hotel.com",
    name: "Green Palace Hotel & Banquet",
    role: "supplier",
    subType: "Hotel",
    phone: "+91 98765 43210",
    address: "MG Road, Central District, Bangalore",
    city: "Bangalore",
    isVerified: true,
    coordinates: { lat: 12.9716, lng: 77.5946 },
    joinedDate: "2026-10-15"
  },
  {
    id: "usr_supp_2",
    email: "freshbakes@bakery.com",
    name: "Fresh Bakes & Bistro",
    role: "supplier",
    subType: "Restaurant",
    phone: "+91 98450 11223",
    address: "Indiranagar 100ft Road, Bangalore",
    city: "Bangalore",
    isVerified: true,
    coordinates: { lat: 12.9784, lng: 77.6408 },
    joinedDate: "2026-10-20"
  },
  {
    id: "usr_supp_3",
    email: "apollosuper@mart.com",
    name: "Apollo Fresh Supermarket",
    role: "supplier",
    subType: "Supermarket",
    phone: "+91 98111 22334",
    address: "Koramangala 4th Block, Bangalore",
    city: "Bangalore",
    isVerified: false,
    coordinates: { lat: 12.9352, lng: 77.6245 },
    joinedDate: "2026-11-01"
  },
  {
    id: "usr_ngo_1",
    email: "hopefoundation@ngo.org",
    name: "Hope Feeding Foundation",
    role: "ngo",
    regNumber: "NGO-BLR-2022-8819",
    phone: "+91 94480 55667",
    address: "Shivajinagar Relief Centre, Bangalore",
    city: "Bangalore",
    serviceRadiusKm: 15,
    isVerified: true,
    dailyCapacity: 600,
    coordinates: { lat: 12.9856, lng: 77.6057 },
    joinedDate: "2026-09-10"
  },
  {
    id: "usr_ngo_2",
    email: "annapoorna@trust.org",
    name: "Annapoorna Seva Trust",
    role: "ngo",
    regNumber: "NGO-BLR-2023-4109",
    phone: "+91 97412 88990",
    address: "Jayanagar Community Hall, Bangalore",
    city: "Bangalore",
    serviceRadiusKm: 20,
    isVerified: true,
    dailyCapacity: 1200,
    coordinates: { lat: 12.9250, lng: 77.5938 },
    joinedDate: "2026-09-18"
  },
  {
    id: "usr_admin_1",
    email: "admin@foodbridge.org",
    name: "FoodBridge Central Admin",
    role: "admin",
    phone: "+91 99999 00000",
    address: "FoodBridge HQ",
    city: "Bangalore",
    isVerified: true,
    joinedDate: "2026-01-01"
  }
];

export const INITIAL_DONATIONS = [
  {
    id: "don_1",
    foodName: "Steamed Basmati Rice & Paneer Butter Masala",
    category: "Cooked Meals",
    quantity: "45 kg",
    mealsCount: 150,
    prepTime: "2026-11-12T17:30",
    expiryTime: "2026-11-13T01:00", // Safe collection deadline
    storageCondition: "Hot insulated warming containers (>65°C)",
    allergens: "Dairy, Nuts",
    supplierId: "usr_supp_1",
    supplierName: "Green Palace Hotel & Banquet",
    supplierType: "Hotel",
    supplierPhone: "+91 98765 43210",
    location: "MG Road, Central District, Bangalore",
    coordinates: { lat: 12.9716, lng: 77.5946 },
    imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80",
    status: "Available", // Available, Requested, Accepted, Picked Up, Delivered, Cancelled
    claimedByNgoId: null,
    claimedByNgoName: null,
    notes: "From corporate annual dinner buffet. Pristine untouched food kept warm.",
    createdAt: "2026-11-12T18:00:00Z"
  },
  {
    id: "don_2",
    foodName: "Artisanal Whole Wheat Loaves & Croissants",
    category: "Bakery & Bread",
    quantity: "85 pieces",
    mealsCount: 65,
    prepTime: "2026-11-12T11:00",
    expiryTime: "2026-11-13T12:00",
    storageCondition: "Ambient, Dry sealed boxes",
    allergens: "Gluten",
    supplierId: "usr_supp_2",
    supplierName: "Fresh Bakes & Bistro",
    supplierType: "Restaurant",
    supplierPhone: "+91 98450 11223",
    location: "Indiranagar 100ft Road, Bangalore",
    coordinates: { lat: 12.9784, lng: 77.6408 },
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
    status: "Requested",
    claimedByNgoId: "usr_ngo_1",
    claimedByNgoName: "Hope Feeding Foundation",
    notes: "End of day artisan bakery goods. Suitable for immediate evening shelter snacks.",
    createdAt: "2026-11-12T16:30:00Z"
  },
  {
    id: "don_3",
    foodName: "Organic Apples, Bananas & Seasonal Oranges",
    category: "Fresh Produce",
    quantity: "110 kg",
    mealsCount: 220,
    prepTime: "2026-11-11T08:00",
    expiryTime: "2026-11-14T20:00",
    storageCondition: "Cool, ventilated crates (15°C)",
    allergens: "None",
    supplierId: "usr_supp_3",
    supplierName: "Apollo Fresh Supermarket",
    supplierType: "Supermarket",
    supplierPhone: "+91 98111 22334",
    location: "Koramangala 4th Block, Bangalore",
    coordinates: { lat: 12.9352, lng: 77.6245 },
    imageUrl: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=600&q=80",
    status: "Accepted",
    claimedByNgoId: "usr_ngo_2",
    claimedByNgoName: "Annapoorna Seva Trust",
    notes: "Surplus stock from weekend bulk delivery. Crisp, edible, unbruised fruit.",
    createdAt: "2026-11-12T14:15:00Z"
  },
  {
    id: "don_4",
    foodName: "Vegetable Biryani with Cucumber Raita",
    category: "Cooked Meals",
    quantity: "35 kg",
    mealsCount: 110,
    prepTime: "2026-11-12T13:00",
    expiryTime: "2026-11-12T22:30",
    storageCondition: "Insulated food pans",
    allergens: "Dairy",
    supplierId: "usr_supp_1",
    supplierName: "Green Palace Hotel & Banquet",
    supplierType: "Hotel",
    supplierPhone: "+91 98765 43210",
    location: "MG Road, Central District, Bangalore",
    coordinates: { lat: 12.9716, lng: 77.5946 },
    imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    status: "Delivered",
    claimedByNgoId: "usr_ngo_1",
    claimedByNgoName: "Hope Feeding Foundation",
    notes: "Delivered successfully to Shivaji Nagar night shelter.",
    createdAt: "2026-11-12T13:30:00Z"
  }
];

export const INITIAL_REQUESTS = [
  {
    id: "req_1",
    donationId: "don_2",
    donationName: "Artisanal Whole Wheat Loaves & Croissants",
    supplierId: "usr_supp_2",
    supplierName: "Fresh Bakes & Bistro",
    ngoId: "usr_ngo_1",
    ngoName: "Hope Feeding Foundation",
    ngoContact: "+91 94480 55667",
    pickupTimeRequested: "2026-11-12T21:00",
    status: "Requested", // Requested, Accepted, Picked Up, Delivered, Cancelled
    driverName: "Ramesh Kumar (Volunteer)",
    driverPhone: "+91 98800 12345",
    vehicleNumber: "KA 01 MG 4421",
    timeline: [
      { status: "Requested", time: "2026-11-12T16:35:00Z", note: "NGO sent collection claim" }
    ]
  },
  {
    id: "req_2",
    donationId: "don_3",
    donationName: "Organic Apples, Bananas & Seasonal Oranges",
    supplierId: "usr_supp_3",
    supplierName: "Apollo Fresh Supermarket",
    ngoId: "usr_ngo_2",
    ngoName: "Annapoorna Seva Trust",
    ngoContact: "+91 97412 88990",
    pickupTimeRequested: "2026-11-13T10:00",
    status: "Accepted",
    driverName: "Suresh Gowda",
    driverPhone: "+91 97410 77722",
    vehicleNumber: "KA 05 AB 9901 (E-Van)",
    timeline: [
      { status: "Requested", time: "2026-11-12T14:30:00Z", note: "Collection claim initiated" },
      { status: "Accepted", time: "2026-11-12T14:45:00Z", note: "Supplier verified and confirmed pickup slot" }
    ]
  },
  {
    id: "req_3",
    donationId: "don_4",
    donationName: "Vegetable Biryani with Cucumber Raita",
    supplierId: "usr_supp_1",
    supplierName: "Green Palace Hotel & Banquet",
    ngoId: "usr_ngo_1",
    ngoName: "Hope Feeding Foundation",
    ngoContact: "+91 94480 55667",
    pickupTimeRequested: "2026-11-12T15:00",
    status: "Delivered",
    driverName: "Ramesh Kumar",
    driverPhone: "+91 98800 12345",
    vehicleNumber: "KA 01 MG 4421",
    timeline: [
      { status: "Requested", time: "2026-11-12T13:35:00Z", note: "Claim placed" },
      { status: "Accepted", time: "2026-11-12T13:40:00Z", note: "Accepted by Green Palace" },
      { status: "Picked Up", time: "2026-11-12T15:10:00Z", note: "Collected from kitchen dock" },
      { status: "Delivered", time: "2026-11-12T16:00:00Z", note: "Distributed to 110 people in Shivaji Nagar" }
    ]
  }
];

