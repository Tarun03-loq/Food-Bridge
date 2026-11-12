import { 
  Users, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Truck, 
  TrendingUp, 
  AlertCircle,
  ExternalLink
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const NgoDashboard = ({ setActiveTab }) => {
  const { currentUser, donations, requests } = useApp();

  const availableCount = donations.filter(d => d.status === "Available").length;
  const myClaims = requests.filter(r => r.ngoId === currentUser?.id);
  const activePickups = myClaims.filter(r => ["Requested", "Accepted", "Picked Up"].includes(r.status));
  const deliveredRescues = myClaims.filter(r => r.status === "Delivered");

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* NGO Profile Header */}
      <div style={{ background: "#ffffff", padding: "1.5rem", borderRadius: "16px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <span style={{ fontSize: "0.75rem", background: "#e0e7ff", color: "#4338ca", padding: "0.2rem 0.6rem", borderRadius: "9999px", fontWeight: 700 }}>
            Registered Food Relief NGO
          </span>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginTop: "0.3rem" }}>
            {currentUser?.name}
          </h2>
          <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
            Reg No: {currentUser?.regNumber || "NGO-BLR-2022"} • Daily Capacity: {currentUser?.dailyCapacity || 600} meals/day
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button className="btn btn-secondary" onClick={() => setActiveTab("map")}>
            <MapPin size={18} />
            <span>Interactive Map</span>
          </button>
          <button className="btn btn-primary" onClick={() => setActiveTab("listings")}>
            <span>Claim Fresh Food ({availableCount})</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid-3">
        <div className="fb-card">
          <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Available to Claim</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#16a34a", marginTop: "0.25rem" }}>
            {availableCount} Batches
          </div>
          <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>In your 15km service radius</div>
        </div>

        <div className="fb-card">
          <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Active Rescues</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#4338ca", marginTop: "0.25rem" }}>
            {activePickups.length} Pickups
          </div>
          <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>En route or awaiting dock release</div>
        </div>

        <div className="fb-card">
          <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Meals Distributed</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f766e", marginTop: "0.25rem" }}>
            {deliveredRescues.length * 120 + 820} Meals
          </div>
          <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Shelters & communities served</div>
        </div>
      </div>

      {/* Active Missions */}
      <div className="fb-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
          <h3 style={{ fontSize: "1.15rem", fontWeight: 700 }}>Ongoing Food Rescues</h3>
          <button className="btn btn-outline btn-sm" onClick={() => setActiveTab("tracking")}>
            <Truck size={16} />
            <span>Live Dispatch Map</span>
          </button>
        </div>

        {activePickups.length === 0 ? (
          <div style={{ textAlign: "center", padding: "2rem", color: "#64748b" }}>
            <p>No active pickups right now. Browse available food to start saving meals!</p>
            <button className="btn btn-primary btn-sm" style={{ marginTop: "0.75rem" }} onClick={() => setActiveTab("listings")}>
              Browse Food Listings
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {activePickups.map(req => (
              <div key={req.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", borderRadius: "12px", background: "#f8fafc", border: "1px solid #f1f5f9", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <h4 style={{ fontSize: "1rem", fontWeight: 700 }}>{req.donationName}</h4>
                  <div style={{ fontSize: "0.82rem", color: "#475569" }}>
                    From: <strong>{req.supplierName}</strong> • Driver: {req.driverName} ({req.vehicleNumber})
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "0.2rem" }}>
                    Pickup Scheduled: {new Date(req.pickupTimeRequested).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span className={`status-pill status-${req.status}`}>
                    ● {req.status}
                  </span>
                  <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab("tracking")}>
                    Track Dispatch
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

