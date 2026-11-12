import { 
  Home, 
  PlusCircle, 
  ListFilter, 
  MapPin, 
  Truck, 
  Clock, 
  ShieldCheck, 
  User, 
  LogOut, 
  Bell, 
  TrendingUp, 
  CheckCircle,
  Building2,
  Users
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const { currentUser, switchUser, users, logout, requests } = useApp();

  const isSupplier = currentUser?.role === "supplier";
  const isNgo = currentUser?.role === "ngo";
  const isAdmin = currentUser?.role === "admin";

  // Filter requests that need attention
  const activeRequestsCount = requests.filter(r => 
    isSupplier ? (r.supplierId === currentUser?.id && r.status === "Requested")
    : isNgo ? (r.ngoId === currentUser?.id && ["Accepted", "Picked Up"].includes(r.status))
    : r.status === "Requested"
  ).length;

  return (
    <aside className="desktop-sidebar">
      {/* Brand Header */}
      <div className="brand-header" onClick={() => setActiveTab("home")}>
        <img src="/logo.svg" alt="FoodBridge Logo" className="brand-logo" />
        <div>
          <h1 className="brand-title">FoodBridge</h1>
          <p className="brand-tagline">Save Food. Share Hope.</p>
        </div>
      </div>

      {/* Nav List */}
      <nav className="nav-links">
        <button 
          className={`nav-item ${activeTab === "home" ? "active" : ""}`}
          onClick={() => setActiveTab("home")}
        >
          <Home size={18} />
          <span>Dashboard Overview</span>
        </button>

        {/* Supplier Links */}
        {(isSupplier || isAdmin) && (
          <>
            <button 
              className={`nav-item ${activeTab === "supplier-dashboard" ? "active" : ""}`}
              onClick={() => setActiveTab("supplier-dashboard")}
            >
              <Building2 size={18} />
              <span>Supplier Hub</span>
            </button>
            <button 
              className={`nav-item ${activeTab === "donate" ? "active" : ""}`}
              onClick={() => setActiveTab("donate")}
            >
              <PlusCircle size={18} />
              <span>Donate Excess Food</span>
            </button>
          </>
        )}

        {/* NGO Links */}
        {(isNgo || isAdmin) && (
          <>
            <button 
              className={`nav-item ${activeTab === "ngo-dashboard" ? "active" : ""}`}
              onClick={() => setActiveTab("ngo-dashboard")}
            >
              <Users size={18} />
              <span>NGO Operations</span>
            </button>
            <button 
              className={`nav-item ${activeTab === "listings" ? "active" : ""}`}
              onClick={() => setActiveTab("listings")}
            >
              <ListFilter size={18} />
              <span>Available Food</span>
            </button>
            <button 
              className={`nav-item ${activeTab === "map" ? "active" : ""}`}
              onClick={() => setActiveTab("map")}
            >
              <MapPin size={18} />
              <span>Nearby Donations</span>
            </button>
          </>
        )}

        {/* Request Tracking (For all roles) */}
        <button 
          className={`nav-item ${activeTab === "requests" ? "active" : ""}`}
          onClick={() => setActiveTab("requests")}
        >
          <Clock size={18} />
          <span>My Requests</span>
          {activeRequestsCount > 0 && <span className="nav-badge">{activeRequestsCount}</span>}
        </button>

        <button 
          className={`nav-item ${activeTab === "tracking" ? "active" : ""}`}
          onClick={() => setActiveTab("tracking")}
        >
          <Truck size={18} />
          <span>Live Collection Tracking</span>
        </button>

        {/* Admin Link */}
        {isAdmin && (
          <button 
            className={`nav-item ${activeTab === "admin" ? "active" : ""}`}
            onClick={() => setActiveTab("admin")}
          >
            <ShieldCheck size={18} />
            <span>Admin Center</span>
          </button>
        )}

        <button 
          className={`nav-item ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          <User size={18} />
          <span>Organization Profile</span>
        </button>
      </nav>

      {/* Role Switcher Demo Bar (For Hackathon Judges) */}
      <div style={{ marginTop: "1rem", marginBottom: "0.75rem", padding: "0.6rem", background: "#f8fafc", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
        <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#64748b", marginBottom: "0.4rem", textTransform: "uppercase" }}>
          ⚡ Hackathon Quick Switch
        </div>
        <select 
          value={currentUser?.id || ""} 
          onChange={(e) => switchUser(e.target.value)}
          style={{ width: "100%", padding: "0.35rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.75rem" }}
        >
          <optgroup label="Food Suppliers">
            {users.filter(u => u.role === "supplier").map(u => (
              <option key={u.id} value={u.id}>{u.name} ({u.subType})</option>
            ))}
          </optgroup>
          <optgroup label="Registered NGOs">
            {users.filter(u => u.role === "ngo").map(u => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </optgroup>
          <optgroup label="System Admins">
            {users.filter(u => u.role === "admin").map(u => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </optgroup>
        </select>
      </div>

      {/* User profile capsule at sidebar bottom */}
      <div className="sidebar-user">
        <div className="user-avatar-circle">
          {currentUser?.name?.charAt(0) || "U"}
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: "0.85rem", fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {currentUser?.name || "Guest User"}
          </div>
          <div style={{ fontSize: "0.7rem", color: "#16a34a", fontWeight: 700, textTransform: "uppercase" }}>
            {currentUser?.role} {currentUser?.isVerified ? "✓" : "(Pending)"}
          </div>
        </div>
        <button 
          onClick={logout} 
          title="Sign out"
          style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b" }}
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
};

