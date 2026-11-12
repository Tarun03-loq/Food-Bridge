import { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Leaf, Package, TrendingUp, Users, Phone,
  MapPin, Building, Calendar, LogOut, PlusCircle, CheckCircle,
  Clock, BarChart2, Sprout, ShoppingBasket, ArrowRight, Info,
  AlertTriangle
} from "lucide-react";

const ECO_FARM_ORG_TYPES = [
  "Organic Farm", "Cooperative Society", "Agricultural Producer",
  "Food Processing Unit", "Community Farm", "Urban Farm / Rooftop Garden",
  "Dairy Farm", "Poultry Farm", "Fishery / Aquafarm",
  "Fruit Orchard", "Vegetable Farm", "Herb Garden", "Other"
];

const SAMPLE_LISTINGS = [
  {
    id: "ef_1", crop: "Tomatoes", quantity: "120", unit: "kg",
    harvestDate: "2026-11-12", expiryDate: "2026-11-15",
    location: "Hesaraghatta Road, Bangalore", status: "Available",
    postedBy: "Green Roots Farm", contact: "+91 98765 11223"
  },
  {
    id: "ef_2", crop: "Spinach (Palak)", quantity: "60", unit: "kg",
    harvestDate: "2026-11-13", expiryDate: "2026-11-14",
    location: "Devanahalli, Bangalore Rural", status: "Reserved",
    postedBy: "Sunrise Cooperative", contact: "+91 97412 55678"
  },
  {
    id: "ef_3", crop: "Coconuts", quantity: "500", unit: "pieces",
    harvestDate: "2026-11-10", expiryDate: "2026-11-25",
    location: "Tumkur Road, Karnataka", status: "Available",
    postedBy: "Kerala Coconut Union", contact: "+91 98800 44321"
  }
];

export const EcoFarmPage = () => {
  const { currentUser, logout, donations, expiredDonations } = useApp();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [showAddListing, setShowAddListing] = useState(false);
  const [listings, setListings] = useState(SAMPLE_LISTINGS);
  const [newListing, setNewListing] = useState({
    crop: "", quantity: "", unit: "kg",
    harvestDate: "", expiryDate: "", location: "", contact: ""
  });
  const [listingError, setListingError] = useState("");
  const [listingSuccess, setListingSuccess] = useState("");

  // expiredDonations comes from AppContext (food donations posted by donors that expired)
  const expiredCount = expiredDonations ? expiredDonations.length : 0;

  const handleAddListing = (e) => {
    e.preventDefault();
    setListingError("");
    if (!newListing.crop.trim() || !newListing.quantity.trim() || !newListing.harvestDate || !newListing.expiryDate || !newListing.location.trim()) {
      setListingError("Please fill in all required fields.");
      return;
    }
    const item = {
      id: "ef_" + Date.now(),
      ...newListing,
      status: "Available",
      postedBy: currentUser?.name || "Eco-Farm Partner",
      contact: newListing.contact || currentUser?.phone || ""
    };
    setListings([item, ...listings]);
    setListingSuccess("Produce listing posted successfully!");
    setNewListing({ crop: "", quantity: "", unit: "kg", harvestDate: "", expiryDate: "", location: "", contact: "" });
    setShowAddListing(false);
    setTimeout(() => setListingSuccess(""), 4000);
  };

  const availableCount = listings.filter(l => l.status === "Available").length;
  const reservedCount = listings.filter(l => l.status === "Reserved").length;
  const totalFoodRescued = listings.length * 45;
  const ngoCount = 6;

  const tabStyle = (id) => ({
    padding: "0.55rem 1rem",
    borderRadius: "10px",
    border: "none",
    fontWeight: 700,
    fontSize: "0.8rem",
    cursor: "pointer",
    background: activeTab === id ? "var(--primary-600)" : "transparent",
    color: activeTab === id ? "white" : "var(--text-muted)",
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    transition: "all 0.2s",
    position: "relative"
  });

  const statusBadge = (status) => {
    const map = {
      "Available": { bg: "#dcfce7", color: "#166534", text: "🟢 Available" },
      "Reserved":  { bg: "#fef9c3", color: "#854d0e", text: "🟡 Reserved" },
      "Collected": { bg: "#dbeafe", color: "#1e3a8a", text: "🔵 Collected" },
      "Expired":   { bg: "#fee2e2", color: "#991b1b", text: "🔴 Expired" }
    };
    const s = map[status] || { bg: "#f1f5f9", color: "#475569", text: status };
    return (
      <span style={{ background: s.bg, color: s.color, padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 700 }}>
        {s.text}
      </span>
    );
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg-main)" }}>

      {/* ── HEADER ── */}
      <header style={{ height: "68px", background: "var(--navbar-bg)", borderBottom: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2rem", position: "sticky", top: 0, zIndex: 1000, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "#16a34a", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Leaf size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#166534", lineHeight: 1.1 }}>Eco-Farm Portal</h1>
            <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 600 }}>Farm-to-NGO Surplus Bridge</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav style={{ display: "flex", background: "var(--bg-main)", padding: "0.25rem", borderRadius: "12px", border: "1px solid var(--border-color)", gap: "0.2rem" }}>
          <button style={tabStyle("dashboard")} onClick={() => setActiveTab("dashboard")}>
            <BarChart2 size={15} /> Dashboard
          </button>
          <button style={tabStyle("listings")} onClick={() => setActiveTab("listings")}>
            <ShoppingBasket size={15} /> My Listings
          </button>
          <button style={tabStyle("expired")} onClick={() => setActiveTab("expired")}>
            <AlertTriangle size={15} />
            Expired Food
            {expiredCount > 0 && (
              <span style={{ background: "#dc2626", color: "white", borderRadius: "9999px", fontSize: "0.68rem", fontWeight: 900, padding: "0.1rem 0.45rem", marginLeft: "0.1rem" }}>
                {expiredCount}
              </span>
            )}
          </button>
          <button style={tabStyle("ngos")} onClick={() => setActiveTab("ngos")}>
            <Users size={15} /> NGO Partners
          </button>
          <button style={tabStyle("profile")} onClick={() => setActiveTab("profile")}>
            <Sprout size={15} /> Farm Profile
          </button>
        </nav>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--text-main)" }}>{currentUser?.name}</div>
            <div style={{ fontSize: "0.7rem", color: "#16a34a", fontWeight: 700, textTransform: "uppercase" }}>🌿 Eco-Farm Partner</div>
          </div>
          <button onClick={logout} className="btn btn-outline btn-sm" style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <LogOut size={15} /> Logout
          </button>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main style={{ flex: 1, padding: "1.75rem", maxWidth: "1280px", width: "100%", margin: "0 auto" }}>

        {listingSuccess && (
          <div style={{ background: "#dcfce7", border: "1px solid #86efac", color: "#166534", padding: "0.85rem 1rem", borderRadius: "12px", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <CheckCircle size={18} /> {listingSuccess}
          </div>
        )}

        {/* ── DASHBOARD ── */}
        {activeTab === "dashboard" && (
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--primary-800)", marginBottom: "0.25rem" }}>
                Welcome back, {currentUser?.name}! 🌱
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                {currentUser?.orgType} · {currentUser?.address}
              </p>
            </div>

            {/* Stat Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "1rem", marginBottom: "1.75rem" }}>
              {[
                { icon: <Package size={22} />, label: "Active Listings",    value: availableCount,    color: "#16a34a", bg: "#dcfce7" },
                { icon: <Clock size={22} />,   label: "Reserved by NGOs",   value: reservedCount,     color: "#d97706", bg: "#fef9c3" },
                { icon: <TrendingUp size={22} />, label: "Meals Facilitated", value: totalFoodRescued, color: "#2563eb", bg: "#dbeafe" },
                { icon: <Users size={22} />,   label: "Partner NGOs",       value: ngoCount,          color: "#9333ea", bg: "#f3e8ff" },
                { icon: <AlertTriangle size={22} />, label: "Expired Donations (from donors)", value: expiredCount, color: "#dc2626", bg: "#fee2e2" }
              ].map((stat, i) => (
                <div key={i} className="fb-card" style={{ padding: "1.25rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: stat.bg, color: stat.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {stat.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: "1.75rem", fontWeight: 900, color: "var(--text-main)", lineHeight: 1.1 }}>{stat.value}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, marginTop: "0.15rem" }}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div className="fb-card" style={{ padding: "1.5rem", marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--primary-800)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Sprout size={18} /> Quick Actions
              </h3>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <button className="btn btn-primary" onClick={() => { setActiveTab("listings"); setShowAddListing(true); }} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <PlusCircle size={16} /> Post Surplus Produce
                </button>
                <button className="btn btn-outline" onClick={() => setActiveTab("expired")} style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: expiredCount > 0 ? "#dc2626" : undefined, borderColor: expiredCount > 0 ? "#fca5a5" : undefined }}>
                  <AlertTriangle size={16} /> View Expired Food {expiredCount > 0 && `(${expiredCount})`}
                </button>
                <button className="btn btn-outline" onClick={() => setActiveTab("ngos")} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <Users size={16} /> View NGO Partners
                </button>
              </div>
            </div>

            {/* Recent Listings Preview */}
            <div className="fb-card" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--primary-800)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Package size={18} /> Recent Produce Listings
              </h3>
              {listings.slice(0, 3).map(listing => (
                <div key={listing.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.85rem", background: "var(--bg-main)", borderRadius: "10px", marginBottom: "0.65rem", border: "1px solid var(--border-color)" }}>
                  <div>
                    <div style={{ fontWeight: 700, color: "var(--text-main)", fontSize: "0.95rem" }}>{listing.crop}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.1rem" }}>
                      📦 {listing.quantity} {listing.unit} · 📍 {listing.location}
                    </div>
                  </div>
                  {statusBadge(listing.status)}
                </div>
              ))}
              <button className="btn btn-outline btn-sm" onClick={() => setActiveTab("listings")} style={{ marginTop: "0.5rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                View All Listings <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* ── MY LISTINGS ── */}
        {activeTab === "listings" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.75rem" }}>
              <div>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--primary-800)" }}>Produce Listings</h2>
                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Post surplus farm produce for NGO collection</p>
              </div>
              <button className="btn btn-primary" onClick={() => setShowAddListing(!showAddListing)} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <PlusCircle size={16} /> {showAddListing ? "Cancel" : "Post New Listing"}
              </button>
            </div>

            {showAddListing && (
              <div className="fb-card animate-fade-in" style={{ padding: "1.5rem", marginBottom: "1.5rem", border: "2px solid #86efac" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#166534", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Leaf size={18} color="#16a34a" /> New Surplus Produce Listing
                </h3>
                {listingError && (
                  <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", color: "#b91c1c", padding: "0.65rem 0.9rem", borderRadius: "8px", fontSize: "0.85rem", marginBottom: "1rem" }}>
                    {listingError}
                  </div>
                )}
                <form onSubmit={handleAddListing} autoComplete="off">
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.9rem" }}>
                    <div className="form-group">
                      <label className="form-label">Crop / Produce Name *</label>
                      <input type="text" className="form-control" placeholder="e.g. Tomatoes, Spinach" value={newListing.crop}
                        onChange={e => setNewListing({ ...newListing, crop: e.target.value })} autoComplete="off" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Quantity *</label>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <input type="text" className="form-control" placeholder="e.g. 100" value={newListing.quantity}
                          onChange={e => setNewListing({ ...newListing, quantity: e.target.value })} autoComplete="off" required />
                        <select className="form-control" style={{ width: "90px" }} value={newListing.unit}
                          onChange={e => setNewListing({ ...newListing, unit: e.target.value })}>
                          <option>kg</option><option>g</option><option>litres</option>
                          <option>pieces</option><option>crates</option><option>bags</option><option>bunches</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Harvest Date *</label>
                      <input type="date" className="form-control" value={newListing.harvestDate}
                        onChange={e => setNewListing({ ...newListing, harvestDate: e.target.value })} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Safe Use / Expiry Date *</label>
                      <input type="date" className="form-control" value={newListing.expiryDate}
                        onChange={e => setNewListing({ ...newListing, expiryDate: e.target.value })} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Farm Location / Pickup Address *</label>
                      <input type="text" className="form-control" placeholder="e.g. Hesaraghatta, Bangalore" value={newListing.location}
                        onChange={e => setNewListing({ ...newListing, location: e.target.value })} autoComplete="off" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Contact Number</label>
                      <input type="tel" className="form-control" placeholder="e.g. +91 98765 43210" value={newListing.contact}
                        onChange={e => setNewListing({ ...newListing, contact: e.target.value })} autoComplete="off" />
                    </div>
                  </div>
                  <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.75rem" }}>
                    <button type="submit" className="btn btn-primary" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <CheckCircle size={16} /> Post Listing
                    </button>
                    <button type="button" className="btn btn-outline" onClick={() => setShowAddListing(false)}>Cancel</button>
                  </div>
                </form>
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
              {listings.map(listing => (
                <div key={listing.id} className="fb-card" style={{ padding: "1.25rem", borderLeft: `4px solid ${listing.status === "Available" ? "#16a34a" : listing.status === "Reserved" ? "#d97706" : "#94a3b8"}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.85rem" }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "var(--text-main)" }}>{listing.crop}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>By {listing.postedBy}</div>
                    </div>
                    {statusBadge(listing.status)}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.83rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--text-muted)" }}>
                      <Package size={14} color="#16a34a" /> <span style={{ fontWeight: 700, color: "var(--text-main)" }}>{listing.quantity} {listing.unit}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--text-muted)" }}>
                      <Calendar size={14} /> Harvested: {listing.harvestDate}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--text-muted)" }}>
                      <Clock size={14} color="#dc2626" /> Safe until: {listing.expiryDate}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--text-muted)" }}>
                      <MapPin size={14} /> {listing.location}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--text-muted)" }}>
                      <Phone size={14} /> {listing.contact}
                    </div>
                  </div>
                  {listing.status === "Available" && (
                    <button className="btn btn-outline btn-sm"
                      style={{ marginTop: "0.9rem", width: "100%", color: "#dc2626", borderColor: "#fca5a5", fontSize: "0.78rem" }}
                      onClick={() => setListings(prev => prev.filter(l => l.id !== listing.id))}>
                      Remove Listing
                    </button>
                  )}
                </div>
              ))}
              {listings.length === 0 && (
                <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
                  <Leaf size={48} style={{ opacity: 0.3, marginBottom: "0.75rem" }} />
                  <p style={{ fontWeight: 600 }}>No produce listings yet. Post your first listing!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── EXPIRED FOOD (from donor donations) ── */}
        {activeTab === "expired" && (
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#b91c1c", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <AlertTriangle size={22} color="#dc2626" /> Expired Food Donations
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "0.3rem" }}>
                These food items passed their safe-use deadline and were automatically removed from the NGO receiver feed.
                They appear here so eco-farms can assess whether any food is still usable (e.g. for composting, animal feed, or biogas).
              </p>
            </div>

            {expiredCount === 0 ? (
              <div className="fb-card" style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--text-muted)" }}>
                <CheckCircle size={48} style={{ margin: "0 auto 0.75rem", opacity: 0.3, color: "#16a34a" }} />
                <p style={{ fontWeight: 700, fontSize: "1rem" }}>No expired donations right now! 🎉</p>
                <p style={{ fontSize: "0.85rem", marginTop: "0.3rem" }}>All food donations are within their safe-use deadline.</p>
              </div>
            ) : (
              <>
                {/* Summary banner */}
                <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "14px", padding: "1rem 1.25rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                  <AlertTriangle size={28} color="#dc2626" style={{ flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 800, color: "#b91c1c", fontSize: "1rem" }}>
                      {expiredCount} food donation{expiredCount > 1 ? "s" : ""} expired and removed from the NGO interface
                    </div>
                    <div style={{ fontSize: "0.82rem", color: "#7f1d1d", marginTop: "0.2rem" }}>
                      These were automatically moved here when their expiry time passed. Donors have been implicitly notified via status change.
                    </div>
                  </div>
                </div>

                {/* Expired cards */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                  {expiredDonations.map(item => (
                    <div key={item.id} className="fb-card" style={{ padding: "1.25rem", borderLeft: "5px solid #dc2626", background: "var(--bg-card)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                        <div style={{ flex: 1 }}>
                          {/* Status pill */}
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.65rem" }}>
                            <span style={{ background: "#fee2e2", color: "#b91c1c", padding: "0.2rem 0.65rem", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: 800 }}>
                              ⛔ EXPIRED
                            </span>
                            <span style={{ background: "#f1f5f9", color: "#475569", padding: "0.2rem 0.65rem", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: 600 }}>
                              🚚 {item.deliveryMode}
                            </span>
                          </div>

                          {/* Quantity */}
                          <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "#7f1d1d", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                            <Package size={18} color="#dc2626" />
                            Quantity: {item.quantity}
                          </div>

                          {/* Details grid */}
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.4rem", fontSize: "0.83rem", color: "var(--text-muted)" }}>
                            <div><strong>📍 Location:</strong> {item.location}</div>
                            <div><strong>🕒 Prepared:</strong> {new Date(item.dateTimePrepared).toLocaleString()}</div>
                            <div style={{ color: "#b91c1c", fontWeight: 700 }}>
                              <strong>⏰ Expired at:</strong> {new Date(item.dateTimeExpiry).toLocaleString()}
                            </div>
                            {item.expiredAt && (
                              <div><strong>🔴 Marked expired:</strong> {new Date(item.expiredAt).toLocaleString()}</div>
                            )}
                            <div><strong>👤 Donor contact:</strong> {item.contactName}</div>
                            <div>
                              <strong>📞 Phone:</strong>{" "}
                              <a href={`tel:${item.contactPhone}`} style={{ color: "var(--primary-600)", fontWeight: 700 }}>
                                {item.contactPhone}
                              </a>
                            </div>
                          </div>

                          {item.notes && (
                            <div style={{ marginTop: "0.5rem", fontSize: "0.8rem", color: "var(--text-muted)", fontStyle: "italic" }}>
                              Note: {item.notes}
                            </div>
                          )}
                        </div>

                        {/* Action suggestions */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", minWidth: "160px" }}>
                          <div style={{ background: "#fef9c3", border: "1px solid #fde68a", borderRadius: "10px", padding: "0.75rem", fontSize: "0.78rem", color: "#78350f" }}>
                            <div style={{ fontWeight: 800, marginBottom: "0.35rem" }}>♻️ Suggested Use</div>
                            <ul style={{ paddingLeft: "1rem", margin: 0, lineHeight: 1.8 }}>
                              <li>Compost / biogas</li>
                              <li>Animal feed (if safe)</li>
                              <li>Soil enrichment</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* ── NGO PARTNERS ── */}
        {activeTab === "ngos" && (
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--primary-800)" }}>NGO Partner Network</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>NGOs that accept farm surplus and distribute to communities</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
              {[
                { name: "Hope Feeding Foundation",  contact: "Dr. Sister Clara",  phone: "+91 94480 55667", area: "Shivajinagar, Bangalore",  capacity: "600 meals/day",   accepts: "Vegetables, Fruits, Cooked food" },
                { name: "Annapoorna Seva Trust",    contact: "Raghavendra Rao",   phone: "+91 97412 88990", area: "Jayanagar, Bangalore",     capacity: "1,200 meals/day", accepts: "All produce, Grains, Dairy" },
                { name: "Robin Hood Army",          contact: "Arjun Verma",       phone: "+91 98800 12345", area: "Indiranagar, Bangalore",   capacity: "800 meals/day",   accepts: "Raw vegetables, Fruits" },
                { name: "Aahwahan Food Bank",       contact: "Meera Nair",        phone: "+91 98450 77112", area: "Koramangala, Bangalore",   capacity: "500 meals/day",   accepts: "Packaged produce, Grains" },
                { name: "Akshaya Seva Samithi",     contact: "S. Venkatesh",      phone: "+91 98111 23456", area: "Malleshwaram, Bangalore",  capacity: "950 meals/day",   accepts: "All types of produce" },
                { name: "Rotary Food Mission",      contact: "Kavitha Reddy",     phone: "+91 99000 44321", area: "Whitefield, Bangalore",    capacity: "750 meals/day",   accepts: "Fruits, Vegetables, Dairy" }
              ].map((ngo, i) => (
                <div key={i} className="fb-card" style={{ padding: "1.25rem", borderLeft: "4px solid #16a34a" }}>
                  <div style={{ fontWeight: 800, fontSize: "1rem", color: "var(--primary-800)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <Users size={16} color="#16a34a" /> {ngo.name}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
                    <div>👤 {ngo.contact}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}><Phone size={13} /> {ngo.phone}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}><MapPin size={13} /> {ngo.area}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}><TrendingUp size={13} color="#16a34a" /> Capacity: {ngo.capacity}</div>
                    <div style={{ background: "#dcfce7", color: "#166534", padding: "0.4rem 0.6rem", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 600, marginTop: "0.25rem" }}>
                      ✅ Accepts: {ngo.accepts}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── PROFILE ── */}
        {activeTab === "profile" && (
          <div style={{ maxWidth: "680px" }}>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--primary-800)", marginBottom: "1.5rem" }}>Farm Profile</h2>
            <div className="fb-card" style={{ padding: "1.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ width: "64px", height: "64px", borderRadius: "16px", background: "#dcfce7", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Sprout size={34} />
                </div>
                <div>
                  <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-main)" }}>{currentUser?.name}</div>
                  <div style={{ fontSize: "0.82rem", color: "#16a34a", fontWeight: 700 }}>🌿 {currentUser?.orgType || "Eco-Farm Partner"}</div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {[
                  { icon: <Package size={16} />, label: "Email",             value: currentUser?.email },
                  { icon: <Phone size={16} />,   label: "Phone",             value: currentUser?.phone },
                  { icon: <Building size={16} />, label: "Organisation Type", value: currentUser?.orgType },
                  { icon: <MapPin size={16} />,  label: "Address / Location", value: currentUser?.address }
                ].map((field, i) => (
                  <div key={i} style={{ padding: "0.9rem", background: "var(--bg-main)", borderRadius: "10px", border: "1px solid var(--border-color)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--text-muted)", fontSize: "0.75rem", fontWeight: 700, marginBottom: "0.35rem", textTransform: "uppercase" }}>
                      {field.icon} {field.label}
                    </div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-main)" }}>{field.value || "—"}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "1.5rem", padding: "1rem", background: "#dcfce7", borderRadius: "10px", border: "1px solid #86efac" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#166534", fontWeight: 700, fontSize: "0.85rem" }}>
                  <Info size={16} /> Eco-Farm Partner Benefits
                </div>
                <ul style={{ color: "#166534", fontSize: "0.82rem", marginTop: "0.5rem", paddingLeft: "1.25rem", lineHeight: 1.8 }}>
                  <li>Post unlimited surplus produce listings</li>
                  <li>Connect directly with verified NGOs</li>
                  <li>Track collection status in real-time</li>
                  <li>View all expired food donations for composting / repurposing</li>
                  <li>Reduce food waste with zero logistics cost</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
