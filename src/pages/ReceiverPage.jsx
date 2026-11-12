import { useState } from "react";
import { 
  Bell, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Truck, 
  Phone, 
  AlertCircle, 
  Building, 
  User, 
  Calendar,
  Sparkles,
  Package,
  Search,
  Filter,
  Check
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const ReceiverPage = () => {
  const { currentUser, donations, acceptFoodRequest, completeDonation } = useApp();

  // Helper: returns urgency badge props for a donation nearing its expiry
  const getExpiryUrgency = (expiryStr) => {
    if (!expiryStr) return null;
    const msLeft = new Date(expiryStr).getTime() - Date.now();
    const hoursLeft = msLeft / 3600000;
    if (hoursLeft <= 0) return { label: "⛔ Expired", bg: "#fee2e2", color: "#b91c1c" };
    if (hoursLeft <= 1) return { label: "⚠️ Expires in < 1 h — Urgent!", bg: "#fef3c7", color: "#92400e" };
    if (hoursLeft <= 2) return { label: `⚠️ Expires in ~${Math.ceil(hoursLeft)} h`, bg: "#fef9c3", color: "#854d0e" };
    return null;
  };

  const [notificationDismissed, setNotificationDismissed] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [deliveryFilter, setDeliveryFilter] = useState("all"); // "all", "Delivery by Own", "Pickup by NGO"
  const [activeTab, setActiveTab] = useState("available"); // "available" or "accepted"

  // Only show non-expired available donations – expired ones vanish automatically
  const now = Date.now();
  const availableDonations = donations.filter(d =>
    d.status === "Available" &&
    (!d.dateTimeExpiry || new Date(d.dateTimeExpiry).getTime() > now)
  );
  const acceptedDonations = donations.filter(d => d.status === "Accepted by Receiver" || d.status.includes("Delivered"));

  const filteredAvailable = availableDonations.filter(d => {
    const matchesSearch = d.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.quantity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.contactName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDelivery = deliveryFilter === "all" || d.deliveryMode === deliveryFilter;
    return matchesSearch && matchesDelivery;
  });

  const handleAccept = (donationId) => {
    acceptFoodRequest(donationId);
    setSuccessMsg("Food availability request accepted! Donor has been notified with your contact & distribution address.");
    setTimeout(() => setSuccessMsg(""), 4500);
  };

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* Receiver Organisation Profile Header */}
      <div style={{ background: "var(--bg-card)", padding: "1.5rem", borderRadius: "16px", border: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <span style={{ fontSize: "0.75rem", background: "var(--primary-100)", color: "var(--primary-800)", padding: "0.2rem 0.6rem", borderRadius: "9999px", fontWeight: 800 }}>
            Registered Food Relief Receiver
          </span>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginTop: "0.3rem" }}>
            {currentUser?.orgName || "NGO Organization"}
          </h2>
          <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "0.25rem" }}>
            <span><strong>Phone:</strong> {currentUser?.phone}</span>
            <span><strong>Distribution Address:</strong> {currentUser?.address}</span>
            <span><strong>Email:</strong> {currentUser?.email}</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Available Surpluses</div>
            <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--primary-600)" }}>
              {availableDonations.length}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Accepted by Us</div>
            <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0284c7" }}>
              {acceptedDonations.length}
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Notification Bar Accepting Food Availability Requests from Donors */}
      {!notificationDismissed && (
        <div style={{ background: "var(--hero-bg)", color: "var(--hero-text)", padding: "1.25rem 1.5rem", borderRadius: "16px", boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.2)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Bell size={22} color="#ffffff" className="pulse-indicator" />
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 800, letterSpacing: "0.05em", opacity: 0.9 }}>
                  📢 Live Donor Food Availability Alert Bar
                </div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800 }}>
                  {availableDonations.length > 0 
                    ? `${availableDonations.length} Food Batch(es) Available for Relief Distribution` 
                    : "No Pending Food Availability Alerts Right Now"}
                </h3>
                <p style={{ fontSize: "0.85rem", opacity: 0.95, marginTop: "2px" }}>
                  {availableDonations[0] 
                    ? `Latest Alert: '${availableDonations[0].quantity}' at ${availableDonations[0].location} (${availableDonations[0].deliveryMode})`
                    : "Wait for nearby restaurants and caterers to post new donations."}
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              {availableDonations[0] && (
                <button 
                  className="btn" 
                  style={{ background: "#ffffff", color: "var(--primary-700)", fontWeight: 800 }}
                  onClick={() => handleAccept(availableDonations[0].id)}
                >
                  <CheckCircle2 size={18} />
                  <span>Accept Request Immediately</span>
                </button>
              )}
              <button 
                onClick={() => setNotificationDismissed(true)}
                style={{ background: "none", border: "none", color: "white", cursor: "pointer", fontSize: "1.2rem", opacity: 0.8 }}
                title="Dismiss Bar"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {successMsg && (
        <div style={{ background: "#dcfce7", border: "1px solid #86efac", color: "#15803d", padding: "1rem", borderRadius: "10px", fontWeight: 700, textAlign: "center" }}>
          ✓ {successMsg}
        </div>
      )}

      {/* Tabs & Search Filter Row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button 
            className={`btn btn-sm ${activeTab === "available" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setActiveTab("available")}
          >
            Available Surplus Food ({availableDonations.length})
          </button>
          <button 
            className={`btn btn-sm ${activeTab === "accepted" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setActiveTab("accepted")}
          >
            Accepted by Us ({acceptedDonations.length})
          </button>
        </div>

        {activeTab === "available" && (
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <div style={{ position: "relative" }}>
              <Search size={16} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input 
                type="text"
                className="form-control"
                style={{ paddingLeft: "2rem", width: "220px", fontSize: "0.85rem" }}
                placeholder="Search location or quantity..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            <select 
              className="form-control"
              style={{ width: "170px", fontSize: "0.85rem" }}
              value={deliveryFilter}
              onChange={e => setDeliveryFilter(e.target.value)}
            >
              <option value="all">All Delivery Modes</option>
              <option value="Delivery by Own">Delivery by Own</option>
              <option value="Pickup by NGO">Pickup by NGO</option>
            </select>
          </div>
        )}
      </div>

      {/* Available Food Listings for Receivers to Accept */}
      {activeTab === "available" ? (
        <div>
          {filteredAvailable.length === 0 ? (
            <div className="fb-card" style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--text-muted)" }}>
              <Package size={36} style={{ margin: "0 auto 0.5rem", opacity: 0.5 }} />
              <p>No food matches your search. New food donations will appear here automatically.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {filteredAvailable.map(item => {
                const urgency = getExpiryUrgency(item.dateTimeExpiry);
                return (
                <div key={item.id} className="fb-card" style={{ padding: "1.25rem", borderLeft: `5px solid ${urgency && urgency.color === "#b91c1c" ? "#b91c1c" : urgency ? "#d97706" : "var(--primary-600)"}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "0.75rem", fontWeight: 800, background: "#dcfce7", color: "#15803d", padding: "0.2rem 0.6rem", borderRadius: "9999px" }}>
                          ● Available
                        </span>
                        <span style={{ fontSize: "0.75rem", fontWeight: 800, background: item.deliveryMode === "Delivery by Own" ? "var(--primary-100)" : "#ede9fe", color: item.deliveryMode === "Delivery by Own" ? "var(--primary-800)" : "#6d28d9", padding: "0.2rem 0.6rem", borderRadius: "9999px" }}>
                          🚚 {item.deliveryMode}
                        </span>
                        {/* Urgency / countdown badge */}
                        {urgency && (
                          <span style={{ fontSize: "0.75rem", fontWeight: 800, background: urgency.bg, color: urgency.color, padding: "0.2rem 0.7rem", borderRadius: "9999px", animation: "pulse 1.5s infinite" }}>
                            {urgency.label}
                          </span>
                        )}
                      </div>

                      {/* Food Quantity displayed in place of the food name */}
                      <h4 style={{ fontSize: "1.3rem", fontWeight: 800, marginTop: "0.5rem", color: "var(--primary-700)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Package size={20} />
                        <span>Quantity: {item.quantity}</span>
                      </h4>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
                        <div><strong>Location:</strong> {item.location}</div>
                        <div><strong>Safe Deadline:</strong> {new Date(item.dateTimeExpiry).toLocaleString()}</div>
                        <div><strong>Prepared Time:</strong> {new Date(item.dateTimePrepared).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                      </div>

                      {item.notes && (
                        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.3rem" }}>
                          <em>Note: {item.notes}</em>
                        </div>
                      )}

                      <div style={{ marginTop: "0.5rem", fontSize: "0.85rem", color: "var(--text-main)" }}>
                        <strong>Donor Contact:</strong> {item.contactName} • Phone: <a href={`tel:${item.contactPhone}`} style={{ color: "var(--primary-600)", fontWeight: 700 }}>{item.contactPhone}</a>
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <button 
                        className="btn btn-primary"
                        onClick={() => handleAccept(item.id)}
                      >
                        <CheckCircle2 size={18} />
                        <span>Accept Food Request</span>
                      </button>
                      <a 
                        href={`tel:${item.contactPhone}`}
                        className="btn btn-outline btn-sm"
                        style={{ textDecoration: "none" }}
                      >
                        <Phone size={14} />
                        <span>Call Donor</span>
                      </a>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* Accepted Food Pickups / Deliveries */
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {acceptedDonations.length === 0 ? (
            <div className="fb-card" style={{ textAlign: "center", padding: "2.5rem 1rem", color: "var(--text-muted)" }}>
              <p>You haven't accepted any food requests yet. Browse available food to claim surplus food.</p>
            </div>
          ) : (
            acceptedDonations.map(item => (
              <div key={item.id} className="fb-card" style={{ background: "var(--bg-main)", padding: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                      <span style={{ fontSize: "0.75rem", background: "#dcfce7", color: "#15803d", fontWeight: 800, padding: "0.2rem 0.6rem", borderRadius: "9999px" }}>
                        ✓ {item.status}
                      </span>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        Fulfilled via: <strong>{item.deliveryMode}</strong>
                      </span>
                    </div>

                    <h5 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--primary-700)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <Package size={18} />
                      <span>Quantity: {item.quantity}</span>
                    </h5>

                    <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                      Pickup / Delivery Location: <strong>{item.location}</strong>
                    </div>

                    <div style={{ fontSize: "0.82rem", color: "var(--text-main)", marginTop: "0.2rem" }}>
                      Donor Contact: <strong>{item.contactName}</strong> (<a href={`tel:${item.contactPhone}`} style={{ color: "var(--primary-600)" }}>{item.contactPhone}</a>)
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    {item.status !== "Delivered / Completed" ? (
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => completeDonation(item.id)}
                      >
                        <Check size={16} />
                        <span>Confirm Food Received</span>
                      </button>
                    ) : (
                      <span style={{ fontSize: "0.8rem", color: "#16a34a", fontWeight: 800 }}>
                        ✓ Food Handover Completed
                      </span>
                    )}

                    <a 
                      href={`tel:${item.contactPhone}`}
                      className="btn btn-outline btn-sm"
                      style={{ textDecoration: "none" }}
                    >
                      <Phone size={14} />
                      <span>Call</span>
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
};
