import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { 
  MapPin, 
  Navigation, 
  Phone, 
  Building, 
  ArrowLeft,
  Users,
  Compass,
  ExternalLink,
  Layers
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const NearbyNgosMap = ({ onBackToDonor }) => {
  const { ngos, theme } = useApp();
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [selectedNgo, setSelectedNgo] = useState(ngos[0]);
  const [mapStyle, setMapStyle] = useState("google"); // "google", "satellite", "terrain"

  // Bangalore Center
  const centerLat = 12.9716;
  const centerLng = 77.5946;

  // Initialize real interactive map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Cleanup existing instance if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Google Maps Tile Layers (Roadmap, Satellite, Terrain)
    const tileLayers = {
      google: "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", // Google Standard Road
      satellite: "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}", // Google Hybrid Satellite
      terrain: "https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}" // Google Terrain
    };

    const map = L.map(mapContainerRef.current, {
      center: [centerLat, centerLng],
      zoom: 12,
      zoomControl: true
    });

    L.tileLayer(tileLayers[mapStyle] || tileLayers.google, {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: '&copy; Google Maps contributors'
    }).addTo(map);

    // Add Donor Location Marker (Blue Google Pin)
    const donorIcon = L.divIcon({
      className: "custom-map-pin",
      html: `
        <div class="pin-bubble pin-bubble-user">
          <span>🏪</span>
        </div>
      `,
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -38]
    });

    L.marker([centerLat, centerLng], { icon: donorIcon })
      .addTo(map)
      .bindPopup(`
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 4px;">
          <b style="color: #1a73e8; font-size: 14px;">📍 Your Donor Kitchen</b>
          <p style="margin: 4px 0 0; font-size: 12px; color: #555;">MG Road Central Hub, Bangalore</p>
        </div>
      `);

    // Add NGO Pins (Red Google Maps Style with Heart/NGO icon)
    ngos.forEach((ngo) => {
      const ngoIcon = L.divIcon({
        className: "custom-map-pin",
        html: `
          <div class="pin-bubble">
            <span>🤝</span>
          </div>
        `,
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -38]
      });

      const marker = L.marker([ngo.lat, ngo.lng], { icon: ngoIcon })
        .addTo(map)
        .bindPopup(`
          <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 6px; min-width: 180px;">
            <b style="color: #ea4335; font-size: 14px;">${ngo.name}</b>
            <div style="font-size: 12px; color: #444; margin: 4px 0;">📍 ${ngo.address}</div>
            <div style="font-size: 12px; color: #16a34a; font-weight: bold;">Feeding Capacity: ${ngo.capacity}</div>
            <div style="font-size: 11px; color: #666; margin-top: 4px;">📞 ${ngo.phone}</div>
          </div>
        `);

      marker.on("click", () => {
        setSelectedNgo(ngo);
      });
    });

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [mapStyle, ngos]);

  // Pan to selected NGO on click from side list
  const handleSelectNgo = (ngo) => {
    setSelectedNgo(ngo);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([ngo.lat, ngo.lng], 14, {
        animate: true,
        duration: 1.2
      });
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      
      {/* Top Header */}
      <div className="fb-card" style={{ padding: "1.25rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <button 
              className="btn btn-outline btn-sm" 
              style={{ marginBottom: "0.5rem" }}
              onClick={onBackToDonor}
            >
              <ArrowLeft size={16} />
              <span>Back to Food Donation Form</span>
            </button>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 800, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Compass size={24} color="#ea4335" />
              <span>Google Maps – Nearby NGO Food Relief Centres</span>
            </h2>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Interactive real-time map displaying Google Maps satellite & road tiles with live location pins of registered relief NGOs in Bangalore.
            </p>
          </div>

          {/* Map Layer Switcher (Roadmap, Satellite, Terrain) */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "var(--bg-main)", padding: "0.3rem", borderRadius: "10px", border: "1px solid var(--border-color)" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "0 0.5rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <Layers size={14} /> Map Layer:
            </span>
            <button
              className={`btn btn-sm ${mapStyle === "google" ? "btn-primary" : "btn-outline"}`}
              onClick={() => setMapStyle("google")}
            >
              Roadmap
            </button>
            <button
              className={`btn btn-sm ${mapStyle === "satellite" ? "btn-primary" : "btn-outline"}`}
              onClick={() => setMapStyle("satellite")}
            >
              Satellite
            </button>
            <button
              className={`btn btn-sm ${mapStyle === "terrain" ? "btn-primary" : "btn-outline"}`}
              onClick={() => setMapStyle("terrain")}
            >
              Terrain
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Google Map + NGO Details Panel */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "1.25rem" }}>
        
        {/* Real Interactive Leaflet Container loaded with Google Maps Tiles */}
        <div 
          style={{ 
            height: "540px", 
            borderRadius: "16px", 
            overflow: "hidden", 
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            border: "2px solid var(--border-color)",
            position: "relative"
          }}
        >
          <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />

          {/* Map Legend Overlay */}
          <div style={{ position: "absolute", bottom: "16px", left: "16px", zIndex: 1000, background: "rgba(255, 255, 255, 0.95)", backdropFilter: "blur(6px)", padding: "0.6rem 0.85rem", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", fontSize: "0.75rem", fontWeight: 700, color: "#1e293b", display: "flex", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#1a73e8" }} />
              <span>Your Kitchen (Donor)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ea4335" }} />
              <span>NGO Relief Hubs</span>
            </div>
          </div>
        </div>

        {/* Selected NGO Detail Panel */}
        <div className="fb-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#ea4335", textTransform: "uppercase", background: "#fee2e2", padding: "0.25rem 0.65rem", borderRadius: "9999px", width: "fit-content", marginBottom: "0.75rem" }}>
              📍 Selected Relief NGO Hub
            </div>

            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "0.4rem" }}>
              {selectedNgo.name}
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.85rem", marginTop: "1rem" }}>
              <div>
                <strong style={{ color: "var(--text-main)" }}>Street Address:</strong>
                <div style={{ color: "var(--text-muted)", marginTop: "2px" }}>{selectedNgo.address}</div>
              </div>

              <div>
                <strong style={{ color: "var(--text-main)" }}>Daily Feeding Capacity:</strong>
                <div style={{ color: "var(--primary-600)", fontWeight: 800, marginTop: "2px" }}>{selectedNgo.capacity}</div>
              </div>

              <div>
                <strong style={{ color: "var(--text-main)" }}>Contact Incharge:</strong>
                <div style={{ color: "var(--text-muted)", marginTop: "2px" }}>{selectedNgo.contactPerson}</div>
              </div>

              <div>
                <strong style={{ color: "var(--text-main)" }}>Phone Number:</strong>
                <div style={{ color: "#0284c7", fontWeight: 700, marginTop: "2px" }}>{selectedNgo.phone}</div>
              </div>

              <div>
                <strong style={{ color: "var(--text-main)" }}>Email:</strong>
                <div style={{ color: "var(--text-muted)", marginTop: "2px" }}>{selectedNgo.email}</div>
              </div>
            </div>

            {/* Quick Switch NGO List */}
            <div style={{ marginTop: "1.25rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border-color)" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                Browse All NGO Locations:
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", maxHeight: "150px", overflowY: "auto" }}>
                {ngos.map(n => (
                  <button
                    key={n.id}
                    onClick={() => handleSelectNgo(n)}
                    style={{
                      textAlign: "left",
                      padding: "0.45rem 0.65rem",
                      borderRadius: "8px",
                      border: "none",
                      background: selectedNgo.id === n.id ? "var(--primary-100)" : "transparent",
                      color: selectedNgo.id === n.id ? "var(--primary-800)" : "var(--text-main)",
                      fontWeight: selectedNgo.id === n.id ? 800 : 500,
                      fontSize: "0.8rem",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between"
                    }}
                  >
                    <span>{n.name}</span>
                    <span style={{ color: "#ea4335" }}>➔</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "1.25rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border-color)" }}>
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${selectedNgo.lat},${selectedNgo.lng}`}
              target="_blank" 
              rel="noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ textDecoration: "none" }}
            >
              <ExternalLink size={15} />
              <span>Open in Google Maps App</span>
            </a>

            <a 
              href={`tel:${selectedNgo.phone}`}
              className="btn btn-primary"
              style={{ textDecoration: "none" }}
            >
              <Phone size={16} />
              <span>Call NGO Directly</span>
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};
