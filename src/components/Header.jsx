import { useState } from "react";
import { Bell, Shield, User, CheckCircle2, ChevronDown } from "lucide-react";
import { useApp } from "../context/AppContext";

export const Header = ({ pageTitle, setActiveTab }) => {
  const { currentUser, notifications, switchUser, users } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="top-navbar">
      <div className="page-title">
        <span>{pageTitle}</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {/* Verification badge if verified */}
        {currentUser?.isVerified ? (
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", background: "#dcfce7", color: "#15803d", padding: "0.25rem 0.65rem", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: 700 }}>
            <CheckCircle2 size={14} />
            <span>Verified Account</span>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", background: "#fef3c7", color: "#b45309", padding: "0.25rem 0.65rem", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: 700 }}>
            <span>Pending Review</span>
          </div>
        )}

        {/* Notifications Icon & Dropdown */}
        <div style={{ position: "relative" }}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            style={{ position: "relative", background: "none", border: "none", cursor: "pointer", color: "#475569", padding: "0.4rem" }}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span style={{ position: "absolute", top: "2px", right: "2px", width: "8px", height: "8px", background: "#ef4444", borderRadius: "50%" }}></span>
            )}
          </button>

          {showNotifications && (
            <div style={{ 
              position: "absolute", 
              right: 0, 
              top: "40px", 
              width: "300px", 
              background: "#ffffff", 
              borderRadius: "12px", 
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.15)", 
              border: "1px solid #e2e8f0", 
              padding: "1rem", 
              zIndex: 100 
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem", borderBottom: "1px solid #f1f5f9", paddingBottom: "0.5rem" }}>
                <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>Notifications</span>
                <span style={{ fontSize: "0.75rem", color: "#16a34a", fontWeight: 600 }}>{notifications.length} alerts</span>
              </div>
              <div style={{ maxHeight: "250px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {notifications.map(n => (
                  <div key={n.id} style={{ padding: "0.5rem", borderRadius: "8px", background: "#f8fafc", fontSize: "0.8rem" }}>
                    <div style={{ fontWeight: 700, color: "#0f172a" }}>{n.title}</div>
                    <div style={{ color: "#64748b", marginTop: "2px" }}>{n.message}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Organization Name & Role quick click */}
        <div 
          onClick={() => setActiveTab("profile")}
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", padding: "0.3rem 0.6rem", borderRadius: "8px", background: "#f1f5f9" }}
        >
          <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#16a34a", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 700 }}>
            {currentUser?.name?.charAt(0) || "U"}
          </div>
          <span style={{ fontSize: "0.85rem", fontWeight: 700, maxWidth: "120px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {currentUser?.name?.split(" ")[0]}
          </span>
        </div>
      </div>
    </header>
  );
};

