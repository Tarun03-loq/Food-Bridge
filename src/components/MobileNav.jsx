import { 
  Home, 
  PlusCircle, 
  ListFilter, 
  MapPin, 
  Truck, 
  Clock, 
  ShieldCheck, 
  User 
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const MobileNav = ({ activeTab, setActiveTab }) => {
  const { currentUser } = useApp();

  const isSupplier = currentUser?.role === "supplier";
  const isNgo = currentUser?.role === "ngo";
  const isAdmin = currentUser?.role === "admin";

  return (
    <nav className="mobile-bottom-nav">
      <button 
        className={`bottom-nav-item ${activeTab === "home" ? "active" : ""}`}
        onClick={() => setActiveTab("home")}
      >
        <Home size={20} />
        <span>Home</span>
      </button>

      {isSupplier && (
        <button 
          className={`bottom-nav-item ${activeTab === "donate" ? "active" : ""}`}
          onClick={() => setActiveTab("donate")}
        >
          <PlusCircle size={20} />
          <span>Donate</span>
        </button>
      )}

      {isNgo && (
        <button 
          className={`bottom-nav-item ${activeTab === "listings" ? "active" : ""}`}
          onClick={() => setActiveTab("listings")}
        >
          <ListFilter size={20} />
          <span>Browse</span>
        </button>
      )}

      <button 
        className={`bottom-nav-item ${activeTab === "map" ? "active" : ""}`}
        onClick={() => setActiveTab("map")}
      >
        <MapPin size={20} />
        <span>Map</span>
      </button>

      <button 
        className={`bottom-nav-item ${activeTab === "requests" ? "active" : ""}`}
        onClick={() => setActiveTab("requests")}
      >
        <Clock size={20} />
        <span>Requests</span>
      </button>

      <button 
        className={`bottom-nav-item ${activeTab === "tracking" ? "active" : ""}`}
        onClick={() => setActiveTab("tracking")}
      >
        <Truck size={20} />
        <span>Live</span>
      </button>

      {isAdmin && (
        <button 
          className={`bottom-nav-item ${activeTab === "admin" ? "active" : ""}`}
          onClick={() => setActiveTab("admin")}
        >
          <ShieldCheck size={20} />
          <span>Admin</span>
        </button>
      )}

      <button 
        className={`bottom-nav-item ${activeTab === "profile" ? "active" : ""}`}
        onClick={() => setActiveTab("profile")}
      >
        <User size={20} />
        <span>Profile</span>
      </button>
    </nav>
  );
};

