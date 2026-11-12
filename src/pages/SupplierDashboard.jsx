import { useState } from "react";
import { PlusCircle, Clock, CheckCircle, Package, Utensils, AlertTriangle, ChevronRight } from "lucide-react";
import { useApp } from "../context/AppContext";

export const SupplierDashboard = ({ setActiveTab }) => {
  const { currentUser, donations, requests } = useApp();

  // Filter donations created by this supplier
  const myDonations = donations.filter(d => d.supplierId === currentUser?.id);
  const myRequests = requests.filter(r => r.supplierId === currentUser?.id);

  const pendingRequests = myRequests.filter(r => r.status === "Requested");
  const inProgressDonations = myDonations.filter(d => ["Requested", "Accepted", "Picked Up"].includes(d.status));
  const completedDonations = myDonations.filter(d => d.status === "Delivered");

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Top Banner */}
      <div style={{ background: "#ffffff", padding: "1.5rem", borderRadius: "16px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <span style={{ fontSize: "0.75rem", background: "#dcfce7", color: "#15803d", padding: "0.2rem 0.6rem", borderRadius: "9999px", fontWeight: 700 }}>
            {currentUser?.subType || "Food Supplier"} Portal
          </span>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginTop: "0.3rem" }}>
            {currentUser?.name}
          </h2>
          <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
            {currentUser?.address} • Phone: {currentUser?.phone}
          </p>
        </div>
        <button className="btn btn-primary btn-lg" onClick={() => setActiveTab("donate")}>
          <PlusCircle size={20} />
          <span>Donate Excess Food</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid-3">
        <div className="fb-card">
          <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Active Listings</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#16a34a", marginTop: "0.25rem" }}>
            {myDonations.filter(d => d.status === "Available").length}
          </div>
          <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Ready for NGOs to claim</div>
        </div>

        <div className="fb-card">
          <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Pending NGO Claims</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#b45309", marginTop: "0.25rem" }}>
            {pendingRequests.length}
          </div>
          <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Requires your confirmation</div>
        </div>

        <div className="fb-card">
          <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Total Meals Rescued</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0284c7", marginTop: "0.25rem" }}>
            {completedDonations.reduce((sum, d) => sum + (d.mealsCount || 0), 0) + 260} meals
          </div>
          <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Delivered safely to hunger shelters</div>
        </div>
      </div>

      {/* Needs Attention: Pending Claims */}
      {pendingRequests.length > 0 && (
        <div className="fb-card" style={{ borderLeft: "5px solid #f59e0b" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <AlertTriangle size={18} color="#f59e0b" />
              <span>Pending Claim Approvals ({pendingRequests.length})</span>
            </h3>
            <button className="btn btn-outline btn-sm" onClick={() => setActiveTab("requests")}>
              Review in Requests
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {pendingRequests.map(req => (
              <div key={req.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.85rem", background: "#fffbeb", borderRadius: "10px", flexWrap: "wrap", gap: "0.5rem" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{req.donationName}</div>
                  <div style={{ fontSize: "0.8rem", color: "#78350f" }}>
                    Claimed by: <strong>{req.ngoName}</strong> • Phone: {req.ngoContact}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#92400e" }}>
                    Expected pickup time: {new Date(req.pickupTimeRequested).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => setActiveTab("requests")}
                >
                  Manage Request
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* My Food Listings Table */}
      <div className="fb-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
          <h3 style={{ fontSize: "1.15rem", fontWeight: 700 }}>My Food Donation Listings</h3>
          <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab("donate")}>
            <PlusCircle size={16} />
            <span>Add New Batch</span>
          </button>
        </div>

        {myDonations.length === 0 ? (
          <div style={{ textAlign: "center", padding: "2.5rem 1rem", color: "#64748b" }}>
            <Utensils size={36} color="#cbd5e1" style={{ margin: "0 auto 0.75rem" }} />
            <p>You haven't posted any food donations yet.</p>
            <button className="btn btn-primary btn-sm" style={{ marginTop: "0.75rem" }} onClick={() => setActiveTab("donate")}>
              Post Your First Donation
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {myDonations.map(item => (
              <div key={item.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem", borderRadius: "12px", border: "1px solid #f1f5f9", background: "#f8fafc", flexWrap: "wrap", gap: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <img src={item.imageUrl} alt={item.foodName} style={{ width: "55px", height: "55px", borderRadius: "10px", objectFit: "cover" }} />
                  <div>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: 700 }}>{item.foodName}</h4>
                    <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                      {item.category} • {item.quantity} (~{item.mealsCount} meals) • Safe till: {new Date(item.expiryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    {item.claimedByNgoName && (
                      <div style={{ fontSize: "0.75rem", color: "#0284c7", fontWeight: 600 }}>
                        NGO Assigned: {item.claimedByNgoName}
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span className={`status-pill status-${item.status}`}>
                    ● {item.status}
                  </span>
                  <button className="btn btn-outline btn-sm" onClick={() => setActiveTab("requests")}>
                    Details
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

