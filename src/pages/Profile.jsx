import { useState } from "react";
import { 
  User, 
  Building, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Award, 
  CheckCircle2,
  Save,
  LogOut
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const Profile = ({ setActiveTab }) => {
  const { currentUser, logout, switchUser, users } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    phone: currentUser?.phone || "",
    address: currentUser?.address || "",
    city: currentUser?.city || "Bangalore",
    subType: currentUser?.subType || "Restaurant",
    dailyCapacity: currentUser?.dailyCapacity || 500
  });

  const [savedMsg, setSavedMsg] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    Object.assign(currentUser, formData);
    setIsEditing(false);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {/* Profile Overview Card */}
      <div className="fb-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", borderBottom: "1px solid #f1f5f9", paddingBottom: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            <div style={{ width: "68px", height: "68px", borderRadius: "16px", background: "linear-gradient(135deg, #16a34a, #15803d)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", fontWeight: 800 }}>
              {currentUser?.name?.charAt(0) || "U"}
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 800 }}>{currentUser?.name}</h2>
                {currentUser?.isVerified && (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", color: "#16a34a", fontSize: "0.8rem", fontWeight: 700, background: "#dcfce7", padding: "0.15rem 0.5rem", borderRadius: "9999px" }}>
                    <CheckCircle2 size={13} /> Verified
                  </span>
                )}
              </div>
              <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
                Role: <strong style={{ textTransform: "uppercase", color: "#166534" }}>{currentUser?.role}</strong> {currentUser?.subType && `• ${currentUser?.subType}`}
              </p>
              <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                Joined Member since {currentUser?.joinedDate}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button className="btn btn-outline btn-sm" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
            <button className="btn btn-danger btn-sm" onClick={logout}>
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {savedMsg && (
          <div style={{ background: "#dcfce7", color: "#15803d", padding: "0.6rem", borderRadius: "8px", margin: "1rem 0", fontSize: "0.85rem", textAlign: "center", fontWeight: 700 }}>
            ✓ Profile details updated successfully!
          </div>
        )}

        {isEditing ? (
          <form onSubmit={handleSave} style={{ marginTop: "1.25rem" }}>
            <div className="form-group">
              <label className="form-label">Organization / Business Legal Name</label>
              <input 
                type="text" 
                className="form-control" 
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Official Phone Contact</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">City / Region</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Operational Street Address (Pickup Dock)</label>
              <input 
                type="text" 
                className="form-control" 
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              <Save size={16} />
              <span>Save Changes</span>
            </button>
          </form>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginTop: "1.25rem" }}>
            <div style={{ padding: "0.75rem", background: "#f8fafc", borderRadius: "10px" }}>
              <div style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase" }}>Email</div>
              <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1e293b", marginTop: "2px" }}>{currentUser?.email}</div>
            </div>
            <div style={{ padding: "0.75rem", background: "#f8fafc", borderRadius: "10px" }}>
              <div style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase" }}>Phone</div>
              <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1e293b", marginTop: "2px" }}>{currentUser?.phone}</div>
            </div>
            <div style={{ padding: "0.75rem", background: "#f8fafc", borderRadius: "10px" }}>
              <div style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase" }}>Registered Location</div>
              <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1e293b", marginTop: "2px" }}>{currentUser?.address}</div>
            </div>
            <div style={{ padding: "0.75rem", background: "#f8fafc", borderRadius: "10px" }}>
              <div style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase" }}>Safety & Hygiene Status</div>
              <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#16a34a", marginTop: "2px" }}>Level 1 Certified Supplier</div>
            </div>
          </div>
        )}
      </div>

      {/* Trust & Impact Badge */}
      <div className="fb-card" style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)", border: "1px solid #86efac" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Award size={36} color="#16a34a" />
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#14532d" }}>
              FoodBridge Certified Humanitarian Contributor
            </h3>
            <p style={{ fontSize: "0.85rem", color: "#166534" }}>
              Recognized for zero food waste commitment and real-time contribution to UN Sustainable Development Goal 2 (Zero Hunger) & 12 (Responsible Consumption).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

