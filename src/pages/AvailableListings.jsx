import { useState } from "react";
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  Calendar, 
  ShieldCheck,
  ChevronRight,
  Info
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const AvailableListings = ({ setActiveTab }) => {
  const { donations, claimDonation, currentUser } = useApp();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [claimNote, setClaimNote] = useState({
    driverName: "Volunteer Team Lead",
    driverPhone: "+91 94480 55667",
    vehicleNumber: "KA 01 MG 4421",
    pickupTime: new Date(Date.now() + 1.5 * 3600000).toISOString().slice(0, 16)
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [claimSuccess, setClaimSuccess] = useState(false);

  // Filter listings
  const filteredDonations = donations.filter(item => {
    const matchesSearch = item.foodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.supplierName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenClaim = (donation) => {
    setSelectedDonation(donation);
    setErrorMsg("");
    setClaimSuccess(false);
    setClaimModalOpen(true);
  };

  const handleConfirmClaim = () => {
    if (!selectedDonation) return;
    const res = claimDonation(selectedDonation.id, claimNote);
    if (!res.success) {
      setErrorMsg(res.error);
    } else {
      setClaimSuccess(true);
      setTimeout(() => {
        setClaimModalOpen(false);
        setActiveTab("requests");
      }, 1500);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {/* Top Filter and Search Bar */}
      <div className="fb-card" style={{ padding: "1.25rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", justifyContent: "space-between" }}>
          {/* Search Box */}
          <div style={{ position: "relative", flex: "1 1 280px" }}>
            <Search size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search by food, supplier, or Bangalore locality..."
              style={{ paddingLeft: "2.4rem" }}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto", maxWidth: "100%", paddingBottom: "4px" }}>
            {["All", "Cooked Meals", "Bakery & Bread", "Fresh Produce", "Dairy & Cold Storage"].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: "0.4rem 0.85rem",
                  borderRadius: "9999px",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  background: selectedCategory === cat ? "#16a34a" : "#f1f5f9",
                  color: selectedCategory === cat ? "#ffffff" : "#475569"
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Listing Cards Grid */}
      <div className="grid-3">
        {filteredDonations.map(item => {
          const isAvailable = item.status === "Available";
          const deadline = new Date(item.expiryTime);
          const isUrgent = (deadline.getTime() - Date.now()) < 4 * 3600000; // less than 4 hrs left

          return (
            <div key={item.id} className="fb-card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ position: "relative", height: "180px" }}>
                <img src={item.imageUrl} alt={item.foodName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <span className={`status-pill status-${item.status}`} style={{ position: "absolute", top: "12px", right: "12px", boxShadow: "0 2px 5px rgba(0,0,0,0.2)" }}>
                  ● {item.status}
                </span>
                {isUrgent && isAvailable && (
                  <span style={{ position: "absolute", top: "12px", left: "12px", background: "#ef4444", color: "white", fontSize: "0.7rem", fontWeight: 700, padding: "0.2rem 0.5rem", borderRadius: "6px" }}>
                    ⚡ URGENT PICKUP
                  </span>
                )}
              </div>

              <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.25rem" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#16a34a", textTransform: "uppercase" }}>
                    {item.category}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>
                    ~{item.mealsCount} meals
                  </span>
                </div>

                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, lineHeight: 1.3, marginBottom: "0.6rem" }}>
                  {item.foodName}
                </h3>

                <div style={{ fontSize: "0.8rem", color: "#64748b", display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <MapPin size={15} color="#16a34a" />
                    <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {item.location} ({item.supplierName})
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <Clock size={15} color="#d97706" />
                    <span>
                      Deadline: {deadline.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ({deadline.toLocaleDateString()})
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <Info size={15} color="#0284c7" />
                    <span>{item.storageCondition}</span>
                  </div>
                </div>

                {/* Allergen tag if any */}
                {item.allergens && item.allergens !== "None" && (
                  <div style={{ fontSize: "0.72rem", background: "#fef3c7", color: "#92400e", padding: "0.2rem 0.5rem", borderRadius: "6px", marginBottom: "0.85rem", width: "fit-content" }}>
                    Allergens: {item.allergens}
                  </div>
                )}

                <div style={{ marginTop: "auto", paddingTop: "0.75rem", borderTop: "1px solid #f1f5f9" }}>
                  {isAvailable ? (
                    <button 
                      className="btn btn-primary" 
                      style={{ width: "100%" }}
                      onClick={() => handleOpenClaim(item)}
                    >
                      Request Food Collection
                    </button>
                  ) : (
                    <div style={{ textAlign: "center", fontSize: "0.85rem", color: "#64748b", fontWeight: 600, padding: "0.4rem" }}>
                      Claimed by {item.claimedByNgoName || "NGO"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Claim Modal */}
      {claimModalOpen && selectedDonation && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "1rem" }}>
          <div className="fb-card animate-fade-in" style={{ width: "100%", maxWidth: "520px", maxHeight: "90vh", overflowY: "auto" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "0.5rem" }}>
              Confirm Collection Request
            </h3>
            <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "1rem" }}>
              You are requesting to collect this donation from <strong>{selectedDonation.supplierName}</strong>.
            </p>

            {errorMsg && (
              <div style={{ background: "#fee2e2", color: "#b91c1c", padding: "0.6rem 0.85rem", borderRadius: "8px", fontSize: "0.85rem", marginBottom: "1rem" }}>
                {errorMsg}
              </div>
            )}

            {claimSuccess && (
              <div style={{ background: "#dcfce7", color: "#15803d", padding: "0.75rem", borderRadius: "8px", fontSize: "0.9rem", fontWeight: 700, marginBottom: "1rem", textAlign: "center" }}>
                ✓ Claim confirmed! Dispatch scheduled. Redirecting...
              </div>
            )}

            <div style={{ background: "#f8fafc", padding: "0.85rem", borderRadius: "10px", marginBottom: "1rem", fontSize: "0.85rem" }}>
              <div><strong>Food:</strong> {selectedDonation.foodName}</div>
              <div><strong>Quantity:</strong> {selectedDonation.quantity} (~{selectedDonation.mealsCount} meals)</div>
              <div><strong>Address:</strong> {selectedDonation.location}</div>
              <div><strong>Safe Deadline:</strong> {new Date(selectedDonation.expiryTime).toLocaleString()}</div>
            </div>

            <div className="form-group">
              <label className="form-label">Estimated Collection Time *</label>
              <input 
                type="datetime-local" 
                className="form-control" 
                value={claimNote.pickupTime}
                onChange={e => setClaimNote({ ...claimNote, pickupTime: e.target.value })}
              />
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Volunteer / Driver Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={claimNote.driverName}
                  onChange={e => setClaimNote({ ...claimNote, driverName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Driver Contact Phone</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={claimNote.driverPhone}
                  onChange={e => setClaimNote({ ...claimNote, driverPhone: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Vehicle Registration Number</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="e.g. KA 01 MG 4421"
                value={claimNote.vehicleNumber}
                onChange={e => setClaimNote({ ...claimNote, vehicleNumber: e.target.value })}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
              <button className="btn btn-outline" onClick={() => setClaimModalOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleConfirmClaim}>
                Confirm Claim & Dispatch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

