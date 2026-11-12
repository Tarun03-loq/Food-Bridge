import { 
  HeartHandshake, 
  Sparkles, 
  TrendingUp, 
  MapPin, 
  UtensilsCrossed, 
  Truck, 
  ArrowRight,
  ShieldCheck,
  Building,
  Users
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const HomeDashboard = ({ setActiveTab }) => {
  const { stats, donations, currentUser } = useApp();

  const availableListings = donations.filter(d => d.status === "Available");

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Hero Banner */}
      <div className="hero-gradient">
        <div style={{ maxWidth: "700px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,255,255,0.2)", padding: "0.3rem 0.8rem", borderRadius: "9999px", fontSize: "0.8rem", fontWeight: 700, marginBottom: "1rem" }}>
            <Sparkles size={16} />
            <span>Hackathon Innovation Platform</span>
          </div>
          <h1 style={{ fontSize: "2.25rem", fontWeight: 800, lineHeight: 1.2, marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
            FoodBridge: Bridging Hunger with Surplus Food
          </h1>
          <p style={{ fontSize: "1.05rem", opacity: 0.95, lineHeight: 1.6, marginBottom: "1.5rem" }}>
            Every meal saved is a step toward zero food waste. Connecting restaurants, hotels, and supermarkets directly with verified local food shelters in real time.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            {currentUser?.role === "supplier" ? (
              <button className="btn" style={{ background: "#ffffff", color: "#166534" }} onClick={() => setActiveTab("donate")}>
                <UtensilsCrossed size={18} />
                <span>Post Surplus Food Now</span>
              </button>
            ) : (
              <button className="btn" style={{ background: "#ffffff", color: "#166534" }} onClick={() => setActiveTab("listings")}>
                <HeartHandshake size={18} />
                <span>Browse Available Donations ({availableListings.length})</span>
              </button>
            )}

            <button className="btn" style={{ background: "rgba(255,255,255,0.2)", color: "#ffffff", border: "1px solid rgba(255,255,255,0.3)" }} onClick={() => setActiveTab("map")}>
              <MapPin size={18} />
              <span>Explore Live Map</span>
            </button>
          </div>
        </div>

        {/* Live Counters */}
        <div className="hero-stats-grid">
          <div className="stat-box">
            <div style={{ fontSize: "0.8rem", opacity: 0.9, fontWeight: 600 }}>Total Meals Rescued</div>
            <div style={{ fontSize: "1.9rem", fontWeight: 800, marginTop: "0.25rem" }}>
              {stats.totalMealsRescued.toLocaleString()}+
            </div>
            <div style={{ fontSize: "0.75rem", opacity: 0.8, marginTop: "0.25rem" }}>Fed to communities in need</div>
          </div>
          <div className="stat-box">
            <div style={{ fontSize: "0.8rem", opacity: 0.9, fontWeight: 600 }}>Food Waste Prevented</div>
            <div style={{ fontSize: "1.9rem", fontWeight: 800, marginTop: "0.25rem" }}>
              {stats.totalKgFoodSaved.toLocaleString()} kg
            </div>
            <div style={{ fontSize: "0.75rem", opacity: 0.8, marginTop: "0.25rem" }}>~1,200 kg CO₂ emissions avoided</div>
          </div>
          <div className="stat-box">
            <div style={{ fontSize: "0.8rem", opacity: 0.9, fontWeight: 600 }}>Active Listings</div>
            <div style={{ fontSize: "1.9rem", fontWeight: 800, marginTop: "0.25rem" }}>
              {stats.activeDonationsCount}
            </div>
            <div style={{ fontSize: "0.75rem", opacity: 0.8, marginTop: "0.25rem" }}>Available for immediate pickup</div>
          </div>
          <div className="stat-box">
            <div style={{ fontSize: "0.8rem", opacity: 0.9, fontWeight: 600 }}>In Transit / Rescuing</div>
            <div style={{ fontSize: "1.9rem", fontWeight: 800, marginTop: "0.25rem" }}>
              {stats.inTransitCount}
            </div>
            <div style={{ fontSize: "0.75rem", opacity: 0.8, marginTop: "0.25rem" }}>Collections underway right now</div>
          </div>
        </div>
      </div>

      {/* Role Feature Highlights */}
      <div className="grid-3">
        <div className="fb-card fb-card-interactive" onClick={() => setActiveTab("supplier-dashboard")}>
          <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "#dcfce7", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
            <Building size={22} />
          </div>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.4rem" }}>For Food Suppliers</h3>
          <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.5, marginBottom: "1rem" }}>
            Hotels, restaurants, supermarkets and caterers can publish fresh leftover food within 30 seconds with allergen and expiry verification.
          </p>
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#16a34a", display: "flex", alignItems: "center", gap: "0.3rem" }}>
            Supplier portal <ArrowRight size={14} />
          </span>
        </div>

        <div className="fb-card fb-card-interactive" onClick={() => setActiveTab("ngo-dashboard")}>
          <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "#e0e7ff", color: "#4338ca", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
            <Users size={22} />
          </div>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.4rem" }}>For Verified NGOs</h3>
          <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.5, marginBottom: "1rem" }}>
            Real-time notifications of donations in your radius. Smart match algorithms ensure safe, rapid distribution before food expiration.
          </p>
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#4338ca", display: "flex", alignItems: "center", gap: "0.3rem" }}>
            NGO Operations <ArrowRight size={14} />
          </span>
        </div>

        <div className="fb-card fb-card-interactive" onClick={() => setActiveTab("tracking")}>
          <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "#fef3c7", color: "#b45309", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
            <Truck size={22} />
          </div>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.4rem" }}>Live Dispatch & Safety</h3>
          <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.5, marginBottom: "1rem" }}>
            Status workflows from Requested → Accepted → Picked Up → Delivered with strict hygiene conditions and time tracking.
          </p>
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#b45309", display: "flex", alignItems: "center", gap: "0.3rem" }}>
            Track collections <ArrowRight size={14} />
          </span>
        </div>
      </div>

      {/* Fresh Food Showcase */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 800 }}>Available Food Listings</h2>
            <p style={{ fontSize: "0.85rem", color: "#64748b" }}>Urgent pickups ready for rescue</p>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab("listings")}>
            View All ({availableListings.length})
          </button>
        </div>

        <div className="grid-3">
          {availableListings.slice(0, 3).map(item => (
            <div key={item.id} className="fb-card" style={{ padding: "1rem" }}>
              <div style={{ position: "relative", height: "160px", borderRadius: "10px", overflow: "hidden", marginBottom: "0.85rem" }}>
                <img 
                  src={item.imageUrl} 
                  alt={item.foodName} 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                />
                <span className={`status-pill status-${item.status}`} style={{ position: "absolute", top: "10px", right: "10px" }}>
                  ● {item.status}
                </span>
              </div>
              <div style={{ fontSize: "0.75rem", color: "#16a34a", fontWeight: 700, textTransform: "uppercase" }}>
                {item.category} • {item.supplierType}
              </div>
              <h4 style={{ fontSize: "1rem", fontWeight: 700, margin: "0.25rem 0 0.5rem" }}>
                {item.foodName}
              </h4>
              <div style={{ fontSize: "0.8rem", color: "#64748b", display: "flex", flexDirection: "column", gap: "0.25rem", marginBottom: "1rem" }}>
                <div><strong>Quantity:</strong> {item.quantity} (~{item.mealsCount} meals)</div>
                <div><strong>Location:</strong> {item.location}</div>
                <div><strong>Pickup Deadline:</strong> {new Date(item.expiryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
              </div>
              <button 
                className="btn btn-primary btn-sm" 
                style={{ width: "100%" }}
                onClick={() => setActiveTab("listings")}
              >
                Inspect & Claim
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

