import { useState } from "react";
import { 
  Clock, 
  CheckCircle, 
  Truck, 
  XCircle, 
  ChevronRight, 
  Phone, 
  User, 
  MapPin, 
  Calendar,
  AlertCircle
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const MyRequests = ({ setActiveTab }) => {
  const { requests, currentUser, updateStatus } = useApp();
  const [filterStatus, setFilterStatus] = useState("all");

  const isSupplier = currentUser?.role === "supplier";
  const isNgo = currentUser?.role === "ngo";
  const isAdmin = currentUser?.role === "admin";

  // Filter requests based on user role
  const visibleRequests = requests.filter(r => {
    if (isAdmin) return true;
    if (isSupplier) return r.supplierId === currentUser?.id;
    if (isNgo) return r.ngoId === currentUser?.id;
    return true;
  }).filter(r => {
    if (filterStatus === "all") return true;
    return r.status === filterStatus;
  });

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {/* Top Header */}
      <div className="fb-card" style={{ padding: "1.25rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 800 }}>
              {isSupplier ? "Supplier Pickup Requests" : isNgo ? "NGO Collection Orders" : "All Collection Requests"}
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
              Track requests through complete workflow lifecycle: Requested → Accepted → Picked Up → Delivered.
            </p>
          </div>

          {/* Filter tabs */}
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            {["all", "Requested", "Accepted", "Picked Up", "Delivered", "Cancelled"].map(st => (
              <button
                key={st}
                className={`btn btn-sm ${filterStatus === st ? "btn-primary" : "btn-outline"}`}
                onClick={() => setFilterStatus(st)}
              >
                {st === "all" ? "All Requests" : st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Requests List */}
      {visibleRequests.length === 0 ? (
        <div className="fb-card" style={{ textAlign: "center", padding: "3rem 1rem", color: "#64748b" }}>
          <Clock size={40} color="#cbd5e1" style={{ margin: "0 auto 1rem" }} />
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.25rem" }}>No requests in this category</h3>
          <p style={{ fontSize: "0.85rem" }}>Try changing the status filter or create a new food claim.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {visibleRequests.map(req => {
            return (
              <div key={req.id} className="fb-card" style={{ padding: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", borderBottom: "1px solid #f1f5f9", paddingBottom: "1rem", marginBottom: "1rem" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span className={`status-pill status-${req.status}`}>
                        ● {req.status}
                      </span>
                      <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                        ID: #{req.id.toUpperCase()}
                      </span>
                    </div>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginTop: "0.4rem" }}>
                      {req.donationName}
                    </h3>
                  </div>

                  {/* Action buttons depending on role & status */}
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {/* Supplier Actions */}
                    {isSupplier && req.status === "Requested" && (
                      <>
                        <button 
                          className="btn btn-primary btn-sm"
                          onClick={() => updateStatus(req.id, "Accepted", "Supplier accepted collection slot")}
                        >
                          <CheckCircle size={16} />
                          <span>Accept Claim</span>
                        </button>
                        <button 
                          className="btn btn-danger btn-sm"
                          onClick={() => updateStatus(req.id, "Cancelled", "Supplier unable to fulfill")}
                        >
                          Decline
                        </button>
                      </>
                    )}

                    {/* NGO / Driver Actions */}
                    {req.status === "Accepted" && (
                      <button 
                        className="btn btn-primary btn-sm"
                        style={{ background: "#7e22ce" }}
                        onClick={() => updateStatus(req.id, "Picked Up", "Driver collected food packages from dock")}
                      >
                        <Truck size={16} />
                        <span>Confirm Pickup</span>
                      </button>
                    )}

                    {req.status === "Picked Up" && (
                      <button 
                        className="btn btn-primary btn-sm"
                        style={{ background: "#0f766e" }}
                        onClick={() => updateStatus(req.id, "Delivered", "Food safely arrived & served at shelter")}
                      >
                        <CheckCircle size={16} />
                        <span>Confirm Safe Delivery</span>
                      </button>
                    )}

                    <button 
                      className="btn btn-outline btn-sm"
                      onClick={() => setActiveTab("tracking")}
                    >
                      Track on Live Radar
                    </button>
                  </div>
                </div>

                {/* Details Breakdown */}
                <div className="grid-3" style={{ fontSize: "0.85rem" }}>
                  <div>
                    <div style={{ color: "#94a3b8", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase" }}>Parties Involved</div>
                    <div style={{ marginTop: "0.3rem" }}><strong>Supplier:</strong> {req.supplierName}</div>
                    <div style={{ marginTop: "0.2rem" }}><strong>NGO Claimer:</strong> {req.ngoName}</div>
                    <div style={{ marginTop: "0.2rem", color: "#64748b" }}>NGO Contact: {req.ngoContact}</div>
                  </div>

                  <div>
                    <div style={{ color: "#94a3b8", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase" }}>Driver & Logistics</div>
                    <div style={{ marginTop: "0.3rem" }}><strong>Driver:</strong> {req.driverName}</div>
                    <div style={{ marginTop: "0.2rem" }}><strong>Phone:</strong> {req.driverPhone}</div>
                    <div style={{ marginTop: "0.2rem" }}><strong>Vehicle:</strong> {req.vehicleNumber}</div>
                  </div>

                  <div>
                    <div style={{ color: "#94a3b8", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase" }}>Timing</div>
                    <div style={{ marginTop: "0.3rem" }}><strong>Pickup Slot:</strong> {new Date(req.pickupTimeRequested).toLocaleString()}</div>
                    <div style={{ marginTop: "0.4rem", color: "#16a34a", fontWeight: 600 }}>
                      Latest update: {req.timeline[req.timeline.length - 1]?.note}
                    </div>
                  </div>
                </div>

                {/* Micro Progress Bar */}
                <div style={{ marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px solid #f8fafc" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "#94a3b8", fontWeight: 700, marginBottom: "0.3rem" }}>
                    <span>Requested</span>
                    <span>Accepted</span>
                    <span>Picked Up</span>
                    <span>Delivered</span>
                  </div>
                  <div style={{ height: "6px", background: "#f1f5f9", borderRadius: "9999px", overflow: "hidden" }}>
                    <div 
                      style={{ 
                        height: "100%", 
                        background: req.status === "Cancelled" ? "#ef4444" : "#16a34a",
                        width: req.status === "Requested" ? "25%" 
                             : req.status === "Accepted" ? "50%" 
                             : req.status === "Picked Up" ? "75%" 
                             : req.status === "Delivered" ? "100%" : "10%"
                      }} 
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

