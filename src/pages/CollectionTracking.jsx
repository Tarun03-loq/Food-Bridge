import { useState } from "react";
import { 
  Truck, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Phone, 
  ShieldCheck, 
  Navigation,
  ArrowRight
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const CollectionTracking = ({ setActiveTab }) => {
  const { requests, updateStatus } = useApp();
  const [selectedReqId, setSelectedReqId] = useState(() => requests[0]?.id || null);

  const selectedReq = requests.find(r => r.id === selectedReqId) || requests[0];

  const workflowSteps = [
    { key: "Requested", label: "Request Placed", desc: "NGO claimed food batch" },
    { key: "Accepted", label: "Accepted by Supplier", desc: "Food prepared & verified at dock" },
    { key: "Picked Up", label: "Collected & En Route", desc: "Loaded in insulated carrier" },
    { key: "Delivered", label: "Delivered to Beneficiaries", desc: "Distributed to community" }
  ];

  const getStepIndex = (status) => {
    switch (status) {
      case "Requested": return 0;
      case "Accepted": return 1;
      case "Picked Up": return 2;
      case "Delivered": return 3;
      default: return -1;
    }
  };

  const currentStepIdx = getStepIndex(selectedReq?.status);

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {/* Top Banner */}
      <div className="fb-card" style={{ padding: "1.25rem" }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 800, display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Truck size={24} color="#16a34a" />
          <span>Real-Time Collection & Delivery Tracking</span>
        </h2>
        <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
          Live status audit trail guaranteeing chain-of-custody and food preservation temperatures from donor to shelter.
        </p>

        {/* Request Selector Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto", marginTop: "1rem" }}>
          {requests.map(r => (
            <button
              key={r.id}
              onClick={() => setSelectedReqId(r.id)}
              className={`btn btn-sm ${selectedReq?.id === r.id ? "btn-primary" : "btn-outline"}`}
              style={{ whiteSpace: "nowrap" }}
            >
              <span>{r.donationName.slice(0, 24)}...</span>
              <span className={`status-pill status-${r.status}`} style={{ fontSize: "0.65rem", padding: "0.1rem 0.4rem" }}>
                {r.status}
              </span>
            </button>
          ))}
        </div>
      </div>

      {selectedReq ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "1.25rem" }}>
          {/* Main Visual Tracker */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Step Progression Bar */}
            <div className="fb-card">
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.5rem" }}>
                Delivery Milestone Status: #{selectedReq.id.toUpperCase()}
              </h3>

              <div style={{ display: "flex", justifyContent: "space-between", position: "relative", marginBottom: "2rem" }}>
                {/* Connecting Line */}
                <div style={{ position: "absolute", top: "18px", left: "20px", right: "20px", height: "4px", background: "#e2e8f0", zIndex: 1 }} />
                <div 
                  style={{ 
                    position: "absolute", 
                    top: "18px", 
                    left: "20px", 
                    height: "4px", 
                    background: "#16a34a", 
                    zIndex: 2, 
                    transition: "width 0.4s",
                    width: currentStepIdx === 0 ? "0%" : currentStepIdx === 1 ? "33%" : currentStepIdx === 2 ? "66%" : "100%"
                  }} 
                />

                {workflowSteps.map((step, idx) => {
                  const isDone = idx <= currentStepIdx;
                  const isCurrent = idx === currentStepIdx;

                  return (
                    <div key={step.key} style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 3, flex: 1 }}>
                      <div 
                        style={{ 
                          width: "36px", 
                          height: "36px", 
                          borderRadius: "50%", 
                          background: isDone ? "#16a34a" : "#f1f5f9", 
                          color: isDone ? "#ffffff" : "#94a3b8",
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center",
                          fontWeight: 800,
                          fontSize: "0.85rem",
                          border: isCurrent ? "4px solid #bbf7d0" : "3px solid white",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                        }}
                      >
                        {isDone ? "✓" : idx + 1}
                      </div>
                      <div style={{ fontSize: "0.8rem", fontWeight: 700, marginTop: "0.5rem", textAlign: "center", color: isDone ? "#166534" : "#64748b" }}>
                        {step.label}
                      </div>
                      <div style={{ fontSize: "0.7rem", color: "#94a3b8", textAlign: "center", maxWidth: "120px" }}>
                        {step.desc}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons to Advance Status in Demo */}
              <div style={{ background: "#f8fafc", padding: "1rem", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#334155" }}>
                  Simulate Next Step (Hackathon Demo Tool):
                </span>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {currentStepIdx === 0 && (
                    <button className="btn btn-primary btn-sm" onClick={() => updateStatus(selectedReq.id, "Accepted")}>
                      Move to "Accepted"
                    </button>
                  )}
                  {currentStepIdx === 1 && (
                    <button className="btn btn-primary btn-sm" onClick={() => updateStatus(selectedReq.id, "Picked Up")}>
                      Move to "Picked Up"
                    </button>
                  )}
                  {currentStepIdx === 2 && (
                    <button className="btn btn-primary btn-sm" onClick={() => updateStatus(selectedReq.id, "Delivered")}>
                      Move to "Delivered"
                    </button>
                  )}
                  {currentStepIdx === 3 && (
                    <span style={{ fontSize: "0.85rem", color: "#16a34a", fontWeight: 700 }}>
                      🎉 Order Successfully Completed!
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Simulated Live Route Map View */}
            <div className="fb-card" style={{ padding: "1.25rem", position: "relative", overflow: "hidden", minHeight: "260px", background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)", color: "white" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Navigation size={18} color="#4ade80" />
                  <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>Live Dispatch Route Radar</span>
                </div>
                <span style={{ background: "rgba(34, 197, 94, 0.2)", color: "#4ade80", padding: "0.2rem 0.6rem", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: 700 }}>
                  ● GPS Signal Active
                </span>
              </div>

              {/* Graphical radar route visualization */}
              <div style={{ position: "relative", height: "140px", border: "1px dashed rgba(255,255,255,0.2)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                {/* Donor Node */}
                <div style={{ textAlign: "center" }}>
                  <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.3rem" }}>
                    🏢
                  </div>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700 }}>{selectedReq.supplierName.split(" ")[0]}</div>
                  <div style={{ fontSize: "0.65rem", opacity: 0.7 }}>Origin Hub</div>
                </div>

                {/* Van in transit */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ padding: "0.4rem 0.8rem", borderRadius: "20px", background: "rgba(255,255,255,0.15)", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <Truck size={14} color="#4ade80" />
                    <span>{selectedReq.vehicleNumber}</span>
                  </div>
                  <div style={{ fontSize: "0.65rem", color: "#4ade80", marginTop: "0.2rem" }}>
                    {selectedReq.status === "Delivered" ? "Target reached" : "Speed: ~34 km/h • ETA: 12 min"}
                  </div>
                </div>

                {/* Recipient Node */}
                <div style={{ textAlign: "center" }}>
                  <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "#4338ca", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.3rem" }}>
                    🤝
                  </div>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700 }}>{selectedReq.ngoName.split(" ")[0]}</div>
                  <div style={{ fontSize: "0.65rem", opacity: 0.7 }}>Distribution Shelter</div>
                </div>
              </div>
            </div>
          </div>

          {/* Logistics & Driver Details Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="fb-card">
              <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.75rem" }}>
                Assigned Logistics Unit
              </h4>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <div style={{ width: "45px", height: "45px", borderRadius: "50%", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>
                  👨‍✈️
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{selectedReq.driverName}</div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Food Transport Specialist</div>
                </div>
              </div>

              <div style={{ fontSize: "0.82rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <div><strong>Vehicle:</strong> {selectedReq.vehicleNumber}</div>
                <div><strong>Mobile:</strong> {selectedReq.driverPhone}</div>
                <div><strong>Cargo:</strong> {selectedReq.donationName}</div>
              </div>

              <a 
                href={`tel:${selectedReq.driverPhone}`}
                className="btn btn-secondary btn-sm"
                style={{ width: "100%", marginTop: "1rem", textDecoration: "none" }}
              >
                <Phone size={14} />
                <span>Call Driver Directly</span>
              </a>
            </div>

            {/* Audit Log Timeline */}
            <div className="fb-card">
              <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.75rem" }}>
                Verified Audit Trail
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {selectedReq.timeline.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", gap: "0.5rem", fontSize: "0.8rem" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#16a34a", marginTop: "5px", flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: 700 }}>{item.status}</div>
                      <div style={{ color: "#64748b", fontSize: "0.75rem" }}>{item.note}</div>
                      <div style={{ color: "#94a3b8", fontSize: "0.7rem" }}>
                        {new Date(item.time).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="fb-card">No requests found.</div>
      )}
    </div>
  );
};

