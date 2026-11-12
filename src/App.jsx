import { useState } from "react";
import { useApp } from "./context/AppContext";
import { LoginPage } from "./pages/LoginPage";
import { DonorPage } from "./pages/DonorPage";
import { ReceiverPage } from "./pages/ReceiverPage";
import { NearbyNgosMap } from "./pages/NearbyNgosMap";
import { 
  HeartHandshake, 
  LogOut, 
  MapPin, 
  Utensils, 
  Users, 
  Palette,
  Check,
  Building2,
  RefreshCw
} from "lucide-react";

export function App() {
  const { currentUser, logout, theme, setTheme } = useApp();
  
  // Navigation for Donor: "donor-form" or "nearby-map"
  const [donorActiveNav, setDonorActiveNav] = useState("donor-form");
  const [showThemePicker, setShowThemePicker] = useState(false);

  // 8 Unique Handcrafted Themes
  const themes = [
    { id: "emerald", name: "Fresh Emerald (Green)", color: "#16a34a" },
    { id: "ocean", name: "Deep Ocean (Blue)", color: "#0284c7" },
    { id: "sunset", name: "Sunset Gold (Amber)", color: "#d97706" },
    { id: "purple", name: "Royal Purple", color: "#9333ea" },
    { id: "rose", name: "Rose Coral", color: "#e11d48" },
    { id: "forest", name: "Deep Forest", color: "#1e7d36" },
    { id: "slate", name: "Slate Steel", color: "#475569" },
    { id: "midnight", name: "Midnight Modern (Dark)", color: "#0f172a" }
  ];

  // If not logged in, render the clean Login Page with Donor vs Receiver selector
  if (!currentUser) {
    return <LoginPage />;
  }

  const isDonor = currentUser.role === "donor";

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg-main)" }}>
      
      {/* Top Application Navbar */}
      <header style={{ height: "68px", background: "var(--navbar-bg)", borderBottom: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2rem", position: "sticky", top: 0, zIndex: 1000, boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
        
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }} onClick={() => setDonorActiveNav("donor-form")}>
          <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "var(--primary-600)", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <HeartHandshake size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--primary-800)", lineHeight: 1.1 }}>
              FoodBridge
            </h1>
            <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 600 }}>Save Food. Share Hope.</p>
          </div>
        </div>

        {/* Center Navigation for Donor (Separate Navigation for Form vs Google Maps) */}
        {isDonor && (
          <div style={{ display: "flex", background: "var(--bg-main)", padding: "0.25rem", borderRadius: "10px", border: "1px solid var(--border-color)" }}>
            <button
              onClick={() => setDonorActiveNav("donor-form")}
              style={{
                padding: "0.45rem 1rem",
                borderRadius: "8px",
                border: "none",
                fontWeight: 700,
                fontSize: "0.85rem",
                cursor: "pointer",
                background: donorActiveNav === "donor-form" ? "var(--bg-card)" : "transparent",
                color: donorActiveNav === "donor-form" ? "var(--primary-600)" : "var(--text-muted)",
                boxShadow: donorActiveNav === "donor-form" ? "0 2px 4px rgba(0,0,0,0.06)" : "none",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem"
              }}
            >
              <Utensils size={16} />
              <span>Donate Food Details</span>
            </button>

            <button
              onClick={() => setDonorActiveNav("nearby-map")}
              style={{
                padding: "0.45rem 1rem",
                borderRadius: "8px",
                border: "none",
                fontWeight: 700,
                fontSize: "0.85rem",
                cursor: "pointer",
                background: donorActiveNav === "nearby-map" ? "var(--bg-card)" : "transparent",
                color: donorActiveNav === "nearby-map" ? "var(--primary-600)" : "var(--text-muted)",
                boxShadow: donorActiveNav === "nearby-map" ? "0 2px 4px rgba(0,0,0,0.06)" : "none",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem"
              }}
            >
              <MapPin size={16} color="#ea4335" />
              <span>Nearby NGOs (Google Maps)</span>
            </button>
          </div>
        )}

        {/* Right Section: Theme Selector + User Capsule & Sign out */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          
          {/* Dynamic Theme Switcher Dropdown (8 Themes Available) */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowThemePicker(!showThemePicker)}
              className="btn btn-outline btn-sm"
              style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
              title="Change Theme Background & Colors"
            >
              <Palette size={16} />
              <span>Themes ({themes.length})</span>
            </button>

            {showThemePicker && (
              <div 
                style={{ 
                  position: "absolute", 
                  right: 0, 
                  top: "42px", 
                  width: "250px", 
                  background: "var(--bg-card)", 
                  borderRadius: "14px", 
                  boxShadow: "0 12px 28px -5px rgba(0,0,0,0.25)", 
                  border: "1px solid var(--border-color)", 
                  padding: "0.85rem", 
                  zIndex: 1100 
                }}
              >
                <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "0.6rem" }}>
                  Select App Theme:
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", maxHeight: "260px", overflowY: "auto" }}>
                  {themes.map(t => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheme(t.id);
                        setShowThemePicker(false);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0.5rem 0.75rem",
                        borderRadius: "8px",
                        border: "1px solid var(--border-color)",
                        background: theme === t.id ? "var(--primary-50)" : "transparent",
                        color: "var(--text-main)",
                        fontWeight: theme === t.id ? 800 : 500,
                        fontSize: "0.82rem",
                        cursor: "pointer"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ width: "14px", height: "14px", borderRadius: "50%", background: t.color, display: "inline-block", flexShrink: 0 }} />
                        <span>{t.name}</span>
                      </div>
                      {theme === t.id && <Check size={14} color="var(--primary-600)" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--text-main)" }}>
              {currentUser.name || currentUser.orgName}
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--primary-600)", fontWeight: 700, textTransform: "uppercase" }}>
              ● {currentUser.role === "donor" ? "Food Donor" : "Food Receiver"}
            </div>
          </div>

          <button 
            onClick={logout} 
            className="btn btn-outline btn-sm"
            style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}
            title="Log Out & Switch Role"
          >
            <LogOut size={15} />
            <span>Switch Role / Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: "1.75rem", maxWidth: "1280px", width: "100%", margin: "0 auto" }}>
        {isDonor ? (
          donorActiveNav === "donor-form" ? (
            <DonorPage onNavigateToMap={() => setDonorActiveNav("nearby-map")} />
          ) : (
            <NearbyNgosMap onBackToDonor={() => setDonorActiveNav("donor-form")} />
          )
        ) : (
          <ReceiverPage />
        )}
      </main>

    </div>
  );
}

export default App;
