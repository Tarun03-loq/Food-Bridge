import { useState } from "react";
import { 
  ShieldCheck, 
  Users, 
  Building, 
  Check, 
  X, 
  AlertTriangle, 
  Search, 
  BarChart3,
  FileCheck2,
  Trash2
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const AdminDashboard = ({ setActiveTab }) => {
  const { users, donations, requests, toggleUserVerification, stats } = useApp();
  const [activeSubTab, setActiveSubTab] = useState("verification"); // verification, donations, stats
  const [searchQuery, setSearchQuery] = useState("");

  const pendingUsers = users.filter(u => !u.isVerified && u.role !== "admin");
  const allPartners = users.filter(u => u.role !== "admin" && (
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  ));

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {/* Top Banner */}
      <div className="fb-card" style={{ padding: "1.25rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "#fef3c7", color: "#b45309", padding: "0.2rem 0.6rem", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: 700, marginBottom: "0.25rem" }}>
              <ShieldCheck size={14} />
              <span>System Administrator Master Console</span>
            </div>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 800 }}>Platform Governance & Compliance</h2>
            <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
              Manage supplier KYC, verify NGO trust credentials, audit food safety compliance and monitor food rescue flow.
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button 
              className={`btn btn-sm ${activeSubTab === "verification" ? "btn-primary" : "btn-outline"}`}
              onClick={() => setActiveSubTab("verification")}
            >
              Verify Partners ({pendingUsers.length} Pending)
            </button>
            <button 
              className={`btn btn-sm ${activeSubTab === "donations" ? "btn-primary" : "btn-outline"}`}
              onClick={() => setActiveSubTab("donations")}
            >
              Audit Food Donations ({donations.length})
            </button>
            <button 
              className={`btn btn-sm ${activeSubTab === "stats" ? "btn-primary" : "btn-outline"}`}
              onClick={() => setActiveSubTab("stats")}
            >
              Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Verification Tab */}
      {activeSubTab === "verification" && (
        <div className="fb-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.75rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>
              Partner Verification & Compliance Registry
            </h3>
            <input 
              type="text" 
              className="form-control" 
              style={{ maxWidth: "260px" }}
              placeholder="Search partner name or email..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {allPartners.map(user => (
              <div 
                key={user.id} 
                style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center", 
                  padding: "1rem", 
                  borderRadius: "12px", 
                  border: user.isVerified ? "1px solid #e2e8f0" : "1px solid #fde68a", 
                  background: user.isVerified ? "#ffffff" : "#fffbeb",
                  flexWrap: "wrap", 
                  gap: "1rem" 
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ 
                    width: "44px", 
                    height: "44px", 
                    borderRadius: "10px", 
                    background: user.role === "supplier" ? "#dcfce7" : "#e0e7ff",
                    color: user.role === "supplier" ? "#16a34a" : "#4338ca",
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center" 
                  }}>
                    {user.role === "supplier" ? <Building size={22} /> : <Users size={22} />}
                  </div>

                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <h4 style={{ fontSize: "1rem", fontWeight: 700 }}>{user.name}</h4>
                      <span style={{ fontSize: "0.7rem", fontWeight: 700, padding: "0.15rem 0.5rem", borderRadius: "9999px", background: user.role === "supplier" ? "#dcfce7" : "#e0e7ff", color: user.role === "supplier" ? "#166534" : "#4338ca", textTransform: "uppercase" }}>
                        {user.role} ({user.subType || "Relief NGO"})
                      </span>
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                      {user.email} • {user.phone} • {user.address}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  {user.isVerified ? (
                    <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "#16a34a", fontSize: "0.85rem", fontWeight: 700 }}>
                      <Check size={16} />
                      <span>Verified Partner</span>
                    </span>
                  ) : (
                    <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "#b45309", fontSize: "0.85rem", fontWeight: 700 }}>
                      <AlertTriangle size={16} />
                      <span>Pending Verification</span>
                    </span>
                  )}

                  <button 
                    className={`btn btn-sm ${user.isVerified ? "btn-outline" : "btn-primary"}`}
                    onClick={() => toggleUserVerification(user.id)}
                  >
                    {user.isVerified ? "Revoke Verification" : "Approve & Verify Account"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Audit Donations Tab */}
      {activeSubTab === "donations" && (
        <div className="fb-card">
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>
            All System Food Batches ({donations.length})
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {donations.map(don => (
              <div key={don.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.85rem", borderRadius: "10px", background: "#f8fafc", border: "1px solid #f1f5f9", flexWrap: "wrap", gap: "0.75rem" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{don.foodName}</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                    Supplier: {don.supplierName} • Quantity: {don.quantity} ({don.mealsCount} meals) • Safe till: {new Date(don.expiryTime).toLocaleString()}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span className={`status-pill status-${don.status}`}>
                    ● {don.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeSubTab === "stats" && (
        <div className="grid-2">
          <div className="fb-card">
            <h4 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "1rem" }}>
              Food Waste Metrics & Environmental Impact
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.3rem" }}>
                  <span>Targeted Food Rescues This Month</span>
                  <strong>{stats.totalMealsRescued} / 2,000 meals (82%)</strong>
                </div>
                <div style={{ height: "8px", background: "#f1f5f9", borderRadius: "9999px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: "82%", background: "#16a34a" }} />
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.3rem" }}>
                  <span>Greenhouse Methane Emission Reduction</span>
                  <strong>1,440 kg CO₂ equivalent</strong>
                </div>
                <div style={{ height: "8px", background: "#f1f5f9", borderRadius: "9999px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: "72%", background: "#0284c7" }} />
                </div>
              </div>
            </div>
          </div>

          <div className="fb-card">
            <h4 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "1rem" }}>
              Active Network Density
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.9rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem", background: "#f8fafc", borderRadius: "8px" }}>
                <span>Registered Commercial Suppliers:</span>
                <strong>{stats.registeredSuppliersCount} Organizations</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem", background: "#f8fafc", borderRadius: "8px" }}>
                <span>Registered Verified NGO Foundations:</span>
                <strong>{stats.registeredNgosCount} Units</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem", background: "#f8fafc", borderRadius: "8px" }}>
                <span>Average Response Dispatch Time:</span>
                <strong>18.5 Minutes</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

