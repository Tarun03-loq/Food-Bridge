import { useState } from "react";
import { HeartHandshake, Utensils, Users, Lock, Mail, Phone, MapPin, Building, ArrowRight, Leaf } from "lucide-react";
import { useApp } from "../context/AppContext";

const ECO_FARM_ORG_TYPES = [
  "Organic Farm",
  "Biogas Production",
  "Compost",
  "Community Farm",
  "Urban Farm / Rooftop Garden",
  "Dairy Farm",
  "Poultry Farm",
  "Fishery / Aquafarm",
  "Other"
];

export const LoginPage = () => {
  const { login } = useApp();
  const [selectedRole, setSelectedRole] = useState("donor"); // "donor" | "receiver" | "ecofarm"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Receiver-specific profile details
  const [receiverDetails, setReceiverDetails] = useState({
    orgName: "",
    phone: "",
    address: ""
  });

  // Donor-specific optional details
  const [donorDetails, setDonorDetails] = useState({
    businessName: "",
    phone: ""
  });

  // Eco-Farm specific details
  const [ecoFarmDetails, setEcoFarmDetails] = useState({
    name: "",
    orgType: "Organic Farm",
    phone: "",
    address: ""
  });

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in both email and password.");
      return;
    }

    if (selectedRole === "receiver") {
      if (!receiverDetails.orgName.trim() || !receiverDetails.phone.trim() || !receiverDetails.address.trim()) {
        setError("Receivers must provide Organisation Name, Phone Number, and Address.");
        return;
      }
      login("receiver", email, password, {
        orgName: receiverDetails.orgName,
        phone: receiverDetails.phone,
        address: receiverDetails.address,
        name: receiverDetails.orgName
      });
    } else if (selectedRole === "ecofarm") {
      if (!ecoFarmDetails.name.trim() || !ecoFarmDetails.phone.trim() || !ecoFarmDetails.address.trim()) {
        setError("Eco-Farm partners must provide Name, Contact Details, and Address.");
        return;
      }
      login("ecofarm", email, password, {
        name: ecoFarmDetails.name,
        orgType: ecoFarmDetails.orgType,
        phone: ecoFarmDetails.phone,
        address: ecoFarmDetails.address
      });
    } else {
      login("donor", email, password, {
        name: donorDetails.businessName || "Restaurant / Donor Partner",
        phone: donorDetails.phone || "+91 98765 43210"
      });
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-gradient)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
      <div className="fb-card animate-fade-in" style={{ width: "100%", maxWidth: "520px", padding: "2rem", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15)", borderRadius: "20px" }}>
        
        {/* Brand Header */}
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: "var(--primary-600)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.75rem", boxShadow: "0 8px 16px rgba(0,0,0, 0.15)" }}>
            <HeartHandshake size={32} />
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--primary-800)" }}>FoodBridge</h1>
          <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: 600 }}>Save Food. Share Hope.</p>
        </div>

        {/* Role Selector Tabs (Donor | Receiver | Eco-Farm) */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label className="form-label" style={{ textAlign: "center", marginBottom: "0.6rem" }}>
            Select Your Account Type:
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.6rem" }}>
            {/* Food Donor */}
            <button
              type="button"
              onClick={() => setSelectedRole("donor")}
              style={{
                padding: "0.85rem 0.5rem",
                borderRadius: "12px",
                border: selectedRole === "donor" ? "2px solid var(--primary-600)" : "1px solid var(--border-color)",
                background: selectedRole === "donor" ? "var(--primary-50)" : "var(--bg-card)",
                color: selectedRole === "donor" ? "var(--primary-800)" : "var(--text-muted)",
                fontWeight: 800,
                fontSize: "0.82rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.35rem",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              <Utensils size={22} color={selectedRole === "donor" ? "var(--primary-600)" : "var(--text-muted)"} />
              <span>Food Donor</span>
              <span style={{ fontSize: "0.65rem", fontWeight: 500, opacity: 0.8 }}>Restaurant, Hotel</span>
            </button>

            {/* Food Receiver */}
            <button
              type="button"
              onClick={() => setSelectedRole("receiver")}
              style={{
                padding: "0.85rem 0.5rem",
                borderRadius: "12px",
                border: selectedRole === "receiver" ? "2px solid var(--primary-600)" : "1px solid var(--border-color)",
                background: selectedRole === "receiver" ? "var(--primary-50)" : "var(--bg-card)",
                color: selectedRole === "receiver" ? "var(--primary-800)" : "var(--text-muted)",
                fontWeight: 800,
                fontSize: "0.82rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.35rem",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              <Users size={22} color={selectedRole === "receiver" ? "var(--primary-600)" : "var(--text-muted)"} />
              <span>Food Receiver</span>
              <span style={{ fontSize: "0.65rem", fontWeight: 500, opacity: 0.8 }}>NGO, Shelter</span>
            </button>

            {/* Eco-Farm */}
            <button
              type="button"
              onClick={() => setSelectedRole("ecofarm")}
              style={{
                padding: "0.85rem 0.5rem",
                borderRadius: "12px",
                border: selectedRole === "ecofarm" ? "2px solid #16a34a" : "1px solid var(--border-color)",
                background: selectedRole === "ecofarm" ? "#dcfce7" : "var(--bg-card)",
                color: selectedRole === "ecofarm" ? "#166534" : "var(--text-muted)",
                fontWeight: 800,
                fontSize: "0.82rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.35rem",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              <Leaf size={22} color={selectedRole === "ecofarm" ? "#16a34a" : "var(--text-muted)"} />
              <span>Eco-Farm</span>
              <span style={{ fontSize: "0.65rem", fontWeight: 500, opacity: 0.8 }}>Farm, Cooperative</span>
            </button>
          </div>
        </div>

        {error && (
          <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", color: "#b91c1c", padding: "0.75rem", borderRadius: "10px", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} autoComplete="off">
          {/* Email */}
          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <div style={{ position: "relative" }}>
              <Mail size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input 
                type="email" 
                className="form-control" 
                style={{ paddingLeft: "2.4rem" }}
                placeholder={selectedRole === "donor" ? "restaurant@supplier.com" : "contact@ngo.org"}
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="off"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">Password *</label>
            <div style={{ position: "relative" }}>
              <Lock size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input 
                type="password" 
                className="form-control" 
                style={{ paddingLeft: "2.4rem" }}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>
          </div>

          {/* Conditional Eco-Farm Details */}
          {selectedRole === "ecofarm" && (
            <div style={{ background: "#f0fdf4", padding: "1rem", borderRadius: "12px", border: "1px solid #86efac", marginBottom: "1.25rem" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "#166534", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                🌿 Eco-Farm Partner Details
              </div>

              <div className="form-group">
                <label className="form-label">Farm / Organisation Name *</label>
                <div style={{ position: "relative" }}>
                  <Building size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  <input
                    type="text"
                    className="form-control"
                    style={{ paddingLeft: "2.4rem" }}
                    placeholder="e.g. Green Roots Organic Farm"
                    value={ecoFarmDetails.name}
                    onChange={e => setEcoFarmDetails({ ...ecoFarmDetails, name: e.target.value })}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Type of Organisation *</label>
                <div style={{ position: "relative" }}>
                  <Leaf size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#16a34a" }} />
                  <select
                    className="form-control"
                    style={{ paddingLeft: "2.4rem" }}
                    value={ecoFarmDetails.orgType}
                    onChange={e => setEcoFarmDetails({ ...ecoFarmDetails, orgType: e.target.value })}
                  >
                    {ECO_FARM_ORG_TYPES.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Contact Phone *</label>
                <div style={{ position: "relative" }}>
                  <Phone size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  <input
                    type="tel"
                    className="form-control"
                    style={{ paddingLeft: "2.4rem" }}
                    placeholder="e.g. +91 98765 11223"
                    value={ecoFarmDetails.phone}
                    onChange={e => setEcoFarmDetails({ ...ecoFarmDetails, phone: e.target.value })}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Farm Address / Location *</label>
                <div style={{ position: "relative" }}>
                  <MapPin size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  <input
                    type="text"
                    className="form-control"
                    style={{ paddingLeft: "2.4rem" }}
                    placeholder="e.g. Hesaraghatta Road, Bangalore"
                    value={ecoFarmDetails.address}
                    onChange={e => setEcoFarmDetails({ ...ecoFarmDetails, address: e.target.value })}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Conditional Receiver Details (Organisation Name, Phone, Address) */}
          {selectedRole === "receiver" && (
            <div style={{ background: "var(--bg-main)", padding: "1rem", borderRadius: "12px", border: "1px solid var(--border-color)", marginBottom: "1.25rem" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "var(--primary-700)", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                🏢 Receiver Organization Details
              </div>

              <div className="form-group">
                <label className="form-label">Organisation Name *</label>
                <div style={{ position: "relative" }}>
                  <Building size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  <input 
                    type="text" 
                    className="form-control" 
                    style={{ paddingLeft: "2.4rem" }}
                    placeholder="e.g. Hope Feeding Foundation"
                    value={receiverDetails.orgName}
                    onChange={e => setReceiverDetails({ ...receiverDetails, orgName: e.target.value })}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <div style={{ position: "relative" }}>
                  <Phone size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  <input 
                    type="tel" 
                    className="form-control" 
                    style={{ paddingLeft: "2.4rem" }}
                    placeholder="e.g. +91 94480 55667"
                    value={receiverDetails.phone}
                    onChange={e => setReceiverDetails({ ...receiverDetails, phone: e.target.value })}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Delivery Address / Distribution Centre *</label>
                <div style={{ position: "relative" }}>
                  <MapPin size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  <input 
                    type="text" 
                    className="form-control" 
                    style={{ paddingLeft: "2.4rem" }}
                    placeholder="e.g. Shivajinagar Relief Centre, Bangalore"
                    value={receiverDetails.address}
                    onChange={e => setReceiverDetails({ ...receiverDetails, address: e.target.value })}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Conditional Donor Optional Details */}
          {selectedRole === "donor" && (
            <div style={{ background: "var(--bg-main)", padding: "1rem", borderRadius: "12px", border: "1px solid var(--border-color)", marginBottom: "1.25rem" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "var(--primary-700)", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                🍱 Donor Business Details (Optional)
              </div>
              <div className="grid-2">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Restaurant / Donor Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g. Green Palace Hotel"
                    value={donorDetails.businessName}
                    onChange={e => setDonorDetails({ ...donorDetails, businessName: e.target.value })}
                    autoComplete="off"
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Contact Phone</label>
                  <input 
                    type="tel" 
                    className="form-control" 
                    placeholder="+91 98765 43210"
                    value={donorDetails.phone}
                    onChange={e => setDonorDetails({ ...donorDetails, phone: e.target.value })}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary btn-lg" 
            style={{ width: "100%", marginTop: "0.5rem" }}
          >
            <span>Continue as {selectedRole === "donor" ? "Food Donor" : selectedRole === "receiver" ? "Food Receiver" : "Eco-Farm Partner"}</span>
            <ArrowRight size={18} />
          </button>
        </form>

      </div>
    </div>
  );
};
