import { useState } from "react";
import { 
  MapPin, 
  Navigation, 
  Filter, 
  Clock, 
  Phone, 
  CheckCircle,
  Building,
  Layers,
  Sparkles
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const NearbyMap = ({ setActiveTab }) => {
  const { donations, users, currentUser } = useApp();
  const [selectedPin, setSelectedPin] = useState(null);
  const [filterType, setFilterType] = useState("all"); // all, supplier, ngo

  // Mock geographic positions plotted on an intuitive interactive visual grid/map
  // Bangalore center reference (lat: 12.9716, lng: 77.5946)
  const mapCenter = { lat: 12.9716, lng: 77.5946 };

  // Calculate simulated pixel positions on a 100% responsive canvas map
  const getCoordinatesPct = (coords) => {
    if (!coords) return { left: "50%", top: "50%" };
    // Center delta mapped to percentages
    const left = 50 + (coords.lng - mapCenter.lng) * 900;
    const top = 50 - (coords.lat - mapCenter.lat) * 900;
    return {
      left: `${Math.max(10, Math.min(90, left))}%`,
      top: `${Math.max(10, Math.min(90, top))}%`
    };
  };

  const availableDonations = donations.filter(d => d.status === "Available");

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {/* Header Info */}
      <div className="fb-card" style={{ padding: "1.25rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 800, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Navigation size={22} color="#16a34a" />
              <span>Smart Donation Map & Proximity Locator</span>
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
              Visualizing active surplus food hubs and nearby registered NGO distribution centers in real time.
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button 
              className={`btn btn-sm ${filterType === "all" ? "btn-primary" : "btn-outline"}`}
              onClick={() => setFilterType("all")}
            >
              All Locations
            </button>
            <button 
              className={`btn btn-sm ${filterType === "donations" ? "btn-primary" : "btn-outline"}`}
              onClick={() => setFilterType("donations")}
            >
              Surplus Food ({availableDonations.length})
            </button>
            <button 
              className={`btn btn-sm ${filterType === "ngos" ? "btn-primary" : "btn-outline"}`}
              onClick={() => setFilterType("ngos")}
            >
              NGO Hubs
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Map Canvas */}
      <div style={{ display: "grid", gridTemplateColumns: selectedPin ? "1fr 340px" : "1fr", gap: "1.25rem" }}>
        <div 
          style={{ 
            height: "520px", 
            background: "#e5e7eb", 
            borderRadius: "16px", 
            position: "relative", 
            overflow: "hidden",
            boxShadow: "inset 0 2px 8px rgba(0,0,0,0.1)",
            border: "1px solid #cbd5e1"
          }}
        >
          {/* Custom SVG Stylized Map Base */}
          <div style={{ position: "absolute", inset: 0, opacity: 0.85, backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
          
          {/* Roads simulation lines */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
            <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="#cbd5e1" strokeWidth="6" />
            <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="#cbd5e1" strokeWidth="6" />
            <circle cx="50%" cy="50%" r="180" fill="none" stroke="#e2e8f0" strokeWidth="4" strokeDasharray="6 6" />
            <circle cx="50%" cy="50%" r="80" fill="rgba(34, 197, 94, 0.05)" stroke="#86efac" strokeWidth="2" />
          </svg>

          {/* Map Compass / Controls overlay */}
          <div style={{ position: "absolute", top: "16px", left: "16px", background: "white", padding: "0.5rem 0.85rem", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", fontSize: "0.8rem", fontWeight: 700, color: "#334155", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <MapPin size={16} color="#16a34a" />
            <span>Bangalore Metro Grid (Live GPS Sync)</span>
          </div>

          {/* User's Current Location Beacon */}
          <div style={{ position: "absolute", left: "48%", top: "52%", transform: "translate(-50%, -50%)", zIndex: 10 }}>
            <div style={{ width: "18px", height: "18px", background: "#0284c7", borderRadius: "50%", border: "3px solid white", boxShadow: "0 0 10px rgba(2,132,199,0.5)" }} />
            <div className="pulse-indicator" style={{ position: "absolute", inset: "-8px", borderRadius: "50%", background: "rgba(2,132,199,0.3)" }} />
          </div>

          {/* Food Donation Pins */}
          {(filterType === "all" || filterType === "donations") && availableDonations.map(don => {
            const pos = getCoordinatesPct(don.coordinates);
            const isSelected = selectedPin?.id === don.id;

            return (
              <div 
                key={don.id}
                onClick={() => setSelectedPin({ type: "donation", data: don })}
                style={{
                  position: "absolute",
                  left: pos.left,
                  top: pos.top,
                  transform: "translate(-50%, -50%)",
                  cursor: "pointer",
                  zIndex: isSelected ? 30 : 20,
                  transition: "transform 0.2s"
                }}
              >
                <div style={{ 
                  background: isSelected ? "#15803d" : "#16a34a", 
                  color: "white", 
                  padding: "0.45rem 0.75rem", 
                  borderRadius: "20px", 
                  fontSize: "0.75rem", 
                  fontWeight: 700,
                  display: "flex", 
                  alignItems: "center", 
                  gap: "0.35rem",
                  boxShadow: "0 4px 10px rgba(22, 163, 74, 0.4)",
                  border: "2px solid white",
                  transform: isSelected ? "scale(1.15)" : "scale(1)"
                }}>
                  <span>🍲 {don.foodName.split(" ")[0]} ({don.mealsCount}m)</span>
                </div>
              </div>
            );
          })}

          {/* Registered NGO Pins */}
          {(filterType === "all" || filterType === "ngos") && users.filter(u => u.role === "ngo").map(ngo => {
            const pos = getCoordinatesPct(ngo.coordinates);
            const isSelected = selectedPin?.id === ngo.id;

            return (
              <div 
                key={ngo.id}
                onClick={() => setSelectedPin({ type: "ngo", data: ngo })}
                style={{
                  position: "absolute",
                  left: pos.left,
                  top: pos.top,
                  transform: "translate(-50%, -50%)",
                  cursor: "pointer",
                  zIndex: isSelected ? 30 : 15
                }}
              >
                <div style={{ 
                  background: isSelected ? "#3730a3" : "#4338ca", 
                  color: "white", 
                  padding: "0.35rem 0.65rem", 
                  borderRadius: "20px", 
                  fontSize: "0.75rem", 
                  fontWeight: 700,
                  display: "flex", 
                  alignItems: "center", 
                  gap: "0.3rem",
                  boxShadow: "0 4px 10px rgba(67, 56, 202, 0.3)",
                  border: "2px solid white"
                }}>
                  <span>🏢 {ngo.name.split(" ")[0]}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pin Detail Sidebar */}
        {selectedPin && (
          <div className="fb-card animate-fade-in" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <span style={{ 
                  fontSize: "0.72rem", 
                  fontWeight: 800, 
                  textTransform: "uppercase", 
                  padding: "0.2rem 0.6rem", 
                  borderRadius: "9999px",
                  background: selectedPin.type === "donation" ? "#dcfce7" : "#e0e7ff",
                  color: selectedPin.type === "donation" ? "#166534" : "#4338ca"
                }}>
                  {selectedPin.type === "donation" ? "Available Food Donation" : "Verified NGO Center"}
                </span>
                <button 
                  onClick={() => setSelectedPin(null)} 
                  style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.1rem", color: "#94a3b8" }}
                >
                  ✕
                </button>
              </div>

              {selectedPin.type === "donation" ? (
                <div>
                  <img 
                    src={selectedPin.data.imageUrl} 
                    alt={selectedPin.data.foodName} 
                    style={{ width: "100%", height: "140px", borderRadius: "10px", objectFit: "cover", marginBottom: "0.75rem" }} 
                  />
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "0.3rem" }}>
                    {selectedPin.data.foodName}
                  </h3>
                  <div style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "0.75rem" }}>
                    <strong>Supplier:</strong> {selectedPin.data.supplierName} ({selectedPin.data.supplierType})
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#334155", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                    <div><strong>Quantity:</strong> {selectedPin.data.quantity} (~{selectedPin.data.mealsCount} meals)</div>
                    <div><strong>Pickup Location:</strong> {selectedPin.data.location}</div>
                    <div><strong>Safe Deadline:</strong> {new Date(selectedPin.data.expiryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    <div><strong>Allergens:</strong> {selectedPin.data.allergens}</div>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 800, marginBottom: "0.3rem" }}>
                    {selectedPin.data.name}
                  </h3>
                  <div style={{ fontSize: "0.85rem", color: "#4338ca", fontWeight: 600, marginBottom: "0.75rem" }}>
                    {selectedPin.data.regNumber}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#334155", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                    <div><strong>Address:</strong> {selectedPin.data.address}</div>
                    <div><strong>Daily Feeding Capacity:</strong> {selectedPin.data.dailyCapacity} meals/day</div>
                    <div><strong>Service Radius:</strong> {selectedPin.data.serviceRadiusKm} km coverage</div>
                    <div><strong>Contact:</strong> {selectedPin.data.phone}</div>
                  </div>
                </div>
              )}
            </div>

            <div style={{ marginTop: "1.25rem", paddingTop: "1rem", borderTop: "1px solid #f1f5f9" }}>
              {selectedPin.type === "donation" ? (
                <button 
                  className="btn btn-primary" 
                  style={{ width: "100%" }}
                  onClick={() => setActiveTab("listings")}
                >
                  Proceed to Claim Food
                </button>
              ) : (
                <a 
                  href={`tel:${selectedPin.data.phone}`}
                  className="btn btn-secondary" 
                  style={{ width: "100%", textDecoration: "none" }}
                >
                  <Phone size={16} />
                  <span>Call NGO Coordinator</span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

