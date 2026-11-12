import { useState } from "react";
import { 
  PlusCircle, 
  MapPin, 
  Clock, 
  Phone, 
  Calendar, 
  Truck, 
  CheckCircle2, 
  AlertCircle,
  Building,
  User,
  Trash2,
  Sparkles,
  Package,
  Check
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const DonorPage = ({ onNavigateToMap }) => {
  const { currentUser, addDonation, donations, completeDonation, deleteDonation, ngos } = useApp();

  const [formData, setFormData] = useState({
    quantity: "",
    location: currentUser?.address || "MG Road, Central Bangalore",
    dateTimePrepared: new Date().toISOString().slice(0, 16),
    dateTimeExpiry: new Date(Date.now() + 6 * 3600000).toISOString().slice(0, 16), // safe time period
    contactName: currentUser?.name || currentUser?.businessName || "Kitchen Manager",
    contactPhone: currentUser?.phone || "+91 98765 43210",
    deliveryMode: "Pickup by NGO", // "Delivery by Own" or "Pickup by NGO"
    notes: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [activeSubTab, setActiveSubTab] = useState("form"); // "form" or "history"

  // Filter donations posted by this donor
  const myDonations = donations.filter(d => 
    !currentUser?.email || d.donorEmail === currentUser?.email || d.contactPhone === currentUser?.phone
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.quantity.trim() || !formData.location.trim()) {
      setError("Please enter both Food Quantity and Pickup Location.");
      return;
    }

    const prep = new Date(formData.dateTimePrepared).getTime();
    const expiry = new Date(formData.dateTimeExpiry).getTime();

    if (expiry <= Date.now()) {
      setError("Safe time period cannot be in the past.");
      return;
    }

    if (expiry <= prep) {
      setError("Safe time period deadline must be after food preparation time.");
      return;
    }

    addDonation(formData);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        quantity: "",
        location: formData.location,
        dateTimePrepared: new Date().toISOString().slice(0, 16),
        dateTimeExpiry: new Date(Date.now() + 6 * 3600000).toISOString().slice(0, 16),
        contactName: formData.contactName,
        contactPhone: formData.contactPhone,
        deliveryMode: "Pickup by NGO",
        notes: ""
      });
      setActiveSubTab("history"); // automatically switch to history so user sees it live
    }, 1500);
  };

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* Top Banner with Quick Navigation */}
      <div className="hero-gradient" style={{ padding: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(255,255,255,0.2)", padding: "0.25rem 0.75rem", borderRadius: "9999px", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              <Sparkles size={15} />
              <span>Donor Food Management System</span>
            </div>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800 }}>Donate Surplus Food</h2>
            <p style={{ opacity: 0.95, fontSize: "0.95rem", maxWidth: "600px" }}>
              Publish surplus food quantity and pickup location. Real-time broadcast immediately dispatches alerts to registered food receiver NGOs.
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button 
              className="btn" 
              style={{ background: "#ffffff", color: "var(--primary-700)", fontWeight: 800, padding: "0.85rem 1.35rem", boxShadow: "0 8px 16px rgba(0,0,0,0.15)" }}
              onClick={onNavigateToMap}
            >
              <MapPin size={20} color="#ea4335" />
              <span>Locate Nearby NGOs on Map ➔</span>
            </button>
          </div>
        </div>
      </div>

      {submitted && (
        <div style={{ background: "#dcfce7", border: "1px solid #86efac", color: "#15803d", padding: "1.25rem", borderRadius: "14px", textAlign: "center", fontWeight: 800, fontSize: "1.05rem" }}>
          🎉 Success! Your food donation was posted. Real-time notification dispatched to registered receivers!
        </div>
      )}

      {error && (
        <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", color: "#b91c1c", padding: "0.85rem 1rem", borderRadius: "10px", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* Tab Switcher: Post Food vs My Posted Food Batches */}
      <div style={{ display: "flex", gap: "0.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>
        <button
          className={`btn btn-sm ${activeSubTab === "form" ? "btn-primary" : "btn-outline"}`}
          onClick={() => setActiveSubTab("form")}
        >
          <PlusCircle size={16} />
          <span>Post New Donation</span>
        </button>
        <button
          className={`btn btn-sm ${activeSubTab === "history" ? "btn-primary" : "btn-outline"}`}
          onClick={() => setActiveSubTab("history")}
        >
          <Package size={16} />
          <span>My Posted Donations ({myDonations.length})</span>
        </button>
      </div>

      {activeSubTab === "form" ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "1.5rem" }}>
          {/* Main Food Donation Form */}
          <div className="fb-card">
            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              Enter Surplus Food Details
            </h3>

            <form onSubmit={handleSubmit}>
              {/* 1. Food Quantity & Location */}
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Food Quantity *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g. 30 kg / 100 boxes / 150 meals" 
                    value={formData.quantity}
                    onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Pickup Location *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g. MG Road, Near Metro Pillar 140, Bangalore" 
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* 2. Date & Time Period */}
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Food Preparation Date & Time *</label>
                  <input 
                    type="datetime-local" 
                    className="form-control" 
                    value={formData.dateTimePrepared}
                    onChange={e => setFormData({ ...formData, dateTimePrepared: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: "#b45309" }}>Safe Consumption Time Period (Expiry) *</label>
                  <input 
                    type="datetime-local" 
                    className="form-control" 
                    value={formData.dateTimeExpiry}
                    onChange={e => setFormData({ ...formData, dateTimeExpiry: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* 3. Contact Details */}
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Contact Person Name *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g. Chef Rajesh / Manager Anand" 
                    value={formData.contactName}
                    onChange={e => setFormData({ ...formData, contactName: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Contact Phone Number *</label>
                  <input 
                    type="tel" 
                    className="form-control" 
                    placeholder="e.g. +91 98765 43210" 
                    value={formData.contactPhone}
                    onChange={e => setFormData({ ...formData, contactPhone: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* 4. Selecting Option: Delivery by Own vs Pickup */}
              <div className="form-group" style={{ background: "var(--primary-50)", border: "2px solid var(--primary-300)", padding: "1.25rem", borderRadius: "12px", marginTop: "0.5rem" }}>
                <label className="form-label" style={{ fontSize: "1rem", color: "var(--primary-800)", fontWeight: 800 }}>
                  🚚 Delivery & Fulfillment Method *
                </label>
                <p style={{ fontSize: "0.85rem", color: "var(--primary-700)", marginBottom: "0.75rem" }}>
                  Select whether you will transport the food to the NGO, or prefer the NGO to come pick it up:
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "var(--bg-card)", padding: "0.9rem", borderRadius: "10px", border: formData.deliveryMode === "Delivery by Own" ? "2px solid var(--primary-600)" : "1px solid var(--border-color)", cursor: "pointer" }}>
                    <input 
                      type="radio" 
                      name="deliveryMode" 
                      value="Delivery by Own"
                      checked={formData.deliveryMode === "Delivery by Own"}
                      onChange={e => setFormData({ ...formData, deliveryMode: e.target.value })}
                      style={{ width: "18px", height: "18px", accentColor: "var(--primary-600)" }}
                    />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: "0.9rem", color: "var(--text-main)" }}>Delivery by Own</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>We will deliver to the receiver</div>
                    </div>
                  </label>

                  <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "var(--bg-card)", padding: "0.9rem", borderRadius: "10px", border: formData.deliveryMode === "Pickup by NGO" ? "2px solid var(--primary-600)" : "1px solid var(--border-color)", cursor: "pointer" }}>
                    <input 
                      type="radio" 
                      name="deliveryMode" 
                      value="Pickup by NGO"
                      checked={formData.deliveryMode === "Pickup by NGO"}
                      onChange={e => setFormData({ ...formData, deliveryMode: e.target.value })}
                      style={{ width: "18px", height: "18px", accentColor: "var(--primary-600)" }}
                    />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: "0.9rem", color: "var(--text-main)" }}>Pickup by NGO</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>NGO collects from our location</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Special notes */}
              <div className="form-group" style={{ marginTop: "1rem" }}>
                <label className="form-label">Special Handling or Gate Instructions (Optional)</label>
                <textarea 
                  className="form-control" 
                  rows={2} 
                  placeholder="e.g. Please bring insulated containers. Enter via kitchen dock bay 2."
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%", marginTop: "0.75rem" }}>
                <PlusCircle size={20} />
                <span>Confirm & Post Food Donation</span>
              </button>
            </form>
          </div>

          {/* Right Sidebar: Nearby NGOs Preview */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="fb-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--primary-700)" }}>
                  Nearby Verified NGOs ({ngos.length})
                </h4>
                <button className="btn btn-outline btn-sm" onClick={onNavigateToMap}>
                  View Map
                </button>
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
                Active relief organizations ready for food distribution:
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {ngos.slice(0, 4).map(ngo => (
                  <div key={ngo.id} style={{ padding: "0.75rem", borderRadius: "10px", background: "var(--bg-main)", border: "1px solid var(--border-color)", fontSize: "0.82rem" }}>
                    <div style={{ fontWeight: 800, color: "var(--text-main)" }}>{ngo.name}</div>
                    <div style={{ color: "var(--text-muted)", fontSize: "0.75rem", marginTop: "2px" }}>
                      📍 {ngo.address}
                    </div>
                    <div style={{ color: "var(--primary-600)", fontSize: "0.75rem", fontWeight: 700, marginTop: "2px" }}>
                      Capacity: {ngo.capacity} • {ngo.phone}
                    </div>
                  </div>
                ))}
              </div>

              <button 
                className="btn btn-secondary btn-sm" 
                style={{ width: "100%", marginTop: "1rem" }}
                onClick={onNavigateToMap}
              >
                <MapPin size={16} />
                <span>Open Interactive NGO Map</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* My Posted Donations History */
        <div className="fb-card">
          <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "1rem" }}>
            My Active Food Donations ({myDonations.length})
          </h3>

          {myDonations.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2.5rem 1rem", color: "var(--text-muted)" }}>
              <p>No food donations posted yet.</p>
              <button className="btn btn-primary btn-sm" style={{ marginTop: "0.75rem" }} onClick={() => setActiveSubTab("form")}>
                Post Your First Donation
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {myDonations.map(don => (
                <div key={don.id} style={{ padding: "1.25rem", borderRadius: "12px", border: "1px solid var(--border-color)", background: "var(--bg-main)", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                      <span style={{ fontSize: "0.75rem", fontWeight: 800, padding: "0.2rem 0.6rem", borderRadius: "9999px", background: don.status === "Available" ? "#dcfce7" : don.status.includes("Accepted") ? "#e0f2fe" : "#f1f5f9", color: don.status === "Available" ? "#15803d" : don.status.includes("Accepted") ? "#0369a1" : "#475569" }}>
                        ● {don.status}
                      </span>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)" }}>
                        🚚 {don.deliveryMode}
                      </span>
                    </div>

                    <h4 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--primary-700)" }}>
                      Quantity: {don.quantity}
                    </h4>

                    <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.3rem", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                      <span>📍 {don.location}</span>
                      <span>Safe Deadline: {new Date(don.dateTimeExpiry).toLocaleString()}</span>
                    </div>

                    {don.acceptedByReceiver && (
                      <div style={{ marginTop: "0.75rem", padding: "0.75rem", borderRadius: "8px", background: "var(--bg-card)", border: "1px solid var(--border-color)", fontSize: "0.85rem" }}>
                        <div style={{ fontWeight: 800, color: "#0369a1" }}>
                          ✓ Accepted by: {don.acceptedByReceiver.orgName}
                        </div>
                        <div style={{ color: "var(--text-muted)", marginTop: "2px" }}>
                          Contact: {don.acceptedByReceiver.contactName} ({don.acceptedByReceiver.phone})
                        </div>
                        <div style={{ color: "var(--text-muted)" }}>
                          Destination: {don.acceptedByReceiver.address}
                        </div>
                      </div>
                    )}
                  </div>

                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    {don.status === "Accepted by Receiver" && (
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => completeDonation(don.id)}
                      >
                        <Check size={16} />
                        <span>Mark as Delivered</span>
                      </button>
                    )}

                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteDonation(don.id)}
                      title="Remove Donation Listing"
                    >
                      <Trash2 size={16} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
