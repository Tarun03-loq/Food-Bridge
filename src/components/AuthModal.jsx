import { useState } from "react";
import { 
  Building, 
  Users, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Mail, 
  Phone, 
  MapPin,
  Sparkles
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const AuthModal = ({ onClose }) => {
  const { login, register, users, switchUser } = useApp();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [role, setRole] = useState("supplier"); // supplier, ngo, admin
  const [error, setError] = useState("");

  const [loginForm, setLoginForm] = useState({
    email: "greenpalace@hotel.com",
    password: "password123"
  });

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "Bangalore",
    subType: "Restaurant",
    regNumber: "",
    dailyCapacity: 500
  });

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    const res = login(loginForm.email, loginForm.password);
    if (!res.success) {
      setError(res.error);
    } else {
      if (onClose) onClose();
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    if (!registerForm.name || !registerForm.email) {
      setError("Please fill out all required fields.");
      return;
    }
    const res = register({
      ...registerForm,
      role
    });
    if (res.success && onClose) {
      onClose();
    }
  };

  const selectDemoUser = (user) => {
    switchUser(user.id);
    if (onClose) onClose();
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.75)", backdropFilter: "blur(6px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div className="fb-card animate-fade-in" style={{ width: "100%", maxWidth: "480px", maxHeight: "95vh", overflowY: "auto", position: "relative" }}>
        {/* Close Button */}
        {onClose && (
          <button 
            onClick={onClose} 
            style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", cursor: "pointer", fontSize: "1.25rem", color: "#94a3b8" }}
          >
            ✕
          </button>
        )}

        {/* Brand header */}
        <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
          <img src="/logo.svg" alt="FoodBridge" style={{ width: "48px", height: "48px", margin: "0 auto 0.5rem" }} />
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#166534" }}>FoodBridge</h2>
          <p style={{ fontSize: "0.85rem", color: "#64748b" }}>Save Food. Share Hope.</p>
        </div>

        {/* Mode Switcher Tabs */}
        <div style={{ display: "flex", background: "#f1f5f9", padding: "0.25rem", borderRadius: "10px", marginBottom: "1.25rem" }}>
          <button
            type="button"
            style={{ flex: 1, padding: "0.5rem", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", background: isLoginMode ? "#ffffff" : "transparent", color: isLoginMode ? "#16a34a" : "#64748b", boxShadow: isLoginMode ? "0 2px 5px rgba(0,0,0,0.05)" : "none" }}
            onClick={() => setIsLoginMode(true)}
          >
            Sign In
          </button>
          <button
            type="button"
            style={{ flex: 1, padding: "0.5rem", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", background: !isLoginMode ? "#ffffff" : "transparent", color: !isLoginMode ? "#16a34a" : "#64748b", boxShadow: !isLoginMode ? "0 2px 5px rgba(0,0,0,0.05)" : "none" }}
            onClick={() => setIsLoginMode(false)}
          >
            Create Account
          </button>
        </div>

        {error && (
          <div style={{ background: "#fef2f2", color: "#b91c1c", padding: "0.6rem 0.85rem", borderRadius: "8px", fontSize: "0.85rem", marginBottom: "1rem" }}>
            {error}
          </div>
        )}

        {isLoginMode ? (
          <div>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div style={{ position: "relative" }}>
                  <Mail size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                  <input 
                    type="email" 
                    className="form-control" 
                    style={{ paddingLeft: "2.4rem" }}
                    placeholder="name@business.com" 
                    value={loginForm.email}
                    onChange={e => setLoginForm({ ...loginForm, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div style={{ position: "relative" }}>
                  <Lock size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                  <input 
                    type="password" 
                    className="form-control" 
                    style={{ paddingLeft: "2.4rem" }}
                    placeholder="••••••••" 
                    value={loginForm.password}
                    onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "0.5rem" }}>
                Sign In to FoodBridge
              </button>
            </form>

            {/* Quick Demo Logins for Hackathon Evaluators */}
            <div style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid #f1f5f9" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", marginBottom: "0.5rem", textTransform: "uppercase" }}>
                ⚡ Hackathon 1-Click Role Login:
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <button 
                  type="button" 
                  className="btn btn-outline btn-sm" 
                  style={{ justifyContent: "flex-start" }}
                  onClick={() => selectDemoUser(users[0])}
                >
                  <Building size={14} color="#16a34a" />
                  <span>Green Palace Hotel (Supplier)</span>
                </button>
                <button 
                  type="button" 
                  className="btn btn-outline btn-sm" 
                  style={{ justifyContent: "flex-start" }}
                  onClick={() => selectDemoUser(users[3])}
                >
                  <Users size={14} color="#4338ca" />
                  <span>Hope Feeding Foundation (NGO)</span>
                </button>
                <button 
                  type="button" 
                  className="btn btn-outline btn-sm" 
                  style={{ justifyContent: "flex-start" }}
                  onClick={() => selectDemoUser(users[5])}
                >
                  <ShieldCheck size={14} color="#d97706" />
                  <span>Platform Administrator (Admin)</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleRegister}>
            {/* Role picker */}
            <div className="form-group">
              <label className="form-label">I am registering as *</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                <button
                  type="button"
                  onClick={() => setRole("supplier")}
                  style={{ padding: "0.6rem", borderRadius: "8px", border: role === "supplier" ? "2px solid #16a34a" : "1px solid #e2e8f0", background: role === "supplier" ? "#f0fdf4" : "white", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}
                >
                  <Building size={16} /> Food Supplier
                </button>
                <button
                  type="button"
                  onClick={() => setRole("ngo")}
                  style={{ padding: "0.6rem", borderRadius: "8px", border: role === "ngo" ? "2px solid #4338ca" : "1px solid #e2e8f0", background: role === "ngo" ? "#e0e7ff" : "white", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}
                >
                  <Users size={16} /> Registered NGO
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                {role === "supplier" ? "Business / Establishment Name *" : "NGO Foundation Name *"}
              </label>
              <input 
                type="text" 
                className="form-control" 
                placeholder={role === "supplier" ? "e.g. Grand Seasons Hotel" : "e.g. Care & Share Trust"}
                value={registerForm.name}
                onChange={e => setRegisterForm({ ...registerForm, name: e.target.value })}
                required
              />
            </div>

            {role === "supplier" ? (
              <div className="form-group">
                <label className="form-label">Supplier Category *</label>
                <select 
                  className="form-control"
                  value={registerForm.subType}
                  onChange={e => setRegisterForm({ ...registerForm, subType: e.target.value })}
                >
                  <option value="Restaurant">Restaurant</option>
                  <option value="Hotel">Hotel & Banquet</option>
                  <option value="Supermarket">Supermarket & Grocery</option>
                  <option value="Catering Company">Catering Company</option>
                  <option value="Food Manufacturer">Food Manufacturer</option>
                </select>
              </div>
            ) : (
              <div className="form-group">
                <label className="form-label">NGO Registration Number / Darpan ID *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. NGO-BLR-2024-9123"
                  value={registerForm.regNumber}
                  onChange={e => setRegisterForm({ ...registerForm, regNumber: e.target.value })}
                  required
                />
              </div>
            )}

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input 
                  type="email" 
                  className="form-control" 
                  value={registerForm.email}
                  onChange={e => setRegisterForm({ ...registerForm, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Contact *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="+91..."
                  value={registerForm.phone}
                  onChange={e => setRegisterForm({ ...registerForm, phone: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Physical Street Address *</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Street, Landmark, Bangalore"
                value={registerForm.address}
                onChange={e => setRegisterForm({ ...registerForm, address: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "0.5rem" }}>
              Complete Registration & Submit for Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

