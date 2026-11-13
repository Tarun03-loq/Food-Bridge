import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AppContext = createContext(null);

export const INITIAL_NGOS = [
  {
    id: "ngo_1",
    name: "Hope Feeding Foundation",
    email: "hope@ngo.org",
    phone: "+91 94480 55667",
    address: "Shivajinagar Relief Centre, Bangalore",
    city: "Bangalore",
    lat: 12.9856,
    lng: 77.6057,
    capacity: "600 meals/day",
    contactPerson: "Dr. Sister Clara"
  },
  {
    id: "ngo_2",
    name: "Annapoorna Seva Trust",
    email: "annapoorna@trust.org",
    phone: "+91 97412 88990",
    address: "Jayanagar 4th Block Community Hall, Bangalore",
    city: "Bangalore",
    lat: 12.9250,
    lng: 77.5938,
    capacity: "1,200 meals/day",
    contactPerson: "Raghavendra Rao"
  },
  {
    id: "ngo_3",
    name: "Robin Hood Army - Bangalore East",
    email: "robinhood@bangalore.org",
    phone: "+91 98800 12345",
    address: "Indiranagar 100ft Road Youth Centre, Bangalore",
    city: "Bangalore",
    lat: 12.9784,
    lng: 77.6408,
    capacity: "800 meals/day",
    contactPerson: "Arjun Verma"
  },
  {
    id: "ngo_4",
    name: "Aahwahan Food Bank",
    email: "support@aahwahan.org",
    phone: "+91 98450 77112",
    address: "Koramangala 5th Block, Bangalore",
    city: "Bangalore",
    lat: 12.9352,
    lng: 77.6245,
    capacity: "500 meals/day",
    contactPerson: "Meera Nair"
  },
  {
    id: "ngo_5",
    name: "Akshaya Seva Samithi",
    email: "akshaya@seva.org",
    phone: "+91 98111 23456",
    address: "Malleshwaram 8th Cross, Bangalore",
    city: "Bangalore",
    lat: 13.0031,
    lng: 77.5704,
    capacity: "950 meals/day",
    contactPerson: "S. Venkatesh"
  },
  {
    id: "ngo_6",
    name: "Rotary Food Mission",
    email: "rotary@relief.org",
    phone: "+91 99000 44321",
    address: "Whitefield Main Road, Bangalore",
    city: "Bangalore",
    lat: 12.9698,
    lng: 77.7500,
    capacity: "750 meals/day",
    contactPerson: "Kavitha Reddy"
  }
];

export const INITIAL_DONATIONS = [
  {
    id: "don_1",
    foodVariety: "Idly & Sambar",
    quantity: "45 kg (~150 meals)",
    dateTimePrepared: new Date(Date.now() - 2 * 3600000).toISOString().slice(0, 16),
    dateTimeExpiry: new Date(Date.now() + 6 * 3600000).toISOString().slice(0, 16),
    location: "MG Road, Central District, Bangalore",
    contactName: "Chef Rajesh (Green Palace Hotel)",
    contactPhone: "+91 98765 43210",
    deliveryMode: "Pickup by NGO",
    donorEmail: "greenpalace@hotel.com",
    notes: "Hot insulated containers with 200 idlies and vegetable sambar. Pick up at kitchen dock 1.",
    status: "Available",
    acceptedByReceiver: null,
    createdAt: new Date(Date.now() - 2 * 3600000).toISOString()
  },
  {
    id: "don_2",
    foodVariety: "Masala Dosa",
    quantity: "60 servings",
    dateTimePrepared: new Date(Date.now() - 1 * 3600000).toISOString().slice(0, 16),
    dateTimeExpiry: new Date(Date.now() + 3.5 * 3600000).toISOString().slice(0, 16),
    location: "Church Street, Brigade Road, Bangalore",
    contactName: "Suresh Kumar (Sri Sagar Bhavan)",
    contactPhone: "+91 98450 11223",
    deliveryMode: "Pickup by NGO",
    donorEmail: "srisagar@bhavan.com",
    notes: "Packed fresh masala dosas with separate potato masala and coconut chutney.",
    status: "Available",
    acceptedByReceiver: null,
    createdAt: new Date(Date.now() - 1 * 3600000).toISOString()
  },
  {
    id: "don_3",
    foodVariety: "Veg Biryani",
    quantity: "85 kg (~220 meals)",
    dateTimePrepared: new Date(Date.now() - 3 * 3600000).toISOString().slice(0, 16),
    dateTimeExpiry: new Date(Date.now() + 5 * 3600000).toISOString().slice(0, 16),
    location: "Koramangala 5th Block, Bangalore",
    contactName: "Faizan Ahmed (Royal Dum Banquet)",
    contactPhone: "+91 98800 77665",
    deliveryMode: "Delivery by Own",
    donorEmail: "royaldum@banquet.com",
    notes: "Surplus banquet veg biryani with raita. Our transport van can deliver to your center.",
    status: "Available",
    acceptedByReceiver: null,
    createdAt: new Date(Date.now() - 3 * 3600000).toISOString()
  },
  {
    id: "don_6",
    foodVariety: "Chapati & Paneer Curry",
    quantity: "120 meals (240 chapatis + 30L curry)",
    dateTimePrepared: new Date(Date.now() - 1.5 * 3600000).toISOString().slice(0, 16),
    dateTimeExpiry: new Date(Date.now() + 4.5 * 3600000).toISOString().slice(0, 16),
    location: "Indiranagar 100ft Road, Bangalore",
    contactName: "Chef Harish (Spice Symphony Caterers)",
    contactPhone: "+91 98440 22119",
    deliveryMode: "Pickup by NGO",
    donorEmail: "harish@spicesymphony.com",
    notes: "Hot insulated food crates from a corporate lunch event. High quality, ready to distribute.",
    status: "Available",
    acceptedByReceiver: null,
    createdAt: new Date(Date.now() - 1.5 * 3600000).toISOString()
  },
  {
    id: "don_7",
    foodVariety: "Dal Makhani & Steamed Rice",
    quantity: "70 kg (~180 servings)",
    dateTimePrepared: new Date(Date.now() - 2.5 * 3600000).toISOString().slice(0, 16),
    dateTimeExpiry: new Date(Date.now() + 5.5 * 3600000).toISOString().slice(0, 16),
    location: "Jayanagar 4th Block, Bangalore",
    contactName: "Vikram Malhotra (Punjabi Dhaba & Banquet)",
    contactPhone: "+91 97311 44556",
    deliveryMode: "Delivery by Own",
    donorEmail: "vikram@punjabidhaba.in",
    notes: "Surplus wedding feast food kept warm in stainless steel containers. Free van delivery provided.",
    status: "Available",
    acceptedByReceiver: null,
    createdAt: new Date(Date.now() - 2.5 * 3600000).toISOString()
  },
  {
    id: "don_8",
    foodVariety: "Mixed Veg Pulao & Curd Raita",
    quantity: "50 kg (~130 meals)",
    dateTimePrepared: new Date(Date.now() - 3.5 * 3600000).toISOString().slice(0, 16),
    dateTimeExpiry: new Date(Date.now() + 1.5 * 3600000).toISOString().slice(0, 16),
    location: "Malleshwaram 8th Cross, Bangalore",
    contactName: "Anand Murthy (Udupi Krishna Prasada)",
    contactPhone: "+91 98860 33442",
    deliveryMode: "Pickup by NGO",
    donorEmail: "anand@udupikrishna.com",
    notes: "Fresh temple lunch surplus. Packed neatly in foil boxes. Pick up immediately.",
    status: "Available",
    acceptedByReceiver: null,
    createdAt: new Date(Date.now() - 3.5 * 3600000).toISOString()
  },
  {
    id: "don_9",
    foodVariety: "Fresh Bread & Bakery Buns",
    quantity: "150 bread loaves & 80 milk buns",
    dateTimePrepared: new Date(Date.now() - 5 * 3600000).toISOString().slice(0, 16),
    dateTimeExpiry: new Date(Date.now() + 18 * 3600000).toISOString().slice(0, 16),
    location: "Whitefield Hope Farm, Bangalore",
    contactName: "Chef George (Artisan Oven Bakery)",
    contactPhone: "+91 99011 88772",
    deliveryMode: "Pickup by NGO",
    donorEmail: "george@artisanoven.com",
    notes: "Fresh day-end artisan bake loaves, hygienically bagged in paper bags.",
    status: "Available",
    acceptedByReceiver: null,
    createdAt: new Date(Date.now() - 5 * 3600000).toISOString()
  },
  {
    id: "don_10",
    foodVariety: "Veg Hakka Noodles & Fried Rice",
    quantity: "65 servings",
    dateTimePrepared: new Date(Date.now() - 4 * 3600000).toISOString().slice(0, 16),
    dateTimeExpiry: new Date(Date.now() + 3 * 3600000).toISOString().slice(0, 16),
    location: "Koramangala 7th Block, Bangalore",
    contactName: "David Lin (Golden Dragon Wok)",
    contactPhone: "+91 99450 12890",
    deliveryMode: "Pickup by NGO",
    donorEmail: "david@goldendragon.in",
    notes: "Surplus corporate lunch packs. Packed in individual eco-friendly meal boxes.",
    status: "Accepted by Receiver",
    acceptedByReceiver: {
      orgName: "Hope Feeding Foundation",
      contactName: "Dr. Sister Clara",
      phone: "+91 94480 55667",
      address: "Shivajinagar Relief Centre, Bangalore",
      acceptedAt: new Date(Date.now() - 1 * 3600000).toISOString()
    },
    createdAt: new Date(Date.now() - 4 * 3600000).toISOString()
  },
  {
    id: "don_11",
    foodVariety: "South Indian Thali Meals",
    quantity: "95 meals",
    dateTimePrepared: new Date(Date.now() - 6 * 3600000).toISOString().slice(0, 16),
    dateTimeExpiry: new Date(Date.now() + 2 * 3600000).toISOString().slice(0, 16),
    location: "Rajajinagar 1st Block, Bangalore",
    contactName: "Subramaniam (Sri Raghavendra Bhavan)",
    contactPhone: "+91 94490 66778",
    deliveryMode: "Delivery by Own",
    donorEmail: "subbu@raghavendra.org",
    notes: "Successfully picked up and handed over for distribution at slum rehabilitation colony.",
    status: "Delivered / Completed",
    acceptedByReceiver: {
      orgName: "Annapoorna Seva Trust",
      contactName: "Raghavendra Rao",
      phone: "+91 97412 88990",
      address: "Jayanagar 4th Block Community Hall, Bangalore",
      acceptedAt: new Date(Date.now() - 3 * 3600000).toISOString()
    },
    completedAt: new Date(Date.now() - 1.2 * 3600000).toISOString(),
    createdAt: new Date(Date.now() - 6 * 3600000).toISOString()
  },
  {
    id: "don_4",
    foodVariety: "Cooked Basmati Rice",
    quantity: "110 kg (Buffet Surplus)",
    dateTimePrepared: new Date(Date.now() - 16 * 3600000).toISOString().slice(0, 16),
    dateTimeExpiry: new Date(Date.now() - 6 * 3600000).toISOString().slice(0, 16),
    location: "Outer Ring Road, Marathahalli, Bangalore",
    contactName: "Chef Anand (Grand Tech Park Cafeteria)",
    contactPhone: "+91 97412 88991",
    deliveryMode: "Pickup by NGO",
    donorEmail: "grandcafeteria@techpark.com",
    notes: "Surplus rice from corporate lunch buffet. Safe time period has elapsed. Diverted as eco-resource for composting/biogas.",
    status: "Expired",
    expiredAt: new Date(Date.now() - 6 * 3600000).toISOString(),
    acceptedByReceiver: null,
    createdAt: new Date(Date.now() - 16 * 3600000).toISOString()
  },
  {
    id: "don_5",
    foodVariety: "Chapati & Dal Curry",
    quantity: "90 kg (Mixed Kitchen Organic Biomass)",
    dateTimePrepared: new Date(Date.now() - 24 * 3600000).toISOString().slice(0, 16),
    dateTimeExpiry: new Date(Date.now() - 10 * 3600000).toISOString().slice(0, 16),
    location: "Electronic City Phase 1, Bangalore",
    contactName: "Manjunath (Campus Dining Hall)",
    contactPhone: "+91 99000 66554",
    deliveryMode: "Pickup by NGO",
    donorEmail: "campusdining@ecity.org",
    notes: "Leftover chapati dough and dal gravy. Ideal high-nitrogen feed for organic compost heaps and biogas digestors.",
    status: "Expired",
    expiredAt: new Date(Date.now() - 10 * 3600000).toISOString(),
    acceptedByReceiver: null,
    createdAt: new Date(Date.now() - 24 * 3600000).toISOString()
  }
];

export const AppProvider = ({ children }) => {
  // Theme state: emerald, ocean, sunset, midnight, purple, rose, forest, slate
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("fb_theme") || "emerald";
  });

  // Language state for headings: "en" | "ta"
  const [headingLang, setHeadingLang] = useState(() => {
    return localStorage.getItem("fb_heading_lang") || "en";
  });

  const toggleHeadingLang = () => {
    setHeadingLang(prev => (prev === "en" ? "ta" : "en"));
  };

  useEffect(() => {
    localStorage.setItem("fb_heading_lang", headingLang);
  }, [headingLang]);

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("fb_auth_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [donations, setDonations] = useState(() => {
    const saved = localStorage.getItem("fb_donations_list");
    if (!saved) return INITIAL_DONATIONS;
    try {
      const parsed = JSON.parse(saved);
      // Upgrade if old format with fewer items or missing foodVariety
      if (!Array.isArray(parsed) || parsed.length < 8 || !parsed.some(d => d.foodVariety)) {
        return INITIAL_DONATIONS;
      }
      return parsed;
    } catch (e) {
      return INITIAL_DONATIONS;
    }
  });

  const [ngos] = useState(INITIAL_NGOS);

  // ─────────────────────────────────────────────────────────────
  // AUTO-EXPIRY ENGINE
  // Runs every 30 seconds. Any donation whose dateTimeExpiry has
  // passed and is still "Available" gets moved to "Expired"
  // status so it vanishes from the Receiver page and surfaces on
  // the Eco-Farm expired panel.
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const expire = () => {
      setDonations(prev => {
        const now = Date.now();
        let changed = false;
        const updated = prev.map(d => {
          if (
            d.status === "Available" &&
            d.dateTimeExpiry &&
            new Date(d.dateTimeExpiry).getTime() <= now
          ) {
            changed = true;
            return { ...d, status: "Expired", expiredAt: new Date().toISOString() };
          }
          return d;
        });
        if (changed) {
          localStorage.setItem("fb_donations_list", JSON.stringify(updated));
          return updated;
        }
        return prev;
      });
    };
    expire(); // run immediately on mount
    const timer = setInterval(expire, 30000); // then every 30 s
    return () => clearInterval(timer);
  }, []);

  // Sync theme
  useEffect(() => {
    localStorage.setItem("fb_theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Sync user
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("fb_auth_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("fb_auth_user");
    }
  }, [currentUser]);

  // Sync donations
  useEffect(() => {
    localStorage.setItem("fb_donations_list", JSON.stringify(donations));
  }, [donations]);

  // Cross-tab broadcast listener so changes in Donor tab update Receiver tab instantly
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "fb_donations_list" && e.newValue) {
        setDonations(JSON.parse(e.newValue));
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = (role, email, password, details = {}) => {
    const user = {
      role, // 'donor' | 'receiver' | 'ecofarm'
      email: email.trim(),
      name: details.name || (role === "donor"
        ? (details.businessName || "Restaurant / Donor Partner")
        : role === "ecofarm"
          ? (details.name || "Eco-Farm Partner")
          : (details.orgName || "Food Relief Organization")),
      businessName: details.businessName || (role === "donor" ? "Registered Food Donor" : ""),
      orgName: details.orgName || (role === "receiver" ? "Hope Feeding Trust" : ""),
      orgType: details.orgType || (role === "ecofarm" ? "Organic Farm" : ""),
      phone: details.phone || "+91 98765 43210",
      address: details.address || "Bangalore Central, Karnataka"
    };
    setCurrentUser(user);
    return { success: true, user };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Add donation
  const addDonation = (newDon) => {
    const item = {
      id: "don_" + Date.now(),
      ...newDon,
      donorEmail: currentUser?.email,
      status: "Available",
      acceptedByReceiver: null,
      createdAt: new Date().toISOString()
    };
    const updated = [item, ...donations];
    setDonations(updated);
    localStorage.setItem("fb_donations_list", JSON.stringify(updated));
    return item;
  };

  // Receiver accepts food availability request
  const acceptFoodRequest = (donationId) => {
    const updated = donations.map(d => {
      if (d.id === donationId) {
        return {
          ...d,
          status: "Accepted by Receiver",
          acceptedByReceiver: {
            orgName: currentUser?.orgName || "Registered Relief NGO",
            contactName: currentUser?.name || "NGO Coordinator",
            phone: currentUser?.phone || "+91 94480 55667",
            address: currentUser?.address || "Bangalore Relief Distribution Centre",
            acceptedAt: new Date().toISOString()
          }
        };
      }
      return d;
    });
    setDonations(updated);
    localStorage.setItem("fb_donations_list", JSON.stringify(updated));
  };

  // Complete delivery / pickup
  const completeDonation = (donationId) => {
    const updated = donations.map(d => {
      if (d.id === donationId) {
        return {
          ...d,
          status: "Delivered / Completed",
          completedAt: new Date().toISOString()
        };
      }
      return d;
    });
    setDonations(updated);
    localStorage.setItem("fb_donations_list", JSON.stringify(updated));
  };

  // Cancel / delete donation by donor
  const deleteDonation = (donationId) => {
    const updated = donations.filter(d => d.id !== donationId);
    setDonations(updated);
    localStorage.setItem("fb_donations_list", JSON.stringify(updated));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        login,
        logout,
        donations,
        expiredDonations: donations.filter(d => d.status === "Expired"),
        addDonation,
        acceptFoodRequest,
        completeDonation,
        deleteDonation,
        ngos,
        theme,
        setTheme,
        headingLang,
        toggleHeadingLang
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
