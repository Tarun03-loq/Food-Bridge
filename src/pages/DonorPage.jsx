import { useState, useMemo } from "react";
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
  Check,
  Bot,
  UtensilsCrossed,
  ArrowRight,
  ShieldCheck,
  Heart
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { analyzeFoodWithAI } from "../utils/foodAI";
import { translateHeading } from "../utils/headingTranslations";

export const DonorPage = ({ onNavigateToMap }) => {
  const { currentUser, addDonation, donations, completeDonation, deleteDonation, ngos, headingLang } = useApp();

  const [formData, setFormData] = useState({
    foodVariety: "", // optional AI input: "Dosa", "Idly", etc.
    quantity: "",
    location: currentUser?.address || "MG Road, Central Bangalore",
    dateTimePrepared: new Date().toISOString().slice(0, 16),
    dateTimeExpiry: new Date(Date.now() + 6 * 3600000).toISOString().slice(0, 16),
    contactName: currentUser?.name || currentUser?.businessName || "Kitchen Manager",
    contactPhone: currentUser?.phone || "+91 98765 43210",
    deliveryMode: "Pickup by NGO",
    notes: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [activeSubTab, setActiveSubTab] = useState("form"); // "form" or "history"

  // Real-time AI analysis results whenever foodVariety, quantity or manufacture date changes
  const aiAnalysis = useMemo(() => {
    if (!formData.foodVariety.trim()) return null;
    return analyzeFoodWithAI({
      foodVariety: formData.foodVariety,
      quantity: formData.quantity,
      manufactureDate: formData.dateTimePrepared,
      ngos: ngos
    });
  }, [formData.foodVariety, formData.quantity, formData.dateTimePrepared, ngos]);

  // Auto-apply AI calculated expiry recommendation to the form
  const applyAiExpiry = () => {
    if (aiAnalysis && aiAnalysis.safeUntilIso) {
      setFormData(prev => ({
        ...prev,
        dateTimeExpiry: aiAnalysis.safeUntilIso
      }));
    }
  };

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
        foodVariety: "",
        quantity: "",
        location: formData.location,
        dateTimePrepared: new Date().toISOString().slice(0, 16),
        dateTimeExpiry: new Date(Date.now() + 6 * 3600000).toISOString().slice(0, 16),
        contactName: formData.contactName,
        contactPhone: formData.contactPhone,
        deliveryMode: "Pickup by NGO",
        notes: ""
      });
      setActiveSubTab("history");
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
              <span>{translateHeading("Donor Food Management System", headingLang)}</span>
            </div>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800 }}>
              {translateHeading("Donate Surplus Food", headingLang)}
            </h2>
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
        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "1.5rem" }}>
          {/* Main Food Donation Form */}
          <div className="fb-card">
            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              {translateHeading("Enter Surplus Food Details", headingLang)}
            </h3>

            <form onSubmit={handleSubmit}>
              {/* AI FOOD VARIETY OPTIONAL INPUT BOX */}
              <div style={{ background: "linear-gradient(135deg, rgba(22, 163, 74, 0.06), rgba(2, 132, 199, 0.06))", border: "1.5px solid var(--primary-300)", borderRadius: "14px", padding: "1.25rem", marginBottom: "1.25rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "0.45rem", color: "var(--primary-800)", fontWeight: 800, fontSize: "0.95rem", margin: 0 }}>
                    <Bot size={18} color="var(--primary-600)" />
                    <span>Food Variety (Optional AI Assistant)</span>
                  </label>
                  <span style={{ fontSize: "0.72rem", background: "var(--primary-100)", color: "var(--primary-800)", padding: "0.15rem 0.55rem", borderRadius: "9999px", fontWeight: 700 }}>
                    ✨ AI-Powered Review
                  </span>
                </div>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
                  Enter food type (e.g. <strong>Dosa, Idly, Biryani, Chapati, Dal, Rice</strong>) to get instant AI recommendations for safe shelf life, optimal recipient NGO, and repurposing recipes!
                </p>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.6rem" }}>
                  {["Idly", "Dosa", "Biryani", "Rice", "Chapati", "Dal"].map(quickItem => (
                    <button
                      type="button"
                      key={quickItem}
                      onClick={() => setFormData({ ...formData, foodVariety: quickItem })}
                      style={{
                        padding: "0.25rem 0.65rem",
                        borderRadius: "9999px",
                        border: formData.foodVariety.toLowerCase() === quickItem.toLowerCase() ? "1.5px solid var(--primary-600)" : "1px solid var(--border-color)",
                        background: formData.foodVariety.toLowerCase() === quickItem.toLowerCase() ? "var(--primary-600)" : "var(--bg-card)",
                        color: formData.foodVariety.toLowerCase() === quickItem.toLowerCase() ? "white" : "var(--text-main)",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "all 0.15s ease"
                      }}
                    >
                      + {quickItem}
                    </button>
                  ))}
                </div>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Masala Dosa, Steamed Idly, Veg Biryani, Chapatis" 
                  value={formData.foodVariety}
                  onChange={e => setFormData({ ...formData, foodVariety: e.target.value })}
                />
              </div>

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

              {/* 2. Date & Time Period (Manufacture & Safe Expiry) */}
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Manufacture / Preparation Date & Time *</label>
                  <input 
                    type="datetime-local" 
                    className="form-control" 
                    value={formData.dateTimePrepared}
                    onChange={e => setFormData({ ...formData, dateTimePrepared: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <label className="form-label" style={{ color: "#b45309" }}>Safe Consumption Time Period (Expiry) *</label>
                    {aiAnalysis && (
                      <button
                        type="button"
                        onClick={applyAiExpiry}
                        style={{ background: "none", border: "none", color: "var(--primary-600)", fontSize: "0.72rem", fontWeight: 800, cursor: "pointer", textDecoration: "underline" }}
                      >
                        Auto-fill AI Expiry
                      </button>
                    )}
                  </div>
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

          {/* Right Sidebar: AI Smart Review Card or Nearby NGOs Preview */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            
            {/* AI SMART REVIEW & REPURPOSING ADVISORY PANEL */}
            {aiAnalysis ? (
              <div className="fb-card animate-fade-in" style={{ border: "2px solid var(--primary-500)", background: "var(--bg-card)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "linear-gradient(90deg, #16a34a, #0284c7, #9333ea)" }} />
                
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "var(--primary-100)", color: "var(--primary-700)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Bot size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--primary-800)" }}>
                      {translateHeading("AI Smart Food Analysis & Advisory", headingLang)}
                    </h4>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Analyzed for: <strong>{aiAnalysis.foodVariety}</strong></span>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", fontSize: "0.82rem" }}>
                  
                  {/* 1. Safe Consumption Time Window */}
                  <div style={{ background: "var(--bg-main)", padding: "0.75rem", borderRadius: "10px", border: "1px solid var(--border-color)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 800, color: "var(--text-main)", marginBottom: "0.3rem" }}>
                      <Clock size={15} color="#d97706" />
                      <span>Safe Consumption Window:</span>
                    </div>
                    <div style={{ fontSize: "0.88rem", fontWeight: 800, color: "#b45309" }}>
                      Safe Until: {aiAnalysis.safeUntilDate}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px" }}>
                      Expected shelf life: ~{aiAnalysis.shelfLifeHours} hours ({aiAnalysis.hoursRemaining}h remaining from current time).
                    </div>
                    <div style={{ fontSize: "0.74rem", fontWeight: 700, marginTop: "0.4rem", color: aiAnalysis.hoursRemaining > 2 ? "#15803d" : "#b91c1c" }}>
                      {aiAnalysis.statusNotice}
                    </div>
                  </div>

                  {/* 2. Best Suitable Receiver */}
                  {aiAnalysis.bestReceiver && (
                    <div style={{ background: "var(--bg-main)", padding: "0.75rem", borderRadius: "10px", border: "1px solid var(--border-color)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 800, color: "var(--text-main)", marginBottom: "0.3rem" }}>
                        <Heart size={15} color="#ea4335" />
                        <span>Best Suitable Receiver NGO:</span>
                      </div>
                      <div style={{ fontSize: "0.88rem", fontWeight: 800, color: "var(--primary-700)" }}>
                        {aiAnalysis.bestReceiver.name}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px" }}>
                        📍 {aiAnalysis.bestReceiver.address}
                      </div>
                      <div style={{ fontSize: "0.72rem", color: "var(--text-main)", background: "rgba(22, 163, 74, 0.08)", padding: "0.4rem 0.6rem", borderRadius: "6px", marginTop: "0.4rem" }}>
                        <strong>Why Suitable:</strong> {aiAnalysis.suitabilityReason}
                      </div>
                    </div>
                  )}

                  {/* 3. What can be turned for the next meals (Repurposing Ideas with Images) */}
                  <div style={{ background: "var(--bg-main)", padding: "0.85rem", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", fontWeight: 800, color: "var(--text-main)", marginBottom: "0.6rem" }}>
                      <UtensilsCrossed size={16} color="var(--primary-600)" />
                      <span>Next Meal Transformation (Repurposing Ideas):</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      {aiAnalysis.repurposeIdeas.map((idea, idx) => (
                        <div key={idx} style={{ background: "var(--bg-card)", borderRadius: "10px", border: "1px solid var(--border-color)", overflow: "hidden", boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
                          {idea.image && (
                            <div style={{ position: "relative", height: "110px", width: "100%", overflow: "hidden" }}>
                              <img 
                                src={idea.image} 
                                alt={idea.name}
                                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                                onError={(e) => { e.target.style.display = 'none'; }}
                              />
                              {idea.badge && (
                                <span style={{ position: "absolute", bottom: "6px", left: "6px", background: "rgba(0,0,0,0.72)", color: "#ffffff", padding: "0.15rem 0.5rem", borderRadius: "9999px", fontSize: "0.65rem", fontWeight: 700, backdropFilter: "blur(4px)" }}>
                                  {idea.badge}
                                </span>
                              )}
                            </div>
                          )}
                          <div style={{ padding: "0.6rem 0.75rem" }}>
                            <div style={{ fontWeight: 800, color: "var(--primary-800)", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                              <span>🍳 {idea.name}</span>
                            </div>
                            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px", lineHeight: 1.4 }}>
                              {idea.recipe}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            ) : (
              /* Helpful prompt to enter food variety */
              <div style={{ background: "var(--bg-card)", border: "1px dashed var(--border-color)", padding: "1.25rem", borderRadius: "12px", textAlign: "center" }}>
                <Bot size={28} color="var(--primary-600)" style={{ margin: "0 auto 0.5rem", opacity: 0.8 }} />
                <div style={{ fontWeight: 800, fontSize: "0.88rem", color: "var(--text-main)", marginBottom: "0.25rem" }}>
                  AI Review Assistant Ready
                </div>
                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  Type a food variety (like <em>Dosa</em> or <em>Idly</em>) above to reveal safe consumption deadlines, best matching receiver, and next-meal transformation ideas!
                </p>
              </div>
            )}

            {/* Nearby NGOs Preview list */}
            <div className="fb-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--primary-700)" }}>
                  {translateHeading("Nearby Verified NGOs", headingLang)} ({ngos.length})
                </h4>
                <button className="btn btn-outline btn-sm" onClick={onNavigateToMap}>
                  View Map
                </button>
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
                Active relief organizations ready for food distribution:
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {ngos.slice(0, 3).map(ngo => (
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
            {translateHeading("My Posted Food Donations", headingLang)} ({myDonations.length})
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
                      {don.foodVariety && (
                        <span style={{ fontSize: "0.75rem", fontWeight: 800, background: "var(--primary-100)", color: "var(--primary-800)", padding: "0.2rem 0.6rem", borderRadius: "9999px" }}>
                          🍱 {don.foodVariety}
                        </span>
                      )}
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
