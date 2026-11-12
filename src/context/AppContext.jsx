import { createContext, useContext, useState, useEffect } from "react";

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
    quantity: "45 kg (~150 meals)",
    dateTimePrepared: "2026-11-12T18:00",
    dateTimeExpiry: "2026-11-13T02:00",
    location: "MG Road, Central District, Bangalore",
    contactName: "Chef Rajesh (Green Palace Hotel)",
    contactPhone: "+91 98765 43210",
    deliveryMode: "Pickup by NGO",
    donorEmail: "greenpalace@hotel.com",
    notes: "Hot insulated containers. Pick up at kitchen bay 1.",
    status: "Available",
    acceptedByReceiver: null,
    createdAt: "2026-11-12T18:30:00Z"
  },
  {
    id: "don_2",
    quantity: "80 boxes fresh bread",
    dateTimePrepared: "2026-11-12T12:00",
    dateTimeExpiry: "2026-11-13T16:00",
    location: "100ft Road, Indiranagar, Bangalore",
    contactName: "Vikram Mehta (Artisan Bakes)",
    contactPhone: "+91 98450 33445",
    deliveryMode: "Delivery by Own",
    donorEmail: "artisanbakes@gmail.com",
    notes: "Sealed bakery crates ready for immediate dispatch.",
    status: "Available",
    acceptedByReceiver: null,
    createdAt: "2026-11-12T16:00:00Z"
  }
];

export const AppProvider = ({ children }) => {
  // Theme state: emerald, ocean, sunset, midnight, purple, rose, forest, slate
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("fb_theme") || "emerald";
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("fb_auth_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [donations, setDonations] = useState(() => {
    const saved = localStorage.getItem("fb_donations_list");
    return saved ? JSON.parse(saved) : INITIAL_DONATIONS;
  });

  const [ngos] = useState(INITIAL_NGOS);

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
      role, // 'donor' or 'receiver'
      email: email.trim(),
      name: details.name || (role === "donor" ? (details.businessName || "Restaurant / Donor Partner") : (details.orgName || "Food Relief Organization")),
      businessName: details.businessName || (role === "donor" ? "Registered Food Donor" : ""),
      orgName: details.orgName || (role === "receiver" ? "Hope Feeding Trust" : "Green Palace Banquet"),
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
        addDonation,
        acceptFoodRequest,
        completeDonation,
        deleteDonation,
        ngos,
        theme,
        setTheme
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
